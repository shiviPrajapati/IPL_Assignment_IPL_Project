const csvtojson = require('csvtojson')
const csvfilepath = './../data/matches.csv'
const fs = require('fs')

csvtojson()
.fromFile(csvfilepath)
.then((json) => {
   // console.log(json)

    fs.writeFileSync("./../data/matchesdata.json",JSON.stringify(json),"utf-8", (err) => {
        if(err)
        console.log(err)
    })
})

const csvtojson1 = require('csvtojson')
const csvfilepath1 = './../data/deliveries.csv'
const fs = require('fs')

csvtojson1()
.fromFile(csvfilepath1)
.then((json) => {
    //console.log(json)

    fs.writeFileSync("./../data/deliveries.json",JSON.stringify(json),"utf-8", (err) => {
        if(err)
        console.log(err)
    })
})