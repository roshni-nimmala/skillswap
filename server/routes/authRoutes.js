const express=require('express');
const router = express.Router();
const { registerUser ,
    loginUser, 
    getMyProfile,
updateMyProfile} = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");

router.post('/register', registerUser);
router.post('/login',loginUser);
// Protected profile route
router.get("/me", authMiddleware, getMyProfile);
router.patch("/me", authMiddleware, updateMyProfile);
module.exports=router;