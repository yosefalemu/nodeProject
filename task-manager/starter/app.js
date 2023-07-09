const express = require("express");
const app = express();
const tasks = require("./routers/tasks");
const connectDb = require("./db/connect");
require("dotenv").config();
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  await connectDb(process.env.MONGO_URI);
  app.listen(port, console.log(`server is lestening on port ${port}...`));
};
start();
