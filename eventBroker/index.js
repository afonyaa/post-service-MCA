const express = require("express")
const cors = require("cors")
const axios = require("axios");
const app = express();

const PORT = 8082
const HOST = 'localhost'

const listeningServicesAPIs = [
    'http://localhost:8080/events',
    'http://localhost:8081/events',
    // 'http://localhost:8082/events'
]

app.use(express.json())
app.use(cors())

app.get('/', ((req, res) => {
    res.status(200).send('Hello')
}))

app.post('/events', (req, res)=> {
    const event = req.body

    const servicesResolving = []

    listeningServicesAPIs.forEach(serviceAPI=>{
        const promise = axios.post(serviceAPI, event)
        servicesResolving.push(promise)
    })

    Promise.all(servicesResolving).then(()=>{
        res.status(200).send('Ok')
    })
})


app.listen(PORT, HOST)