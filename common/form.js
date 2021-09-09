"use strict";

module.exports = class Form {
  constructor() {
    this.question1 = "";
    this.question2 = "";
    this.question3 = "";
    this.question4 = "";
    this.question5 = "";
    this.question6 = "";
    this.question7 = "";
  }
  setValue(order,value) {
    switch(order){
      case 1:
        this.question1 = value;
        break;
      case 2:
        this.question2 = value;
        break;
      case 3:
        this.question3 = value;
        break;
      case 4:
        this.question4 = value;
        break;
      case 5:
        this.question5 = value;
        break;
      case 6:
        this.question6 = value;
        break;
      case 7:
        this.question7 = value;
        break;
    }
  }
};
