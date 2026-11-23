export class Api{
    #users
    #posts
    #comments

    constructor(){
        this.#posts = this.#getData("https://jsonplaceholder.typicode.com/posts")
        this.#users = this.#getData("https://jsonplaceholder.typicode.com/users")
        this.#comments = this.#getData("https://jsonplaceholder.typicode.com/comments")
    }

    async #getData(URL){
        try {
            const response = await fetch(URL)
            if(!response.ok){
                throw new Error("Erro HTTP: "+response.status)
            }
            const data = await response.json()
            return data
        } catch (error) {
            return {error:error}
        }
    }

    async getUsers(){
        const users = await this.#users
        const posts = await this.#posts
        const data = users.map(user =>({
            ...user,
            quantityPosts:posts.filter(post => post.userId == user.id).length
        }))
        return data
    }

    async getPosts(){
        const posts = await this.#posts
        const users = await this.#users
        const comments = await this.#comments
        const data = {
            quantity:posts.length,
            posts:posts.map(post=>({
                userName:users.filter(user=>user.id == post.userId)[0].name,
                ...post,
                quantityComments:comments.filter(comment=>comment.postId == post.id).length
            }))
        }
        return data
    }

    async getComments(post_id){
        const comments = await this.#comments
        const data = comments.filter(comment=>comment.postId == post_id)
        return data
    }
}
