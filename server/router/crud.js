const express = require('express');
const router = express.Router();


router.get('/hii',(req,res)=>{
    res.send('hii')
})

module.exports = router