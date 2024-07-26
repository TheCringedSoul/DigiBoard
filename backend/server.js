// server.js
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY not found. Make sure it is set in the .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);

app.post('/ask', async (req, res) => {
    try {
        const { prompt } = req.body;
        console.log('Received prompt:', prompt);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();

        console.log('Gemini API response:', responseText);

        res.json({ response: responseText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});