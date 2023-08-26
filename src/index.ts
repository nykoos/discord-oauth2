import { PrismaClient } from "@prisma/client";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { authRouter, defaultRouter, infosRouter } from "./routes";
import { rateLimit } from "express-rate-limit";

const prisma = new PrismaClient();
const app = express();
const port = 4511;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 35, // limit each IP to 35 requests per windowMs
	standardHeaders: true,
});

app.use(limiter); // apply to all requests

app.use(
	cors({
		credentials: true,
	})
);
app.use(compression());
app.use(cookieParser()); // Needed for using cookies
app.use(bodyParser.json());

app.use("/", defaultRouter); // Default
app.use("/auth", authRouter); // Login, Logout, Callback
app.use("/infos", infosRouter); // Guilds, Me

const server = http.createServer(app);
server.listen(port, () => {
	console.log("Server is running on http://localhost:" + port + "/");
});

export { prisma };
