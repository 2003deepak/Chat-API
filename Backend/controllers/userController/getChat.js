const chatModel = require("../../models/chat");

const getChat = async (req, res) => {

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const chat = await chatModel.findOne({ user: userId });

    if (chat) {
      return res.status(200).json(chat.chats); 
    } else {
      return res.status(404).json({ message: "No chat history found" });
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({ message: "Error fetching chat history" });
  }
};

module.exports = getChat;
