const
  request = require('request');

module.exports = class Luis{

  static getAPI(text) {
    return new Promise(function(resolve, reject) {
        let body = [];

        // Send the HTTP request to the Graph API
        request({
          uri: `https://tallerprogramacionluis.cognitiveservices.azure.com/luis/prediction/v3.0/apps/0fd2f921-9908-4e3e-b2aa-5b6a4597f45a/slots/staging/predict?subscription-key=89649359a80840b7920b56f7e1bbfe57&verbose=true&show-all-intents=true&log=true&query=`+text,
          method: "GET",
          json: ""
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
            let req = JSON.parse(body);
            let intent = Object.keys(req.prediction.intents)[0]; 
            let score = Object.values(req.prediction.intents)[0].score;
            let entities = req.prediction.entities;
            let entity;
            console.log(entities);
            if(entities.Tema == undefined){
              entity = null;
            }else{
              entity = entities.Tema[0][0];
            }
            resolve([intent,score,entity]);
          });
      });
  }

  static getIntent(req){
    const intents = req.prediction.intents;
    if(intents.length>0){
        console.log("x");
        const intent = intents[0];
        return intent;
    }else{
        return null;
    }
  }

  static getEntity(req){
    const entities = req.prediction.entities;
    if(entities.length>0){
        console.log("y");
        const entity = entities[0];
        return entity;
    }else{
        return null;
    }
    
  }

}


