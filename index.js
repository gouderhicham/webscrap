const { load } = require("cheerio");
const accountSid = "AC8c91c7006268db786b094e57fc5af237";
const authToken = "9f3352f56f5ab1e9b15a59457ae1cb9a";
const client = require("twilio")(accountSid, authToken);
const axios = require("axios");
const url = "https://www.playstation.com/en-us/games/battlefield-v/";

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
  setInterval(() => {
    if (prices.finalPrice < 6 || prices.oldPrice < 6) {
      if (times < 1) {
        SendSms(
          `battlefield 5 price has changed to ${prices.finalPrice} and ${prices.oldPrice}`
        );
      }
    }
    times = times + 1;
  }, 100000);
});
function SendSms(me) {
  client.messages
    .create({ body: me, from: "+15139163558", to: "+213672829127" })
    .then((message) => {
      let msg = message.body;
    })
    .done();
} 