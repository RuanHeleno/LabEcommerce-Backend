import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const DeletePurchaseById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id) {
      const [purchase] = await db("purchases").where({ id: id });

      if (!purchase) {
        res.status(400);
        throw new Error("Pedido não encontrado!");
      }

      if (id.substring(0, 3) !== "pur") {
        res.status(400);
        throw new Error("ID precisa começar com a palavra pur!");
      }

      if (id.length !== 6) {
        res.status(400);
        throw new Error("ID deve possuir 6 caracteres!");
      }

      await db("purchases_products").del().where({ purchase_id: id });

      await db("purchases").del().where({ id: id });

      res.status(200).send("Pedido cancelado com sucesso!");
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
