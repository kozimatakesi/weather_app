global.fetch = require('node-fetch'); //fetchをnodeで使用するためのもの

console.log('こんにちは');
async function callApi(){
  const res = await fetch("http://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=9a4d371b6fc452d3edd2f79b142c8c18");
  //console.log(res);
  const users = await res.json();
  const place = users.name;
  console.log(place + "は" + users.weather[0].main + "です");
}

callApi();
