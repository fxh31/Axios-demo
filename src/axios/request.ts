// import axios from "axios";
const fs = require("fs");
const axios = require("axios");

axios({
  method: "get",
  url: "http://bit.ly/2mTM3nY",
  responseType: "stream",
}).then(function (response) {
  // axios 将返回一个可读的文件流
  console.log(response);
  response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"));
});
