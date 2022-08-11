const { load } = require("cheerio");
const accountSid = "AC8c91c7006268db786b094e57fc5af237";
const authToken = "9f3352f56f5ab1e9b15a59457ae1cb9a";
const client = require("twilio")(accountSid, authToken);
const axios = require("axios");
function SendSms(me) {
  client.messages
    .create({ body: me, from: "+15139163558", to: "+213672829127" })
    .then((message) => {
      let msg = message.body;
    })
    .done();
  }
function Once(price) {
  if (price < 10) {
    SendSms("price changed")
    Once = function () {};
  }
}
setInterval(() => {
  console.log("waiting for a change");
  const url = "https://gouderh.netlify.app/";
  axios.get(url).then((res) => {
    let body = res.data;
    let $ = load(body);
    let text = $(".title").text();
    let mainNumber = Number(text);
    Once(mainNumber)
  });
}, 1000);
