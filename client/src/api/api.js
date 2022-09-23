import axios from "axios";

const postServiceAPI = 'http://localhost:8080'
const commentServiceAPI = 'http://localhost:8081'

export const getPosts = async () => {
   const posts = await axios.get(`${postServiceAPI}/posts`)
   return posts.data.posts
}
export const createPost = async (newPost) => {
   const posts = await axios.post(`${postServiceAPI}/post`, {text: newPost})
   return posts.data.posts
}

export const getCommentsByPostId = async (postId) => {
   const comments = await axios.get(`${commentServiceAPI}/post/${postId}/comments`)
   return comments.data
}
export const createComment = async (postId, newComment) => {
   const comments = await axios.post(`${commentServiceAPI}/post/${postId}/newComment`, newComment)
   return comments.data
}