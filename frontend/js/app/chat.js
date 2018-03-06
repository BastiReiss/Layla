var chat = (function() {

  var messages = [];
  var msgCount = 0;

  var name = "basti";

  var serverData = {
      apiEndpoints: {
          uri : 'http://127.0.0.1:5000/',
          msg: 'message',
          mood: 'mood',
          resp: 'response'
      }
  };
/*
$.ajax({
          method: "GET",
          dataType: "Json",
          async: true,
          url: serverData.uri + serverData.resp,
        })
        .done(function(msg) {
          console.log("Data Saved: " + msg);
      });

$.getJSON('http://127.0.0.1:5000/response',function(data){
    console.log(data);
});
*/

  var chat_answers = {

    depressed: {
      text: "There are a lot of things you can do, if you feel depressed ! Try to go out and do something you enjoy, it will defenetly change your mood "
    },
    anxious: {
      text: "You seem anxious, try to understand the fear ! think of it, does your Problem affect you right now ?"
    },
    happy: {
      text: "There you go ! you rock ! stay happy "
    },
    help: {
      text: "Wait, here are some numbers in you're area you can call ! There is always a solution"
    },
    greeting: {
      text: "Hello "+name+" , I am fine, thanks for asking. How do you feel ?"
    }
  };


  this.saveMessage = function() {
    var $msg = $('#message_text').val();
    if ($msg.length > 0) {
      var msg = new Message($msg, Date.now(), name);
      console.log(name);
      messages.push(msg);
      answer($msg);
    }
  }

  this.analyseMessage = function(msg) {
    var answer = "Good to hear " + name;
    //split string into array
    var arr = msg.split(" ");
    //check text and reply
    if (arr.indexOf("how") > -1 && arr.indexOf("you") > -1) {
      answer = chat_answers.greeting.text;
    } else if (arr.indexOf("sad") > -1 || arr.indexOf("depressed") > -1) {
      answer = chat_answers.depressed.text;
    } else if (arr.indexOf("anxious") > -1 || arr.indexOf("fear") > -1) {
      answer = chat_answers.anxious.text;
    } else if (arr.indexOf("happy") > -1 || arr.indexOf("good") > -1) {
      answer = chat_answers.happy.text;
    } else if (arr.indexOf("help") > -1 || arr.indexOf("suicide") > -1) {
      answer = chat_answers.help.text;
    }
    console.log(answer);
    return answer;
  }

  this.answer = function(msg) {

    var answer = this.analyseMessage(msg);
    var msg = new Message(answer, Date.now(), "layla");
    messages.push(msg);

  }

  this.receiveMessages = function(url) {
    $.ajax({
        method: "GET",
        url: url,
      })
      .done(function(msg) {
        console.log("Data Saved: " + msg);
      });

  }

  this.sendMessage = function(msg) {
    $.ajax({
        method: "POST",
        url: url,
      })
      .done(function(msg) {
        console.log("Data sent: " + msg);
      });

  }

  this.parseMessage = function() {

  }

  this.loadMessages = function() {

  }

  this.bindEvents = function() {

  }

  function Message(text, date, sender, id) {
    this.text = text;
    this.date = date;
    this.sender = sender || "layla";
    this.id = id;
  }

  return {
    messages: messages,
    saveMessage: saveMessage,
    receiveMessages: receiveMessages,
    answer: answer
  }
})();
