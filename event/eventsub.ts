// subscribers/mySubscriber.js

import { myEventEmitter } from './event';


const addLis = () =>  myEventEmitter.on('myEvent', (data: { message: any; }) => {
  console.log(`Received data: ${data.message}`);
});

export default addLis;

