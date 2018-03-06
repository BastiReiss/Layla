from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

app = Flask(__name__)
api = Api(app)

response = {
    'greeting': {'text': 'I am fine, thanks for asking. How do you feel ?'},
    'depressed': {'text': 'There are a lot of things you can do, if you feel depressed ! Try to go out and do something you enjoy, it will defenetly change your mood'},
    'anxious': {'text': 'You seem anxious, try to understand the fear ! think of it, does your Problem affect you right now'},
    'happy': {'text': 'There you go ! you rock ! stay happy'},
    'help': {'text': 'Wait, here are some numbers in youre area you can call ! There is always a solution' },
}

message = {
    '1': {'text': {'1':'hello'}, 'text': {'1':'how are you?'}  },
    '2': {'text': 'Thanks Im fine' },
    '3': {'text': 'There are a lot of things you can do, if you feel depressed ! Try to go out and do something you enjoy, it will defenetly change your mood '},
}

mood = {
    '1': { 'mood':"sad=80,happy=20,anxious=30,relaxed=70" },
    '2': { 'mood':"sad=40,happy=60,anxious=20,relaxed=80" },
    '3': { 'mood':"sad=10,happy=90,anxious=20,relaxed=80" },
}

# mood = {
#     '1': {
#         'sad': {'value': 20 },
#         'happy': { 'value': 80 },
#         'anxious': { 'value': 30 },
#         'relaxed': { 'value': 70 },
#         }

########### Response API Enpoints ###############

def abort_if_response_doesnt_exist(response_id):
    if response_id not in response:
        abort(404, message="Response {} doesn't exist".format(response_id))

parser = reqparse.RequestParser()
parser.add_argument('resp')


class Response(Resource):
    """
    # Response
    # shows a single response item and lets you delete a response item
    """
    def get(self, response_id):
        """
        Get response by id
        @param response_id
        @return response
        """
        abort_if_response_doesnt_exist(response_id)
        return response[response_id]

    def delete(self, response_id):
        """
        delete response by id
        @param response_id
        @return emptyString,204
        """
        abort_if_response_doesnt_exist(response_id)
        del response[response_id]
        return '', 204

    def put(self, response_id):
        """
        delete response by id
        @param response_id
        @return response,201
        """
        args = parser.parse_args()
        resp = {'resp': args['resp']}
        response[response_id] = response
        return response, 201

class ResponseList(Resource):
    """
    # ResponseList
    # shows a list of all responses, and lets Admin POST to add new responses
    #all responses from LAYLA
    """
    def get(self):
        return response

    def post(self):
        args = parser.parse_args()
        response_id = int(max(response.keys()).lstrip('response')) + 1
        response_id = 'response%i' % response_id
        response[response_id] = {'resp': args['resp']}
        return response[response_id], 201

"""
##
## setup the Api resource routing
##
"""
api.add_resource(ResponseList, '/response')
api.add_resource(Response, '/response/<response_id>')

########### Message API Enpoints ###############

parser = reqparse.RequestParser()
parser.add_argument('msg')


class Message(Resource):
    """
    # Messsage
    # shows a single message instance and lets you read/delete/put a message
    """
    def get(self, message_id):
        """
        Get message by id
        @param message_id
        @return message
        """
        abort_if_message_doesnt_exist(message_id)
        return message[message_id]

    def delete(self, message_id):
        """
        delete message by id
        @param message_id
        @return '',204
        """
        abort_if_message_doesnt_exist(message_id)
        del message[message_id]
        return '', 204

    def put(self, message_id):
        """
        save message by id
        @param message_id
        @return '',201
        """
        args = parser.parse_args()
        msg = {'msg': args['msg']}
        message[message_id] = msg
        return msg, 201


class MessageList(Resource):
    """
    # MessageList
    # shows a list of all messages, and lets User POST to add new messages
    # use JS:POST::MSG for posting a user message
    """
    def get(self):
        return message

    def post(self):
        args = parser.parse_args()
        message_id = int(max(message.keys()).lstrip('message')) + 1
        message_id = 'message%i' % message_id
        message[message_id] = {'msg': args['msg']}
        return message[message_id], 201
"""
##
## setup the Api resource routing
##
"""
api.add_resource(MessageList, '/message')
api.add_resource(Message, '/message/<message_id>')


########### MOOD API Enpoints ###############

parser = reqparse.RequestParser()
parser.add_argument('md')

class Mood(Resource):
    """
    # Messsage
    # shows a single mood item and lets you delete a mood item
    """
    def get(self, mood_id):
        abort_if_mood_doesnt_exist(mood_id)
        return mood[mood_id]

    def delete(self, mood_id):
        abort_if_mood_doesnt_exist(mood_id)
        del mood[mood_id]
        return '', 204

    def put(self, mood_id):
        args = parser.parse_args()
        md = {'md': args['md']}
        mood[mood_id] = md
        return task, 201


class MoodList(Resource):
    """
    # moodList
    # shows a list of all moods, and lets User POST to add new moods
    # use JS:POST::MSG for posting a user mood
    """
    def get(self):
        return mood

    def post(self):
        args = parser.parse_args()
        mood_id = int(max(mood.keys()).lstrip('mood')) + 1
        mood_id = 'mood%i' % mood_id
        mood[mood_id] = {'md': args['md']}
        return mood[mood_id], 201
"""
##
## setup the Api resource routing
##
"""
api.add_resource(MoodList, '/mood')
api.add_resource(Mood, '/mood/<mood_id>')



if __name__ == '__main__':
    app.run(debug=True)
