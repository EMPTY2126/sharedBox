import express from "express";
import http from "http"
import { initServer } from "./webSocketHandler.js";

const PORT = 3000;
const app = express();

const server = http.createServer(app);
const CLIENTS = new Map();

initServer(server, CLIENTS)

server.listen(3000, console.log(`Running on port : ${PORT}`));