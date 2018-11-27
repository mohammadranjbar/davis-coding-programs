const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '766202188:AAHytXhH9sg6_JzcH0XAZg3Z_f40rmhAhqU';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const converter = require('./convertor')

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text
   if (Number(text) ==0 || Number(text)){
        bot.sendMessage(chatId, "```\n" + converter.getFullCoding(Number(text))+"\n```",{parse_mode:'Markdown'});
    }else{
       bot.sendMessage(chatId,'Send me a number, I will send you the programing of this number',{parse_mode:'Markdown'})
   }

    console.log('msg : ', msg.from)
    // send a message to the chat acknowledging receipt of their message

});