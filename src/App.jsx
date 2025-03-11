import React, { useState } from "react";

export default function JobPreferencesForm() {
    const [preferences, setPreferences] = useState({
        IT: false,
        kreativitaet: false,
        mit_menschen_arbeiten: false,
    });

    const [responseMessage, setResponseMessage] = useState("");

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setPreferences((prev) => ({ ...prev, [name]: checked }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const selectedPreferences = Object.keys(preferences).filter(key => preferences[key]);

        try {
            console.log("🟡 VITE_API_URL:", import.meta.env.VITE_API_URL);
            console.log("🟡 Sending request to API:", `${import.meta.env.VITE_API_URL}/api/openai`);
            console.log("🟡 Payload:", JSON.stringify({ preferences: selectedPreferences }));

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/openai`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ preferences: selectedPreferences }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log("✅ API Response:", data);

            setResponseMessage(data.message);
        } catch (error) {
            console.error("❌ Error during form submission: ", error);
            setResponseMessage("Fehler beim Abrufen der Daten. Bitte versuchen Sie es erneut.");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Was soll dein neuer Job beinhalten?</h2>
            <form onSubmit={onSubmit}>
                {["IT", "kreativitaet", "mit_menschen_arbeiten"].map((key) => (
                    <label key={key}>
                        <input 
                            type="checkbox" 
                            name={key} 
                            checked={preferences[key]} 
                            onChange={handleCheckboxChange} 
                        />
                        {key === "kreativitaet" ? "Kreativität" : key.replace("_", " ")}
                    </label>
                ))}
                <button type="submit">Senden</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}

const styles = {
    container: { 
        maxWidth: "400px", 
        margin: "auto", 
        padding: "20px", 
        textAlign: "center" 
    }
};

