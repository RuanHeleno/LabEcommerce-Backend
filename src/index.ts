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

//Create new User
app.post("/users", (req: Request, res: Response) => {
  try {
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

    if (id.charAt(0) !== "u")
      throw new Error("ID precisa começar com a letra u!");

    const checkId = users.find((account) => account.id === id);
    const checkEmail = users.find((account) => account.email === email);

    if (checkId) throw new Error("ID já cadastrado!");
    if (checkEmail) throw new Error("Email já cadastrado!");

    users.push(newUser);

    res.status(201).send("Cadastro realizado com sucesso!");
    console.table(users);
  } catch (error) {
    if (error instanceof Error) res.send(error.message);
    else res.send("Erro na instância da classe!");
  }
});

//Get All Users
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error) {
    if (error instanceof Error) res.send(error.message);
    else res.send("Erro na instância da classe!");
  }
});

//Delete User By Id
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userIndex: number = users.findIndex((user) => user.id === id);

    if (userIndex < 0) throw new Error("Usuário não encontrado!");

    users.splice(userIndex, 1);

    res.status(200).send("Usuário apagado com sucesso!");
    console.table(users);
  } catch (error) {
    if (error instanceof Error) res.send(error.message);
    else res.send("Erro na instância da classe!");
  }
});

//Get All Products
app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error) {
    if (error instanceof Error) res.send(error.message);
    else res.send("Erro na instância da classe!");
  }
});

//Get Product By Name
app.get("/products/search", (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (name) {
      const newName = name as string | undefined;

      if (newName !== undefined) {
        if (newName.length < 1)
          throw new Error("Nome deve possuir pelo menos um caractere");

        const result: Array<TProducts> = products.filter((product) =>
          product.name.toLowerCase().includes(newName.toLowerCase())
        );

        res.status(200).send(result);
      }
    }
  } catch (error) {
    if (error instanceof Error) res.send(error.message);
    else res.send("Erro na instância da classe!");
  }
});

//Create new Product
app.post("/products", (req: Request, res: Response) => {
  try {
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

    if (id.charAt(0) !== "u")
      throw new Error("ID precisa começar com a letra u!");

    const checkId = users.find((account) => account.id === id);

    if (checkId) throw new Error("ID já cadastrado!");

    products.push(newProduct);

    res.status(201).send("Produto cadastrado com sucesso!");
    console.table(products);
  } catch (error) {
    if (error instanceof Error) res.send(error.message);
    else res.send("Erro na instância da classe!");
  }
});

//Delete Product By Id
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const productIndex: number = products.findIndex(
      (product) => product.id === id
    );

    if (productIndex < 0) throw new Error("Produto não encontrado!");

    products.splice(productIndex, 1);

    res.status(200).send("Produto apagado com sucesso!");
    console.table(products);
  } catch (error) {
    if (error instanceof Error) res.send(error.message);
    else res.send("Erro na instância da classe!");
  }
});

//Edit Product By Id
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const product: TProducts | undefined = products.find(
      (product) => product.id === id
    );

    if (!product) throw new Error("Produto não encontrado.");

    product.id = newId || product.id;
    product.name = newName || product.name;
    product.price = newPrice || product.price;
    product.description = newDescription || product.description;
    product.imageUrl = newImageUrl || product.imageUrl;

    res.status(200).send("Produto atualizado com sucesso");
    console.table(products);
  } catch (error) {
    if (error instanceof Error) res.send(error.message);
    else res.send("Erro na instância da classe!");
  }
});
