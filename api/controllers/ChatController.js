/**
 * ChatController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ChatController)
   */
  _config: {},

  roomName: 'chatroom',

  index: function (request, response) {
    response.view();
  },

  join: function (request, response) {
    var username = request.param('username');
    var socket = request.socket;
    socket.username = username;

    socket.join(this.roomName);

    socket.broadcast.to(this.roomName).emit('user joined', socket.username);

    response.json({ username: socket.username });
  },

  message: function (request, response) {
    var message = request.param('message');
    var io = sails.io;
    var socket = request.socket;

    socket.broadcast.to(this.roomName).emit('chat.message', message, socket.username);

  }

};
