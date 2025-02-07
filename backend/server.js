import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Debugging: Logge, wenn das Backend gestartet wird
console.log("✅ Backend wurde gestartet!");

app.get("/debug", (req, res) => {
    res.json({ message: "Server läuft!", routes: app._router.stack.map(r => r.route?.path).filter(Boolean) });
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/openai", async (req, res) => {
    const { preferences } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Du bist ein Jobberater." },
                { role: "user", content: `Ich suche einen Job mit folgenden Eigenschaften: ${preferences.join(", ")}. Welche Möglichkeiten gibt es?` },
            ],
        });

        res.json({ message: completion.choices[0].message.content });
    } catch (error) {
        console.error("❌ OpenAI API Fehler:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Fehler bei der OpenAI-Anfrage" });
    }
});

// ✅ WICHTIG für Vercel: Kein `app.listen()`, sondern `export default app`
export default app;
