import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const DeleteProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id) {
      const [product] = await db("products").where({ id: id });

      if (!product) {
        res.status(400);
        throw new Error("Produto não encontrado!");
      }

      if (id.substring(0, 4) !== "prod") {
        res.status(400);
        throw new Error("ID precisa começar com a palavra prod!");
      }

      if (id.length !== 7) {
        res.status(400);
        throw new Error("ID deve possuir 7 caracteres!");
      }

      await db("products").del().where({ id: id });

      res.status(200).send("Produto apagado com sucesso!");
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
}