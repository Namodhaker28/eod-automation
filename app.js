const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();
const getDateAndDay = require('./helper');
const TelegramBot = require("node-telegram-bot-api");

const app = express();

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
let task = "UNTRADE"
const dateAndDay  = getDateAndDay()

bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

  // Listen for any kind of message. There are different kinds of
  // messages.
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log("++++",msg.text)
    task = msg.text

    sendMail()
    bot.sendMessage(chatId, 'Received your EOD task');
  });


// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "namonarayan@zeltatech.com",
      pass: process.env.PASSWORD,
    },
  })





// Define the task to send email at 8pm daily
// cron.schedule('0 20 * * *', () => {
const sendMail = async () => {

  const mailOptions = {
    from: 'namonarayan@zeltatech.com',
    to: 'naveen@zeltatech.com ,hr@zeltatech.com ',
    subject: `EOD Report | Namo Narayan | tech | ${dateAndDay.date}  ${dateAndDay.day}`,
    text: "",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Content</title>
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>

    <table>
        <thead>
            <tr>
                <th>S No.</th>
                <th>date</th>
                <th>task</th>
                <th>type</th>
                <th>departmen</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>${dateAndDay.date}</td>
                <td>${task}</td>
                <td>development</td>
                <td>tech</td>
            </tr>
        </tbody>
    </table>

    </body>
    </html>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' , info);
    }
  });
};

// sendMail()

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

