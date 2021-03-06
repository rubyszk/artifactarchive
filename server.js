// DEPENDENCIES
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/artifact';
const session = require('express-session');
const methodOverride = require('method-override');

// MODELS
const Artifact = require ('./models/artifact.js');
const dataSeed = require('./models/seed.js')

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static('public'));

// CONTROLLERS
const artifactController = require('./controllers/artifact.js');
app.use('/artifact', artifactController);

const editController = require('./controllers/edit.js');
app.use('/edit', editController);



// INDEX FOR HEROKU
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home.ejs')
})

app.get('/index', (req, res) => {
    res.render('index.ejs');
})

// FOOTER
app.get('/links', (req, res) => {
    res.render('links.ejs')
})

app.get('/about', (req, res) => {
    res.render('about.ejs')
})


// MONGOOSE
mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, () => {
    console.log('connected to mongo');
});

// LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});  

// Artifact.create(dataSeed,(err, data ) => {
//     if (err) {
//        console.log (err.message) 
//     } console.log( "added provided data" )
// }
// );