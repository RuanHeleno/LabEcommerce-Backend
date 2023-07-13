import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const GetUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id) {
      if (id.length !== 4) throw new Error("ID deve possuir 4 caracteres");

      const result = await db("users")
        .select("id", "name", "email", "password", "created_at AS createdAt")
        .where({ id: id });

      res.status(200).send(result);
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
