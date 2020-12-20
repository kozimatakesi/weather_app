//メール送信関数の読み込み
const mailFunction = require('/Users/kawamoto/weather_app/send_mail_function.js');
//モジュールの読み込み
global.fetch = require('node-fetch');

//2分毎に実行する
/*
let count = 0;
let id = setInterval(function(){
  count++;
  callApi();
  if(count < 0){
    clearInterval(id);
  }
},120000);
*/

callApi();

async function callApi(){
  //現在の東京都の天気を取得
  const res = await fetch("http://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=9a4d371b6fc452d3edd2f79b142c8c18&lang=ja&units=metric");
  const results = await res.json();
  const nowWeather = "現在の" + results.name + "は" + results.weather[0].description + "です";
  console.log(nowWeather);

  //12時間後の東京都の天気を取得
  const forecast = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=Tokyo&appid=9a4d371b6fc452d3edd2f79b142c8c18&lang=ja&units=metric");
  const fore = await forecast.json();
  const half_day = fore.list[3];
  const foreCastWeather = "12時間後の天気は" + half_day.weather[0].description + "です";
  console.log(foreCastWeather);

  //12時間後の東京都の天気が雨だった場合、メールを送信する
  const judge = half_day.weather[0].main;
  console.log(judge);
  if(judge === "Rain"){
    console.log("傘が必要です");
    //ここにメール送信の関数をいれる
  } else {
    console.log("傘の必要はありません");
  }
  //メールを送信する　第一引数：件名　第二引数：本文
  mailFunction.sendmailer("お天気情報", newLine(nowWeather) + newLine(foreCastWeather));
}

//改行用関数
function newLine(text){
  let array = [];
  array.push("<p>" + text + "</p>");
  let pplus = array.join("");
  return pplus;
};