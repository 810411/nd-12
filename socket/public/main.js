$(function () {
  const FADE_TIME = 150; // ms
  const TYPING_TIMER_LENGTH = 400; // ms
  const COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  let $window = $(window);
  let $usernameInput = $('.usernameInput'); // Input for username
  let $messages = $('.messages'); // Messages area
  let $inputMessage = $('.inputMessage'); // Input message input box
  let $selectRoom = $('#room');

  let $loginPage = $('.login.page'); // The login page
  let $chatPage = $('.chat.page'); // The chatroom page

  let username;
  let room;
  let connected = false;
  let typing = false;
  let lastTypingTime;
  let $currentInput = $usernameInput.focus();

  const socket = io();

  function addParticipantsMessage(data) {
    let message = '';
    if (data.users.length === 1) {
      message += `Один участник в ${data.room}`;
    } else {
      message += `${data.users.length} участников в ${data.room}`;
    }
    log(message);
  }

  function addParticipants(data) {
    addParticipantsMessage(data);
    $("#userListHead").html(`${data.room} users:`);
    let $userList = $("#userList");
    $userList.html('');
    data.users.forEach((item) => {
      let $li = $('li');
      let $usernameDiv = $('<span class="username"/>')
        .text(item)
        .css('color', getUsernameColor(item));
      $('<li />', {html: $usernameDiv}).appendTo('ul#userList');
    });
  }

  function setUsername() {
    username = cleanInput($usernameInput.val().trim());
    room = 'Общая';

    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      socket.emit('add user', username, room);
    }
  }

  function sendMessage() {
    let message = $inputMessage.val();
    message = cleanInput(message);
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
      socket.emit('new message', message);
    }
  }

  function log(message, options) {
    let $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  function addChatMessage(data, options) {
    let $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    let $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    let $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    let typingClass = data.typing ? 'typing' : '';
    let $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  function addChatTyping(data) {
    data.typing = true;
    data.message = 'печатает..';
    addChatMessage(data);
  }

  function removeChatTyping(data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  function addMessageElement(el, options) {
    let $el = $(el);

    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  function cleanInput(input) {
    return $('<div/>').text(input).text();
  }

  function updateTyping() {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        let typingTimer = (new Date()).getTime();
        let timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  function getTypingMessages(data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  function getUsernameColor(username) {
    let hash = 7;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    let index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  $window.keydown(function (event) {
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function () {
    updateTyping();
  });

  $inputMessage.click(function () {
    $inputMessage.focus();
  });

  $("#roomIn").change(function () {
    socket.disconnect();
    room = $(this).val();
    socket.connect();
    socket.emit('add user', username, room);
  });

  socket.on('login', function (data) {
    $messages.html('');
    $("#roomIn").val(data.room);
    connected = true;
    let message = "Добро пожаловать в Socket.IO Чат: " + data.room;
    log(message, {
      prepend: true
    });
    addParticipants(data);
  });

  socket.on('new message', function (data) {
    addChatMessage(data);
  });

  socket.on('user joined', function (data) {
    log(data.username + ' присоеденился');
    addParticipants(data);
  });

  socket.on('user left', function (data) {
    log(data.username + ' вышел');
    addParticipants(data);
    removeChatTyping(data);
  });

  socket.on('typing', function (data) {
    addChatTyping(data);
  });

  socket.on('stop typing', function (data) {
    removeChatTyping(data);
  });

  socket.on('reconnect', function () {
    log('вы были повторно подключены');
    if (username) {
      socket.emit('add user', username, room);
    }
  });

  socket.on('reconnect_error', function () {
    log('попытка повторного подключения не удалась');
  });
});