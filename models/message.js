var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('../models/user');

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

// A la base on supprime un message - mais comme on créer un tableau de messages à l'utilisateur -> voici un moyen (un middleware créé par mongoose) pour supprimer son message dans son tableau
schema.post('remove', function(message){
    //On cherche l'utilisateur gracce à l'Id utilisateur dans le schema message (id propriétaire du message)
    User.findById(message.user, function(err, user){
       user.messages.pull(message);
       user.save();

    })
});

module.exports = mongoose.model('Message', schema);