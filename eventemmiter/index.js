const ChatApp = require('./chatApp');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

const chatOnMessage = (message) => {
  console.log(message);
};

const prepareForAnswer = () => {
  console.log('Готовлюсь к ответу');
};

const setCloseTimeout = (chat, timeout, text) => {
  setTimeout( ()=> {
    console.log(text);
    chat.close();
  }, timeout );
};

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);

webinarChat.on('message', prepareForAnswer);
vkChat.setMaxListeners(2);
vkChat.on('message', prepareForAnswer);
vkChat.once('close', () => console.log('Чат вконтакте закрылся :('));


setCloseTimeout(vkChat, 10000, 'Закрываю вконтакте...');

setCloseTimeout(facebookChat, 15000, 'Закрываю фейсбук!');

setCloseTimeout(webinarChat, 30000, 'Закрываю вебинар');