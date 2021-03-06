var Backbone = require('backbone');
var _ = require('underscore');
var MessageView = require('../views/MessageView');
var ChatForm = require('../views/ChatForm');
var JoinForm = require('../views/JoinForm');
var UserJoinedAlert = require('../views/UserJoinedAlert');
var UserIsTypingLabel = require('../views/UserIsTypingLabel');

var io = window.io;

var ApplicationController = function () {
    this.init();
    this.initEvents();
    this.initViews();
};

_.extend(ApplicationController.prototype, Backbone.Events, {

    init: function () {
        var socket = io.connect();
        var self = this;

        // Make sure to be connected to the socket before allowing any network action
        socket.on('connect', function socketConnect() {

            if (!socket.username) {
                var joinForm = new JoinForm();
                self.listenTo(joinForm, 'joinForm:submit', self.join);
            } else {
                self.initSocketEventMessages();
            }

        });

        window.socket = socket;
    },

    initEvents: function() {
        var self = this;
        window.dispatcher = _.clone(Backbone.Events);
        this.listenTo(dispatcher, 'message:new', this.sendMessage);
        this.listenTo(dispatcher, 'message:typing', function() {
            socket.post('/typing', { isTyping: true });
        });
        this.listenTo(dispatcher, 'message:notTyping', function() {
            socket.post('/typing', { isTyping: false });
        });
    },

    initViews: function() {
        var messagesElement = document.getElementById('messages');
        var chatFormElement = document.getElementById('chatForm');
        var userIsTypingLabelElement = document.getElementById('userIsTypingLabel');

        this.messageView = new MessageView();
        messagesElement.parentNode.replaceChild(this.messageView.el, messagesElement);

        this.chatForm = new ChatForm();
        chatFormElement.parentNode.replaceChild(this.chatForm.el, chatFormElement);

        this.userIsTypingLabel = new UserIsTypingLabel();
        userIsTypingLabelElement.parentNode.replaceChild(this.userIsTypingLabel.el, userIsTypingLabelElement);
    },

    initSocketEventMessages: function() {
        var self = this;

        socket.on('chat.message', function (message, username) {
            dispatcher.trigger('chat:message', message, username);
        });

        socket.on('chat:typing', function (username) {
            self.userIsTypingLabel.setUsername(username);
            self.userIsTypingLabel.show();
        });

        socket.on('chat:notTyping', function (username) {
            self.userIsTypingLabel.hide();
        });

        socket.on('user joined', function (username) {
            var userJoinedAlert = new UserJoinedAlert({ username: username });
            document.body.insertBefore(userJoinedAlert.el, document.body.firstChild);
        });

        this.chatForm.setFocus();
    },

    join: function(username) {
        var self = this;
        socket.get('/join', { username: username }, function (response) {
            socket.username = response.username;
            self.initSocketEventMessages();
        });
    },

    sendMessage: function (message) {
        socket.post('/message', { username: socket.username, message: message });
        dispatcher.trigger('chat:message', message, 'Me');
    }
});

module.exports = ApplicationController;