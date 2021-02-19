const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 8079;

const commRouter = require("./comm/router");
const userRouter = require("./user/router");
const eventRouter = require('./event/router');
const usereventrouter = require('./userevents/routes');

const [middleware, signin, extendAccess] = require('./auth');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/test', [middleware], (req, res) => {
    res.status(200).send({message: "Hello World!"});
})
app.post('/signin', signin);
app.post('/extend-access', extendAccess);

app.use('/api/users', userRouter);
app.use('/api/comms', commRouter);
app.use('/api/events', eventRouter);
app.use('/api/userevents', usereventrouter);

module.exports = [app, port];