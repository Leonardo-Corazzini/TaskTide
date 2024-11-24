const express = require('express')
const app = express()
const port = 3000
const router = require('./router/router.js')

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/kanban/index.html")
})

app.use('/save', router)
app.listen(port, () => {
console.log(`Server kanban accesso alla porta ${port}`)
})