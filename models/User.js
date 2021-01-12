var _this = this;
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

//Creates a new schema for an user
var User = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    movieList: {
        type: [String]
    }
})

User.methods.updateUsername = function (newUsername) {
    if (newUsername != _this.username) {
        _this.username = newUsername;
        return { message: 'Username changed successfully!' };
    }
    else
        return { message: 'New username must be different from previous.' };
}

User.methods.updateUsername = function (newPassword) {
    if (newPassword != _this.password) {
        _this.password = newPassword;
        return { message: 'Password changed successfully!' };
    }
    else
        return { message: 'New password must be different from previous.' };
}

User.methods.addMovie = function (movieToAdd) {
    this.movieList.push(movieToAdd)
}

User.methods.findMovie = function (movieId) {
    console.log('rentre dans la fonction user FindMovie')
    console.log('id fu film (671): ' + movieId)
    console.log('longueur de la liste (devrait etre 2): ' + (this.movieList).length)

    var temp = false

    if ((this.movieList).length > 0) {
        (this.movieList).forEach(movie => {
            var parsedMovie = JSON.parse(movie)
            console.log(parsedMovie.id)
            if (movieId === parsedMovie.id) { temp = true }
        })
    } else { temp = false }

    return temp
}

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);