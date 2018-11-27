const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '766202188:AAHytXhH9sg6_JzcH0XAZg3Z_f40rmhAhqU';

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
bot.getMe(result => {
    console.log("getMe() : ", result)
})


var express = require('express')
const bodyParser = require('body-parser')
var app = express()
const axios = require('axios')
app.use(bodyParser.json())
app.post('/update', function (req, res) {
    console.log("req.body : ", req.body)
    const message = req.body.message
    const chatId = messge.chat.id
    const text = message.text
    if (Number(text) ==0 || Number(text)){
        sendMessage(chatId, "Let me think, I should calculate and send you");
        sendMessage(chatId, "```\n" + converter.getFullCoding(Number(text))+"\n```",{parse_mode:'Markdown'});
    }else{
        sendMessage(chatId,'Send me a number, I will send you the programing of this number',{parse_mode:'Markdown'})
    }
    console.log('msg : ', msg.from)
    console.log('req.body : ', req.body)
    res.send('Hello World')
})
console.log("Listening port : ", process.env.PORT ||443)
function sendMessage(id, message) {
    axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text={message}&parse_mode=Markdown`)
}
app.listen(process.env.PORT ||443)