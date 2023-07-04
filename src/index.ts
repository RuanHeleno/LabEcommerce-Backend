import express, { Request, Response } from "express";
import cors from "cors";

import { db } from "./database/knex";
import { products, users } from "./database";
import { TProducts, TUser } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

//Create new User
app.post("/users", async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      email,
      password,
    }: { id: string; name: string; email: string; password: string } = req.body;
    const createdAt: string = new Date().toISOString();

    if (id.charAt(0) !== "u") {
      res.status(400);
      throw new Error("ID precisa começar com a letra u!");
    }

    const [userID] = await db.raw(`
      SELECT * FROM users
      WHERE id = "${id}";
	`);

    if (userID) {
      res.status(400);
      throw new Error("ID já existente!");
    }

    const [userEmail] = await db.raw(`
      SELECT * FROM users
      WHERE email = "${email}";
	`);

    if (userEmail) {
      res.status(400);
      throw new Error("Email já existente!");
    }

    if (!id || !name || !email || !password) {
      res.status(400);
      throw new Error("Dados inválidos");
    }

    await db.raw(`
        INSERT INTO users (id, name, email, password, created_at)
        VALUES ("${id}", "${name}", "${email}", "${password}", "${createdAt}");
        `);

    res.status(201);
    res.send({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Get All Users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM users;`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

//Get User Purchases by User id
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id) {
      const newID = id as string | undefined;

      if (newID !== undefined) {
        if (newID.length !== 4) throw new Error("ID deve possuir 4 caracteres");

        const result = await db.raw(
          `SELECT * FROM purchases WHERE buyer LIKE "${id}";`
        );

        res.status(200).send(result);
      }
    }
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
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

//Get Product By Name
app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    if (name) {
      const newName = name as string | undefined;

      if (newName !== undefined) {
        if (newName.length < 2)
          throw new Error("Nome deve possuir pelo menos 2 caracteres");

        const result = await db.raw(
          `SELECT * FROM products WHERE name LIKE "%${name}%";`
        );

        res.status(200).send(result);
      }
    }
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

//Get Product By ID
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id) {
      const newID = id as string | undefined;

      if (newID !== undefined) {
        if (newID.length !== 7) throw new Error("ID deve possuir 7 caracteres");

        const result = await db.raw(
          `SELECT * FROM products WHERE id LIKE "${id}";`
        );

        res.status(200).send(result);
      }
    }
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

//Get All Products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`SELECT * FROM products;`);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

//Create new Product
app.post("/products", async (req: Request, res: Response) => {
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

    if (id.charAt(0) !== "p") {
      res.status(400);
      throw new Error("ID precisa começar com a letra p!");
    }

    const [productID] = await db.raw(`
      SELECT * FROM products
      WHERE id = "${id}";
	`);

    if (productID) {
      res.status(400);
      throw new Error("ID já existente!");
    }

    if (!id || !name || !price || !description || !imageUrl) {
      res.status(400);
      throw new Error("Dados inválidos");
    }

    await db.raw(`
        INSERT INTO products (id, name, price, description, image_url)
        VALUES ("${id}", "${name}", "${price}", "${description}", "${imageUrl}");
        `);

    res.status(201);
    res.send({ message: "Produto cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
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

//Create new Purchase
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const {
      id,
      buyer,
      total_price,
      paid,
    }: {
      id: string;
      buyer: string;
      total_price: number;
      paid: string;
    } = req.body;
    const createdAt: string = new Date().toISOString();

    if (id.charAt(0) !== "p") {
      res.status(400);
      throw new Error("ID precisa começar com a letra p!");
    }

    const [purchaseID] = await db.raw(`
      SELECT * FROM purchases
      WHERE id = "${id}";
	`);

    if (purchaseID) {
      res.status(400);
      throw new Error("ID já existente!");
    }

    if (!id || !buyer || !total_price || !paid) {
      res.status(400);
      throw new Error("Dados inválidos");
    }

    await db.raw(`
        INSERT INTO purchases (id, buyer, total_price, created_at, paid)
        VALUES ("${id}", "${buyer}", "${total_price}", "${createdAt}", "${paid}");
        `);

    res.status(201);
    res.send({ message: "Compra cadastrada com sucesso!" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
