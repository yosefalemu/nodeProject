require("dotenv").config();
const connectDB = require("./db/connect");
const productsSchema = require("./models/product");
const productJson = require("./products.json");

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  await productsSchema.deleteMany();
  await productsSchema.create(productJson);
  process.exit(0);
};
start();
