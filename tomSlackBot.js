const Botkit = require('botkit');
const request = require('request');

let controller = Botkit.slackbot({
    debug: false
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
        token: process.env.BOTTOKEN,
}).startRTM();

controller.hears('salam',['direct_message','direct_mention','mention'],(bot,message) => {
    bot.reply(message,`wa Alikom Salam <@${message.user}> :smiley:`);
});

controller.hears('kech jdid', ['direct_message','direct_mention','mention'], (bot, message) => {
  let jdid = [];
  request.get('https://boiling-inlet-40180.herokuapp.com/news', (err,res,body) => {
    if (!err && res.statusCode == 200) {
      jdid = JSON.parse(body);
    }

    let thenews = "";
    for (let variable in jdid) {
      thenews += "* " + jdid[variable].text + "\n";

    }
    if (jdid.length>0) {
      bot.reply(message, "wah kayan, please check:\n" + thenews);
    }else {
      bot.reply(message, "walo :confused:");
    }
  });
});
controller.hears('tu sais, je suis', ['direct_message','direct_mention','mention'], (bot, message) => {
  request.post({
      url: 'http://text-processing.com/api/sentiment/',
      form: {
        language: 'french',
        text: message.text
      }
    },
    function(error, response, body){
      let answerLabel = JSON.parse(body)["label"];
      if (answerLabel==='neg') {
        return bot.reply(message, "Oh :confused:, Ghi lkhir ?");
      } else {
        return bot.reply(message, "Ah :smiley: Glad to hear that !");
      }
      }
  );
});

controller.hears('you know, I\'m', ['direct_message','direct_mention','mention'], (bot, message) => {
  request.post({
      url: 'http://text-processing.com/api/sentiment/',
      form: {
        text: message.text
      }
    },
    function(error, response, body){
      let answerLabel = JSON.parse(body)["label"];
      if (answerLabel==='neg') {
        return bot.reply(message, "Oh :confused:, Ghi lkhir ?");
      } else {
        return bot.reply(message, "Ah :smiley: Glad to hear that !");
      }
      }
  );
});

controller.on('direct_message', (bot, message) => {
    bot.reply(message, "3lach rak tgoli \""+ message.text +"\" ?");
});

module.exports = controller;
