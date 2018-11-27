const token = '766202188:AAHytXhH9sg6_JzcH0XAZg3Z_f40rmhAhqU';
const converter = require('./convertor')
// const querystring = require("querystring");
var express = require('express')
const bodyParser = require('body-parser')
var app = express()
const axios = require('axios')
app.use(bodyParser.json())
app.post('/update',  function (req, res) {
    console.log("req.body : ", req.body)
    const message = req.body.message
    const chatId = message.chat.id
    const text = message.text
    if (Number(text) ==0 || Number(text)){
        sendMessage(chatId, "Let me think, I should calculate and send result to you ....")
            .then((result ) => {
                try{
                    const coding = converter.getFullCoding(Number(text))
                    sendMessage(chatId, "```\n" + coding+"\n```");
                }catch (err){
                    sendMessage(chatId, "You entered number with big(>1000) primitive factor, I have not enouf resource to calculate that");

                }
            })
    }else{
        sendMessage(chatId,'Send me a number, I will send you the programing of this number',{parse_mode:'Markdown'})
    }
    console.log('msg : ', message)
    console.log('req.body : ', req.body)
    res.send('Hello World')
})
console.log("Listening port : ", process.env.PORT ||443)
function sendMessage(id, message) {
   // return axios.get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${querystring.stringify(message)}&parse_mode=Markdown`)
   return axios.post(`https://api.telegram.org/bot${token}/sendMessage`,
       {
           chat_id :id,
           text : message,
           parse_mode:"Markdown"
       })
}
app.listen(process.env.PORT ||3000)