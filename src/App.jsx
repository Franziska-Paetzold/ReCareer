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
        const selectedPreferences = Object.keys(preferences).filter((key) => preferences[key]);

        try {
            const response = await fetch("https://recareer-backend.vercel.app/api/openai", {  // Vercel Backend URL
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ preferences: selectedPreferences }),
            });

            if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

            const data = await response.json();
            setResponseMessage(data.message);
        } catch (error) {
            console.error("Fehler bei der Anfrage:", error);
            setResponseMessage("Es gab ein Problem mit der Anfrage. Bitte versuche es später erneut.");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Was soll dein neuer Job beinhalten?</h2>
            <form onSubmit={onSubmit}>
                {["IT", "kreativitaet", "mit_menschen_arbeiten"].map((key) => (
                    <label key={key}>
                        <input type="checkbox" name={key} checked={preferences[key]} onChange={handleCheckboxChange} />
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
    container: { maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }
};
