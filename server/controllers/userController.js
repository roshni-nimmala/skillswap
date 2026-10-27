const User = require('../models/User');




// GET ALL USERS BY SKILL

const getUsers = async (req, res) => {
    try {
        const { skill } = req.query;

        // Never return password hashes
        const filter = {
             _id: { $ne: req.user.userId }
        };

        if (skill && skill.trim()) {
            filter.skills = {
                $regex: skill.trim(),
                $options: "i"
            };
        }

        const users = await User.find(filter)
            .select("-password")
            .limit(50);

        res.status(200).json({
            count: users.length,
            users
        });

    } catch (error) {
        console.error("Get users error:", error.message);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// GET ONE USER BY ID
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
                             .select('-password');

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getSkillMatches = async (req, res) => {
    try {
        // 1. Get the logged-in user's profile
        const currentUser = await User.findById(
            req.user.userId
        ).select("learnSkills");

        if (!currentUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // 2. Check whether the user wants to learn any skills
        if (!currentUser.learnSkills ||
            currentUser.learnSkills.length === 0) {
            return res.status(200).json({
                count: 0,
                message: "Add skills you want to learn to find matches",
                matches: []
            });
        }

        // 3. Fetch other users
        const otherUsers = await User.find({
            _id: { $ne: req.user.userId }
        }).select("-password");

        // 4. Match skills without case sensitivity
        const wantedSkills = currentUser.learnSkills.map(
            skill => skill.trim().toLowerCase()
        );

        const matches = otherUsers
            .map(user => {
                const matchedSkills = user.skills.filter(
                    skill => wantedSkills.includes(
                        skill.trim().toLowerCase()
                    )
                );

                return {
                    ...user.toObject(),
                    matchedSkills
                };
            })
            .filter(user => user.matchedSkills.length > 0)
            .slice(0, 50);

        // 5. Return matching users
        res.status(200).json({
            count: matches.length,
            matches
        });

    } catch (error) {
        console.error("Skill matching error:", error.message);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


module.exports = {
   
    getUsers,
    getUser,
    getSkillMatches
};