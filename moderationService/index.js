const express = require('express')
const cors = require('cors')
const axios = require("axios");

const HOST = 'localhost'
const PORT = 8084
const EVENT_BROKER_API = 'http://localhost:8083/events'

const app = express()
app.use(cors())
app.use(express.json())


app.get('/', ((req, res) => {
    res.status(200).json('Ok')
}))

app.post('/events', ((req, res) => {
        const event = req.body.event
        if (event.type === 'COMMENT_CREATED'){
            const comment = event.payload
            setTimeout(()=> {
                comment.status = comment.content.includes('orange') ? 'rejected' : 'approved'
                axios.post(EVENT_BROKER_API, {event: {type: 'COMMENT_MODERATED', payload: comment}})
            }, 1000)
        }
        // получили событие - ок
        res.status(200).send('ok')
    }

))


app.listen(PORT, HOST)