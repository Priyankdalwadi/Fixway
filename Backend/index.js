const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const UserRegisterRoutes = require("./routes/UserRegisterRoutes");
const connectDB = require('./db');
const otpRoutes = require("./routes/UserEmailRoutes");
const UserLogin = require("./routes/UserLoginRoutes");
const { verifyToken } = require('./JWT/JwtToken');
const AdminAddFuleDataRoutes = require('./routes/AdminAddFuleDataRoutes');
const AdminElectronicServiceRoutes = require('./routes/AdminElectronicServiceRoutes');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
connectDB();

// Routes
app.use("/api", otpRoutes);
app.use("/api/user", UserRegisterRoutes);
app.use("/user", UserLogin);
app.use("/AdminAdd", AdminAddFuleDataRoutes);
app.use("/AdminElectronice", AdminElectronicServiceRoutes);

// Protected route
app.use("/profile", verifyToken, (req, res) => {
  res.json({ message: "Protected Profile Data", user: req.user });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
