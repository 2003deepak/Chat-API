const userModel = require("../../models/user")
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);


const generateResponse = async (req, res) => {
    try {
        const prompt = String(req.params.question); 

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent([prompt]); 
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ message: text });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to generate response" });
    }
};


module.exports = generateResponse ; 