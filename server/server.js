require('dotenv').config()

const EXPRESS = require('express');
const PATH = require('path');
const HTTP = require('http');
const BODY_PARSER = require('body-parser');

const PARKING_SPOTS = require('./api/parking-spots');

const APP = EXPRESS();

// Parsers for POST data
APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: true }));

// Point static path to dist
APP.use(EXPRESS.static(PATH.join(__dirname, '.')));

// Routes
APP.use('/api/v1/parking-spots', PARKING_SPOTS);

// Get port from environment and store in Express.
const PORT = process.env.PORT || '3000';
APP.set('port', PORT);

// Create HTTP server.
const SERVER = HTTP.createServer(APP);

 // Listen on provided port, on all network interfaces.
SERVER.listen(PORT, () => console.log(`API running on localhost:${PORT}`));

