const express = require('express')
const cors = require('cors')
const app = express()
const {CommentsStore} = require('./store');
const axios = require("axios");

const PORT = 8081
const HOST = 'localhost'

const EVENT_BROKER_API = 'http://localhost:8083/events'

app.use(express.json())
app.use(cors())

const Store = new CommentsStore()

/** Добавление комментария для поста */
app.post('/post/:id/newComment', async (req, res) => {
    try {
        const newCommentData = req.body
        const postId = req.params.id
        const newComment = Store.addComment(newCommentData, postId)
        await axios.post(EVENT_BROKER_API, {event: {type: 'COMMENT_CREATED', payload: newComment}})
        res.status(200).json(Store.getCommentsByPostId(postId))
    } catch (e) {
        res.status.send({error: e})
    }
})

/** Комментарии для поста */
app.get('/post/:id/comments', (req, res) => {
    try {
        const postId = req.params.id
        res.status(200).json(Store.getCommentsByPostId(postId))
    } catch (e) {
        res.status(500).send({error: e})
    }
})


app.post('/events', (req, res) => {
    console.log(req.body)
    res.status(200).send('ok')
})


app.get('/', ((req, res) => {
    res.send({text: 'Hello from Comments service'})
}))

app.listen(PORT, HOST)