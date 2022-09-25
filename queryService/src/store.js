class QueryDataStore {
    constructor() {
        this.posts = {}
    }
    getPosts() {
      return this.posts
    }
    addPost(newPost) {
        this.posts[newPost.id] = {
            text: newPost.text,
            comments: []
        }
    }
    addCommentToPost(newComment) {
        const postId = newComment.postId
        const postData = this.posts[postId]
        postData.comments.push({
            id: newComment.id,
            content: newComment.content
        })
    }
}

module.exports = {QueryDataStore}