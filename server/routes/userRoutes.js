
const express = require('express');
const router = express.Router();

const {
    getUsers,
    getUser,
    getSkillMatches
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
//get matching skills
router.get('/matches',authMiddleware,getSkillMatches);
// GET ALL USERS - login required
router.get('/', authMiddleware, getUsers);

// GET ONE USER BY ID - login required
router.get('/:id', authMiddleware, getUser);


module.exports = router;
