var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    className: 'modal fade in',

    events: {
        'submit': 'submit'
    },

    template: require('./templates/JoinForm.hbs'),

    initialize: function() {
        this.render();
        this.delegateEvents();
    },

    render: function() {
        this.el.innerHTML = this.template();
        this.setupElements();
        this.open();
    },

    setupElements: function() {
        this.form = this.el.querySelector('form');
        this.input = this.el.querySelector('input');
    },

    open: function() {
        document.body.appendChild(this.el);
        this.el.classList.toggle('modal-show');
        this.addBackdrop();
        this.input.focus();
    },

    close: function(event) {
        this.removeBackdrop();
        document.body.removeChild(this.el);
    },

    submit: function(event) {
        var username = this.input.value;
        if (username) {
            this.trigger('joinForm:submit', username);
            this.close();
        }

        event.preventDefault();
    },

    addBackdrop: function() {
        if (!this.backdrop) {
            this.createBackdrop();
        }
        document.body.appendChild(this.backdrop);
    },

    removeBackdrop: function() {
        document.body.removeChild(this.backdrop);
    },

    createBackdrop: function() {
        this.backdrop = document.createElement('div');
        this.backdrop.classList.add('modal-backdrop', 'fade', 'in');
    }
});