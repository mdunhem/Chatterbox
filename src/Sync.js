var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('../node_modules/backbone/node_modules/underscore/underscore.js');

module.exports = function (method, model, options) {
    var params = _.extend({}, options);

    if (params.url) {
        params.url = _.result(params, 'url');
    } else {
        params.url = _.result(model, 'url');
    }

    var cmd = params.url.split('/'),
        namespace = (cmd[0] !== '') ? cmd[0] : cmd[1];

    if (!params.data && model) {
        params.data = params.attr || model.toJSON(options) || {};
    }

    if (params.patch === true && params.data.id === null && model) {
        params.data.id = model.id;
    }

    var io = model.socket || Backbone.socket || window.socket;

    var defer = $.Deferred();
    io.emit(namespace + ':' + method, params.data, function(error, data) {
        if (error) {
            if (options.error) {
                options.error(error);
            }
            defer.reject();
        } else {
            if (options.success) {
                options.success(data);
            }
            defer.resolve();
        }
    });

    var promise = defer.promise();
    model.trigger('request', model, promise, options);

    return promise;
};

var urlError = function() {
    throw new Error('A "url" property or function must be specified.');
}