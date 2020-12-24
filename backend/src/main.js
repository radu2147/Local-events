const server = require('./app');
const app = server[0];
const port = server[1];

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})