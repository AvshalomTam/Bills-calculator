const fs = require('fs')

const getTariff = (pathToDB) => {
    // get water tariff
    let rawdata = fs.readFileSync(pathToDB)
    let tariffs = JSON.parse(rawdata);
    // search for right year (2020) in DB
    var searchField = "year";
    var searchVal = 2020;
    for (var i = 0 ; i < tariffs.length ; i++)
    {
            if (tariffs[i][searchField] == searchVal) {
                waterTariff = tariffs[i].tariff
                return waterTariff
                
        }
    }
}

const getWaterTariff = () => {
    return getTariff('./db/waterDB.json')
}

const getElecTariff = () => {
    return getTariff('./db/electricityDB.json')
}

module.exports = {
    getWaterTariff,
    getElecTariff
}

