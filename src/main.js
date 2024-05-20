//Definierar URL:s
const Url = "http://localhost:3000/api";
const url_Login = `${Url}/login`;
const url_Protected = `${Url}/Protected`;
const url_Menu = `${Url}/menu`;

document.addEventListener("DOMContentLoaded", function() {

    //Hämta ID för log-in formulär
    const loginForm = document.getElementById("loginForm");

    //Kontroll om formulär finns
    if(!loginForm) {
        console.error("Kan inte hitta formulär.");
        return;
    }

    //Händelselyssnar för login-formulär
    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
    
        //Kontrollera inputfält
        if(!username || !password) {
            console.error("Användarnamn och lösenord krävs.");
            return;
        }
            await logIn(username, password);
    
        //Återställer input-fält
        document.getElementById("loginUsername").value = "";
        document.getElementById("loginPassword").value = "";
   
    });
    
//Funktion för hamburgarmeny
// Hämta in meny-knapparna
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

// Eventlyssnare
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

// Toggla fram navigeringsmenyn
function toggleMenu() {
    let navBarEl = document.getElementById("navbar");

    // Toggle classen 'open'
    navBarEl.classList.toggle("open");
}
})



    //*****FUNKTIONER******//

    //Funktion för logga in
    async function logIn(username, password) {

        try{
            const response = await fetch(url_Login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log(data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "protected.html";
            
            }else{
                //Felaktig input
                const errorContainer = document.getElementById("error_container");
                const errorList = document.getElementById("error_list");

                errorList.innerHTML = "";
                const li = document.createElement("li");

                li.textContent ="Fel användarnamn/lösenord";
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

