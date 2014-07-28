var Backbone = require('backbone');
var ENTER_KEY = 13;

module.exports = Backbone.View.extend({

    tagName: 'form',

    className: 'input-group',

    template: require('./templates/ChatForm.hbs'),

    events: {
        'submit': 'sendChatMessage',
        'click button': 'sendChatMessage',
        // 'keypress': 'keypressed'
        'keyup':'keyup'
    },

    initialize: function() {
        this.render();
        this.input = this.el.querySelector('input');
        this.delegateEvents();
        this.typing = false;
    },

    render: function() {
        this.el.innerHTML = this.template();
    },

    sendChatMessage: function(event) {
        if (this.input.value) {
            var message = this.input.value;
            dispatcher.trigger('message:new', message);
            this.input.value = '';
        }
        event.preventDefault();
    },

    setFocus: function() {
        this.input.focus();
    },

    keypressed: function(event) {
        console.log(event);
        var keycode = event.keyCode;
        if (keycode != ENTER_KEY) {
            if (this.input.value) {
                if (!this.isTyping()) {
                    this.setTyping(true);
                }
            } else {
                if (this.isTyping()) {
                    this.setTyping(false);
                }
            }
        }
    },

    keyup: function(event) {
        var keyCode = event.keyCode;
        if (keyCode != ENTER_KEY) {
            if (this.input.value) {
                dispatcher.trigger('message:typing');
            } else {
                dispatcher.trigger('message:notTyping');
            }
        }
    },

    setTyping: function(isTyping) {
        this.typing = isTyping;
        if (this.typing) {
            dispatcher.trigger('message:typing');
        } else {
            dispatcher.trigger('message:notTyping');
        }
    },

    isTyping: function() {
        return this.typing;
    }
});