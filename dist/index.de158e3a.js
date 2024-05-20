//Definierar URL:s
const Url = "http://localhost:3000/api";
const url_Login = `${Url}/login`;
const url_Protected = `${Url}/Protected`;
const url_Menu = `${Url}/menu`;
document.addEventListener("DOMContentLoaded", function() {
    //Hämta ID för log-in formulär
    const loginForm = document.getElementById("loginForm");
    //Kontroll om formulär finns
    if (!loginForm) {
        console.error("Kan inte hitta formul\xe4r.");
        return;
    }
    //Händelselyssnar för login-formulär
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();
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
});
//*****FUNKTIONER******//
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
//Hämta in meny
async function fetchMenu() {
    try {
        const response = await fetch(url_Menu, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) throw new Error(`Http error! Statis: ${response.status}`);
        //Anropar funktion för rendering av meny om fetch ok
        const menuData = await response.json();
        renderMenu(menuData);
    } catch (error) {
        console.error("Error vid fetch av meny:", error);
    }
}
//Funktion för rendering av meny
function renderMenu(menuData) {
    const menuCategoriesContainer = document.querySelector(".menu-categories");
    menuCategoriesContainer.innerHTML = ""; //Rensar innehåll
    menuData.forEach((category)=>{
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("menu-category");
        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category.name;
        categoryDiv.appendChild(categoryTitle);
        category.item.forEach((item)=>{
            const menuItemDiv = document.createElement("div");
            menuItemDiv.classList.add("menu-item");
            const itemImg = document.createElement("img");
            itemImg.src = item.image;
            itemImg.alt = item.name;
            menuItemDiv.appendChild(itemImg);
            const itemInfoDiv = document.createElement("div");
            itemInfoDiv.classList.add("menu-item-info");
            const itemName = document.createElement("h4");
            itemName.textContent = item.name;
            itemInfoDiv.appendChild(itemName);
            const itemDescription = document.createElement("p");
            itemDescription.textContent = item.description;
            itemInfoDiv.appendChild(itemDescription);
            const itemPrice = document.createElement("span");
            itemPrice.classList.add("price");
            itemPrice.textContent = `${item.price} SEK`;
            itemInfoDiv.appendChild(itemPrice);
            menuItemDiv.appendChild(itemInfoDiv);
            categoryDiv.appendChild(menuItemDiv);
        });
        menuCategoriesContainer.appendChild(categoryDiv);
    });
}
//Anropar fetch 
document.addEventListener("DOMContentLoaded", fetchMenu);

//# sourceMappingURL=index.de158e3a.js.map
