"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const catService_1 = require("../services/catService");
const express = require("express");
const router = express.Router();
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryValue = req.query.frindly;
    console.log(`calling Cat service`);
    const catService = new catService_1.CatService();
    try {
        const data = yield catService.getCatData();
        const filteredData = filterData(data.data);
        res.send(filteredData.slice(0, 5));
    }
    catch (error) {
        console.log(error);
        res.send("Something went wrong.");
    }
}));
function filterData(data) {
    console.log(`filter data and select top five`);
    let strangerMaxWeight = 0;
    let childMaxWeight = 0;
    let dogMaxWeight = 0;
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
    let newData = [];
    let filterData = [];
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
function filterDataByWeight(data, strangerMaxWeight, childMaxWeight, dogMaxWeight) {
    const newData = data.filter((obj) => {
        return obj.stranger_friendly === strangerMaxWeight
            && obj.child_friendly === childMaxWeight
            && obj.dog_friendly === dogMaxWeight;
    });
    return newData;
}
module.exports = router;
//# sourceMappingURL=cats.js.map