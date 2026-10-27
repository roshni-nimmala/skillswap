const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
require('dotenv').config();
//const port = 3000;
const dns=require('dns');
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://skillswap-nine-tau.vercel.app'
    ]
}));

// Middleware
app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((error) => {
        console.log("mongodb connection failed:", error.message);
    });


// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes=require('./routes/authRoutes');
const authMiddleware=require("./middleware/authMiddleware");
app.use('/api/users', userRoutes);
app.use('/api/auth',authRoutes);

// Home
app.get('/', (req, res) => {
    res.send("WELCOME TO SKILLSWAP");
});

app.get("/api/auth/test-protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "You accessed a protected route!",
    userId: req.user.userId
  });
});
// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});