const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const messagesRouter = require("../routes/messages");
const channelsRouter = require("../routes/channels");
const usersRouter = require("../routes/users");
const db = require("../lib/db");

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.get('/', (req, res) => {
  res.send([
    '<h1>Our Messaging Chat App</h1>'
  ].join(''))
})

app.use("/channels", channelsRouter);

app.get('/channels/:id/messages', async (req, res, next) => {
  try {
      const messages = await db.messages.list(req.params.id)
      res.json(messages)
  } catch(err) {
      next(err);
  }
})

app.post('/channels/:id/messages', async (req, res, next) => {
  try {
      const message = await db.messages.create(req.body)
      res.status(201).json(message)
  } catch(err) {
      next(err)
  }
})

app.use("/users", usersRouter)

module.exports = app