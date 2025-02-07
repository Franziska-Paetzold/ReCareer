import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,  
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
}));


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Your OpenAI API Key "sk..."
    organization: process.env.OPENAI_ORG_ID,  // Your Organization ID "org-..."
    project: process.env.OPENAI_PROJECT_ID,  // Your Project ID "proj_..."
});

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
        console.error(error);
        res.status(500).json({ message: "Fehler bei der OpenAI-Anfrage" });
    }
});

app.listen(3001, () => console.log("Backend läuft auf Port 3001"));
