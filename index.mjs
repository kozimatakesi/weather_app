global.fetch = require('node-fetch');

/*
let count = 0;
let id = setInterval(function(){
  count++;
  callApi();
  if(count > 5){
    clearInterval(id);
  }
},1000);
*/

import googleClientApi from 'google-client-api';

const gapi = await googleClientApi();

const CLIENT_ID = '487504190040-8kl6tcke4g5usgjpdeut79r1ch16k92e.apps.googleusercontent.com';

async function onLoad() {
  try {
    // Google APIs Client Libraryの初期化。
    await gapi.load('client:auth2');
    await gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/gmail.send'
    });
    await gapi.client.load('gmail', 'v1');
    console.log('Initialized');
  } catch (e) {
    console.error(e);
  }
}

async function signIn() {
  try {
    await gapi.auth2.getAuthInstance().signIn();
    console.log('Signed in');
  } catch (e) {
    console.error(e);
  }
}

async function signOut() {
  try {
    await gapi.auth2.getAuthInstance().signOut();
    console.log('Signed out');
  } catch (e) {
    console.error(e);
  }
}

async function sendEmail() {
  try {
    // 送りたいメールアドレスに書き換えてください。
    const to = 'riverbook708@gmail.com';
    const subject = 'テスト';
    const body = 'これはテストです。';

    // サインイン済みかチェック。
    if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
      console.error('Sign in first');
      return;
    }

    // メールデータの作成。
    const mimeData = [
      `To: ${to}`,
      'Subject: =?utf-8?B?' + btoa(unescape(encodeURIComponent(subject))) + '?=',
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      body,
    ].join('\n').trim();
    const raw = btoa(unescape(encodeURIComponent(mimeData))).replace(/\+/g, '-').replace(/\//g, '_');

    // メールの送信。
    await gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {raw: raw},
    });
    console.log('Sent email');

  } catch (e) {
    console.error(e);
  }
}

async function callApi(){
  const res = await fetch("http://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=9a4d371b6fc452d3edd2f79b142c8c18&lang=ja&units=metric");
  //console.log(res);
  const results = await res.json();
  //console.log(results);
  const place = results.name;
  console.log("現在の" + place + "は" + results.weather[0].description + "です");
}

signIn();
sendEmail();
signOut();

callApi();
