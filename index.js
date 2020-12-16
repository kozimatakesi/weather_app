global.fetch = require('node-fetch');

let count = 0;
let id = setInterval(function(){
  count++;
  callApi();
  if(count > 0){
    clearInterval(id);
  }
},1000);

async function callApi(){
  const res = await fetch("http://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=9a4d371b6fc452d3edd2f79b142c8c18&lang=ja&units=metric");
  //console.log(res);
  const results = await res.json();
  //console.log(results);
  const place = results.name;
  console.log("現在の" + place + "は" + results.weather[0].description + "です");
  let temp = results.main.temp;
  console.log("現在の気温は" + temp + "度です");
  const forecast = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=Tokyo&appid=9a4d371b6fc452d3edd2f79b142c8c18&lang=ja&units=metric");
  const fore = await forecast.json();
  let half_day = fore.list[3];
  console.log("12時間後の天気は" + half_day.weather[0].description + "です");
  console.log("12時間後の気温は" + half_day.main.temp + "度です");
  let judge = half_day.weather[0].main;
  console.log(judge);
  if(judge === "Rain"){
    console.log("傘が必要です");
  } else {
    console.log("傘の必要はありません");
  }

}

//callApi();
