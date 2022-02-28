const express = require('express');
const ExpressError = require('../ExpressError');
// const items = require('../fakeDB');
const items = require("../model");

const router = new express.Router();


router.get("/", (req, res) => {
    return res.json(items.list);
});

router.post("/", (req, res) => {
    return res.status(201).json({ added: items.addItem({name: req.body.name, price: req.body.price}) });
});

router.get("/:name", (req, res, next) => {
    try {
        const foundItem = items.getItem(req.params.name);

        if (foundItem === undefined) throw new ExpressError("Item not found", 404);

        return res.json(foundItem);
    } catch (err) {
        next(err);
    }
});

router.patch("/:name", (req, res, next) => {
    try {
        const foundItem = items.modItem(req.params.name, req.body.name, req.body.price);

        if (foundItem === undefined) throw new ExpressError("Item not found", 404);

        return res.json({ updated: foundItem });
    } catch (err) {
        next(err);
    }
});

router.delete("/:name", (req, res, next) => {
    try {
        const msg = items.removeItem(req.params.name);

        if (msg === undefined) throw new ExpressError("Item not found", 404);

        return res.json(msg);
    } catch (err) {
        next(err);
    }
});

module.exports = router;