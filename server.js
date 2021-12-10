const express = require('express');
const mongoose = require('mongoose');

// create express app
const app = express();

app.use(express.json());

// listen for requests
app.listen(3000, () => console.log("Server is listening on port 3000"));

// Configuring the database
const dbConfig = require('./config/database.config.js');

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application." });
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
