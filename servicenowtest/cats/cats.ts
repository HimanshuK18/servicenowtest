import express from "express";
import { CatService } from '../services/catService';
const router = express.Router();


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


module.exports = router;