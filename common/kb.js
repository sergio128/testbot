const
  request = require('request');

module.exports = class KB{

  static getAPI(tema,text) {
    console.log("KB tema:" +tema);
    console.log("KB pregunta: "+text);
    return new Promise(function(resolve, reject) {
        let body = [];
        // Send the HTTP request to the Graph API

        request({
          uri: 'https://tallerprogramacionqna.azurewebsites.net/qnamaker/knowledgebases/eebc3182-0a16-4a02-8ec0-a043829f65df/generateAnswer',
          method: "POST",
          headers:{
            "Authorization":"EndpointKey d7de047f-812c-4e29-809b-a508049c9569",
            "Content-Type": "application/json"
          },
          json: {
            question:text,
            strictFilters: [
              {
                "name":"tema","value":tema
              }
            ]
          }
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
            console.log(req);
            if(req.answers[0].questions[0] == undefined){
              resolve(null);
            }else{
              resolve([req.answers[0].questions[0],req.answers[0].answer,req.answers[0].score]);
            }
          });
      });
  }

  static getIntent(req){
    const intents = req.prediction.intents;
    if(intents.length>0){
        const intent = intents[0];
        return intent;
    }else{
        return null;
    }
  }

  static getEntity(req){
    const entities = req.prediction.entities;
    if(entities.length>0){
        const entity = entities[0];
        return entity;
    }else{
        return null;
    }
    
  }

}


