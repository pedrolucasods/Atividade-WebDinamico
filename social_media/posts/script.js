import {Api} from '../api.js'
document.addEventListener("DOMContentLoaded",async ()=>{
    const inputSearch = document.getElementById("search-post")
    const sampleCommentsToggle = document.querySelector(".post .comments")
    const sampleCommentsList = document.getElementById("comments-list")
    if(sampleCommentsToggle && sampleCommentsList){
        sampleCommentsToggle.addEventListener("click", ()=>{
            sampleCommentsList.classList.toggle("escondido")
        })
    }

    inputSearch.addEventListener("input",()=>{
        const fieldSearch = document.getElementById("field_search")
        const valueField = fieldSearch.value
        const textInput = inputSearch.value
        filter_post(valueField,textInput)
    })
    show_posts()
})



async function show_posts(){
    const api = new Api()
    const dataPosts = await api.getPosts()
    const postsArray = dataPosts.posts
    if(dataPosts.quantity > 0){
        const listPostsDiv = document.getElementsByClassName('list-posts')[0]
        console.log(listPostsDiv)
        postsArray.forEach(async (post) => {
            const postDiv = document.createElement("div")
            postDiv.classList.add("post")

            // adiciona o nome dos usuários do post
            const headerPostDiv = document.createElement("div")
            headerPostDiv.classList.add("header-post")

            const divUserName = document.createElement("div")
            divUserName.classList.add("user-name")
            const iconUserName = document.createElement("span")
            iconUserName.classList.add("material-icons")
            iconUserName.textContent = "account_circle"
            const h4UserName = document.createElement("h4")
            h4UserName.textContent = post.userName
            divUserName.appendChild(iconUserName)
            divUserName.appendChild(h4UserName)
            headerPostDiv.appendChild(divUserName)

            const pPostId = document.createElement("p")
            pPostId.textContent = "#"+post.id
            pPostId.id = "post-id"
            headerPostDiv.appendChild(pPostId)

            // adiciona informacções do post
            const postInfoDiv = document.createElement("div")
            postInfoDiv.classList.add("post-info")
            const h3TitlePost = document.createElement("h3")
            h3TitlePost.textContent = post.title
            h3TitlePost.id = "title-post"

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

            const commentListDiv = document.createElement("div")
            commentListDiv.classList.add("comments-list")
            commentListDiv.classList.add("escondido")
            
            // adiciona todo os elmentos a div info-post
            postInfoDiv.appendChild(h3TitlePost)
            postInfoDiv.appendChild(bodyDivPost)
            postInfoDiv.appendChild(commentDivPost)
            postInfoDiv.appendChild(commentListDiv)

            // adiciona o conteudo na div post principal
            postDiv.appendChild(headerPostDiv)
            postDiv.appendChild(postInfoDiv)

            // adiciona o post na listagem
            listPostsDiv.appendChild(postDiv)

            commentDivPost.addEventListener("click",async () => {
                if(!commentListDiv.classList.contains("escondido")){
                    commentListDiv.classList.add("escondido")
                    return
                }

                commentListDiv.classList.remove("escondido")
                if(commentListDiv.dataset.loaded === "true"){
                    return
                }

                const dataComments = await api.getComments(post.id)
                if(dataComments.length > 0){
                    dataComments.forEach(comment =>{
                        const commentInfoDiv = document.createElement("div")
                        commentInfoDiv.classList.add("comment-info")

                        const commentUserEmail = document.createElement("div")
                        commentUserEmail.classList.add("user-comment-email")

                        const iconUserComment = document.createElement("span")
                        iconUserComment.classList.add("material-icons")
                        iconUserComment.textContent = "account_circle"

                        const pUserEmail = document.createElement("p")
                        pUserEmail.textContent = comment.email

                        commentUserEmail.appendChild(iconUserComment)
                        commentUserEmail.appendChild(pUserEmail)
                        commentInfoDiv.appendChild(commentUserEmail)
                        

                        const titleCommentDiv = document.createElement("div")
                        titleCommentDiv.classList.add("title-comment")
                        const pTitleComment = document.createElement("p")
                        pTitleComment.textContent = comment.name
                        titleCommentDiv.appendChild(pTitleComment)
                        commentInfoDiv.appendChild(titleCommentDiv)

                        const bodyCommentDiv = document.createElement("div")
                        bodyCommentDiv.classList.add("body-comment")
                        const pBodyComment = document.createElement("p")
                        pBodyComment.textContent = comment.body
                        bodyCommentDiv.appendChild(pBodyComment)
                        commentInfoDiv.appendChild(bodyCommentDiv)

                        commentListDiv.appendChild(commentInfoDiv)
                    })
                }
                commentListDiv.dataset.loaded = "true"
            })
            
        })
    }else{
        const emptyDiv = document.getElementById("empty")
        emptyDiv.style.display = "flex"
    }
}

function filter_post(field,text){
    const listPostsDiv = document.getElementsByClassName('list-posts')[0]
    const postsChildrenns = listPostsDiv.children
    console.log(field)
    for(const div_post of postsChildrenns){
        if(field == "id"){
            const headerPost = div_post.querySelector(".header-post")
            const pPostId = headerPost.querySelector("#post-id")
            const textPostId =pPostId.textContent.replace("#")
            if(!textPostId.includes(text)){
                div_post.style.display = "none"
            }else{
                div_post.style.display = "flex"
            }
        }else if(field == "title"){
            const postInfo = div_post.querySelector(".post-info")
            const titlePost = postInfo.querySelector("#title-post")
            const textTitle = titlePost.textContent
            if(!textTitle.includes(text)){
                div_post.style.display = "none"
            }else{
                div_post.style.display = "flex"
            }
        }
    }
    const everyDisplayNone = [...postsChildrenns].every(div_post=>getComputedStyle(div_post).display === "none")
    if(everyDisplayNone){
        const emptyDiv = document.getElementById("empty")
        emptyDiv.style.display = "flex"
    }else{
        const emptyDiv = document.getElementById("empty")
        emptyDiv.style.display = "none"
    }
}