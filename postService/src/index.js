const express = require('express')
const cors = require('cors')
const {PostsStore} = require("./store");
const axios = require("axios");

const HOST = 'localhost'
const PORT = 8080

const EVENT_BROKER_API = 'http://localhost:8083/events'

const app = express()

app.use(express.json())
app.use(cors())

const Store = new PostsStore()

app.post('/post', (req, res) => {
    try {
        const postData = req.body
        Store.addPost(postData)
        axios.post(EVENT_BROKER_API, {event: 'event from post service'}).then(()=>{
            res.status(200).json({
                posts: Store.getPosts()
            })
        }).catch(()=> console.log('ERROR FROM EVENT SERVICE'))
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

app.post('/events', (req, res) => {
    res.status(200).send('ok')
})

app.get('/', ((req, res) => {
    res.send({text: 'hello from post service'})
}))

app.listen(PORT, HOST)