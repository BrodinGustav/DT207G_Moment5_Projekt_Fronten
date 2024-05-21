//Definierar URL:s
const Url = "http://localhost:3000/api";
const url_Login = `${Url}/login`;
//**********Formulärhantering******
//Hämta ID för log-in formulär
const loginForm = document.getElementById("loginForm");
//Kontroll om formulär finns
if (!loginForm) console.error("Kan inte hitta formul\xe4r.");
else {
    console.log("Log-in formul\xe4r hittades.");
    //Händelselyssnar för login-formulär
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        console.log("Formul\xe4r skickades in.");
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        //Kontrollera inputfält
        if (!username || !password) {
            console.error("Anv\xe4ndarnamn och l\xf6senord kr\xe4vs.");
            return;
        }
        await logIn(username, password);
        //Återställer input-fält
        document.getElementById("loginUsername").value = "";
        document.getElementById("loginPassword").value = "";
    });
}
//******Funktion för logga in*************'
async function logIn(username, password) {
    try {
        const response = await fetch(url_Login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        console.log(data);
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "protected.html";
        } else {
            //Felaktig input
            const errorContainer = document.getElementById("error_container");
            const errorList = document.getElementById("error_list");
            errorList.innerHTML = "";
            const li = document.createElement("li");
            li.textContent = "Fel anv\xe4ndarnamn/l\xf6senord";
            li.style.color = "white";
            li.style.listStyle = "none";
            li.style.textAlign = "center";
            errorList.appendChild(li);
            errorContainer.style.display = "block";
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

//# sourceMappingURL=login.f37e18de.js.map
