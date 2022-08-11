const { load } = require("cheerio");
const accountSid = "AC8c91c7006268db786b094e57fc5af237";
const authToken = "9f3352f56f5ab1e9b15a59457ae1cb9a";
const client = require("twilio")(accountSid, authToken);
const axios = require("axios");
setInterval(() => {
  const url = "https://www.playstation.com/en-us/games/battlefield-v/";
  console.log("waiting for a change");
  axios.get(url).then((res) => {
    let body = res.data;
    let $ = load(body);
    let prices = {
      finalPrice: Number(
        $('[data-qa="mfeCtaMain#offer0#finalPrice"]')
          .text()
          .substring(1, this.length)
      ),
      oldPrice: Number(
        $('[data-qa="mfeCtaMain#offer0#originalPrice"]')
          .text()
          .substring(1, this.length)
      ),
    };
    Once(prices.finalPrice , prices.oldPrice)
    OnceAgain(prices.finalPrice , prices.oldPrice)
  });
}, 1000);
function SendSms(me) {
  client.messages
    .create({ body: me, from: "+15139163558", to: "+213672829127" })
    .then((message) => {
      let msg = message.body;
    })
    .done();
}
function Once(newPrice, oldPrice) {
  if (newPrice < 6 || oldPrice < 6) {
    console.log("price Changed");
    SendSms(`battlefield 5 price has changed to ${newPrice} and ${oldPrice}`);
    Once = function () {};
  }
}
function OnceAgain(newPrice, oldPrice) {
  if (newPrice !== 9.99 || oldPrice !== 39.99){
    console.log("price Changed");
    SendSms(`battlefield 5 price has changed to ${newPrice} and ${oldPrice}`);
    OnceAgain = function () {};
  }
}