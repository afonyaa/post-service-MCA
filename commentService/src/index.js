const express = require('express')
const cors = require('cors')
const app = express()
const {CommentsStore} = require('./store');

const PORT = 8081
const HOST = 'localhost'

app.use(express.json())
app.use(cors())

const Store = new CommentsStore()

/** Добавление комментария для поста */
app.post('/post/:id/newComment', (req, res) => {
    try {
        const newCommentData = req.body
        const postId = req.params.id
        Store.addComment(newCommentData, postId)
        res.status(200).json(Store.getCommentsByPostId(postId))
    } catch (e) {
        res.status.send({error: e})
    }
})

/** Комментарии для поста */
app.get('/posts/:id/comments', (req, res) => {
    try {
        const postId = req.params.id
        res.status(200).json(Store.getCommentsByPostId(postId))
    } catch (e) {
        res.status(500).send({error: e})
    }
})

app.get('/', ((req, res) => {
    res.send({text: 'Hello from Comments service'})
}))

app.listen(PORT, HOST)