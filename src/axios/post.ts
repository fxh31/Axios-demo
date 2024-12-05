import axios from "axios";

const source = axios.CancelToken.source();
const controller = new AbortController();

// export const post1 = axios({
//   method: "get",
//   url: "/users",
//   // responseType: 'stream'
//   baseURL: "https://jsonplaceholder.typicode.com",
//   headers: { "X-Requested-With": "XMLHttpRequest" },

//   params: {
//     // in the url
//     id: "ddsd",
//   },
//   // data 一般是一个对象（axios 会自己处理并将其转为 JSON 字符串）payload
//   data: {
//     name: "hannah",
//   },
//   // data 也可以是一个字符串， FormData 类型
//   // data: 'Country=Brasil&City=Belo Horizonte',

//   // changes to the request data before it is sent to the server
//   // applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
//   // transformRequest 接收多个函数，前一个函数执行了之后会将其默认传参里的值传递给下一个，直到最后一个函数返回对应的值
//   // （有点像中间件的处理机制，这种流式的处理，前一个返回值会作为后一个函数中 data的值，header不用）
//   transformRequest: [
//     function (data, headers) {
//       // source.cancel() // 利用 cancelToken 取消请求，axios 返回 Promise 的 reject
//       // controller.abort() // 利用原生的 AbortController 对象取消请求
//       debugger;
//       // Do whatever you want to transform the data
//       switch (typeof data) {
//         case "string":
//           return data;
//         case "object":
//           if (!Reflect.has(data, "age")) {
//             data.age = 18;
//             console.log(data, "99");
//           }
//           break;
//         default:
//           break;
//       }

//       headers["Content-Type"] = "text/css";
//       return data;
//     },
//     function (data, header) {
//       if (typeof data === "string") {
//         return data;
//       }
//       data.sex = "woman";
//       console.log(header);
//       return JSON.stringify(data);
//     },
//   ],
//   // transformResponse: [
//   //   function (data) {
//   //     console.log(data);
//   //     return data;
//   //   },
//   // ],

//   timeout: 3000,

//   // 控制跨域请求时是否携带凭证（如 cookies、HTTP 认证信息等）
//   // 如果用户在浏览器中已经登录并且有相应的 cookies，这些 cookies 会被发送到服务器
//   // 服务端必须配置：Access-Control-Allow-Credentials 头
//   // 预检请求（type：preflight，status: 204）
//   // 当 withCredentials 设置为 true 时，浏览器会发送一个预检请求（OPTIONS 方法），以确认服务器是否允许携带凭证的跨域请求。服务器必须正确响应预检请求，否则实际请求不会发送
//   // 适用场景：需要用户身份验证的 API 调用，例如获取用户的个人信息、执行需要登录才能进行的操作等
//   withCredentials: false, // default fasle

//   // 自定义处理请求，返回 promisee，方便测试返回接口，
//   // 它会阻止你发送的请求（network中将不会看到）
//   // adapter: function (config) {
//   //   console.log(config);
//   //   return new Promise((resolve, reject) => {
//   //     console.log(7764);
//   //     resolve({ data: { id: 666 } }); // 模拟返回的值
//   //   });
//   // },

//   // Authorization
//   auth: {
//     username: "janedoe",
//     password: "s00pers3cret",
//   },

//   responseType: "json", // 响应类型 default json
//   responseEncoding: "utf8", // 解码 (Node.js only)

//   xsrfCookieName: "XSRF-TOKEN", // the cook for xsrf token
//   xsrfHeaderName: "X-XSRF-TOKEN", // 请求头携带的 xsrf token 的名字

//   // browser only
//   onUploadProgress: function (progressEvent) {
//     // Do whatever you want with the native progress event
//   },
//   onDownloadProgress: function (progressEvent) {
//     // Do whatever you want with the native progress event
//   },

//   maxContentLength: 2000, // 响应内容大小限制（in node.js）
//   maxBodyLength: 2000,

//   // 拦截判断返回的 status
//   // 如果返回 false，即使请求成功了 axios 也会返回 promise 的 reject
//   // 返回 true 则会返回 promise 的 resolve
//   validateStatus: function (status) {
//     return status >= 200 && status < 300; // default
//   },

//   maxRedirects: 5, // 最大重定向次数 default（in node.js）

//   socketPath: null, // defines a UNIX Socket， default（in node.js）

//   // http/https 的长连接（in node.js）
//   // httpAgent: new http.Agent({ keepAlive: true }),
//   // httpsAgent: new https.Agent({ keepAlive: true }),

//   // 定义代理服务器的主机名，端口和协议
//   proxy: {
//     protocol: "https",
//     host: "127.0.0.1",
//     port: 9000,
//     // 设置 Proxy-Authorization
//     auth: {
//       username: "mikeymike",
//       password: "rapunz3l",
//     },
//   },

//   // 取消请求时令牌，可以通过该令牌取消请求
//   // cancelToken: new CancelToken(function (cancel) {
//   //   console.log('cance,')
//   // }),
//   // 场景：当路由已经跳转，而上一页的请求还在pending状态，这时可以使用它取消请求
//   cancelToken: source.token, // 设置取消令牌

//   // 原生 js API，通过 AbortController 来取消请求
//   signal: controller.signal,

//   // 自动解压响应体 default
//   // 服务端通常会使用压缩算法来减少响应体的大小，从而加快传输的速度
//   decompress: true,
// });

export const instance = axios.create({
  url: "/users/1",
  // responseType: 'stream'
  baseURL: "https://jsonplaceholder.typicode.com",
  // transformRequest: [
  //   function (data, headers) {
  //     // source.cancel() // 利用 cancelToken 取消请求，axios 返回 Promise 的 reject
  //     // controller.abort() // 利用原生的 AbortController 对象取消请求

  //     // Do whatever you want to transform the data
  //     switch (typeof data) {
  //       case "string":
  //         return data;
  //       case "object":
  //         if (!Reflect.has(data, "age")) {
  //           data.age = 18;
  //           console.log(data, "99");
  //         }
  //         break;
  //       default:
  //         break;
  //     }

  //     headers["Content-Type"] = "text/css";
  //     return data;
  //   },
  //   function (data, header) {
  //     if (typeof data === "string") {
  //       return data;
  //     }
  //     data.sex = "woman";
  //     console.log(header);
  //     return JSON.stringify(data);
  //   },
  // ],
  transformResponse: [
    function (data) {
      debugger;
      return data;
    },
  ],

  params: {
    // in the url
    id: "ddsd",
  },
  // data 一般是一个对象（axios 会自己处理并将其转为 JSON 字符串）payload
  data: {
    name: "hannah",
  },
  // data 也可以是一个字符串， FormData 类型
  // data: 'Country=Brasil&City=Belo Horizonte',

  // changes to the request data before it is sent to the server
  // applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // transformRequest 接收多个函数，前一个函数执行了之后会将其默认传参里的值传递给下一个，直到最后一个函数返回对应的值
  // （有点像中间件的处理机制，这种流式的处理，前一个返回值会作为后一个函数中 data的值，header不用）
  // transformRequest: [
  //   function (data, headers) {
  //     // source.cancel() // 利用 cancelToken 取消请求，axios 返回 Promise 的 reject
  //     // controller.abort() // 利用原生的 AbortController 对象取消请求

  //     // Do whatever you want to transform the data
  //     switch (typeof data) {
  //       case "string":
  //         return data;
  //       case "object":
  //         if (!Reflect.has(data, "age")) {
  //           data.age = 18;
  //           console.log(data, "99");
  //         }
  //         break;
  //       default:
  //         break;
  //     }

  //     headers["Content-Type"] = "text/css";
  //     return data;
  //   },
  //   function (data, header) {
  //     if (typeof data === "string") {
  //       return data;
  //     }
  //     data.sex = "woman";
  //     console.log(header);
  //     return JSON.stringify(data);
  //   },
  // ],
  timeout: 3000,

  // 控制跨域请求时是否携带凭证（如 cookies、HTTP 认证信息等）
  // 如果用户在浏览器中已经登录并且有相应的 cookies，这些 cookies 会被发送到服务器
  // 服务端必须配置：Access-Control-Allow-Credentials 头
  // 预检请求（type：preflight，status: 204）
  // 当 withCredentials 设置为 true 时，浏览器会发送一个预检请求（OPTIONS 方法），以确认服务器是否允许携带凭证的跨域请求。服务器必须正确响应预检请求，否则实际请求不会发送
  // 适用场景：需要用户身份验证的 API 调用，例如获取用户的个人信息、执行需要登录才能进行的操作等
  withCredentials: false, // default fasle

  // 自定义处理请求，返回 promisee，方便测试
  // adapter: function (config) {
  //   console.log(config);
  //   return new Promise((resolve, reject) => {
  //     console.log(7764);

  //   });
  // },

  // Authorization
  auth: {
    username: "janedoe",
    password: "s00pers3cret",
  },

  responseType: "json", // 响应类型 default json
  responseEncoding: "utf8", // 解码 (Node.js only)

  xsrfCookieName: "XSRF-TOKEN", // the cook for xsrf token
  xsrfHeaderName: "X-XSRF-TOKEN", // 请求头携带的 xsrf token 的名字

  // browser only
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  maxContentLength: 2000, // 响应内容大小限制（in node.js）
  maxBodyLength: 2000,

  // 拦截判断返回的 status
  // 如果返回 false，即使请求成功了 axios 也会返回 promise 的 reject
  // 返回 true 则会返回 promise 的 resolve
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  maxRedirects: 5, // 最大重定向次数 default（in node.js）

  socketPath: null, // defines a UNIX Socket， default（in node.js）

  // http/https 的长连接（in node.js）
  // httpAgent: new http.Agent({ keepAlive: true }),
  // httpsAgent: new https.Agent({ keepAlive: true }),

  // 定义代理服务器的主机名，端口和协议
  proxy: {
    protocol: "https",
    host: "127.0.0.1",
    port: 9000,
    // 设置 Proxy-Authorization
    auth: {
      username: "mikeymike",
      password: "rapunz3l",
    },
  },

  // 取消请求时令牌，可以通过该令牌取消请求
  // cancelToken: new CancelToken(function (cancel) {
  //   console.log('cance,')
  // }),
  // 场景：当路由已经跳转，而上一页的请求还在pending状态，这时可以使用它取消请求
  cancelToken: source.token, // 设置取消令牌

  // 原生 js API，通过 AbortController 来取消请求
  signal: controller.signal,

  // 自动解压响应体 default
  // 服务端通常会使用压缩算法来减少响应体的大小，从而加快传输的速度
  decompress: true,
});
// interceptors.request -> transformRequest -> transformResponse -> interceptors.response
// 请求拦截器，会在 transformRequest 之前执行
instance.interceptors.request.use(
  function (config) {
    console.log(config);
    debugger;
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
// 响应拦截器，会在 transformResponse 之后执行
export const myInterceptor = instance.interceptors.response.use(
  function (res) {
    console.log(res);
    debugger;
    return res;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// instance.interceptors.response.eject(myInterceptor); // 移除响应监听器
// const instance = axios.create() 可以让我们自定义axios的实例（todo：与原axios冲突问题）

// todo：多个请求都会被发送出去？
