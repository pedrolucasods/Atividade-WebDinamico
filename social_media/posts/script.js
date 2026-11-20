import {Api} from '../api.js'
document.addEventListener("DOMContentLoaded",async ()=>{
    show_posts()
})



async function show_posts(){
    const api = new Api()
    const dataPosts = await api.getPosts()
    const postsArray = dataPosts.posts
    if(dataPosts.quantity > 0){
        const listPostsDiv = document.getElementsByClassName('list-posts')[0]
        console.log(listPostsDiv)
        postsArray.forEach(post => {
            const postDiv = document.createElement("div")
            postDiv.classList.add("post")

            // adiciona o nome dos usuários do post
            const divUserName = document.createElement("div")
            divUserName.classList.add("user-name")
            const iconUserName = document.createElement("span")
            iconUserName.classList.add("material-icons")
            iconUserName.textContent = "account_circle"
            const h4UserName = document.createElement("h4")
            h4UserName.textContent = post.userName
            divUserName.appendChild(iconUserName)
            divUserName.appendChild(h4UserName)

            // adiciona informacções do post
            const postInfoDiv = document.createElement("div")
            postInfoDiv.classList.add("post-info")
            const h3TitlePost = document.createElement("h3")
            h3TitlePost.textContent = post.title

            const bodyDivPost = document.createElement("div")
            bodyDivPost.classList.add("body-post")

            const pBodyPost = document.createElement("p")
            pBodyPost.textContent = post.body
            bodyDivPost.appendChild(pBodyPost)

            const commentDivPost = document.createElement("div")
            commentDivPost.classList.add("comments")

            const commentIcon = document.createElement("span")
            commentIcon.classList.add("material-symbols-outlined")
            commentIcon.textContent = "chat_bubble"
            const pQuantity = document.createElement("p")
            pQuantity.textContent= post.quantityComments
            commentDivPost.appendChild(commentIcon)
            commentDivPost.appendChild(pQuantity)

            // adiciona todo os elmentos a div info-post
            postInfoDiv.appendChild(h3TitlePost)
            postInfoDiv.appendChild(bodyDivPost)
            postInfoDiv.appendChild(commentDivPost)

            // adiciona o conteudo na div post principal
            postDiv.appendChild(divUserName)
            postDiv.appendChild(postInfoDiv)

            // adiciona o post na listagem
            listPostsDiv.appendChild(postDiv)
            
        })
    }else{
        const listEmptyMessage = document.getElementById("empty")
        listEmptyMessage.style.display = "Flex"
    }
}

