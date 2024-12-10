import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// 多个拦截器触发顺序：
// request-2 -> request-1 -> response1 -> response2

instance.interceptors.request.use(
  (config) => {
    console.log("cnofig-request-1", config);
    debugger;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const r1 = instance.interceptors.request.use(
  (config) => {
    console.log("cnofig-request-2", config);
    debugger;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("cnofig-response-1", response);
    debugger;
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    console.log("cnofig-response-2", response);
    debugger;
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const removeInterceptor = (key) => {
  instance.interceptors.request.eject(key);
  instance.interceptors.response.eject(key);
};

export default instance;
