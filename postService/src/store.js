const uuid = require("uuid")

class PostsStore {
    constructor() {
        this.posts = {}
    }
    getPosts(){
        return this.posts
    }
    addPost(postData){
        const postId = uuid.v4()
        this.posts[postId] = postData
    }
}

module.exports = {PostsStore}