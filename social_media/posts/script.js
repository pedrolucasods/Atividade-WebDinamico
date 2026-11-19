import {Api} from '../api.js'
// document.addEventListener("DOMContentLoaded",()=>{
//     main()
// })

async function main(){
    const api = new Api()
    const posts = await api.getPosts()
    const users = await api.getUsers()
    console.log(posts)
}

main()
