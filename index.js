'use strict';

var Receive = require("./common/receive.js");
var User = require("./common/user.js");

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request');

var users = {};

// creates express http server
const app = express().use(bodyParser.json());

// import environment variables
const dotenv = require('dotenv');
dotenv.config();

// Sets server port and logs message on success
app.listen(process.env.PORT || 80, () => console.log('webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

		// Gets the body of the webhook event
		let webhook_event = entry.messaging[0];
		//console.log(webhook_event);

		// Get the sender PSID
		let sender_psid = webhook_event.sender.id;

		let receiveMessage;
		if(!(sender_psid in users)){
      console.log("new user");
			let user = new User(sender_psid);
			users[sender_psid] = user;
			receiveMessage = new Receive(user, webhook_event);
		}else{
      //console.log("no new user");
			//console.log("Profile already exists PSID: "+sender_psid);
      //console.log(users[sender_psid]);
			receiveMessage = new Receive(users[sender_psid], webhook_event);
		}
		return receiveMessage.handleMessage();
	});

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "testcurso"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});
