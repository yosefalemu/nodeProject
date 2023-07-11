const ProductsSchema = require("../models/product");
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, field, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "false" ? false : true;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };
    const regExp = /\b(>|<|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regExp,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",");
    console.log(filters);
    filters.forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = ProductsSchema.find(queryObject);
  //For sort parameters
  if (sort) {
    const sortParameter = sort.split(",").join(" ");
    // console.log(sortParameter);
    result = result.sort(sortParameter);
  } else {
    result = result.sort("createdAt");
  }
  //For field paraneters
  if (field) {
    const fieldParameter = field.split(",").join(" ");
    // console.log(fieldParameter);
    result = result.select(fieldParameter);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 7;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};
//Not such usefull
const getAllProductsStatic = async (req, res) => {
  const products = await ProductsSchema.find({}).sort("-name");
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
