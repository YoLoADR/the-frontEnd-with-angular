var express = require('express');
var router = express.Router();

// On a besoin d'avoir accès à notre message model pour pouvoir intéragir avec lui (sauvegarder dans la base ect ...)
var Message = require('../models/message');

router.get('/', function (req, res, next) {
    Message.find()
      .exec(function(err, result){
      if(err){
        return res.status(500).json({
          title: 'Une erreur à été detecter',
          error: err
        });
      }
      res.status(200).json({
        message: 'message recuperer',
        obj : result
      })
    });
});

//"post" -> parce que on veut stocker un message grace au server
router.post('/', function (req, res, next) {
    var message = new Message({
      content : req.body.content
    });
    // Pour sauvegarder / sotcker le message dans la base de données
    // Avec un callback pour verifier qu'on n'est pas une erreur et recuperer le resultat de cette opération
    message.save(function(err, result){
      //Dans le cas où on a une erreur
      if(err){
        return res.status(500).json({
          title: 'Une erreur à été detecter',
          error: err
        });
      }
      // status 201 Everythings it's ok
      res.status(201).json({
        message: 'message enregistrer',
        obj : result
      })

    });
});

module.exports = router;
