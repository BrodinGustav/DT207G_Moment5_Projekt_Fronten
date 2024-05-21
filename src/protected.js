//Definierar URL:s
const Url = "http://localhost:3000/api";
const url_Login = `${Url}/login`;
const url_Protected = `${Url}/Protected`;
const url_Menu = `${Url}/menu`;



//**********Formulärhantering******

    //Hämta ID för log-in formulär
    const loginForm = document.getElementById("loginForm");

    //Kontroll om formulär finns
    if(!loginForm) {
        console.error("Kan inte hitta formulär.");
     
    } else {
        console.log("Log-in formulär hittades.");
    
    //Händelselyssnar för login-formulär
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        console.log("Formulär skickades in.");

    
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
}

//******Funktion för logga in*************'

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


//***********Funktion för att hämta skyddad data*********'

async function getProtectedData() {
    try{
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
        protectedContent.classList.add("protectedContent")
        protectedContent.innerHTML = `<p>Välkommen anställd Id-nr 1</p>`
        const protectedData = document.getElementById("protectedData")
        protectedData.classList.add("protectedData")
    
    } catch (error) {
        console.error("Error vid fetching av data:", error);
    }
}

//********** Funktion för hämtning av data ***********

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

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'Radera';

        menuItemDiv.appendChild(deleteBtn);
        menuContainer.appendChild(menuItemDiv);
    });
}
        
//******Funktion för att logga ut********
function logOut() {
    localStorage.removeItem("token");                                           //Tar bort token vid utlogg
    document.getElementById("protectedData").style.display = "none";            //Gömmer ID vid utlogg
    window.location.href = 'index.html';
}

//Anropar fetch 
document.addEventListener("DOMContentLoaded", fetchMenu);

