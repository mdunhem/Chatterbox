var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
// Backbone.sync = require('./Sync');

var ApplicationController = require('./controllers/ApplicationController');

(function () {
    var applicationController = new ApplicationController();
})();