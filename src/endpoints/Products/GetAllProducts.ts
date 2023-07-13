import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const GetAllProducts = async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string | undefined;

    if (name) {
      const result = await db("products")
        .select("id", "name", "price", "description", "image_url AS imageUrl")
        .where("name", "like", `%${name}%`);

      res.status(200).send(result);
    } else {
      const result = await db("products").select(
        "id",
        "name",
        "price",
        "description",
        "image_url AS imageUrl"
      );

      res.status(200).send(result);
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
