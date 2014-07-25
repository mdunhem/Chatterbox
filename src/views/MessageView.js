var Backbone = require('Backbone');

module.exports = Backbone.View.extend({

    initialize: function() {
        this.listenTo(dispatcher, 'chat:message', this.addMessage);
    },

    messageTemplate: function() {
        return document.createElement('li');
    },

    addMessage: function(message, username) {
        var usernameNode = document.createElement('dt');
        usernameNode.appendChild(document.createTextNode(username));
        this.el.appendChild(usernameNode);

        var messageNode = document.createElement('dd');
        messageNode.appendChild(document.createTextNode(message));
        this.el.appendChild(messageNode);

        // var node = this.messageTemplate();
        // node.appendChild(document.createTextNode(username + ': ' + message));
        // this.el.appendChild(node);
    }
});