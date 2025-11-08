const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/universe_connect'
});

const sampleUsers = [
  {
    username: 'alice_mit',
    email: 'alice@mit.edu',
    full_name: 'Alice Johnson',
    university: 'Massachusetts Institute of Technology',
    bio: 'CS major interested in AI and robotics',
    latitude: 42.3601,
    longitude: -71.0942,
    skills: ['JavaScript', 'React', 'Machine Learning']
  },
  {
    username: 'bob_stanford',
    email: 'bob@stanford.edu',
    full_name: 'Bob Smith',
    university: 'Stanford University',
    bio: 'Full-stack developer, hackathon enthusiast',
    latitude: 37.4275,
    longitude: -122.1697,
    skills: ['Python', 'Node.js', 'Full Stack']
  },
  {
    username: 'charlie_oxford',
    email: 'charlie@oxford.ac.uk',
    full_name: 'Charlie Brown',
    university: 'University of Oxford',
    bio: 'ML researcher, love building AI apps',
    latitude: 51.7520,
    longitude: -1.2577,
    skills: ['Machine Learning', 'Python', 'Data Science']
  },
  {
    username: 'diana_tokyo',
    email: 'diana@u-tokyo.ac.jp',
    full_name: 'Diana Tanaka',
    university: 'University of Tokyo',
    bio: 'Mobile app developer, IoT projects',
    latitude: 35.7148,
    longitude: 139.7967,
    skills: ['Mobile Development', 'IoT', 'Java']
  },
  {
    username: 'eve_iitb',
    email: 'eve@iitb.ac.in',
    full_name: 'Eve Patel',
    university: 'Indian Institute of Technology Bombay',
    bio: 'Data science and blockchain enthusiast',
    latitude: 19.1334,
    longitude: 72.9133,
    skills: ['Blockchain', 'Data Science', 'Python']
  },
  {
    username: 'frank_sydney',
    email: 'frank@sydney.edu.au',
    full_name: 'Frank Wilson',
    university: 'University of Sydney',
    bio: 'Game developer and AR/VR specialist',
    latitude: -33.8886,
    longitude: 151.1873,
    skills: ['Game Development', 'AR/VR', 'C++']
  },
  {
    username: 'grace_ethz',
    email: 'grace@ethz.ch',
    full_name: 'Grace Mueller',
    university: 'ETH Zurich',
    bio: 'Cybersecurity researcher',
    latitude: 47.3769,
    longitude: 8.5417,
    skills: ['Cybersecurity', 'Cloud Computing', 'Python']
  },
  {
    username: 'henry_toronto',
    email: 'henry@utoronto.ca',
    full_name: 'Henry Chen',
    university: 'University of Toronto',
    bio: 'Backend developer, cloud computing expert',
    latitude: 43.6629,
    longitude: -79.3957,
    skills: ['Backend Development', 'Cloud Computing', 'Node.js']
  },
  {
    username: 'iris_sorbonne',
    email: 'iris@sorbonne.fr',
    full_name: 'Iris Dubois',
    university: 'Sorbonne University',
    bio: 'UI/UX designer and frontend developer',
    latitude: 48.8566,
    longitude: 2.3522,
    skills: ['UI/UX Design', 'Frontend Development', 'React']
  },
  {
    username: 'jack_nus',
    email: 'jack@nus.edu.sg',
    full_name: 'Jack Tan',
    university: 'National University of Singapore',
    bio: 'DevOps engineer, loves automation',
    latitude: 1.2966,
    longitude: 103.7764,
    skills: ['DevOps', 'Cloud Computing', 'Docker']
  }
];

async function insertSampleUsers() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting to insert sample users...\n');
    
    // Hash password once for all users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    for (const user of sampleUsers) {
      console.log(`📝 Inserting ${user.username}...`);
      
      // Check if user already exists
      const existingUser = await client.query(
        'SELECT id FROM users WHERE username = $1 OR email = $2',
        [user.username, user.email]
      );
      
      if (existingUser.rows.length > 0) {
        console.log(`⚠️  User ${user.username} already exists, skipping...\n`);
        continue;
      }
      
      // Insert user
      const result = await client.query(
        `INSERT INTO users (username, email, password_hash, full_name, university, bio, latitude, longitude)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [user.username, user.email, hashedPassword, user.full_name, user.university, user.bio, user.latitude, user.longitude]
      );
      
      const userId = result.rows[0].id;
      console.log(`✅ User created with ID: ${userId}`);
      
      // Add skills
      for (const skillName of user.skills) {
        // Get skill ID
        const skillResult = await client.query(
          'SELECT id FROM skills WHERE name = $1',
          [skillName]
        );
        
        if (skillResult.rows.length > 0) {
          const skillId = skillResult.rows[0].id;
          
          // Insert user_skill
          await client.query(
            'INSERT INTO user_skills (user_id, skill_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [userId, skillId]
          );
          
          console.log(`   ✓ Added skill: ${skillName}`);
        } else {
          console.log(`   ⚠️  Skill not found: ${skillName}`);
        }
      }
      
      console.log(`✅ ${user.username} completed!\n`);
    }
    
    console.log('🎉 All sample users inserted successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Total users: ${sampleUsers.length}`);
    console.log(`   - Password for all: password123`);
    console.log(`   - Users span across: USA, UK, Japan, India, Australia, Switzerland, Canada, France, Singapore`);
    
  } catch (error) {
    console.error('❌ Error inserting sample users:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

insertSampleUsers();
