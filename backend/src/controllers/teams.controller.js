const { pool } = require('../config/database');
const geminiService = require('../services/gemini.service');

/**
 * Get AI-powered team recommendations for a hackathon
 */
exports.getTeamRecommendations = async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const userId = req.user.userId;

    // Get current user profile with skills
    const userResult = await pool.query(
      `SELECT u.*, 
        ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills
       FROM users u
       LEFT JOIN user_skills us ON u.id = us.user_id
       LEFT JOIN skills s ON us.skill_id = s.id
       WHERE u.id = $1
       GROUP BY u.id`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const currentUser = userResult.rows[0];

    // Get hackathon details
    const hackathonResult = await pool.query(
      'SELECT * FROM events WHERE id = $1 AND type = $2',
      [hackathonId, 'Hackathon']
    );

    if (hackathonResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hackathon not found' });
    }

    const hackathon = hackathonResult.rows[0];

    // Get nearby users with skills (within 100km)
    const nearbyUsersResult = await pool.query(
      `SELECT u.*, 
        ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills,
        (6371 * acos(
          cos(radians($1)) * cos(radians(u.latitude)) * 
          cos(radians(u.longitude) - radians($2)) + 
          sin(radians($1)) * sin(radians(u.latitude))
        )) AS distance
       FROM users u
       LEFT JOIN user_skills us ON u.id = us.user_id
       LEFT JOIN skills s ON us.skill_id = s.id
       WHERE u.id != $3
         AND (6371 * acos(
           cos(radians($1)) * cos(radians(u.latitude)) * 
           cos(radians(u.longitude) - radians($2)) + 
           sin(radians($1)) * sin(radians(u.latitude))
         )) <= 100
       GROUP BY u.id
       HAVING ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) IS NOT NULL
       ORDER BY distance ASC
       LIMIT 50`,
      [currentUser.latitude, currentUser.longitude, userId]
    );

    const nearbyUsers = nearbyUsersResult.rows;

    if (nearbyUsers.length === 0) {
      return res.json({
        success: true,
        message: 'No nearby users found with skills',
        data: []
      });
    }

    // Get AI recommendations
    const recommendations = await geminiService.getTeamRecommendations(
      currentUser,
      nearbyUsers,
      hackathon
    );

    // Enrich recommendations with full user data
    const enrichedRecommendations = recommendations.map(rec => {
      const user = nearbyUsers.find(u => u.id === rec.user_id);
      return {
        ...rec,
        user: user ? {
          id: user.id,
          full_name: user.full_name,
          username: user.username,
          city: user.city,
          skills: user.skills,
          distance: user.distance
        } : null
      };
    }).filter(rec => rec.user !== null);

    res.json({
      success: true,
      count: enrichedRecommendations.length,
      data: enrichedRecommendations,
      hackathon: {
        id: hackathon.id,
        title: hackathon.title,
        type: hackathon.type
      }
    });

  } catch (error) {
    console.error('Get team recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get team recommendations',
      error: error.message
    });
  }
};

/**
 * Create a new team
 */
exports.createTeam = async (req, res) => {
  try {
    const { hackathon_id, name, member_ids } = req.body;
    const created_by = req.user.userId;

    // Validate hackathon exists
    const hackathonResult = await pool.query(
      'SELECT id FROM events WHERE id = $1 AND type = $2',
      [hackathon_id, 'Hackathon']
    );

    if (hackathonResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Hackathon not found' });
    }

    // Create team
    const teamResult = await pool.query(
      `INSERT INTO teams (hackathon_id, name, created_by, ai_matched)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [hackathon_id, name, created_by, true] // ai_matched = true since using AI recommendations
    );

    const team = teamResult.rows[0];

    // Add creator to team
    await pool.query(
      `INSERT INTO team_members (team_id, user_id, role)
       VALUES ($1, $2, $3)`,
      [team.id, created_by, 'Leader']
    );

    // Add recommended members
    if (member_ids && member_ids.length > 0) {
      for (const memberId of member_ids) {
        await pool.query(
          `INSERT INTO team_members (team_id, user_id, role)
           VALUES ($1, $2, $3)`,
          [team.id, memberId, 'Member']
        );
      }
    }

    // Get complete team with members
    const completeTeamResult = await pool.query(
      `SELECT t.*, 
        json_agg(
          json_build_object(
            'user_id', u.id,
            'full_name', u.full_name,
            'username', u.username,
            'role', tm.role,
            'skills', (
              SELECT ARRAY_AGG(s.name)
              FROM user_skills us
              JOIN skills s ON us.skill_id = s.id
              WHERE us.user_id = u.id
            )
          )
        ) as members
       FROM teams t
       JOIN team_members tm ON t.id = tm.team_id
       JOIN users u ON tm.user_id = u.id
       WHERE t.id = $1
       GROUP BY t.id`,
      [team.id]
    );

    res.status(201).json({
      success: true,
      message: 'AI-matched team created successfully',
      data: completeTeamResult.rows[0]
    });

  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create team',
      error: error.message
    });
  }
};

/**
 * Get user's teams
 */
exports.getUserTeams = async (req, res) => {
  try {
    const userId = req.user.userId;

    const teamsResult = await pool.query(
      `SELECT t.*,
        e.title as hackathon_title,
        e.start_at as hackathon_start,
        json_agg(
          json_build_object(
            'user_id', u.id,
            'full_name', u.full_name,
            'username', u.username,
            'role', tm.role
          )
        ) as members
       FROM teams t
       JOIN events e ON t.hackathon_id = e.id
       JOIN team_members tm ON t.id = tm.team_id
       JOIN users u ON tm.user_id = u.id
       WHERE t.id IN (
         SELECT team_id FROM team_members WHERE user_id = $1
       )
       GROUP BY t.id, e.title, e.start_at
       ORDER BY t.created_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      count: teamsResult.rows.length,
      data: teamsResult.rows
    });

  } catch (error) {
    console.error('Get user teams error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get teams',
      error: error.message
    });
  }
};

module.exports = exports;
