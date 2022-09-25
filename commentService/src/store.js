const uuid = require("uuid")

class CommentsStore {
    constructor() {
        this.commentsByPostId = {}
    }

    getCommentsByPostId(postId) {
        return this.commentsByPostId[postId] ?? []
    }

    addComment(newCommentData, postId) {
        newCommentData.id =  uuid.v4()
        newCommentData.postId =  postId
        newCommentData.status = 'pending'
        let comments = this.commentsByPostId[postId]
        comments
            ? comments.push(newCommentData)
            : this.commentsByPostId[postId] = [newCommentData]
        return newCommentData
    }
}

module.exports = {CommentsStore}