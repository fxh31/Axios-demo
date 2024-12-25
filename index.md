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

## Axios 和 axios

axios 从语法上来看并不是 Axios 直接创建实例而来的，它是通过 `createInstance()`方法创建而来——在该方法内，先创建了一个 Axios 的实例，再创建了一个函数，把实例原型上的方法挂到这个函数上，再把实例对象上的属性遍历添加到函数上，最后再返回。所以从**功能上**看 axios 是 Axios 的实例。

- 创建的这个函数实际上也是 Axios.prototype.request 函数 bind() 返回的函数。
- axios 作为对象具有 Axios 原型对象上的所有方法，还具有 Axios 对象上的所有属性。

## axios 和 instance

他们都可以直接使用，调用对应的请求方法。

- instance 是通过 `axios.create()` 创建出来的对象，在 axios 上设置的 defaults 值都会传递到 instance 对象上，instance 对象也可以自己覆盖这些值。

- 也正是因为 axios 本身包含了所有的方法，可能是处于兼容性的考虑，导致其上的一些废弃的方法也不能很好的删除（CancelToken、all），但是在 instance 上就不能访问了。当然 instance 也没有 axios 独有的 `create()`（不然人人都可以创建 instance）。

## 原理梳理

- axios 对象其实是通过一个`createInstance()`函数生成的，在该函数中会生成一个 Axios 的实例，然后将 Axios 原型对象上的 request 方法绑定（bind）在这个实例上，再遍历 Axios 的原型链和这个实例对象上的方法和属性，将其添加。
- request 方法是我们实际真正发送请求的方法（所有 get、post 等方需要不同请求类型的方法都是通过它发送的）。他返回一个 promise，而这个 promise 中的 fulfilled 和 rejected 函数则来源于内部一个队列（chain）；
- 这个队列（chain）始终保持两两成对，对应着 fulfilled 和 rejected 函数；fulfilled 函数对应着 `dispatchRequest()` 方法。该方法内部则会调用 xhrAdapter 去真正利用 XMLHttpRequest 发送请求；
- 而这个队列之所以要保持两两对应是因为要在实际进行请求的前后做拦截器（interceptor），拦截器每次取都会取两个函数来执行。并将其通过 promise 来判断是否执行成功；
  > 请求拦截器从队列前面插入，响应拦截器从队列尾部插入。
