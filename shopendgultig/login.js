const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");

if (loginForm) {
    // Passwort anzeigen/verstecken
    togglePassword.addEventListener("click", () => {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        togglePassword.textContent = type === "password" ? "👁️" : "🙈";
    });

    // Live-Validierung
    usernameInput.addEventListener("input", () => {
        usernameError.textContent = usernameInput.value.trim() === "" ? "Bitte Benutzername eingeben." : "";
    });
    passwordInput.addEventListener("input", () => {
        passwordError.textContent = passwordInput.value.trim().length < 6 ? "Passwort muss mindestens 6 Zeichen haben." : "";
    });

    // Formular absenden
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let valid = true;

        if (usernameInput.value.trim() === "") {
            usernameError.textContent = "Bitte Benutzername eingeben.";
            valid = false;
        }
        if (passwordInput.value.trim().length < 6) {
            passwordError.textContent = "Passwort muss mindestens 6 Zeichen haben.";
            valid = false;
        }
        if (!valid) return;

        loginBtn.textContent = "Wird überprüft...";
        loginBtn.disabled = true;

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: usernameInput.value.trim(),
                    password: passwordInput.value.trim()
                })
            });

            const data = await response.json();

            if (data.status) {
                alert("Login erfolgreich!");
                window.location.href = "/5_projekt/5.html"; // Weiterleitung
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Serverfehler. Bitte später versuchen.");
            console.error(err);
        } finally {
            loginBtn.textContent = "Anmelden";
            loginBtn.disabled = false;
        }
    });
}

