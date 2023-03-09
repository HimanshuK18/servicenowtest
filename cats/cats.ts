import express from "express";
import { CatService } from '../services/catService';
import { send } from '../SNS/produceSNSTopic';
import EventEmitter from 'events';

export const router = express.Router();
const em = new EventEmitter();


router.get("/search", async (req: any, res: any) => {
    const queryValue = req.query.frindly;

    console.log(`calling Cat service`);
    const catService = new CatService();
    try {
        const data = await catService.getCatData();
        const filteredData = filterData(data.data);

        res.send(filteredData.slice(0, 5));
    }
    catch (error) {
        console.log(error);
        res.send("Something went wrong.");
    }

});

router.get("/status", async (req, res) => {
    const sns = await send();
    console.log(sns + "_______________");
    res.status(200).json({
        status: "ok",
        data: sns,
    });
});

router.get("/test", function (req, res) {
    let n = 900000000000000000;
    let count = 0;

    if (n > 50000000000) n = 50000000000;

    for (let i = 0; i <= n; i++) {
        count += i;
    }

    res.send(`Final count is ${count}`);
});

router.get("/hello", (req, res) => {
    em.on('FirstEvent', function () {
        console.log(5);
        console.log('First subscriber from another function: ');
    });
    
    newEvent();
    
    console.log('you arn');
    res.send("Hello World!");
});

function newEvent() {
    console.log(1);
// added three event listeners 2 of type FirstEvent and third of type second event
    em.addListener('FirstEvent', function () {
        console.log(3);
        console.log('First subscriber: ');
    });
    em.on('FirstEvent', function () {
        console.log(2);
        console.log('First subscriber: ');
    });
    em.on('SecondEvent', function () {
        console.log(4);
        console.log('second subscriber: ');
    });
    // emit or raised the events of both type once
    em.emit('FirstEvent', 'This is my first Node.js event emitter example.');
    em.emit('SecondEvent', 'This is my second Node.js event emitter example.');
    console.log('count ' + em.listenerCount('FirstEvent'));
}

function filterData(data: any): any {
    console.log(`filter data and select top five`);
    let strangerMaxWeight: number = 0;
    let childMaxWeight: number = 0;
    let dogMaxWeight: number = 0;

    for (let i = 0; i <= data.length - 1; i++) {
        if (Number(data[i].stranger_friendly) > strangerMaxWeight) {
            strangerMaxWeight = Number(data[i].stranger_friendly);
        }
        if (Number(data[i].child_friendly) > childMaxWeight) {
            childMaxWeight = Number(data[i].child_friendly);
        }
        if (Number(data[i].dog_friendly) > dogMaxWeight) {
            dogMaxWeight = Number(data[i].dog_friendly);
        }
    }

    let newData: any[] = [];
    let filterData: any = [];

    filterData = filterDataByWeight(data, strangerMaxWeight, childMaxWeight, dogMaxWeight);
    newData = newData.concat(filterData);

    if (newData.length <= 5) {
        filterData = filterDataByWeight(data, strangerMaxWeight - 1, childMaxWeight - 1, dogMaxWeight - 1);
        newData = newData.concat(filterData);
    }
    if (newData.length <= 5) {
        filterData = filterDataByWeight(data, strangerMaxWeight - 2, childMaxWeight - 2, dogMaxWeight - 2);
        newData = newData.concat(filterData);
    }
    if (newData.length <= 5) {
        filterData = filterDataByWeight(data, strangerMaxWeight - 3, childMaxWeight - 3, dogMaxWeight - 3);
        newData = newData.concat(filterData);
    }
    if (newData.length <= 5) {
        filterData = filterDataByWeight(data, strangerMaxWeight - 4, childMaxWeight - 4, dogMaxWeight - 4);
        newData = newData.concat(filterData);
    }
    return newData;
}

function filterDataByWeight(data: any, strangerMaxWeight: number, childMaxWeight: number, dogMaxWeight: number): any {
    const newData = data.filter((obj: any) => {
        return obj.stranger_friendly === strangerMaxWeight
            && obj.child_friendly === childMaxWeight
            && obj.dog_friendly === dogMaxWeight;
    });
    return newData
}