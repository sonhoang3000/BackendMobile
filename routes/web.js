const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const userController = require("../controller/user.controller");

let initWebRoutes = (app) => {
  //product
  router.get("/api/getAllProducts", productController.getAllProducts);
  router.get("/api/getProductById:id", productController.getProductById);
  router.post("/api/createProduct", productController.createProduct);
  router.put("/api/updateProduct:id", productController.updateProduct);
  router.delete("/api/deleteProduct/:id", productController.deleteProduct);

  //user
  router.post("/api/user-login", userController.handleLogin);
  router.post("/api/create-new-user", userController.createNewUser);
  router.get("/api/get-all-users", userController.getAllUsers);
  router.delete("/api/delete-user", userController.deleteUser);
  router.put("/api/edit-user", userController.editUser);


  return app.use("/", router);
};

module.exports = initWebRoutes;
