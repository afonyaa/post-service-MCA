const express = require('express')
const cors = require('cors')
const {QueryDataStore} = require("./store");

const HOST = 'localhost'
const PORT = 8082

const app = express()
app.use(cors())
app.use(express.json())

const Store = new QueryDataStore()

// todo - !!! вызывается рано, сразу после клика создания поста, до того как сервис получит евент о том что пост создался !!!
app.get('/posts', ((req, res) => {
    res.status(200).json(Store.getPosts())
}))

app.post('/events', ((req, res) => {
    const event = req.body.event
    console.log(event)
    if (event.type === 'POST_CREATED') {
        Store.addPost(event.payload)
    }
    if (event.type === 'COMMENT_CREATED') {
        Store.addCommentToPost(event.payload)
    }
    if(event.type === 'COMMENT_UPDATED'){
        const commentData = event.payload
        const posts = Store.getPosts()
        const post = posts[commentData.postId]
        //todo сделать нормальную логику обновления комментария
        const commentToUpdate = post.comments.find(comment => comment.id === commentData.id)
        commentToUpdate.status = commentData.status
    }
    res.status(200).send('ok')}
))



app.listen(PORT, HOST)