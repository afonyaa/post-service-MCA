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
    updateComment(postId, commentId, newCommentData) {
        const comments = this.getCommentsByPostId(postId)
        const comment = comments.find(comment => comment.id === commentId)
        for (const [key, value] of Object.entries(newCommentData)){
            comment[key] = value
        }
        return comment
    }

}

module.exports = {CommentsStore}