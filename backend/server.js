import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS FIX: Allow requests from frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://recareer-frontend.vercel.app",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
}));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID,
    project: process.env.OPENAI_PROJECT_ID,
});

// ✅ Make sure this route exists
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

        console.log("✅ OpenAI-Antwort:", completion.choices[0].message.content);
        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error("❌ Fehler bei OpenAI-Anfrage:", error);
        res.status(500).json({ message: "Fehler bei der OpenAI-Anfrage" });
    }
});

// ✅
