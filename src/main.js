//Definierar URL:s
const Url = "http://localhost:3000/api";
const url_Login = `${Url}/login`;
const url_Protected = `${Url}/Protected`;
const url_Menu = `${Url}/menu`;

document.addEventListener("DOMContentLoaded", function() {

    
//Funktion för hamburgarmeny
// Hämta in meny-knapparna
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

 // Kontroll om knapparna finns
 if (openBtn && closeBtn) {
    console.log("Knappar för att öppna och stänga menyn hittades"); //Kontrolllogg
    // Eventlyssnare
    openBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
} else {
    console.error("Knappar för att öppna och/eller stänga menyn hittades inte");    //Kontrolllogg
}
// Toggla fram navigeringsmenyn
function toggleMenu() {
    let navBarEl = document.getElementById("navbar");
    if (navBarEl) {
        console.log("toggleMenu anropades");            //Kontrolllogg
        navBarEl.classList.toggle("open");
        console.log("Klassen 'open' togglades på navbar. Aktuella klasser:", navBarEl.className); //Kontrollogg
    } else {
        console.error("Elementet med ID 'navbar' hittades inte");
    }

}
});



    //*****FUNKTIONER******//

//Hämta in meny
async function fetchMenu() {
    try{
        const response = await fetch(url_Menu, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        //Kontroll kring fetch
        if(!response.ok){
            throw new Error(`Http error! Statis: ${response.status}`);
        }

        const menuData = await response.json();
        renderMenu(menuData);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }

}

//Funktion för rendering av meny
function renderMenu(menuData) {
    const menuContainer = document.querySelector(".menu-categories");
    menuContainer.innerHTML = "";                                      //Rensar innehåll

    menuData.forEach(item => {
        //Kontroll över format från fetch
        if (!item.name || !item.description || !item.price || !item._id) {
            console.error('Invalid item format:', item);
            return;
        }

        //Skapat element för utskrift 
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

        menuItemDiv.appendChild(itemInfoDiv);
        menuContainer.appendChild(menuItemDiv);
    });
}
        
//Anropar fetch 
document.addEventListener("DOMContentLoaded", fetchMenu);

