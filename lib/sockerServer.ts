import axios from "axios";

export const socketServer = axios.create({
  baseURL: "http://localhost:4000",
});