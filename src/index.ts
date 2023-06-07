import express, { Request, Response } from "express";
import cors from "cors";

import { products, users } from "./database";
import { TProducts, TUser } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//Get All Users
app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

//Create new User
app.post("/users", (req: Request, res: Response) => {
  const {
    id,
    name,
    email,
    password,
  }: { id: string; name: string; email: string; password: string } = req.body;
  const newUser: TUser = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).send("Cadastro realizado com sucesso!");
  console.log(users);
});



//Get All Products
app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products);
});

//Get Product By Name
app.get("/products/search", (req: Request, res: Response) => {
  const { name } = req.query;

  if (name) {
    const result: Array<TProducts> = products.filter((product) =>
      product.name.toLowerCase().includes(name.toString().toLowerCase())
    );

    res.status(200).send(result);
  }
});

//Create new Product
app.post("/products", (req: Request, res: Response) => {
  const {
    id,
    name,
    price,
    description,
    imageUrl,
  }: {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  } = req.body;
  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  products.push(newProduct);

  res.status(201).send("Produto cadastrado com sucesso!");
  console.log(products);
});
