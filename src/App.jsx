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
            const response = await fetch("http://localhost:3001/api/openai", {
                method: "POST",
                body: JSON.stringify({ preferences: selectedPreferences }),
                headers: { "Content-type": "application/json" },
            });

            const data = await response.json();
            setResponseMessage(data.message);
        } catch (error) {
            console.error("Error during form submission: ", error);
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
