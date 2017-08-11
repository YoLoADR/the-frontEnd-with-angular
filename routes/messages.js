var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

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

//Cette est accessible uniquement si on est connecté - on est encastre tous dans un router.use()
//On va choper de token dans la query parameters url exemple => http://localhost:3000/ma-page/?token=safdgfjldfj 
router.use('/', function(req, res, next){
  jwt.verify(req.query.token, 'secret', function(err, decoded){
    if(err){
        return res.status(401).json({
          title: 'Non authentifier',
          error: err
        });
      }
    next();
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

// "patch" -> parce qu'on veut modifier/ réécrire par dessus une data
router.patch('/:id', function(req, res, next){
  //(i) Certain paramètre son dans "params" et d'autre dans le "body"
  Message.findById(req.params.id, function(err, message){
    //Dans le cas où on a une erreur
      if(err){
        return res.status(500).json({
          title: 'Une erreur à été detecter',
          error: err
        });
      }
      //Dans le cas où l'on a pas d'erreur mais le message n'est pas trouvé
      if(! message){
        return res.status(500).json({
          title: 'Le message n a pas été detecté',
          error: {message: 'Message not found'}
        });
      }
      message.content = req.body.content;

      
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
});

// Similaire à l'update/edite d'une donnée - on a commencé par copier/coller le code
router.delete('/:id', function(req, res, next){
 Message.findById(req.params.id, function(err, message){
    //Dans le cas où on a une erreur
      if(err){
        return res.status(500).json({
          title: 'Une erreur à été detecter',
          error: err
        });
      }
      //Dans le cas où l'on a pas d'erreur mais le message n'est pas trouvé
      if(!message){
        return res.status(500).json({
          title: 'Le message n a pas été detecté',
          error: {message: 'Message not found'}
        });
      }

      message.remove(function(err, result){
        //Dans le cas où on a une erreur
        if(err){
          return res.status(500).json({
            title: 'Une erreur à été detecter',
            error: err
          });
        }
        // status 201 Everythings it's ok
        res.status(200).json({
          message: 'message supprumer',
          obj : result
        })

      });
  });
});


module.exports = router;
