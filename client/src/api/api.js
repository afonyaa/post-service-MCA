import axios from "axios";

const postServiceAPI = 'http://localhost:8080'
const commentServiceAPI = 'http://localhost:8081'
const queryServiceAPI = 'http://localhost:8082'

export const getPosts = async () => {
   const posts = await axios.get(`${queryServiceAPI}/posts`)
   return posts.data
}
export const createPost = async (newPost) => {
   const posts = await axios.post(`${postServiceAPI}/post`, {text: newPost})
   return posts.data.posts
}

export const createComment = async (postId, newComment) => {
   const comments = await axios.post(`${commentServiceAPI}/post/${postId}/newComment`, newComment)
   return comments.data
}