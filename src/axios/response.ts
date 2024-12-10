// import { instance } from "./1-default";
import instance from "./2-interceptor";

instance.get("/posts/1").then((response) => {
  console.log(response);
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
});

instance.post("/posts", { title: "foo", body: "bar", userId: 1 });
