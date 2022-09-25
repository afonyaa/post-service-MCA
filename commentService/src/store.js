const uuid = require("uuid")

class CommentsStore {
    constructor() {
        this.commentsByPostId = {}
    }

    getCommentsByPostId(postId) {
        return this.commentsByPostId[postId] ?? []
    }

    addComment(newCommentData, postId) {
        const commentId = uuid.v4()
        let comments = this.commentsByPostId[postId]
        comments
            ? comments.push({commentId, ...newCommentData})
            : this.commentsByPostId[postId] = [{commentId, ...newCommentData}]
        return {commentId, ...newCommentData}
    }
}

module.exports = {CommentsStore}