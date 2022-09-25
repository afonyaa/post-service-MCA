const express = require('express')
const cors = require('cors')

const HOST = 'localhost'
const PORT = 8084

const app = express()
app.use(cors())
app.use(express.json())


app.get('/', ((req, res) => {
    res.status(200).json('Ok')
}))

app.post('/events', ((req, res) => {
        const event = req.body.event
        if (event.type === 'COMMENT_CREATED'){

        }
        res.status(200).send('ok')
    }

))


app.listen(PORT, HOST)