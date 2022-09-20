import axios from "axios";

const postServiceAPI = 'http://localhost:8080'
// const commentServiceAPI = 'http://localhost:8080'

export const getPosts = async () => {
   const posts = await axios.get(`${postServiceAPI}/posts`)
   return posts.data.posts
}
export const createPost = async (newPost) => {
   const posts = await axios.post(`${postServiceAPI}/post`, {text: newPost})
   return posts.data.posts
}

//export const getCommentsByPostId = async () => await axios.get(`${postServiceAPI}/posts`)
//export const createComment = async (newPost) => await axios.post(`${postServiceAPI}/post`, newPost)