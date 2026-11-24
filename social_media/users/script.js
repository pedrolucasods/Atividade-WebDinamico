import {Api} from '../api.js'
document.addEventListener("DOMContentLoaded",async()=>{
    if(navigator.onLine){
        const inputSearch = document.getElementById("search-user")
        inputSearch.addEventListener("input",()=>{
            const fieldSearch = document.getElementById("field_search")
            const valueInput = inputSearch.value
            const valueField = fieldSearch.value
            filter_users(valueField,valueInput.toLowerCase())

        })
        console.log("whta sup")
        show_users()
    }else{
        const emptyDiv = document.getElementById("empty")
        const messageH2 = emptyDiv.querySelector("h2")
        messageH2.textContent = "Você está offline ://"
        emptyDiv.style.display = "flex"
    }
})

async function show_users(){
    const api = new Api()
    const dataUsers = await api.getUsers()
    console.log(dataUsers.length)
    if(dataUsers.length > 0){
        const listUsersMain = document.getElementsByClassName("list-users")[0]
        dataUsers.forEach(user => {
            // elemento pai do usuário
            const userArticle = document.createElement("article")
            userArticle.classList.add("user")
        
            // header do usuário
            const headerUserDiv = document.createElement("div")
            headerUserDiv.classList.add("header-user")

            const userNameDiv = document.createElement("div")
            userNameDiv.classList.add("user-name")

            const iconUserSpan = document.createElement("span")
            iconUserSpan.classList.add("material-icons")
            iconUserSpan.textContent = "account_circle"
            userNameDiv.appendChild(iconUserSpan)

            const userNameH4 = document.createElement("h4")
            userNameH4.textContent = user.name
            userNameDiv.appendChild(userNameH4)
            headerUserDiv.appendChild(userNameDiv)

            const userIdP = document.createElement("p")
            userIdP.id = "user-id"
            userIdP.textContent = "#"+user.id
            headerUserDiv.appendChild(userIdP)
            userArticle.appendChild(headerUserDiv)

            // info dos usuários
            const userInfoDiv = document.createElement("div")
            userInfoDiv.classList.add("user-info")

            const userEmailP = document.createElement("p")
            userEmailP.classList.add("user-email")

            const iconEmailSpan = document.createElement("span")
            iconEmailSpan.classList.add("material-icons")
            iconEmailSpan.textContent = "email"
            userEmailP.append(iconEmailSpan)

            const userEmailSpan = document.createElement("span")
            userEmailSpan.textContent = user.email
            userEmailP.appendChild(userEmailSpan)
            userInfoDiv.appendChild(userEmailP)

            const buttonDetailsUser = document.createElement("button")
            buttonDetailsUser.classList.add("details-button")
            buttonDetailsUser.textContent = "Detalhes"
            userInfoDiv.appendChild(buttonDetailsUser)
            userArticle.appendChild(userInfoDiv)

            listUsersMain.appendChild(userArticle)
        });
    }else{
        const emptyDiv = document.getElementById("empty")
        emptyDiv.style.display = "flex"
    }
}

function filter_users(field,text){
    const listUsersMain = document.getElementsByClassName("list-users")[0]
    const usersChildrens = listUsersMain.children
    for(const userArticle of usersChildrens){
        if(field == "name"){
            const headerUserDiv = userArticle.querySelector(".header-user")
            const userNameDiv = headerUserDiv.querySelector(".user-name")
            const userNameH4 = userNameDiv.querySelector("h4")
            const userName = userNameH4.textContent.toLowerCase()
            if(!userName.includes(text)){
                userArticle.style.display = "none"
            }else{
                userArticle.style.display = "flex"
            }
        }else if(field == "email"){
            const infoUserDiv = userArticle.querySelector(".user-info")
            const userEmailP = infoUserDiv.querySelector(".user-email")
            const userEmailSpan = userEmailP.querySelectorAll("span")[1]
            const emailUser = userEmailSpan.textContent.toLowerCase()
            if(!emailUser.includes(text)){
                userArticle.style.display = "none"
            }else{
                userArticle.style.display = "flex"
            }
        }else if(field == "id"){
            const headerUserDiv = userArticle.querySelector(".header-user")
            const userIdP = headerUserDiv.querySelector("p")
            const userId = userIdP.textContent.toLowerCase()
            if(!userId.includes(text)){
                userArticle.style.display = "none"
            }else{
                userArticle.style.display = "flex"
            }
        }
    }

    const everyDisplayNone = [...usersChildrens].every(div_user=>getComputedStyle(div_user).display === "none")
    if(everyDisplayNone){
        const emptyDiv = document.getElementById("empty")
        emptyDiv.style.display = "flex"
    }else{
        const emptyDiv = document.getElementById("empty")
        emptyDiv.style.display = "none"
    }
}