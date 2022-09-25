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
    console.log(req.body)
    if (event.type === 'POST_CREATED') {
        Store.addPost(event.payload)
    }
    if (event.type === 'COMMENT_CREATED') {
        Store.addCommentToPost(event.payload)
    }
    res.status(200).send('ok')}
))



app.listen(PORT, HOST)