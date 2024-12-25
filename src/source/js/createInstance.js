// 手写 createInstance 函数
function Axios(config) {
  this.default = config;
  this.interceptors = {
    request: {},
    response: {}
  }
}

Axios.prototype.request = function (config) {
  console.log("发送AJAX请求 请求的类型为" + config.method);
}

// 实际调用的还是 request
Axios.prototype.get = function (config) {
  return this.request({ method: "GET" });
}
Axios.prototype.post = function (config) {
  return this.request({ method: "POST" });
}

// 为了实现导出的 axios 对象既可以直接作为函数传递配置对象发送请求，又可以使用 get()、post() 等方法发送请求
function createInstance(config) {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context); // 配置作为函数传递配置对象发送请求
  // 移植 Axios 原型链上的属性和方法（get、post等）
  Object.keys(Axios.prototype).forEach((key) => {
    instance[key] = Axios.prototype[key].bind(context);
  })
  // 移植 Axios 本身的属性和方法（default、interceptor等）
  Object.keys(context).forEach((key) => {
    instance[key] = context[key];
  })
  return instance;
}

const axios = createInstance();
axios({ method: 'POST' });
axios.get();
axios.post();
