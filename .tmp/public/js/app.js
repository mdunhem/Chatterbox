/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  var messagesList = document.getElementById('messages');
  var chatInput = document.getElementById('chatInput');
  var chatInputSendButton = document.getElementById('chatInputSendButton');

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {

      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////

    });


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////

    if (!socket.username) {
        // socket.emit('add user', 'Mike');
        socket.get('/join', { username: 'Mike' }, function (response) {
          socket.username = response.username;
        });
    }

    socket.on('chat.message', function (message, username) {
      insertMessage(message, username);
    });

    socket.on('user joined', function (username) {
      console.log(username + ' has joined');
    });

  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }

  // chatInputSendButton.onclick = function (event) {
  //   var message = chatInput.value;
  //   socket.post('/message', { message: message });
  //   insertMessage(message, socket.username);
  //   chatInput.value = '';

  //   event.preventDefault();
  // };

  function insertMessage (message, username) {
    var li = document.createElement('li');
    li.innerHTML = username + ': ' + message;
    messagesList.appendChild(li);
  }

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);
