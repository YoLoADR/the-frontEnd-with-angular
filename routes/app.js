var express = require('express');
var router = express.Router();

// Node Express rend seulement une seule route car Angular est une SPA (single page application)
router.get('/', function (req, res, next) {
    res.render('index'); 
});

module.exports = router;
