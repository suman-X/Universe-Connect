-- Insert sample users with coordinates for Global Network testing
-- Password for all test users: "password123"

-- User 1: Alice from MIT (Boston, USA)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'alice_mit',
  'alice@mit.edu',
  '$2b$10$YourHashedPasswordHere',
  'Massachusetts Institute of Technology',
  'CS major interested in AI and robotics',
  42.3601,
  -71.0942
) ON CONFLICT (username) DO NOTHING;

-- User 2: Bob from Stanford (California, USA)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'bob_stanford',
  'bob@stanford.edu',
  '$2b$10$YourHashedPasswordHere',
  'Stanford University',
  'Full-stack developer, hackathon enthusiast',
  37.4275,
  -122.1697
) ON CONFLICT (username) DO NOTHING;

-- User 3: Charlie from Oxford (UK)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'charlie_oxford',
  'charlie@oxford.ac.uk',
  '$2b$10$YourHashedPasswordHere',
  'University of Oxford',
  'ML researcher, love building AI apps',
  51.7520,
  -1.2577
) ON CONFLICT (username) DO NOTHING;

-- User 4: Diana from Tokyo University (Japan)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'diana_tokyo',
  'diana@u-tokyo.ac.jp',
  '$2b$10$YourHashedPasswordHere',
  'University of Tokyo',
  'Mobile app developer, IoT projects',
  35.7148,
  139.7967
) ON CONFLICT (username) DO NOTHING;

-- User 5: Eve from IIT Bombay (India)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'eve_iitb',
  'eve@iitb.ac.in',
  '$2b$10$YourHashedPasswordHere',
  'Indian Institute of Technology Bombay',
  'Data science and blockchain enthusiast',
  19.1334,
  72.9133
) ON CONFLICT (username) DO NOTHING;

-- User 6: Frank from University of Sydney (Australia)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'frank_sydney',
  'frank@sydney.edu.au',
  '$2b$10$YourHashedPasswordHere',
  'University of Sydney',
  'Game developer and AR/VR specialist',
  -33.8886,
  151.1873
) ON CONFLICT (username) DO NOTHING;

-- User 7: Grace from ETH Zurich (Switzerland)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'grace_ethz',
  'grace@ethz.ch',
  '$2b$10$YourHashedPasswordHere',
  'ETH Zurich',
  'Cybersecurity researcher',
  47.3769,
  8.5417
) ON CONFLICT (username) DO NOTHING;

-- User 8: Henry from University of Toronto (Canada)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'henry_toronto',
  'henry@utoronto.ca',
  '$2b$10$YourHashedPasswordHere',
  'University of Toronto',
  'Backend developer, cloud computing expert',
  43.6629,
  -79.3957
) ON CONFLICT (username) DO NOTHING;

-- User 9: Iris from Sorbonne (France)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'iris_sorbonne',
  'iris@sorbonne.fr',
  '$2b$10$YourHashedPasswordHere',
  'Sorbonne University',
  'UI/UX designer and frontend developer',
  48.8566,
  2.3522
) ON CONFLICT (username) DO NOTHING;

-- User 10: Jack from NUS (Singapore)
INSERT INTO users (username, email, password, university, bio, latitude, longitude)
VALUES (
  'jack_nus',
  'jack@nus.edu.sg',
  '$2b$10$YourHashedPasswordHere',
  'National University of Singapore',
  'DevOps engineer, loves automation',
  1.2966,
  103.7764
) ON CONFLICT (username) DO NOTHING;

-- Add skills to users
-- Get skill IDs first, then insert user_skills
-- Alice: JavaScript, React, AI/ML
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'alice_mit' AND s.skill_name IN ('JavaScript', 'React', 'Machine Learning')
ON CONFLICT DO NOTHING;

-- Bob: Python, Node.js, Full Stack
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'bob_stanford' AND s.skill_name IN ('Python', 'Node.js', 'Full Stack Development')
ON CONFLICT DO NOTHING;

-- Charlie: Machine Learning, Python, Data Science
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'charlie_oxford' AND s.skill_name IN ('Machine Learning', 'Python', 'Data Science')
ON CONFLICT DO NOTHING;

-- Diana: Mobile Development, IoT, Java
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'diana_tokyo' AND s.skill_name IN ('Mobile Development', 'IoT', 'Java')
ON CONFLICT DO NOTHING;

-- Eve: Blockchain, Data Science, Python
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'eve_iitb' AND s.skill_name IN ('Blockchain', 'Data Science', 'Python')
ON CONFLICT DO NOTHING;

-- Frank: Game Development, AR/VR, C++
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'frank_sydney' AND s.skill_name IN ('Game Development', 'AR/VR', 'C++')
ON CONFLICT DO NOTHING;

-- Grace: Cybersecurity, Cloud Computing, Python
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'grace_ethz' AND s.skill_name IN ('Cybersecurity', 'Cloud Computing', 'Python')
ON CONFLICT DO NOTHING;

-- Henry: Backend Development, Cloud Computing, Node.js
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'henry_toronto' AND s.skill_name IN ('Backend Development', 'Cloud Computing', 'Node.js')
ON CONFLICT DO NOTHING;

-- Iris: UI/UX Design, Frontend Development, React
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'iris_sorbonne' AND s.skill_name IN ('UI/UX Design', 'Frontend Development', 'React')
ON CONFLICT DO NOTHING;

-- Jack: DevOps, Cloud Computing, Docker
INSERT INTO user_skills (user_id, skill_id)
SELECT u.id, s.id
FROM users u
CROSS JOIN skills s
WHERE u.username = 'jack_nus' AND s.skill_name IN ('DevOps', 'Cloud Computing', 'Docker')
ON CONFLICT DO NOTHING;

SELECT 'Sample users with coordinates inserted successfully!' AS message;
