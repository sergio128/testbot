const
  request = require('request'),
  dotenv = require('dotenv');

dotenv.config();

module.exports = class FBAPI{

  // Sends response messages via the Send API
  static callSendAPI(request_body) {
    return new Promise(function(resolve, reject) {
        let body = [];

        request({
          uri: "https://graph.facebook.com/v2.6/me/messages",
          qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
          method: "POST",
          json: request_body
        })
          .on("response", function(response) {
            // console.log(response.statusCode);

            if (response.statusCode !== 200) {
              reject(Error(response.statusCode));
            }
          })
          .on("data", function(chunk) {
            //body.push(chunk);
          })
          .on("error", function(error) {
            console.error("Unable to send message:" + err);
            reject(Error("Network Error"));
          })
          .on("end", () => {
            //body = Buffer.concat(body).toString();
            // console.log(JSON.parse(body));
            console.log('message sent!');
            resolve();
          });
      });

  }

  static callSendAPIWithAttachment(request_body) {
    return new Promise(function(resolve, reject) {
        let body = [];

        request({
          uri: "https://graph.facebook.com/v10.0/me/message_attachments",
          qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
          method: "POST",
          json: request_body
        })
          .on("response", function(response) {
            //console.log(response.statusCode);
            if (response.statusCode !== 200) {
              reject(Error(response.statusCode));
            }
          })
          .on("data", function(chunk) {
            body.push(chunk);
          })
          .on("error", function(error) {
            console.error("Unable to send message:" + err);
            reject(Error("Network Error"));
          })
          .on("end", () => {
            body = Buffer.concat(body).toString();
            let req = JSON.parse(body);
            console.log(req);
            console.log('attachment id received');
            resolve(req.attachment_id);
          });
      });

  }

  static getUserProfile(sender_psid) {
    return new Promise(function(resolve, reject) {
        let body = [];

        // Send the HTTP request to the Graph API
        request({
          uri: `https://graph.facebook.com/`+sender_psid,
          qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN,
            fields: "first_name"
          },
          method: "GET"
        })
          .on("response", function(response) {
            // console.log(response.statusCode);

            if (response.statusCode !== 200) {
              reject(Error(response.statusCode));
            }
          })
          .on("data", function(chunk) {
            body.push(chunk);
          })
          .on("error", function(error) {
            console.error("Unable to fetch profile:" + error);
            reject(Error("Network Error"));
          })
          .on("end", () => {
            body = Buffer.concat(body).toString();
            // console.log(JSON.parse(body));
            resolve(JSON.parse(body));
          });
      });
  }

}

