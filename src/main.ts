import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
// import instance from "./axios/index.ts";
import { get } from "./axios/get.ts";
import { instance } from "./axios/post.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

// get.then((res) => {
//   console.log("res", res);
// });
// console.log(instance.post("/"));
const params = new URLSearchParams()
// params.append("address", "zhangsan")

// const form = new FormData();
// form.append('my_field', 'my value');
// form.append('my_buffer', new Blob([1, 2, 3]));
// form.append('my_file', fileInput.files[0]);

instance.post("/users", form).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
  console.log(err.toJSON());
});
