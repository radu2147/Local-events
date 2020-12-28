const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 8080;

const commRouter = require("./comm/router");
const {Sequelize} = require('sequelize');
const init = require('./relationInit');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/test', (req, res) => {
    res.status(200).send({message: "Hello World!"});
})

app.use('/api', commRouter);


init();

module.exports = [app, port];