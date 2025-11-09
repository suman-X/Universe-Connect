const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { pool } = require('./src/config/database');

async function checkEvents() {
  try {
    const result = await pool.query('SELECT COUNT(*) as count FROM events');
    console.log(`Total events in database: ${result.rows[0].count}`);
    
    const events = await pool.query('SELECT id, title, type, city FROM events LIMIT 5');
    console.log('\nSample events:');
    events.rows.forEach(event => {
      console.log(`- ${event.title} (${event.type}) in ${event.city}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkEvents();
