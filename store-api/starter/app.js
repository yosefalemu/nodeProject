require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const notfound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productRouters = require("./routes/products");

app.get("/", (req, res) => {
  res.status(200).send("home page");
});
//routes
app.use("/api/v1/products", productRouters);

//middlewares
app.use(notfound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
};
start();
