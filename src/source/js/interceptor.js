// 手写拦截器原理
function Axios(config) {
  this.config = config;
  this.interceptors = {
    request: new InterceptorManage(),
    response: new InterceptorManage()
  }
}

Axios.prototype.request = function (config) {
  let promise = Promise.resolve(config);

  // 正式发送请求
  function dispatchRequest(config) {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        statusText: "Success!"
      })
    })
  }

  const chains = [dispatchRequest, undefined];

  // 请求拦截器：按顺序头部压入，遍历时后进先出（多个请求拦截器设置会先执行后面设置的请求拦截器的原因）
  this.interceptors.request.handler.forEach((item) => {
    chains.unshift(item.fulfilled, item.rejected);
  })

  // 响应拦截器：按顺序尾部压入，遍历时先进先出
  this.interceptors.response.handler.forEach((item) => {
    chains.push(item.fulfilled, item.rejected)
  })

  while (chains.length > 0) {
    // 会将上一个 promise 的状态传递下去
    promise = promise.then(chains.shift(), chains.shift())
  }
  return promise;
}

// 拦截器管理构造函数
function InterceptorManage() {
  this.handler = [];
}
InterceptorManage.prototype.use = function (fulfilled, rejected) {
  this.handler.push({ fulfilled, rejected });
}

// 测试：playgroud
// 实例化 axios
let context = new Axios();
let axios = Axios.prototype.request.bind(context);
Object.keys(context).forEach((key) => {
  axios[key] = context[key]
})
// 测试拦截器
axios.interceptors.request.use(
  function (config) {
    console.log("请求拦截器 成功 1");
    // throw new Error('e')
    return config;
  },
  function (error) {
    console.log("请求拦截器 失败 1");
  }
);
axios.interceptors.request.use(
  function (config) {
    console.log("请求拦截器 成功 2");
    return config;
  },
  function (error) {
    console.log("请求拦截器 失败 2");
  }
);
axios.interceptors.response.use(
  function (config) {
    console.log("响应拦截器 成功 1");
    return config;
  },
  function (error) {
    console.log("响应拦截器 失败 1");
  }
);
axios.interceptors.response.use(
  function (config) {
    console.log("响应拦截器 成功 2");
    return config;
  },
  function (error) {
    console.log("响应拦截器 失败 2");
  }
);

axios({
  method: "GET",
  url: "http://localhost:3000",
}).then((res) => {
  console.log(res);
});