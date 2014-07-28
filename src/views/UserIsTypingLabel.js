var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'p',

    className: 'text-center',

    username: 'User',

    initialize: function() {
        this.render();
        this.hide();
    },

    render: function() {
        this.el.innerHTML = this.username + ' is typing';
    },

    setUsername: function(username) {
        this.username = username;
        this.render();
    },

    show: function() {
        this.el.classList.remove('hidden');
        this.el.classList.add('show');
    },

    hide: function() {
        this.el.classList.remove('show');
        this.el.classList.add('hidden');
    }
});