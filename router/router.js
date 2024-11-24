const express = require('express')
const router = express.Router()



router.get('/', (req, res) => {
    res.json({
        name: 'leo',
        status: 'ok'
    })
})



module.exports = router