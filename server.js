const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/kanban/index.html")
})

app.listen(port, () => {
console.log(`Server kanban accesso alla porta ${port}`)
})