var Backbone = require('backbone');

module.exports = Backbone.View.extend({
    events: {
        'submit': 'sendChatMessage',
        'click button': 'sendChatMessage'
    },

    initialize: function() {
        this.input = this.el.querySelector('input');
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
    }
});