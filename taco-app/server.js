const port = process.env.PORT || 8087;

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

//Create web server
const app = express();

//Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Setup route
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Start server
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on *:${port}`));