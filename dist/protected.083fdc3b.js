// Definierar URL:s
const Url = "http://localhost:3000/api";
const url_Protected = `${Url}/Protected`;
const url_Menu = `${Url}/menu`;
const url_Delete = `${Url}/menu/`;
const url_createMenu = `${Url}/createMenu`;
const url_Update = `${Url}/menu/`;
// Hämtar element när dokumentet är laddat
document.addEventListener("DOMContentLoaded", ()=>{
    const createMenuForm = document.getElementById("createMenuForm");
    const updateMenuForm = document.getElementById("updateMenuForm");
    if (!createMenuForm) console.error("Kan inte hitta createMenuForm.");
    else console.log("Meny-formul\xe4r hittades.");
    if (!updateMenuForm) console.error("Kan inte hitta updateMenuForm.");
    else console.log("Update-formul\xe4r hittades.");
    // Händelselyssnare för skapa meny
    createMenuForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        // Hämta värden från formulär
        const foodName = document.getElementById("foodName").value;
        const foodDescription = document.getElementById("foodDescription").value;
        const foodPrice = document.getElementById("foodPrice").value;
        // Validera att alla fält är ifyllda
        if (!foodName || !foodDescription || !foodPrice) {
            console.error("Alla f\xe4lt m\xe5ste vara ifyllda");
            return;
        }
        // Skapa objekt
        const formData = {
            name: foodName,
            description: foodDescription,
            price: foodPrice
        };
        try {
            const response = await fetch(url_createMenu, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                console.log(data.error);
                fetchMenu();
            } else console.error("Error", response);
        } catch (error) {
            console.log("Error:", error);
        }
    });
    // Händelselyssnare för uppdatera meny
    updateMenuForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        console.log("Formul\xe4r skickat");
        // Hämta värden från formulär
        const foodName = document.getElementById("foodName").value;
        const foodDescription = document.getElementById("foodDescription").value;
        const foodPrice = document.getElementById("foodPrice").value;
        const menuId = updateMenuForm.getAttribute("data-menu-id");
        // Validera att alla fält är ifyllda
        if (!foodName || !foodDescription || !foodPrice) {
            console.error("Alla f\xe4lt m\xe5ste vara ifyllda");
            return;
        }
        // Skapa objekt
        const formData = {
            name: foodName,
            description: foodDescription,
            price: foodPrice
        };
        try {
            const response = await fetch(`${url_Update}${menuId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                console.log(data.error);
                fetchMenu();
            } else console.error("Error vid uppdatering av meny:", response);
        } catch (error) {
            console.log("Error", error);
        }
    });
    // Anropa fetchMenu för att hämta menydata vid sidladdning
    fetchMenu();
});
// Funktion för att hämta skyddad data
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
        protectedContent.innerHTML = `<p>V\xe4lkommen anst\xe4lld Id-nr 1</p>`;
        const protectedData = document.getElementById("protectedData");
        protectedData.classList.add("protectedData");
    } catch (error) {
        console.error("Error vid fetching av data:", error);
    }
}
// Funktion för hämtning av meny-data
async function fetchMenu() {
    try {
        const response = await fetch(url_Menu, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error(`Http error! Status: ${response.status}`);
        const menuData = await response.json();
        renderMenu(menuData);
    } catch (error) {
        console.error("Error fetching menu:", error);
    }
}
// Funktion för rendering av meny
function renderMenu(menuData) {
    const menuContainer = document.querySelector(".menu-categories");
    menuContainer.innerHTML = ""; // Rensar innehåll
    menuData.forEach((item)=>{
        if (!item.name || !item.description || !item.price || !item._id) {
            console.error("Invalid item format:", item);
            return;
        }
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Pris: ${item.price}</p>
            <button class="update-btn" data-menu-id="${item._id}">Uppdatera</button>
            <button class="deleteBtn" data-menu-id="${item._id}">Radera</button>
        `;
        menuContainer.appendChild(menuItem);
    });
    // Lägg till händelselyssnare för uppdateringsknapparna
    document.querySelectorAll(".update-btn").forEach((button)=>{
        button.addEventListener("click", function() {
            const menuId = this.getAttribute("data-menu-id");
            openUpdateForm(menuId);
        });
    });
    document.querySelectorAll(".deleteBtn").forEach((button)=>{
        button.addEventListener("click", function() {
            const menuId = this.getAttribute("data-menu-id");
            deleteMenu(menuId);
        });
    });
}
// Funktion för att öppna uppdateringsformuläret
function openUpdateForm(menuId) {
    const updateForm = document.getElementById("updateMenuForm");
    updateForm.setAttribute("data-menu-id", menuId);
    updateForm.style.display = "block"; // Visa formuläret
}
// Funktion för att radera meny
async function deleteMenu(_id) {
    try {
        const response = await fetch(`${url_Delete}${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error(`Http error! Status: ${response.status}`);
        const result = await response.json();
        console.log(result);
        fetchMenu();
        console.log("Meny raderad!");
    } catch (error) {
        console.error("Error vid radering av meny:", error);
    }
}
// Funktion för att logga ut
function logOut() {
    localStorage.removeItem("token");
    document.getElementById("protectedData").style.display = "none";
    window.location.href = "index.html";
}

//# sourceMappingURL=protected.083fdc3b.js.map
