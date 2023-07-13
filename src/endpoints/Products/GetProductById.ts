import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const GetProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id) {
      if (id.length !== 7) throw new Error("ID deve possuir 7 caracteres");

      const result = await db("products")
        .select("id", "name", "price", "description", "image_url AS imageUrl")
        .where({ id: id });

      res.status(200).send(result);
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
