var express = require('express');
var router = express.Router();
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');

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
      password: bcryptjs.hashSync(req.body.password, 10 ),
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
      res.status(200).json({
        message: 'user créer',
        obj : result
      })

    });
});

router.post('/sigin', function(req, res, next){
  // Etape (1) retrouver l'utilisateur
  // Etape (2) comparer les mots de passe 

  //.findOne = car on sait que l'adresse e-mail est unique
  User.findOne({email : req.body.email}, function(err, user){
    //Dans le cas où on a une erreur
      if(err){
        return res.status(500).json({
          title: 'Une erreur à été detecter',
          error: err
        });
      }
      //Dans le cas où l'on a pas d'erreur mais le message n'est pas trouvé
      if(!user){
        return res.status(401).json({
          title: 'Le user n a pas été trouvé - login failed',
          error: {message: 'user not found - Connexion impossible'}
        });
      }
      // va comparer le mots de passe que l'on reçoit de l'utilisateur à celui qui se trouve dans la base
      if(!bcryptjs.compareSync(req.body.password, user.password)){
        return res.status(401).json({
          title: 'Le user n a pas été trouvé - login failed',
          error: {message: 'user not found - Connexion impossible'}
        });
      }

      // Si tout est ok, on donne un token à notre utilisateur - pour cela on install un module (npm install --save jsonwebtoken)
      // #1 argument - payload -> le secret pour verifier le token
      // #2 argument - secret key -> on a mis quelques choses de basic pour l'exemple (secret)
      // #3 argument - {expiresIn: X} -> durée de vie du token en seconde
      var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

      res.status(200).json({
        message: 'vous êtes connecter !',
        obj : token,
        userId : user._id
      })
  });

});

module.exports = router;