// 手写 request 方法
function Axios(config) {
  this.config = config;
}

// request 方法
Axios.prototype.request = function (config) {
  let promise = Promise.resolve(config);
  let chains = [dispatchRequest, undefined];
  let res = promise.then(chains[0], chains[1]);
  return res;
}

// adapter 适配器（用于控制浏览器还是 node，此处为浏览器，node 的话使用的是 http 模块）
function xhrAdapter(config) {
  console.log("xhrAdapter 函数执行");

  return new Promise((reject, resolve) => {
    let xhr = new XMLHttpRequest();
    xhr.open(config.method, config.url);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            config: config,
            data: xhr.response,
            headers: xhr.getAllResponseHeaders(),
            request: xhr,
            status: xhr.status,
            statusText: xhr.statusText
          })
        } else {
          reject(new Error("请求失败，失败的状态码为" + xhr.status))
        }
      }
    }
  })
}

// dispatchRequest函数（此函数将返回一个Promise，至于返回的是的还是失败的就看xhrAdapter处理的结果了）
// 该函数是真正使用 xml 发送请求的函数
function dispatchRequest(config) {
  return xhrAdapter(config).then(
    (response) => {
      // ...
      return response
    }, (error) => {
      // ...
      throw error
    }
  )
}

// 测试：playgroud
// 实例化 axios
const context = new Axios();
const axios = Axios.prototype.request.bind(context);
axios({
  method: "GET",
  url: "http://localhost:3002",
}).then((res) => {
  console.log(res);
});
