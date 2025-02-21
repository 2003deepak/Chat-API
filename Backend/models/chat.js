const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user", 
      required: true 
    },
    chats: [
      {
        question: {
          type: String,
          required: true,
          trim: true,
        },
        answer: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: { 
          type: Date, 
          default: Date.now 
        }
      }
    ]
  },
  { timestamps: true }
);


chatSchema.index({ user: 1 });

module.exports = mongoose.model("chat", chatSchema);
