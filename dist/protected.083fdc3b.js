//Definierar URL:s
const Url = "http://localhost:3000/api";
const url_Protected = `${Url}/Protected`;
const url_Menu = `${Url}/menu`;
const url_Delete = `${Url}/menu/`;
const url_createMenu = `${Url}/createMenu`;
const url_Update = `${Url}/menu/`;
//***********Funktion för att hämta skyddad data*********'
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
//********** Funktion för hämtning av meny-data ***********
//Hämta in meny
async function fetchMenu() {
    try {
        const response = await fetch(url_Menu, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        //Kontroll kring fetch
        if (!response.ok) throw new Error(`Http error! Statis: ${response.status}`);
        const menuData = await response.json();
        renderMenu(menuData);
    } catch (error) {
        console.error("Error fetching menu:", error);
    }
}
//****Funktion för rendering av meny************
function renderMenu(menuData) {
    const menuContainer = document.querySelector(".menu-categories");
    menuContainer.innerHTML = ""; //Rensar innehåll
    menuData.forEach((item1)=>{
        //Kontroll över format från fetch
        if (!item1.name || !item1.description || !item1.price || !item1._id) {
            console.error("Invalid item format:", item1);
            return;
        }
        menuData.forEach((menu)=>{
            const menuItem = document.createElement("div");
            menuItem.className = "menu-item";
            menuItem.innerHTML = `
                <h3>${menu.name}</h3>
                <p>${menu.description}</p>
                <p>Pris: ${menu.price}</p>
                <button class="update-btn" data-menu-id="${menu._id}">Uppdatera</button>
                <button class="deleteBtn">Radera</button>
                
            `;
            menuContainer.appendChild(menuItem);
        });
    //Skapat element för utskrift 
    /*
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');

        const itemInfoDiv = document.createElement('div');
        itemInfoDiv.classList.add('menu-item-info');

        const itemName = document.createElement('h4');
        itemName.textContent = item.name;
        itemInfoDiv.appendChild(itemName);

        const itemDescription = document.createElement('p');
        itemDescription.textContent = item.description;
        itemInfoDiv.appendChild(itemDescription);

        const itemPrice = document.createElement('span');
        itemPrice.classList.add('price');
        itemPrice.textContent = `${item.price} SEK`;
        itemInfoDiv.appendChild(itemPrice);

        menuItemDiv.appendChild(itemInfoDiv);                   //Lägger appendChild innan button-element för rätt struktur

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'Radera';
        deleteBtn.addEventListener('click', () => deleteMenu(item._id));

        menuItemDiv.appendChild(deleteBtn);                     //Lägger till knapp till menuItemDiv
        menuContainer.appendChild(menuItemDiv);                 //Lägger till menuItemDiv till menycontainern
   */ });
    // Lägg till händelselyssnare för uppdateringsknapparna
    document.querySelectorAll(".update-btn").forEach((button)=>{
        button.addEventListener("click", function() {
            const menuId = this.getAttribute("data-menu-id");
            openUpdateForm(menuId);
        });
    });
    document.querySelectorAll(".deleteBtn").forEach((button)=>{
        button.addEventListener("click", function() {
            deleteMenu(item._id);
        });
    });
}
//*******Funktion för att lägga till meny*******/
// Hämta ID för formulär för att skapa meny
const createMenuForm = document.getElementById("createMenuForm");
// Kontroll om formulär finns
if (!createMenuForm) console.error("Kan inte hitta formul\xe4r.");
else console.log("Meny-formul\xe4r hittades.");
//Händelselyssnare
createMenuForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    //Hämta värden från formulär
    const foodName = document.getElementById("foodName").value;
    const foodDescription = document.getElementById("foodDescription").value;
    const foodPrice = document.getElementById("foodPrice").value;
    //skapa objekt
    const formData = {
        name: foodName,
        description: foodDescription,
        price: foodPrice
    };
    //Postanrop
    try {
        const response = await fetch(url_createMenu, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData) //Konverterar formulärvärden till JSON och skickar med POST-anrop
        });
        //Kontroll om lyckat anrop
        if (response.ok) {
            const data = await response.json();
            console.log(data.message); //Kontroll-logg
            console.log(data.error);
            // Hämtar menydata på nytt för att uppdatera visningen
            fetchMenu();
        } else console.error("Error", response); //Kontroll-logg
    } catch (error) {
        console.log("Error:", error);
    }
});
//*********Funktion för uppdatering av maträtt*******/
// Hämta ID för formulär för att skapa meny
function openUpdateForm(menuId) {
    const updateForm = document.getElementById("updateMenuForm");
    updateForm.setAttribue("data-menu-id", menuId);
    updateForm.style.display = "block"; // Visa formuläret
}
const updateMenuForm = document.getElementById("updateMenuForm");
// Kontroll om formulär finns
if (!updateMenuForm) console.error("Kan inte hitta formul\xe4r.");
else console.log("Update-formul\xe4r hittades.");
//Händelselyssnare
updateMenuForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    //Hämta värden från formulär
    const foodName = document.getElementById("foodName").value;
    const foodDescription = document.getElementById("foodDescription").value;
    const foodPrice = document.getElementById("foodPrice").value;
    const menuId = updateMenuForm.getAttribute("data-menu-id"); // Hämtar menuID från data-attributet
    //skapa objekt
    const formData = {
        name: foodName,
        description: foodDescription,
        price: foodPrice
    };
    //Kontroll log
    console.log("Form data som skickas:", formData);
    console.log("Menu ID:", menuId);
    try {
        const response = await fetch(`${url_Update}${menuId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        // Kontroll om lyckat anrop
        if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Kontroll-logg
            console.log(data.error);
            // Hämtar menydata på nytt för att uppdatera visningen
            fetchMenu();
        } else console.error("Error vid uppdatering av meny:", response);
    } catch (error) {
        console.log("Error", error);
    }
});
//*********Funktion för att radera av meny********/
async function deleteMenu(_id) {
    try {
        const response = await fetch(`${url_Delete}${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        //Kontroll response
        if (!response.ok) throw new Error(`Http error! Status: ${response.status}`);
        //Konvertera svar till JSON
        const result = await response.json();
        console.log(result); //Kontroll-logg
        //Hämta meny efter radering
        fetchMenu();
        console.log("Meny raderad!");
    } catch (error) {
        console.error("Error vid radering av meny:", error);
    }
}
//******Funktion för att logga ut********
function logOut() {
    localStorage.removeItem("token"); //Tar bort token vid utlogg
    document.getElementById("protectedData").style.display = "none"; //Gömmer ID vid utlogg
    window.location.href = "index.html";
}
//Anropar fetch 
document.addEventListener("DOMContentLoaded", fetchMenu);

//# sourceMappingURL=protected.083fdc3b.js.map
