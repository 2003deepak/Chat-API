const chatModel = require("../../models/chat");

const chatSave = async (req, res) => {
  const { userId, chatHistory } = req.body;

  try {
    
    if (!Array.isArray(chatHistory) || chatHistory.length === 0) {
      return res.status(400).json({ error: "Invalid or empty chat history" });
    }

   
    let chatDoc = await chatModel.findOne({ user: userId });

    if (chatDoc) {
     
      chatDoc.chats.push(...chatHistory);
      await chatDoc.save();
    } else {
      
      chatDoc = new chatModel({
        user: userId,
        chats: chatHistory,
      });
      await chatDoc.save();
    }

    res.status(200).json({ message: "Chat saved successfully" });
  } catch (err) {
    console.error("Error saving chat:", err);
    res.status(500).json({ error: "Server error: Unable to save chat." });
  }
};

module.exports = chatSave;
