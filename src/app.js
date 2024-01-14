import express from "express";
import cookieParser from "cookie-parser";
import { addLogger } from "./logger/custom.logger.js";
import UserRouter from "./router/user.router.js";
import envConfig from "./config/env.config.js";

// Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Logger middleware
app.use(addLogger);

// Cookie parser middleware
app.use(cookieParser());

const userRouter = new UserRouter();
app.use("/api/user", userRouter.getRouter());

// Init Server
app.listen(envConfig.PORT, () => {
  console.log(`Server is running on port ${envConfig.PORT}`);
});
