const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const usersController = require('../controllers/users.controller');

// Get global network (all users with filters)
router.get('/global-network', authMiddleware, usersController.getGlobalNetwork);

// Get nearby users
router.get('/nearby', authMiddleware, usersController.getNearbyUsers);

// Get user profile by ID
router.get('/:id', authMiddleware, usersController.getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, usersController.updateProfile);

module.exports = router;
