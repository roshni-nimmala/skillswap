const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const registerUser = async (req,res)=>{
    try{
        const{
            name,
            email,
            password,
            skills,
            learnSkills,
            bio,
            qualification
        } =req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Name ,Email and Password are required"
            });
        }
        const user = await User.create({
            name,email,password,skills,learnSkills,bio,qualification
        });
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json({
            message:"Registration successful",
            user :userResponse
        });
    }
    catch(error){
        if(error.code===11000){
            return res.status(409).json({
                message:"email already exists"
            });
        }
         if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: error.message
            });
        }
       
        
        console.error('Registration error:', error.message);

        res.status(500).json({
            message: 'internal server error'
        });
    }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check whether both fields were provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2. Find the user by email
    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 3. Compare entered password with hashed password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5. Send successful response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error during login"
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    // Get the logged-in user's ID from the verified JWT
    const user = await User.findById(req.user.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user
    });

  } catch (error) {
    console.error("Profile error:", error.message);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "skills",
      "learnSkills",
      "bio",
      "qualification"
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid profile fields provided"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    if (error.name === "ValidationError" ||
        error.name === "CastError") {
      return res.status(400).json({
        message: error.message
      });
    }

    console.error("Profile update error:", error.message);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


module.exports={registerUser,
  loginUser, 
  getMyProfile,
  updateMyProfile
};