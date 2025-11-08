const { pool } = require('../config/database');
const externalEventsService = require('../services/external-events.service');

exports.getEvents = async (req, res) => {
  try {
    const { lat, lng, radius, type, includeExternal } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'Latitude and longitude required' });
    }

    let query = `
      SELECT 
        e.*,
        u.full_name as organizer_name,
        (6371 * acos(
          cos(radians($1)) * cos(radians(e.latitude)) * 
          cos(radians(e.longitude) - radians($2)) + 
          sin(radians($1)) * sin(radians(e.latitude))
        )) AS distance
      FROM events e
      LEFT JOIN users u ON e.organizer_id = u.id
      WHERE 1=1
    `;

    const params = [parseFloat(lat), parseFloat(lng)];
    let paramIndex = 3;

    if (radius && radius !== 'Worldwide') {
      query += ` AND (6371 * acos(
        cos(radians($1)) * cos(radians(e.latitude)) * 
        cos(radians(e.longitude) - radians($2)) + 
        sin(radians($1)) * sin(radians(e.latitude))
      )) <= $${paramIndex}`;
      params.push(parseFloat(radius));
      paramIndex++;
    }

    if (type) {
      query += ` AND e.type = $${paramIndex}`;
      params.push(type);
    }

    query += ` ORDER BY distance ASC`;

    const result = await pool.query(query, params);
    let events = result.rows;

    // Fetch external events if requested
    if (includeExternal === 'true') {
      try {
        const externalEvents = await externalEventsService.fetchAllEvents(
          parseFloat(lat),
          parseFloat(lng),
          radius ? parseFloat(radius) : 50
        );

        // Filter external events by type if specified
        const filteredExternalEvents = type 
          ? externalEvents.filter(e => e.type === type)
          : externalEvents;

        // Mark external events
        const markedExternalEvents = filteredExternalEvents.map(e => ({
          ...e,
          is_external: true,
          organizer_name: e.source,
        }));

        // Combine internal and external events
        events = [...events, ...markedExternalEvents];
        
        console.log(`✅ Combined ${result.rows.length} internal + ${filteredExternalEvents.length} external events`);
      } catch (error) {
        console.error('⚠️ Error fetching external events:', error.message);
        // Continue with internal events only
      }
    }

    res.json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch events', error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT e.*, u.full_name as organizer_name, u.email as organizer_email
       FROM events e
       LEFT JOIN users u ON e.organizer_id = u.id
       WHERE e.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch event', error: error.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, type, start_at, end_at, latitude, longitude, city, max_participants } = req.body;
    const organizer_id = req.user.userId;

    const result = await pool.query(
      `INSERT INTO events (title, description, type, start_at, end_at, latitude, longitude, city, organizer_id, max_participants)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [title, description, type, start_at, end_at, latitude, longitude, city, organizer_id, max_participants]
    );

    const newEvent = result.rows[0];

    // Broadcast new event to all connected clients via Socket.IO
    const io = req.app.get('io');
    if (io) {
      io.emit('newEvent', {
        success: true,
        message: 'New event created!',
        data: newEvent
      });
      console.log('📡 Broadcasting new event:', newEvent.title);
    }

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: newEvent
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ success: false, message: 'Failed to create event', error: error.message });
  }
};
