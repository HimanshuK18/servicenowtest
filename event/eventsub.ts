// subscribers/mySubscriber.js

import { myEventEmitter } from './event';
import { CatService } from '../services/catService';


export const addListener1 = () => myEventEmitter.on('myEvent',async (data: { message: any; }) => {
  await getData(" 1 ");
});
export const addListener2 = () => myEventEmitter.on('myEvent',async  (data: { message: any; }) => {
  await getData(" 2 ");
});
export const addListener3 = () => myEventEmitter.on('myEvent', async (data: { message: any; }) => {
  await getData(" 3 ");
});

export const addListener4 = () => myEventEmitter.on('myEvent', (data: { message: any; }) => {
 console.log(data);
 throw new Error("test error");
});




async function getData(topic: string) {
  const catService = new CatService();
  try {
    const data = await catService.getCatData();
    console.log("topic " + topic  + data.data.length);
  }
  catch (error) {
    console.log("Something went wrong.");
  }
}
/*export default {
  addListener1,
  addListener2,
  addListener3
};*/

