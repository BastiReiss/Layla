var app = (function(){

    this.routes = {
        home: {
            route: '/home',
            id: 'home'
        },
        login: 'login',
        mood: {
            home:{
                route: 'mood/start',
                id: 'mood_container',
            },
            tracker: {
                route: 'mood/tracker',
                id: 'mood_tracker_container'
            }
        },
        chat : {
            start: {
                route: 'chat/start',
                id: 'chat_container'
            },
            conversation: {
                route: 'chat/conversation',
                id: 'chat_conv_container'
            }
        },
        diary: {
            diaryOverview:{
                route: 'diary/overview',
                id: 'diary_overview'
            },
            diaryPost: {
                route: 'diary/post',
                id: 'diary_post_cont',
                postid: 0
            }
        }
    }

    this.state = routes.home;

    this.loadState = function(state,route){
        var oldstate = state,
            newState = route;
        document.getElementById(state);
    }

    this.bindEvents = function(){

    }

    this.hide = function(el){
        el.style.visibility = 'hidden';
    }
    this.show = function(el){
        el.style.visibility = 'visible';
    }



})()
