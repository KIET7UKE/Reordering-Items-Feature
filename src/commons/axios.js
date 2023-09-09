import axios from "axios";

export const instance = axios.create({
//   baseURL: "https://shivas-server.cyclic.cloud/api",
  baseURL: "http://localhost:8080/api",
  headers: { "X-Custom-Header": "foobar" },
});