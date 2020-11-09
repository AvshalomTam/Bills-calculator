const fs = require('fs')

const getTariff = (pathToDB) => {
    // get water tariff
    let rawdata = fs.readFileSync(pathToDB)
    let tariffs = JSON.parse(rawdata)
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

const getOldClocks = (pathToDB, year, month) => {
    let rawdata = fs.readFileSync(pathToDB)
    let clocks = JSON.parse(rawdata)
    // console.log(clocks)

    var searchFieldYear = "year"
    var searchValYear = year
    var searchFieldMonth = "month"
    var searchValMonth = month
    for (var i = 0 ; i < clocks.length ; i++)
    {
            if ((clocks[i][searchFieldYear] == searchValYear) && (clocks[i][searchFieldMonth] == searchValMonth)) {
                clock = clocks[i].clock
                return clock   
        }
    }

    // return clocks
}

const getWaterTariff = () => {
    return getTariff('./db/waterDB.json')
}

const getElecTariff = () => {
    return getTariff('./db/electricityDB.json')
}

module.exports = {
    getWaterTariff,
    getElecTariff,
    getOldClocks
}

