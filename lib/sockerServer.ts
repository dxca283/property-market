import axios from "axios";

export const socketServer = axios.create({
  baseURL:
    process.env.SOCKET_SERVER_INTERNAL_URL ?? "http://socket-server:4000",
});
