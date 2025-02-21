import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();  // ✅ Hier wird app initialisiert!

app.use(express.json());
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

// ✅ Debugging-Route für Health-Check
app.get("/api/health", (req, res) => {
    res.json({ status: "Backend is running 🚀" });
});

// ✅ OpenAI API-Route
app.post("/api/openai", async (req, res) => {
    console.log("🔹 Request received at /api/openai");
    console.log("🔹 Request Body:", req.body);

    if (!req.body || !req.body.preferences || !Array.isArray(req.body.preferences)) {
        console.error("❌ Invalid Request: Missing or incorrect 'preferences'");
        return res.status(400).json({ message: "Bad Request: 'preferences' must be an array" });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Du bist ein Jobberater." },
                { role: "user", content: `Ich suche einen Job mit folgenden Eigenschaften: ${req.body.preferences.join(", ")}. Welche Möglichkeiten gibt es?` },
            ],
        });

        console.log("✅ OpenAI Response:", completion);
        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error("❌ OpenAI API Error:", error);
        res.status(500).json({ 
            message: "Error contacting OpenAI API",
            error: error.message,
            details: error.response ? error.response.data : "No response data"
        });
    }
});


// ✅ Server starten
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Wichtig: `app` muss exportiert werden!
export default app;
