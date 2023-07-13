import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const GetUserPurchaseById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id) {
      if (id.charAt(0) !== "u") {
        res.status(400);
        throw new Error("ID precisa começar com a letra u!");
      }

      if (id.length !== 4) {
        res.status(400);
        throw new Error("ID deve possuir 4 caracteres!");
      }

      const result = await db("purchases")
        .select(
          "id",
          "buyer",
          "total_price AS totalPrice",
          "created_at AS createdAt"
        )
        .where({ buyer: id });

      res.status(200).send(result);
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
