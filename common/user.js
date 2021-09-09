"use strict";
var Form = require("./form.js");

module.exports = class User {
  constructor(psid) {
    this.psid = psid;
    this.firstName = "";
    this.lastName = "";
    this.locale = "";
    this.timezone = "";
    this.gender = "neutral";
    this.formName = "";
    this.currentQuestion = 0;
    this.form = new Form();
  }
  setProfile(profile) {
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.locale = profile.locale;
    this.timezone = profile.timezone;
    if (profile.gender) {
      this.gender = profile.gender;
    }
  }
  setcurrentQuestion(formName,currentQuestion){
    this.formName = formName;
    this.currentQuestion = currentQuestion;
  }

  restartForm(){
    this.formName = "";
    this.currentQuestion = 0;
    this.form = new Form();
  }
};
