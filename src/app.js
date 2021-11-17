import express from "express";
import morgan from "morgan";
import cors from "cors";

import TaskRoutes from "./routes/task.routes";
import { welcomeMessage } from "./config/welcome";

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/", (request, response) => {
  response.json(welcomeMessage);
});

app.use("/api/tasks", TaskRoutes);

export default app;
