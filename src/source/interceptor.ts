// 手写拦截器原理
function Axios(config) {
  this.config = config;
}

function InterceptorManage() {
  this.handler = [];
}
InterceptorManage.prototype.use = 

const axios = new Axios({ url: "/users" });

console.log(axios);

Axios.prototype.request = function (config) {};
