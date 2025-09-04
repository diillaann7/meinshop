const express = require("express");
const { Sequelize, DataTypes, Model } = require("sequelize");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS erlauben (Live Server läuft auf 127.0.0.1:5500)
app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));


const sequelize = new Sequelize("mydb", "root", "dilan2005", {
    host: "localhost",
    dialect: "mysql",
});

class Benutzer extends Model {}
Benutzer.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: "benutzer" });

sequelize.sync().then(async () => {
    console.log("DB ready");

    // Standardbenutzer nur einmal erstellen
    const userExists = await Benutzer.findOne({ where: { name: "dilan" } });
    if (!userExists) {
        await Benutzer.create({ name: "dilan", password: "dilan2005" });
        console.log("Standardbenutzer erstellt");
    }
});

// Login (einfacher Datenbank-Abgleich)
app.post("/login", async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await Benutzer.findOne({ where: { name, password } });

        if (!user) {
            return res.status(401).json({ status: false, message: "Benutzername oder Passwort falsch" });
        }

        return res.json({ status: true, message: "Login erfolgreich" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Serverfehler" });
    }
});

// Beispiel geschützte Route (ohne Auth)
app.get("/dashboard", (req, res) => {
    res.json({ message: "Willkommen im Dashboard!" });
});

app.listen(8080, () => console.log("Server läuft auf Port 8080"));
