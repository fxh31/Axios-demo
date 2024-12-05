# 小结

## 处理请求异常

```js
axios
  .post("/users")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err); // 返回 AxiosError 对象
    // console.log(err.toJSON()); // 返回错误 JSON 对象信息
  });
```

- 在 config 中配置 validateStatus 的校验，拿到 status code 后手动设置返回 true/false，false 则 axios 抛出 Pormise.reject 异常。（不影响正常网络请求）
- 在 `.catch` 中捕获处理异常。catch 可以保证 Promise 抛出的异常不会导致页面报错。（调试模式下）
- 在整个请求到响应的过程中，可以在`interceptors.request -> transformRequest -> transformResponse -> interceptors.response`中抛出任何异常，抛出的异常都会立刻终止请求并调用 reject 回调，最后才会被`.catch` 捕获。
- `interceptors.request`本身的 onRejected 函数（error handler）触发（第二个函数参数）可以通过 onFulFilled 函数（第一个参数函数）返回一个 Promise.reject。

## 取消请求

提前取消请求。

> 适用于一些异步请求可以挂起，一直超时连接，直到 代码堆栈超时。

axios 提供两种方式：signal 和 cancelToken (deprecated)。

### signal

利用原生 AbortController 和 AbortSignal 取消请求。

```js
const controller = new AbortController();

axios
  .get("/foo/bar", {
    signal: controller.signal,
    // signal: AbortSignal.timeout(5000) //Aborts request after 5 seconds
  })
  .then(function (response) {
    //...
  });
// cancel the request
controller.abort();
```

```js
// 自定义超时 signal 函数
function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);
  return abortController.signal; // 返回超时信号
}

axios
  .get("/foo/bar", {
    signal: newAbortSignal(5000), //Aborts request after 5 seconds
  })
  .then(function (response) {
    //...
  });
```

### cancelToken（deprecated）

> 该方案已经被弃用了，因为 cancelToken 所依赖的开源库（proposal-cancelable-promises）不再更新了。

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get("/user/12345", {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  }),
});

// cancel the request
cancel();
```

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get("/user/12345", {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // handle error
    }
  });

axios.post(
  "/user/12345",
  {
    name: "new name",
  },
  {
    cancelToken: source.token,
  }
);

// cancel the request (the message parameter is optional)
source.cancel("Operation canceled by the user.");
```

> **注意：可以使用相同的 token/signal 取消多个请求。**
