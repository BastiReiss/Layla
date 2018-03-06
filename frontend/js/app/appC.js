var app = (function(){

    var BTN_mood = $('#BTN_moodtracker'),
        BTN_send = $('#BTN_msg_send1'),
        BTN_mt = $('#BTN_hide_mt'),
        textarea = $('#message_text'),
        SceneMsg = $('#scene_msg'),
        moodtracker = $('#mood_canvas');

    var msg_n = 0;
    this.name = "basti";
/*
    var mood_answers = {
        sad : {
            text: "It seems you are sad. I'm sorry, might this picture of a Panda make you smile ? "
          },
        neutral: {
            text: "You seem neutral and sad, that might be a sign of depression"
        },
        anxious: {
            text: "You seem anxious, try to understand the fear ! think of it, does your Problem affect you right now ?"
        },
        happy: {
            text: "There you go ! you rock ! stay happy "
        }
      };
*/
    this.routes = {
        home: {
            route: '/home',
            id: 'home'
        },
        login: 'login',
        mood: {
            route: 'mood/tracker',
            id: 'mood_canvas'
            },
        chat : {
                route: 'chat/conversation',
                id: 'chat_conv_container'
            }
        };

    this.state = routes.home;

    this.loadState = function(state,route){
        var oldstate = state,
            newState = route;
        document.getElementById(state);
    }

    this.bindEvents = function(){
        BTN_mood.on('click', function(){
            moodtracker.slideToggle( "slow", function() {

            });
        });
        BTN_mt.on('click', function(){
            moodtracker.slideToggle( "slow", function() {

            });
        });

        textarea.on('click',function(){
            console.log("textgrow");
        })

        BTN_send.on('click', function(){
            chat.saveMessage();
            showMessages(msg_n);
            textarea.val('');
        })
    }

    this.hide = function(el){
        el.style.visibility = 'hidden';
    }
    this.show = function(el){
        el.style.visibility = 'visible';
    }

    this.scrollToBottomOfMessages = function(){
        var height = SceneMsg[0].scrollHeight;
        SceneMsg.animate({scrollTop: height}, 500, 'swing', function() {
        console.log("Finished animating");
        });

    }

    this.bindEvents();

/*
*
*   @param n : msg_n -> the count of last message in Array app.messages[]
*   @function: load the last message from the Array app.messages
*
*/
    function showMessages(n){
            console.log(n);
            Message(chat.messages[n]);
            this.setTimeout(1000,this.scrollToBottomOfMessages());
    }

/*
*
*   @param msg : $msg from CHAT Modul
*   @function: create Dom Element and load $msg
*
*/

    function Message(msg){
        var $msg = $('<div>');
        //check if message is from Bot
        if(msg.sender === 'layla'){
            $msg.addClass('message_out');
        }else{
            $msg.addClass('message_in');
            //console.log("chat.Message name error");
        }
        $msg.html(msg.text);
        //console.log(msg.text);
        SceneMsg.append($msg);
        msg_n += 1;
    }

    return{
        msg_n : msg_n
    }

})();
