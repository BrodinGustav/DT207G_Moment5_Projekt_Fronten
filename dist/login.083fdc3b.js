//Definierar URL:s
const Url = "http://localhost:3000/api";
const url_Login = `${Url}/login`;
const url_Protected = `${Url}/Protected`;
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
//Funktion för logga in
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
//Funktion för att hämta skyddad data
async function getProtectedData() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(url_Protected, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        //Hämtar ID
        const protectedContent = document.getElementById("protectedContent");
        protectedContent.classList.add("protectedContent");
        protectedContent.innerHTML = `<p>V\xe4lkommen anst\xe4lld nr 666</p>`;
        const protectedData = document.getElementById("protectedData");
        protectedData.classList.add("protectedData");
    } catch (error) {
        console.error("Error vid fetching av data:", error);
    }
}
//Funktion för att logga ut
function logOut() {
    localStorage.removeItem("token"); //Tar bort token vid utlogg
    document.getElementById("protectedData").style.display = "none"; //Gömmer ID vid utlogg
    window.location.href = "index.html";
}

//# sourceMappingURL=login.083fdc3b.js.map
