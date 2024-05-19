//Definierar URL:s
const Url = "http://localhost:3000/api";
const url_Login = `${Url}/login`;
const url_Protected = `${Url}/Protected`;
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

//# sourceMappingURL=protected.083fdc3b.js.map
