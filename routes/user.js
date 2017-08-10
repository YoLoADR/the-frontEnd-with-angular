var express = require('express');
var router = express.Router();
var bcryptjs = require('bcryptjs');

// On a besoin d'avoir accès à notre message model pour pouvoir intéragir avec lui (sauvegarder dans la base ect ...)
var User = require('../models/user');

// La méthode POST pour créer un User
// (!) pour des raisons de sécurité on ne peut pas mettre juste "req.body.password" 
// -> pour cela on va devoir le crypter - npm install --save bcryptjs
// -> englober notre req.body.password dans la méthode bcryptjs.hashSync(req.body.password, (1) ) - (1) en deuxième paramètre le niveau de cryptage 
router.post('/', function (req, res, next) {
    var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcryptjs.hashSync(req.body.password, ),
      email: req.body.email
    });

    user.save(function(err, result){
      //Dans le cas où on a une erreur
      if(err){
        return res.status(500).json({
          title: 'Une erreur à été detecter',
          error: err
        });
      }
      // status 201 Everythings it's ok
      res.status(201).json({
        message: 'user créer',
        obj : result
      })

    });
});

module.exports = router;