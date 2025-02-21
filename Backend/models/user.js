const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: { 
      type: String, 
      required: [true, 'Username is required'], 
      unique: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: [true, 'Password is required'], 
      minlength: [6, 'Password must be at least 6 characters long']
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true, 
      lowercase: true, 
      trim: true, 
      match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please enter a valid email address']
    },
    googleId: {
      type: String, 
      sparse: true,  
      default: null
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
