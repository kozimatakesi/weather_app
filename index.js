global.fetch = require('node-fetch');

console.log('こんにちは');
async function callApi(){
  const res = await fetch("http://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=9a4d371b6fc452d3edd2f79b142c8c18&lang=ja&units=metric");
  //console.log(res);
  const results = await res.json();
  //console.log(results);
  const place = results.name;
  console.log("現在の" + place + "は" + results.weather[0].description + "です");
}

callApi();
