exports.sendmailer = function(subject, text){
  //SMTPサーバの設定
  const nodemailer = require("nodemailer");
  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
        user: 'gmailアドレス',
        pass: 'パスワード'
    }
  };
  const smtp = nodemailer.createTransport(smtpConfig);

  const message = {
    from: '送信元のアドレス',
    to: '送信先のアドレス',
    subject: subject,
    text: text
  };

  // メール送信
  try{
  smtp.sendMail(message, function(error, info){
      // エラー発生時
      if(error){
          console.log("send failed");
          console.log(error.message);
          return;
      }

      // 送信成功
      console.log("send successful");
      console.log(info.messageId);
  });
  }catch(e) {
  console.log("Error",e);
  };
};