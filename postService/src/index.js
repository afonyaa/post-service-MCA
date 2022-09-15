const express = require('express')
const cors = require('cors')
const {PostsStore} = require("./store");

const HOST = 'localhost'
const PORT = 8080

const app = express()

app.use(express.json())
app.use(cors())

const Store = new PostsStore()

app.post('/post', (req, res) => {
    try {
        const postData = req.body
        Store.addPost(postData)
        res.status(200).json({
            posts: Store.getPosts()
        })
    } catch (e) {
        res.status(500)
        res.send({error: e})
    }
})

app.get('/posts', (req, res) => {
    try {
        res.status(200).json({posts: Store.getPosts()})
    } catch (e) {
        res.status(500)
        res.send({error: e})
    }
})

app.get('/', ((req, res) => {
    res.send({text: 'hello from post service'})
}))

app.listen(PORT, HOST)