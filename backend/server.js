import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Fix: Ensure CORS allows frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://recareer-frontend.vercel.app",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID,
    project: process.env.OPENAI_PROJECT_ID,
});

// ✅ Ensure `/api/openai` is defined
app.post("/api/openai", async (req, res) => {
    console.log("🔹 Request received at /api/openai");

    const { preferences } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Du bist ein Jobberater." },
                { role: "user", content: `Ich suche einen Job mit folgenden Eigenschaften: ${preferences.join(", ")}. Welche Möglichkeiten gibt es?` },
            ],
        });

        console.log("✅ OpenAI Response:", completion.choices[0].message.content);
        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error("❌ OpenAI API Error:", error);
        res.status(500).json({ message: "Error contacting OpenAI API" });
    }
});

// ✅ Important: Properly start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Critical: Export the app for Vercel
export default app;
