var Backbone = require('Backbone');
var Message = require('../models/Message');

module.exports = Backbone.Collection.extend({

    model: Message,

    url: '/message'
});