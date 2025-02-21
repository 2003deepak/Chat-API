const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../../models/user");


const jwtSecret = process.env.JWT_SECRET ;  

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid username or password.",
      });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid username or password.",
      });
    }

    
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({
      status: "success",
      message: "Login successful.",
      userId: user._id,
      token,  // Include token in response
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error. Please try again.",
      error: err.message,
    });
  }
};

module.exports = login; 
