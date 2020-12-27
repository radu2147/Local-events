const express = require('express');
const cors = require('cors');
const port = 8080;

const commRouter = require("./comm/router");

const app = express();

const func = (req, res, next) => {
    console.log("Comm");
    next();
}

app.use(cors());
app.get('/test', func, (req, res) => {
    res.status(200).send({message: "Hello World!"});
})

app.use('/api', func, commRouter);

module.exports = [app, port];