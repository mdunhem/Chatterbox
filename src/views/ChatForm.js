var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'form',

    className: 'input-group',

    template: require('./templates/ChatForm.hbs'),

    events: {
        'submit': 'sendChatMessage',
        'click button': 'sendChatMessage'
    },

    initialize: function() {
        this.render();
        this.input = this.el.querySelector('input');
        this.delegateEvents();
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
    }
});