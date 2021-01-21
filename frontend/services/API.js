import axios from "axios";

export const ENDPOINT = "http://localhost:3030/v1/";

const API = axios.create({
  baseURL: ENDPOINT,
  timeout: 3000,
});

API.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt !== null) config.headers["Authorization"] = `Bearer ${jwt}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 403) {
      console.log("Auth...");
      window.location = "/login";
    }
    return error;
  }
);

export default API;
