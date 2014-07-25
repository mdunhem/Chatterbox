var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    className: 'alert alert-info',

    events: {
        'click [data-dismiss="alert"]': 'close'
    },

    text: ' has joined the chatroom.',

    closeButton: function() {
        var button = document.createElement('button');
        button.classList.add('close');
        button.setAttribute('data-dismiss', 'alert');
        button.appendChild(document.createTextNode('x'));
        return button;
    },

    initialize: function(options) {
        console.log(options);
        this.render(options.username);
        this.delegateEvents();
    },

    render: function(username) {
        var usernameTextNode = document.createElement('strong');
        usernameTextNode.appendChild(document.createTextNode(username));

        var textNode = document.createTextNode(this.text);

        this.el.appendChild(this.closeButton());
        this.el.appendChild(usernameTextNode);
        this.el.appendChild(textNode);
    },

    close: function(event) {
        this.remove();
        event.preventDefault();
    }
});