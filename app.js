var UserModel = require('./models/User');
var authRoute = require('./routes/authRoute');
var userRoute = require('./routes/userRoute');
var movieRoute = require('./routes/movieRoute');
var expbs = require('express-handlebars')

/* EXPRESS SETUP */
var compression = require('compression');
var flash = require('connect-flash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session')({
    secret: 'lmao',
    resave: false,
    saveUninitialized: false
});

app.engine('handlebars', expbs({
    defaultLayout: null
}))
app.set('view engine', 'handlebars');
app.use(bodyParser.json()); //Support parsing of JSON type POST data
app.use(bodyParser.urlencoded({ extended: true })); //Support parsing of x-www-form-urlencoded POST data
app.use(session);
app.use(compression());
app.use(flash());
/* ------------- */

/* MONGOOSE SETUP */
var mongoose = require('mongoose');
var mongoURL = 'mongodb+srv://xfish:3105@tests.7avlb.mongodb.net/Tests?retryWrites=true&w=majority';
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function (req, res) {
        app.listen(3000);
        console.log('server ready for requests');
    })["catch"](function (err) { return console.log(err); });
/* -------------- */

/* PASSPORT SETUP */
var passport = require('passport');
app.use(passport.initialize()); //Initialize passport authentication module
app.use(passport.session()); //Takes the cookie (user session) and transform it into deserialized user info
/* -------------- */

/* PASSPORT LOCAL AUTH */
passport.use(UserModel.createStrategy()); //Creates a local auth strategy automatically (passport-local-mongoose middleware)
passport.serializeUser(UserModel.serializeUser()); //Invoked on auth. Serialize user instance and store session via cookie
passport.deserializeUser(UserModel.deserializeUser()); //Invoked on subsequent req. Deserialize user instance, providing cookie "credential".
/* ------------------- */

/* ROUTING */
app.use((req, res, next) => {
    if (req.user) {
        app.locals.username = req.user.username
        if (req.user.movieList.length > 0) {
            var parsedMovieList = []
            req.user.movieList.forEach(movie => {
                parsedMovieList.push(JSON.parse(movie))
            })

            app.locals.movieList = parsedMovieList
        }
    }
    next()
})

app.get('/', (req, res) => {
    res.render('index.handlebars', {
        userList: [
            {
                username: 'Alex',
                password: 123
            },
            {
                username: 'Lmao',
                password: 456
            },
        ],
        user: req.user
    })
})

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/movies', movieRoute);

app.get('*', function (req, res) {
    res.render('404.ejs', { user: req.user });
});
/* ------- */
