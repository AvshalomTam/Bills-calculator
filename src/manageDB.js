const fs = require('fs')

const getOldClocks = (pathToDB, year, month) => {
    let rawdata = fs.readFileSync(pathToDB)
    let clocks = JSON.parse(rawdata)

    var searchFieldYear = "year"
    var searchValYear = year
    var searchFieldMonth = "month"
    var searchValMonth = month
    for (var i = 0 ; i < clocks.length ; i++)
    {
            if ((clocks[i][searchFieldYear] == searchValYear) && (clocks[i][searchFieldMonth] == searchValMonth)) {
                clock = clocks[i].clock.toString()
                return clock   
        } 
    }
    // if doesnt find old clock in db to that date
    return `No Data on ${month}/${year}`
}

const saveDataToFile = (rightDBpath, year, month, newClock) => {
    if (newClock == '') {
        return 'Please insert clock!'
    }
    let rawdata = fs.readFileSync(rightDBpath)
    let clocks = JSON.parse(rawdata)

    // check if date already exists - replace clock
    var flag = 0
    var searchFieldYear = "year"
    var searchValYear = year
    var searchFieldMonth = "month"
    var searchValMonth = month
    for (var i = 0 ; i < clocks.length ; i++)
    {
            if ((clocks[i][searchFieldYear] == searchValYear) && (clocks[i][searchFieldMonth] == searchValMonth)) {
                clocks[i].clock = parseFloat(newClock)
                flag++
                
        } 
    }

    // if doesnt find old clock in db to that date
    if (flag == 0) {
        const newVal = {
            "year": parseInt(year), 
           "month": parseInt(month), 
           "clock": parseFloat(newClock)
       }
       clocks.push(newVal)
    }

    // write to file new clocks
    const jsonContent = JSON.stringify(clocks);
    fs.writeFile(rightDBpath, jsonContent, function (err) {
        if (err) {
            return console.log(err)
        }
    })
    return 'Data Saved!'
    
}

module.exports = {
    getOldClocks,
    saveDataToFile
}