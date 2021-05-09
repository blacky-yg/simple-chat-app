const express = require("express")
let db = require("../lib/db");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await db.users.list()
    res.json(users)
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await db.users.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await db.users.get(req.params.id)
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const user = await db.users.update(req.body)
    res.json(user)
  } catch (error) {
    console.log(error);
  }
})

module.exports = router