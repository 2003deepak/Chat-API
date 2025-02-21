const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");

const jwtSecret = process.env.JWT_SECRET ;
const googleClientId = process.env.GOOGLE_CLIENT_ID ;
const googleClient = new OAuth2Client(googleClientId);

const googleLogin = async (req, res) => {
  const { googleToken } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: googleToken,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();
    const { email, sub, name } = payload;

    let user = await userModel.findOne({ googleId: sub });

    if (!user) {
      user = await userModel.create({
        username: name,
        email,
        googleId: sub,
        password: 'test@123',
      });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({
      status: "success",
      message: "Google login successful.",
      userId: user._id,
      token,
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(500).json({
      status: "fail",
      message: "Failed to login with Google. Please try again.",
      error: err.message,
    });
  }
};

module.exports = googleLogin;
