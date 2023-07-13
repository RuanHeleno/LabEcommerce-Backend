import { Request, Response } from "express";

import { db } from "../../database/knex";
import { TProducts } from "../../types";

import { HandleError } from "../../Error/HandleError";

export const CreateProduct = async (req: Request, res: Response) => {
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

    if (id) {
      if (id.substring(0, 4) !== "prod") {
        res.status(400);
        throw new Error("ID precisa começar com a palavra prod!");
      }

      if (id.length !== 7) {
        res.status(400);
        throw new Error("ID deve possuir 7 caracteres!");
      }

      const [productID] = await db("products").where("id", "like", `${id}`);

      if (productID) {
        res.status(400);
        throw new Error("ID já existente!");
      }
    } else {
      res.status(400);
      throw new Error("Digite o ID!");
    }

    if (!name) {
      res.status(400);
      throw new Error("Digite o nome!");
    }

    if (price) {
      if(price < 0) {
        res.status(400);
        throw new Error("Preço não pode ser menor que 0!");
      }
    } else {
      res.status(400);
      throw new Error("Digite o preço!");
    }

    if (description) {
      if (description.length < 3) {
        res.status(400);
        throw new Error("Descrição não pode ter menos que 3 caracteres!");
      }
    } else {
      res.status(400);
      throw new Error("Digite a descrição!");
    }

    if (imageUrl) {
      const regex = new RegExp("(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?");
      const test = regex.test(imageUrl);

      if (!test) {
        res.status(400);
        throw new Error("Digite corretamente a URL da imagem com https");
      }
    } else {
      res.status(400);
      throw new Error("Digite a URL da imagem!");
    }

    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      image_url: imageUrl,
    };

    await db("products").insert(newProduct);

    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
