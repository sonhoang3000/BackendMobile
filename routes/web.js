const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");

let initWebRoutes = (app) => {
  //product
  router.get("/api/getAllProducts", productController.getAllProducts);
  router.get("/api/getProductById:id", productController.getProductById);
  router.post("/api/createProduct", productController.createProduct);
  router.put("/api/updateProduct:id", productController.updateProduct);
  router.delete("/api/deleteProduct/:id", productController.deleteProduct);
  //user

  return app.use("/", router);
};

module.exports = initWebRoutes;
