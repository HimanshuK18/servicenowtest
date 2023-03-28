// controllers/myController.js
import express from "express";
import EventEmitter from 'events';
import addLis from './eventsub';

export const eventRouter = express.Router();
export const myEventEmitter = new EventEmitter();


eventRouter.get("/event", function (req, res) {
    addLis();
    myEventEmitter.emit('myEvent', { message: 'Hello, world!' });
    res.send('Action complete!');
});

module.exports = { myEventEmitter, eventRouter };
