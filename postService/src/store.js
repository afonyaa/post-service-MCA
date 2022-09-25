const uuid = require("uuid")

class PostsStore {
    constructor() {
        this.posts = {}
    }

    getPosts() {
        return this.posts
    }

    addPost(postData) {
        const postId = uuid.v4()
        this.posts[postId] = postData
        return {id: postId,...this.posts[postId]}
    }
}

module.exports = {PostsStore}