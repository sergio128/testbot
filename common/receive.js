"use strict";

var Response = require("./response.js");
var fbAPI = require("./fbAPI.js");

var Tema = require("./tema.js")
const LUIS = require("./luis.js");

module.exports = class Receive {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  

  // Check if the event is a message or postback and
  // call the appropriate handler function
  async handleMessage() {
    let event = this.webhookEvent;

    let responses;

    try {
      if (event.message) {
        let message = event.message;

        if (message.quick_reply) {
          responses = await this.handleQuickReply();
        } else if (message.attachments) {
          responses = await this.handleAttachmentMessage();
        } else if (message.text) {
          responses = await this.handleTextMessage();
        }
      } else if (event.postback) {
        responses = await this.handlePostback();
      } else if (event.referral) {
        responses = await this.handleReferral();
      }
    } catch (error) {
      console.error(error);
      responses = {
        text: `An error has occured: '${error}'. We have been notified and will fix the issue shortly!`
      };
    }

    if (Array.isArray(responses)) {
      //let delay = 0;
      for (let response of responses) {
        //this.sendMessage(response, delay * 2000);
        await this.sendMessage(response);
        //delay++;
      }
    } else {
      if(responses){
        await this.sendMessage(responses);
      }
    }
  }

  async sendMessage(response) {
    // Check if there is delay in the response

    // Construct the message body
    let requestBody = {
      recipient: {
        id: this.user.psid
      },
      message: response
    };
    try{
      await fbAPI.callSendAPI(requestBody);
    }catch(error){
      console.log(error);
    }
  }

  // Handles messages events with text
  async handleTextMessage() {
    console.log(
      "Recieved text:",
      `${this.webhookEvent.message.text} for ${this.user.psid}`
    );

    let minScore = 0.5;
    let message = this.webhookEvent.message.text.trim().toLowerCase();
    let response;
    /* if ( (greeting && greeting.confidence > 0.8) || message.includes("start over")  || message == "Empezar") {
      response = await Response.genWelcomeMessage(this.user.psid);
      console.log("option 1");
      this.user.restartForm();
    }else if(thanks && thanks.confidence > 0.8){
      response = await Response.genThanksMessage();
      console.log("option 2");
      this.user.restartForm();
    }else if(bye && bye.confidence > 0.8){
      response = await Response.genByeMessage();
      this.user.restartForm();
      console.log("option 3");
    } */
    if (message.includes("start over")  || message == "Empezar") {
      response = await Response.genWelcomeMessage(this.user.psid);
      console.log("option 1");
      this.user.restartForm();
    }else if(this.user.formName!="" && this.user.currentQuestion>0){
      console.log("option 2");
      let form = this.user.formName;
      console.log("Formulario: "+form);
      if(form.includes("Acceso a base de datos") || form.includes("Conocimiento de aplicaciones web") || form.includes("Generar reportes tipo listado y con parámetros") || form.includes("Implementación del patrón CRUD") || form.includes("Introducción al lenguaje de programación web") || form.includes("Paso de parámetros entre páginas web") || form.includes("Patrón de programación") || form.includes("Sesiones")){
        response = await Tema.handleQuestion(this.user,this.webhookEvent.message.text,form);
      }else{
          response = {
            text: `This is a default answer for form ${form}!`
        };
      }
    }else{
      let request = await LUIS.getAPI(this.webhookEvent.message.text);
      console.log(request);
      let intent = request[0];
      let score = request[1];
      let entity = request[2];
    
      if(intent && score > minScore && (intent == "Consulta" || intent == "Ejercicios" || intent == "Material")){
        console.log("option 3");
        let mensaje1 = "";
        let mensaje2 = "";
        switch(intent){
          case "Consulta":
            mensaje1 = "Elije un tema del cual desee consultar:";
            mensaje2 = "consultar";
            break;
          case "Ejercicios":
            mensaje1 = "Elije un tema del cual desee ejercicios:";
            mensaje2 = "obtener ejercicios";
            break;
          case "Material":
            mensaje1 = "Elije un tema del cual desee material:";
            mensaje2 = "obtener material";
            break;
            
        }
        if(!entity){
            response = [await Response.genText(mensaje1),await Response.genMenuMessage(null,intent)];
        }else{
            response = [await Response.genText("Presiona el boton para "+mensaje2+" sobre el tema "+entity),await Response.genMenuMessage(entity,intent)];
        }
      }else if(!entity){
        console.log("option 4");
        if(intent == "None" && score > minScore){
          response = {
              text: `Lo siento, no entendí tu mensaje`
          };
        }else if(intent){
          if(entity){
            response = {
                text: `Esta es una respuesta automatica para el intent `+intent+' y score '+score+' y entity '+entity
            };
          }else{
            response = {
                text: `Esta es una respuesta automatica para el intent `+intent+' con score '+score
            };
          }
        }
      }else if(entity){
        console.log("option 5");
        response = [await Response.genText("Aquí está el tema:"),await Response.genMenuMessage(entity,null)];
      }else {
        console.log("option 6");
        response = await Response.genText("Lo siento. Aún no puedo entender eso");
      }
    }
    console.log(response);

    return response;
  }

  // Handles mesage events with attachments
  handleAttachmentMessage() {
    let response;

    // Get the attachment
    let attachment = this.webhookEvent.message.attachments[0];
    console.log("Received attachment:", `${attachment} for ${this.user.psid}`);

    response = Response.genText("Recibí un archivo adjunto");

    return response;
  }

  // Handles mesage events with quick replies
  async handleQuickReply() {
    // Get the payload of the quick reply
    let payload = this.webhookEvent.message.quick_reply.payload;
    let response;
    if(payload.includes("_question_")){
      if(payload.includes("menu_m1")){
        response = await Parts.handleQuestion(this.user,payload);    
      }else if(payload.includes("menu_m2")){
        response = await Equipment.handleQuestion(this.user,payload);
      }else if(payload.includes("menu_m3")){
        response = await Finance.handleQuestion(this.user,payload);
      }else if(payload.includes("menu_m4")){
        response = await Feedback.handleQuestion(this.user,payload);
      }else{
        response = {
          text: `This is a default answer for form ${form}!`
        }
      }
      return response;
    }else{
      return this.handlePayload(payload);
    }
  }

  // Handles postbacks events
  async handlePostback() {
    // Get the payload of the postback
    let payload = this.webhookEvent.postback.payload;

    return await this.handlePayload(payload);
  }

  // Handles referral events
  handleReferral() {
    // Get the payload of the postback
    let payload = this.webhookEvent.referral.ref.toUpperCase();

    return this.handlePayload(payload);
  }

  async handlePayload(payload) {
    console.log("Received Payload:", `${payload} for ${this.user.psid}`);

    // Log CTA event in FBA
    //GraphAPi.callFBAEventsAPI(this.user.psid, payload);

    let response;

    // Set the response based on the payload
    switch(payload){
      case 'start over':
        response = await Response.genWelcomeMessage(this.user.psid);
        this.user.restartForm();
        break;
      case 'get_started':
        response = await Response.genWelcomeMessage(this.user.psid);
        this.user.restartForm();
        break;
      case 'get_menu':
        response = await Response.genMenuMessage(null,null);
        this.user.restartForm();
        break;
      default:
        if(payload =="Acceso a base de datos" || payload =="Conocimiento de aplicaciones web" || payload =="Generar reportes tipo listado y con parámetros" || payload =="Implementación del patrón CRUD" || payload =="Introducción al lenguaje de programación web" || payload =="Paso de parámetros entre páginas web" || payload =="Patrón de programación" || payload =="Sesiones"){
          response = Tema.handlePayload(payload,this.user);
        }else{
          response = {
            text: `This is a default postback message for payload: ${payload}!`
          };
        }
        break;
    }
    return response;
  }

  

   firstEntity(nlp, name) {
     return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
   }
};
