"use strict";
var fbAPI = require("./fbAPI.js");
var menu = require("./menu.js");

module.exports = class Response {
  static genQuickReply(text, quickReplies) {
    let response = {
      text: text,
      quick_replies: []
    };

    for (let quickReply of quickReplies) {
      response["quick_replies"].push({
        content_type: "text",
        title: quickReply["title"],
        payload: quickReply["payload"]
      });
    }

    return response;
  }

  static genGenericTemplate(elements) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: elements
        }
      }
    };

    return response;
  }

  static genImageTemplate(image_url, title, subtitle = "") {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: title,
              subtitle: subtitle,
              image_url: image_url
            }
          ]
        }
      }
    };

    return response;
  }

  static genButtonTemplate(title, buttons) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: title,
          buttons: buttons
        }
      }
    };

    return response;
  }

  static genListTemplate(type, elements) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "list",
          top_element_style : type,
          elements: elements
        }
      }
    };

    return response;
  }

  static genText(text) {
    let response = {
      text: text
    };

    return response;
  }

  static genTextWithPersona(text, persona_id) {
    let response = {
      text: text,
      persona_id: persona_id
    };

    return response;
  }

  static genPostbackButton(title, payload) {
    let response = {
      type: "postback",
      title: title,
      payload: payload
    };

    return response;
  }


  static genWebUrlButton(title, url) {
    let response = {
      type: "web_url",
      title: title,
      url: url
    };

    return response;
  }

  static async genWelcomeMessage(sender_psid) {

    var userbody = await fbAPI.getUserProfile(sender_psid);
    var name = userbody.first_name;
    let welcome = this.genText("Hola "+name+". Soy tu asistente virtual del curso de Programación. Estos son algunos temas con los que te puedo ayudar:");

    var menus = await menu.showMenu(null);
    let menusresponse = this.genGenericTemplate(menus);

    return [welcome, menusresponse];
  }

  static async genThanksMessage(sender_psid) {

    return this.genText("Estoy aquí para ayudarte 😉");
  }

  static async genByeMessage(sender_psid) {

    return this.genText("Adios. Estaré aquí para ayudarte cuando me necesites 😃");

  }

  static async genMenuMessage(nameMenu,type) {
    console.log("Menu");
    console.log(nameMenu);
    var menus = await menu.showMenu(nameMenu,type);
    let menusresponse = this.genGenericTemplate(menus);

    return menusresponse;
  }

  static async genAttachment(url,user) {
    let responseAttachment = {
      attachment: {
        type: "file",
        payload: {
          is_reusable: "false",
          url: url
        }
      }
    };

    let requestBody = {
      recipient: {
        id: user.psid
      },
      message: responseAttachment
    };
    try{
      let attachmentId = await fbAPI.callSendAPIWithAttachment(requestBody);
      console.log(attachmentId);

      let response = {
        attachment: {
          type: "file",
          payload: {
            attachment_id: attachmentId
          }
        }
      };
      
      return response;
    }catch(error){
      console.log(error);
      return await Response.genText("Ha ocurrido un error");
    }

    
  }
};


