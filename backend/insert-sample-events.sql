-- Sample events for testing
-- These will be inserted into your local database

-- First, create some sample events around Bangalore, India
INSERT INTO events (title, description, type, start_at, end_at, latitude, longitude, city, max_participants) 
VALUES 
  -- Hackathons
  ('AI Hackathon 2025', 'Build the next big AI product in 48 hours! Join developers from across India to create innovative AI solutions. Prizes worth ₹5 lakhs!', 'Hackathon', 
   '2025-11-15 09:00:00', '2025-11-17 18:00:00', 12.9716, 77.5946, 'Bangalore', 150),
  
  ('Startup Weekend Hackathon', 'Turn your startup idea into reality in 54 hours. Get mentorship from industry experts and pitch to investors.', 'Hackathon', 
   '2025-11-22 18:00:00', '2025-11-24 20:00:00', 12.9352, 77.6245, 'Bangalore', 100),
  
  ('Web3 & Blockchain Hackathon', 'Build decentralized applications on Ethereum, Solana, and Polygon. Prize pool: $10,000', 'Hackathon', 
   '2025-11-29 10:00:00', '2025-12-01 18:00:00', 12.9800, 77.5900, 'Bangalore', 120),
  
  ('Green Tech Hackathon', 'Develop sustainable technology solutions for climate change. Sponsored by leading green tech companies.', 'Hackathon', 
   '2025-12-06 09:00:00', '2025-12-08 17:00:00', 12.9500, 77.6000, 'Bangalore', 80),

  -- Workshops
  ('React & Next.js Workshop', 'Learn modern React development with Next.js 14. Build a full-stack application from scratch. Hands-on project included.', 'Workshop', 
   '2025-11-10 14:00:00', '2025-11-10 18:00:00', 12.9716, 77.5946, 'Bangalore', 50),
  
  ('Python for Data Science', 'Master Python libraries: NumPy, Pandas, Matplotlib. Perfect for beginners. Get certificates upon completion.', 'Workshop', 
   '2025-11-12 10:00:00', '2025-11-12 16:00:00', 12.9600, 77.5800, 'Bangalore', 60),
  
  ('Docker & Kubernetes Masterclass', 'Deploy containerized applications like a pro. Learn Docker, Kubernetes, and DevOps best practices.', 'Workshop', 
   '2025-11-18 15:00:00', '2025-11-18 19:00:00', 12.9400, 77.6100, 'Bangalore', 40),
  
  ('UI/UX Design Fundamentals', 'Learn design thinking, Figma, and user research. Create a portfolio project during the session.', 'Workshop', 
   '2025-11-25 13:00:00', '2025-11-25 17:00:00', 12.9650, 77.5850, 'Bangalore', 35),

  -- AI Workshops
  ('Machine Learning Bootcamp', 'Introduction to ML algorithms, neural networks, and deep learning. Build your first ML model. No prior experience needed.', 'AI Workshop', 
   '2025-11-20 10:00:00', '2025-11-20 17:00:00', 12.9716, 77.5946, 'Bangalore', 70),
  
  ('ChatGPT & LLMs for Developers', 'Learn to integrate OpenAI APIs, LangChain, and build AI-powered applications. Practical examples included.', 'AI Workshop', 
   '2025-11-27 14:00:00', '2025-11-27 18:00:00', 12.9550, 77.6050, 'Bangalore', 45),
  
  ('Computer Vision with TensorFlow', 'Build image recognition and object detection models. Work with real-world datasets and deploy models.', 'AI Workshop', 
   '2025-12-04 11:00:00', '2025-12-04 16:00:00', 12.9450, 77.5950, 'Bangalore', 50),

  -- Meetups
  ('Bangalore Developer Meetup', 'Monthly meetup for developers to network, share knowledge, and discuss latest tech trends. Free pizza and drinks!', 'Meetup', 
   '2025-11-12 18:00:00', '2025-11-12 21:00:00', 12.9716, 77.5946, 'Bangalore', 100),
  
  ('Women in Tech Networking', 'Connect with inspiring women leaders in technology. Panel discussion, networking session, and career guidance.', 'Meetup', 
   '2025-11-19 17:00:00', '2025-11-19 20:00:00', 12.9700, 77.5920, 'Bangalore', 80),
  
  ('Startup Founders Connect', 'Meet fellow entrepreneurs, share experiences, and build connections. Guest speaker from successful startup.', 'Meetup', 
   '2025-11-26 18:30:00', '2025-11-26 21:00:00', 12.9620, 77.5980, 'Bangalore', 60),
  
  ('Tech Talk Tuesday', 'Weekly tech talks on AI, Cloud, DevOps, and more. Learn from industry experts and ask questions.', 'Meetup', 
   '2025-11-14 19:00:00', '2025-11-14 21:00:00', 12.9750, 77.5900, 'Bangalore', 50);

-- Show confirmation
SELECT '✅ Sample events inserted successfully!' as status;
SELECT type, COUNT(*) as count FROM events GROUP BY type ORDER BY count DESC;
