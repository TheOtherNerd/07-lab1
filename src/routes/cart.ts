// require the express module
import express from "express";
import Items from "../models/Item";

// create a new Router object
const cartRoute = express.Router();

const cart: Items[] = [
  {
    id: 1,
    product: "Oat Milk",
    price: 5,
    quantity: 60,
  },
  {
    id: 2,
    product: "Cereal",
    price: 3,
    quantity: 1,
  },
  {
    id: 3,
    product: "Soda",
    price: 6,
    quantity: 2,
  },
  {
    id: 4,
    product: "Olives",
    price: 3,
    quantity: 1,
  },
];

cartRoute.get("/cart-items", (req, res) => {
  const { maxPrice, prefix, pageSize } = req.query;
  let filteredArray: Items[] = cart;
  if (maxPrice) {
    filteredArray = filteredArray.filter(
      (item) => item.price <= parseInt(maxPrice as string)
    );
  }
  if (prefix) {
    filteredArray = filteredArray.filter((item) =>
      item.product.startsWith(prefix as string)
    );
  }
  if (pageSize) {
    filteredArray = filteredArray.slice(0, parseInt(pageSize as string));
  }
  res.status(200);
  res.json(filteredArray);
});

export default cartRoute;
