// controllers/myController.js
import express from "express";
import EventEmitter from 'events';
import { addListener1,  addListener2,  addListener3, addListener4} from './eventsub';

export const eventRouter = express.Router();
export const myEventEmitter = new EventEmitter();


eventRouter.get("/event", function (req, res) {
    console.log("Addlistners");

    addListener1();
    addListener2();
    addListener3();
    addListener4();
    console.log("All events fired");
    myEventEmitter.emit('myEvent', { message: 'Hello, world!' });
   
    console.log("Send request");
    res.send('Action complete!');
});

module.exports = { myEventEmitter, eventRouter };
