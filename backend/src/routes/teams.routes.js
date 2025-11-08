const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams.controller');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Get AI-powered team recommendations for a hackathon
router.get('/recommendations/:hackathonId', teamsController.getTeamRecommendations);

// Create a new team
router.post('/', teamsController.createTeam);

// Get user's teams
router.get('/my-teams', teamsController.getUserTeams);

module.exports = router;
