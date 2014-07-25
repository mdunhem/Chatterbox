/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

    // Read in the package.json and assign it to the sails.config global for access later
    var fs = require('fs');
    var file = __dirname + '/../package.json';

    fs.readFile(file, 'utf8', function (error, data) {
      if (error) {
        console.log('Error: ' + error);
        return;
      }

      data = JSON.parse(data);
      sails.config.appName = data.name;
      sails.config.package = data;
    });

    // It's very important to trigger this callack method when you are finished 
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
};