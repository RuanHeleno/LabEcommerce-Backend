import express from "express";
import cors from "cors";

import { CreateUser } from "./endpoints/Users/CreateUser";
import { GetUserPurchaseById } from "./endpoints/Users/GetUserPurchaseById";
import { GetUserById } from "./endpoints/Users/GetUserById";
import { GetAllUsers } from "./endpoints/Users/GetAllUsers";
import { EditUserById } from "./endpoints/Users/EditUserById";
import { DeleteUserById } from "./endpoints/Users/DeleteUserById";

import { CreateProduct } from "./endpoints/Products/CreateProduct";
import { GetProductById } from "./endpoints/Products/GetProductById";
import { GetAllProducts } from "./endpoints/Products/GetAllProducts";
import { EditProductById } from "./endpoints/Products/EditProductById";
import { DeleteProductById } from "./endpoints/Products/DeleteProductById";

import { CreatePurchase } from "./endpoints/Purchases/CreatePurchase";
import { GetPurchaseById } from "./endpoints/Purchases/GetPurchaseById";
import { GetAllPurchases } from "./endpoints/Purchases/GetAllPurchases";
import { EditPurchaseById } from "./endpoints/Purchases/EditPurchaseById";
import { DeletePurchaseById } from "./endpoints/Purchases/DeletePurchaseById";

import { GetAllPurchasesProducts } from "./endpoints/PurchasesProducts/GetAllPurchasesProducts";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//Create new User
app.post("/users", CreateUser);

//Get User Purchases by User id
app.get("/users/:id/purchases", GetUserPurchaseById);

//Get User By ID
app.get("/users/:id", GetUserById);

//Get All Users
app.get("/users", GetAllUsers);

//Edit User By ID
app.put("/users/:id", EditUserById);

//Delete User By Id
app.delete("/users/:id", DeleteUserById);



//Create new Product
app.post("/products", CreateProduct);

//Get Product By ID
app.get("/products/:id", GetProductById);

//Get All Products
app.get("/products", GetAllProducts);

//Edit Product By Id
app.put("/products/:id", EditProductById);

//Delete Product By Id
app.delete("/products/:id", DeleteProductById);



//Create new Purchase
app.post("/purchases", CreatePurchase);

//Get Purchase By ID
app.get("/purchases/:id", GetPurchaseById);

//Get All Purchases
app.get("/purchases", GetAllPurchases);

//Edit Purchase By Id
app.put("/purchases/:id", EditPurchaseById);

//Delete Purchase By Id
app.delete("/purchases/:id", DeletePurchaseById);



//Get All Purchases Products
app.get("/purchasesProducts", GetAllPurchasesProducts);