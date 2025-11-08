const { pool } = require('../config/database');

/**
 * Get all users for global network view
 */
exports.getGlobalNetwork = async (req, res) => {
  try {
    const { search, skills, radius, lat, lng } = req.query;
    const currentUserId = req.user?.userId;

    let query = `
      SELECT 
        u.id,
        u.full_name,
        u.username,
        u.city,
        u.latitude,
        u.longitude,
        u.created_at,
        ARRAY_AGG(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) as skills
    `;

    // Add distance calculation if lat/lng provided
    if (lat && lng) {
      query += `,
        (6371 * acos(
          cos(radians($1)) * cos(radians(u.latitude)) * 
          cos(radians(u.longitude) - radians($2)) + 
          sin(radians($1)) * sin(radians(u.latitude))
        )) AS distance
      `;
    }

    query += `
      FROM users u
      LEFT JOIN user_skills us ON u.id = us.user_id
      LEFT JOIN skills s ON us.skill_id = s.id
      WHERE 1=1
    `;

    const params = [];
    let paramIndex = lat && lng ? 3 : 1;

    // Exclude current user
    if (currentUserId) {
      query += ` AND u.id != $${paramIndex}`;
      params.push(currentUserId);
      paramIndex++;
    }

    // Search by name or username
    if (search) {
      query += ` AND (u.full_name ILIKE $${paramIndex} OR u.username ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ` GROUP BY u.id`;

    // Filter by skills
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      query += ` HAVING `;
      const skillConditions = skillsArray.map((_, i) => {
        params.push(skillsArray[i]);
        return `$${paramIndex + i} = ANY(ARRAY_AGG(s.name))`;
      });
      query += skillConditions.join(' OR ');
      paramIndex += skillsArray.length;
    }

    // Filter by radius
    if (lat && lng && radius) {
      query += ` HAVING (6371 * acos(
        cos(radians($1)) * cos(radians(u.latitude)) * 
        cos(radians(u.longitude) - radians($2)) + 
        sin(radians($1)) * sin(radians(u.latitude))
      )) <= $${paramIndex}`;
      params.push(parseFloat(radius));
    }

    // Order by distance if location provided, otherwise by name
    if (lat && lng) {
      query += ` ORDER BY distance ASC`;
      params.unshift(parseFloat(lat), parseFloat(lng));
    } else {
      query += ` ORDER BY u.full_name ASC`;
    }

    query += ` LIMIT 500`; // Limit for performance

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error('Get global network error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch global network',
      error: error.message
    });
  }
};

/**
 * Get user profile by ID
 */
exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        u.id,
        u.full_name,
        u.username,
        u.email,
        u.city,
        u.latitude,
        u.longitude,
        u.created_at,
        ARRAY_AGG(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) as skills,
        (SELECT COUNT(*) FROM team_members tm WHERE tm.user_id = u.id) as teams_count,
        (SELECT COUNT(*) FROM event_registrations er WHERE er.user_id = u.id) as events_count
       FROM users u
       LEFT JOIN user_skills us ON u.id = us.user_id
       LEFT JOIN skills s ON us.skill_id = s.id
       WHERE u.id = $1
       GROUP BY u.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get user's teams
    const teamsResult = await pool.query(
      `SELECT t.*, e.title as hackathon_title
       FROM teams t
       JOIN events e ON t.hackathon_id = e.id
       JOIN team_members tm ON t.id = tm.team_id
       WHERE tm.user_id = $1
       ORDER BY t.created_at DESC
       LIMIT 5`,
      [id]
    );

    const user = result.rows[0];
    user.teams = teamsResult.rows;

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
};

/**
 * Get nearby users
 */
exports.getNearbyUsers = async (req, res) => {
  try {
    const { radius = 50 } = req.query;
    const userId = req.user.userId;

    // Get current user's location
    const userResult = await pool.query(
      'SELECT latitude, longitude FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { latitude, longitude } = userResult.rows[0];

    // Get nearby users
    const result = await pool.query(
      `SELECT 
        u.id,
        u.full_name,
        u.username,
        u.city,
        u.latitude,
        u.longitude,
        ARRAY_AGG(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) as skills,
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
         )) <= $4
       GROUP BY u.id
       ORDER BY distance ASC
       LIMIT 100`,
      [latitude, longitude, userId, parseFloat(radius)]
    );

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error('Get nearby users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nearby users',
      error: error.message
    });
  }
};

/**
 * Update user profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { full_name, city, skills } = req.body;

    // Update basic info
    if (full_name || city) {
      const updates = [];
      const params = [];
      let paramIndex = 1;

      if (full_name) {
        updates.push(`full_name = $${paramIndex}`);
        params.push(full_name);
        paramIndex++;
      }

      if (city) {
        updates.push(`city = $${paramIndex}`);
        params.push(city);
        paramIndex++;
      }

      params.push(userId);

      await pool.query(
        `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
        params
      );
    }

    // Update skills if provided
    if (skills && Array.isArray(skills)) {
      // Delete existing skills
      await pool.query('DELETE FROM user_skills WHERE user_id = $1', [userId]);

      // Add new skills
      for (const skillName of skills) {
        // Get or create skill
        const skillResult = await pool.query(
          'INSERT INTO skills (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = $1 RETURNING id',
          [skillName]
        );
        const skillId = skillResult.rows[0].id;

        // Link to user
        await pool.query(
          'INSERT INTO user_skills (user_id, skill_id) VALUES ($1, $2)',
          [userId, skillId]
        );
      }
    }

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

module.exports = exports;
