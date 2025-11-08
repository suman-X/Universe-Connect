-- Insert common tech skills
INSERT INTO skills (name) VALUES
  ('JavaScript'),
  ('Python'),
  ('React'),
  ('Node.js'),
  ('Machine Learning'),
  ('AI/ML'),
  ('Data Science'),
  ('UI/UX Design'),
  ('Frontend Development'),
  ('Backend Development'),
  ('DevOps'),
  ('Cloud Computing'),
  ('Mobile Development'),
  ('Blockchain'),
  ('Web3'),
  ('Database Design'),
  ('API Development'),
  ('Git/GitHub'),
  ('Docker'),
  ('Kubernetes')
ON CONFLICT (name) DO NOTHING;

SELECT '✅ Skills inserted successfully!' as status;
SELECT COUNT(*) as total_skills FROM skills;
