const express = require("express")
let db = require("../lib/db");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const channels = await db.channels.list()
        res.json(channels)
    } catch(error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const channel = await db.channels.create(req.body)
        res.status(201).json(channel)
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const channel = await db.channels.get(req.params.id)
        res.json(channel)
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const channel = await db.channels.update(req.body)
        res.json(channel)
    } catch(error) {
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const channel = await db.channels.delete(req.body);
        res.json(channel)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router