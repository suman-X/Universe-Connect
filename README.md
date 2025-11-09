# 🌍 UniVerse Connect

<div align="center">

![UniVerse Connect](https://img.shields.io/badge/UniVerse-Connect-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**Connect with university students globally. Find hackathons, workshops, and team up with talented peers near you.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 About

UniVerse Connect is a comprehensive platform designed to bridge the gap between university students worldwide. Whether you're looking for hackathons, workshops, or teammates for your next big project, UniVerse Connect makes it easy to discover and collaborate with like-minded students from around the globe.

### 🎯 Key Highlights

- 🗺️ **Location-Based Discovery** - Find events and students near you using intelligent distance-based filtering
- 🤖 **AI-Powered Team Matching** - Let AI analyze skills and recommend the perfect teammates
- 🌐 **Global Network** - Connect with students from universities worldwide
- ⚡ **Real-Time Updates** - Live event notifications and updates via WebSocket
- 📱 **Fully Responsive** - Seamless experience across mobile, tablet, and desktop devices

---

## ✨ Features

### 🎪 Event Discovery
- **Location-Based Events** - Discover hackathons, workshops, and meetups near you
- **Advanced Filtering** - Filter by distance, event type, and dates
- **Interactive Maps** - Visualize events on an interactive map powered by Leaflet
- **External Events Integration** - Aggregate events from multiple sources

### 👥 Student Networking
- **Global Network** - Browse and connect with students worldwide
- **Skill-Based Search** - Filter students by skills, university, and location
- **Profile Discovery** - View detailed student profiles with skills and interests
- **Distance Calculation** - See how far away other students are from you

### 🤖 AI Team Builder
- **Smart Recommendations** - AI-powered teammate suggestions for hackathons
- **Skill Analysis** - Matches based on complementary skills
- **Team Creation** - Create and manage teams directly through the platform
- **Match Scoring** - See compatibility scores with reasoning

### 🔐 Authentication & Security
- **Secure Login/Register** - JWT-based authentication
- **Password Hashing** - bcrypt encryption for user passwords
- **Rate Limiting** - Protection against brute force attacks
- **Input Validation** - Comprehensive validation on all endpoints

### 🚀 Real-Time Features
- **Live Event Updates** - Socket.IO for real-time event notifications
- **Instant Notifications** - Get notified when new events are posted
- **Live User Status** - See who's online and active

---

## 🎥 Demo

### Screenshots

<div align="center">

| Home Page | Dashboard |
|:---------:|:---------:|
| ![Home](docs/screenshots/home.png) | ![Dashboard](docs/screenshots/dashboard.png) |

| Team Builder | Global Network |
|:------------:|:--------------:|
| ![Team Builder](docs/screenshots/team-builder.png) | ![Global Network](docs/screenshots/global-network.png) |

</div>

### Demo Credentials

For testing purposes, use:
- **Email:** `ravi@iitb.ac.in`
- **Password:** `password123`

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18.3.1
- **Routing:** React Router DOM 7.9.5
- **Styling:** Tailwind CSS 3.4.18
- **Animations:** Framer Motion 12.23.24
- **Maps:** Leaflet 1.9.4 + React Leaflet 4.2.1
- **Icons:** React Icons 5.5.0, Lucide React
- **Build Tool:** Vite 7.1.7
- **HTTP Client:** Axios 1.13.2
- **Real-Time:** Socket.IO Client 4.8.1

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.1.0
- **Database:** PostgreSQL 8.16.3
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** bcryptjs 3.0.3
- **AI Integration:** Google Generative AI 0.24.1
- **Real-Time:** Socket.IO 4.8.1
- **Validation:** Express Validator 7.3.0
- **Rate Limiting:** Express Rate Limit 8.2.1
- **CORS:** cors 2.8.5

### DevOps & Tools
- **Development:** Nodemon 3.1.10
- **Environment:** dotenv 17.2.3
- **Linting:** ESLint 9.36.0
- **TypeScript:** 5.9.3

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

### Clone the Repository

```bash
git clone https://github.com/suman-X/UniVerse-Connect.git
cd UniVerse-Connect
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=universe_connect
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this

# Server Configuration
PORT=5000

# Google Gemini API (for AI features)
GEMINI_API_KEY=your_gemini_api_key

# External APIs (optional)
DEVPOST_API_KEY=your_devpost_api_key
```

4. Set up the database:
```bash
# Create the database
psql -U postgres -c "CREATE DATABASE universe_connect;"

# Run the schema
psql -U postgres -d universe_connect -f db/schema.sql

# (Optional) Insert sample data
psql -U postgres -d universe_connect -f insert-sample-users.sql
psql -U postgres -d universe_connect -f insert-sample-events.sql
psql -U postgres -d universe_connect -f insert-skills.sql
```

5. Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Docker Setup (Optional)

If you prefer using Docker:

```bash
# Build and start all services
docker-compose up -d

# Stop services
docker-compose down
```

---

## 🚀 Usage

### Running the Application

1. **Start the Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

#### Events
- `GET /api/events` - Get all events (with filters)
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event (authenticated)

#### Users
- `GET /api/users/global-network` - Get global network of users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update profile (authenticated)

#### Teams
- `POST /api/teams` - Create team
- `GET /api/teams/recommendations/:hackathonId` - Get AI team recommendations

#### AI
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/analyze` - Analyze skills for team matching

---

## 📁 Project Structure

```
UniVerse-Connect/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── db/              # Database setup and migrations
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── server.js            # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── common/      # Reusable components
│   │   │   ├── events/      # Event-related components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── map/         # Map components
│   │   │   └── teams/       # Team components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   └── package.json
│
├── docker-compose.yml       # Docker composition
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=universe_connect
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- **Suman** - *Initial work* - [@suman-X](https://github.com/suman-X)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Leaflet for interactive maps
- Google for Gemini AI API
- All open-source contributors

---

## 📧 Contact

Project Link: [https://github.com/suman-X/UniVerse-Connect](https://github.com/suman-X/UniVerse-Connect)

---

<div align="center">

Made with ❤️ by Suman

⭐ Star this repository if you find it helpful!

</div>
