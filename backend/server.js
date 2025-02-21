import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Allow CORS for frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://recareer-frontend.vercel.app",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));

// ✅ Define a GET route to verify deployment works
app.get("/api/health", (req, res) => {
    res.json({ status: "Backend is running 🚀" });
});

// ✅ Ensure `/api/openai` route is reachable
app.post("/api/openai", async (req, res) => {
    console.log("🔹 Received request at /api/openai");

    const { preferences } = req.body;
    if (!preferences || !Array.isArray(preferences)) {
        return res.status(400).json({ message: "Invalid request data" });
    }

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

// ✅ Start the server correctly
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Ensure export for Vercel
export default app;
