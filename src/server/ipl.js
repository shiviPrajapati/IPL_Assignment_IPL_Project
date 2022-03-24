let iplDataSet = require('./../data/matchesdata.json');
let deliveries = require('./../data/deliveries.json');
const fs = require('fs')


//Number of matches played per year for all the years in IPL.
function perYearMatches(){
let matches = {};

for (var obj in iplDataSet){
    if (!matches.hasOwnProperty(iplDataSet[obj]["season"]))
      matches[iplDataSet[obj]["season"]] = 1;
    else
      matches[iplDataSet[obj]["season"]] += 1;
}

//console.log(matches);
fs.writeFileSync("./../public/output/PerYearMatches.json",JSON.stringify(matches),"utf-8", (err) => {
    if(err)
    console.log(err)
})
}

perYearMatches();








//Number of matches won per team per year in IPL.
function matchesWonPerYear(){
    function matchesWon(years){
        let winners = {};
        for (var obj in iplDataSet){
          if (iplDataSet[obj]["season"] == years){
            if(!winners.hasOwnProperty(iplDataSet[obj]["winner"]))
              winners[iplDataSet[obj]["winner"]] = 1;
            else
              winners[iplDataSet[obj]["winner"]] += 1;
          }
        }
        return winners;
    }
      
      var winners = {};
      
      for (var ob in iplDataSet){
        if (!winners.hasOwnProperty(iplDataSet[ob]["season"]))
          winners[iplDataSet[ob]["season"]] = matchesWon(iplDataSet[ob]["season"]);
      }
    
     // console.log(winners);
      fs.writeFileSync("./../public/output/wonMatchesPerYear.json",JSON.stringify(winners),"utf-8", (err) => {
        if(err)
        console.log(err)
    })
}

matchesWonPerYear();








//Extra runs conceded per team in the year 2016

function extraRunConceded(){
    var extraRuns = {};
var matchId2016 = [];

for (let object in iplDataSet){
  if(iplDataSet[object]["season"] == 2016){
    matchId2016.push(iplDataSet[object]["id"]);
  }
}
for (let ob in deliveries){
 
  if(matchId2016.hasOwnProperty(parseInt(deliveries[ob]["match_id"]))){
    if (!extraRuns.hasOwnProperty(deliveries[ob]["bowling_team"]))
      extraRuns[deliveries[ob]["bowling_team"]] = parseInt(deliveries[ob]["extra_runs"]);
    else
      extraRuns[deliveries[ob]["bowling_team"]] += parseInt(deliveries[ob]["extra_runs"]);
  }
}
//console.log(extraRuns)
fs.writeFileSync("./../public/output/extraRunPerTeam.json",JSON.stringify(extraRuns),"utf-8", (err) => {
    if(err)
    console.log(err)
})

}


extraRunConceded();








//Top 10 economical bowlers in the year 2015
function topEconomicBowler(){
let econ = {};
let matchId2015 = [];
let topBowlers = [];

for (let object in iplDataSet){
  if(iplDataSet[object]["season"] == 2015){
    matchId2015.push(iplDataSet[object]["id"]);
  }
}
function overs(bowler){
  let balls=0;
  for (let key in deliveries){
    if(matchId2015.hasOwnProperty(parseInt(deliveries[key]["match_id"]))){
      if(deliveries[key]["bowler"] === bowler){
        balls += 1;
      }
    }
  }
  return balls/6;
}

for(let ob in deliveries){
  if(matchId2015.hasOwnProperty(parseInt(deliveries[ob]["match_id"]))){
    if (!econ.hasOwnProperty(deliveries[ob]["bowler"])){
      econ[deliveries[ob]["bowler"]] = parseInt(deliveries[ob]["total_runs"]);
    }
    else
      econ[deliveries[ob]["bowler"]] += parseInt(deliveries[ob]["total_runs"]);
  }
}

for (let key in econ){
  econ[key] = Math.round((econ[key]/overs(key)) * 100)/100;
}

var economy = Object.keys(econ).map(function(key) {
  return [key, econ[key]];
}).sort(function(a, b){ return a[1] - b[1]; });

for (var i = 0; i < 10; i++){
  //console.log(economy[i]);
  topBowlers.push(economy[i]);
  
}
fs.writeFileSync("./../public/output/top10Bowler.json",JSON.stringify(topBowlers),"utf-8", (err) => {
    if(err)
    console.log(err)
})
}



topEconomicBowler()