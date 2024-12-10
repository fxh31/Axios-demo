import axios from "axios";

// 1.直接挂在 axios 上面
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

axios.defaults.headers.common["Authorization"] = "666"; // 设置公共方法请求头参数
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded"; // 设置 post 方法请求头参数

console.log(axios.defaults);

// 2.创建 axios 实例
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = "667";

export { axios, instance };
