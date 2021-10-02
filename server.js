// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// enable cros request
const Cors = require('cors');
app.use(Cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
	res.status(200).send(projectData);
});

// Post Route
app.post('/add', (req, res) => {
	projectData = req.body;
	console.log(projectData);
	res.status(200).send(projectData);
});

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
	console.log('server running on localhost: ' + port);
}
