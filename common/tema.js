"use strict";

// Imports dependencies
const Response = require("./response.js");
const Consulta = require("./consulta.js");

module.exports = class Tema {

  static async handlePayload(payload,user) {
    let response;
    if(payload.includes("_question_")){
        response = await this.handleQuestion(user,payload);
    }else{
        response = await new Consulta(payload,user,null).handlePayload();
    }

    return response;
  }

  static async handleQuestion(user,answer,tema) {
    console.log(this.nombre);
    let response;
    let formName = user.formName
    response = await new Consulta(null,user,answer,tema).handleQuestion();
    return response;
  }
};
