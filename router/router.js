const express = require('express')
const router = express.Router()
const fs = require('fs')
// const save = require('../public/save.js')


const path = require('path');
const filePath = path.join(__dirname, '/../public/save.json');
router.get('/', (req, res) => {
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Errore durante l\'invio del file:', err);
            res.status(500).send('Errore del server');
        }
    });
});



// Endpoint per gestire la richiesta POST su "/save"
router.post('/',(req,res) =>{
    console.log(req.body)
    console.log('salvataggio effettuato con successo')
    fs.writeFile(filePath, JSON.stringify(req.body), err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      });
})


module.exports = router