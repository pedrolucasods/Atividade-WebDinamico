import {Api} from '../api.js'
document.addEventListener("DOMContentLoaded",async()=>{
    console.log("whta sup")
    show_users()
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
            userEmailSpan.textContent = `Email: ${user.email}`
            userEmailP.appendChild(userEmailSpan)
            userInfoDiv.appendChild(userEmailP)

            const buttonDetailsUser = document.createElement("button")
            buttonDetailsUser.classList.add("details-button")
            buttonDetailsUser.textContent = "Detalhes"
            userInfoDiv.appendChild(buttonDetailsUser)
            userArticle.appendChild(userInfoDiv)

            listUsersMain.appendChild(userArticle)
        });
    }
}
