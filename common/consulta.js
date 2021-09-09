"use strict";

// Imports dependencies
const Response = require("./response.js");
const KB = require("./kb.js");

module.exports = class Consulta {

  constructor(payload,user,answer,tema){
    this.payload = payload,
    this.user = user,
    this.answer = answer,
    this.response = null,
    this.tema = tema
  }

  async handlePayload() {
    this.user.setcurrentQuestion(this.payload,1);
    this.response = Response.genText("Ingresa tu consulta");
    return this.response;
  }

  async handleQuestion() {
    switch(this.user.currentQuestion){
      case 1:
        await this.step1();
        break;
      case 2:
        await this.step2();
        break;
      case 3:
        await this.step3();
        break;
    }

    return this.response;
  }

  async step1(){
    this.user.setcurrentQuestion(this.user.formName,2);
    let check = await Response.genText("Está bien, déjame revisar...");
    let results = await KB.getAPI(this.tema,this.answer);
    console.log(results);
    


    if(results){
        let question = results[0];
        let answer = results[1];
        let score = results[2];
        this.user.form.setValue(1,this.answer);

      
        let foundText = await Response.genText("Esto es lo que encontré");
        
        let tema = await Response.genText("Pregunta: "+question);
        let respuesta = await Response.genText(answer);
        

        let qr = await Response.genQuickReply("Elije una opcion",[
            {
                title: "Hacer otra consulta",
                payload: this.user.formName
            },
            {
                title: "Regresar al menu",
                payload: "get_menu"
            }
            ]);
        this.response = [check,foundText,tema,respuesta,qr];
    }else{
        let notFoundText = Response.genText("Lo siento, no encontré nada al respecto");
        let qr = await Response.genQuickReply("Elije una opcion",[
            {
                title: "Hacer otra consulta",
                payload: this.user.formName
            },
            {
                title: "Regresar al menu",
                payload: "get_menu"
            }
            ]);
        this.response = [notFoundText,qr];
    }
  }

};
