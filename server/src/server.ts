import express from "express";
import * as http from "http";
import handleSocketio from "./handleSocketio/handleSocketio";

const app = express();
const server = http.createServer(app);

app.get("/", (_, res) => {
	res.send("The Sweepsweeper Server");
});

server.listen(3000, () => {
	console.log("listening on port 3000");
});

handleSocketio(server); // 
