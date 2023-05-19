const express = require('express')
const app = express()
const PORT = 5000
const ENDPOINT = 'http://ec2-54-232-9-90.sa-east-1.compute.amazonaws.com:5000/oportunidades/v1/oportunidades/' 

app.get('/oportunities/', (_req, res) => {
    async function getList() {
        const response = await fetch(ENDPOINT)
        const jsonData = await response.json();
        return jsonData
    }
    getList().then(response => res.send(response))
})

app.get('/oportunity/:id', (req, res) => {
    async function getOportunity() {
        const response = await fetch(ENDPOINT + req.params.id)
        const jsonData = await response.json()
        return jsonData
    }
    getOportunity().then(response => res.send(response))
})

app.use('/detail', express.static('public/detail/'))
app.use(express.static('public'))

app.listen(PORT, () => console.log(`Acesse http://localhost:${PORT}`))

