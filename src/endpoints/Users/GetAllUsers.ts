import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await db("users").select(
      "id",
      "name",
      "email",
      "password",
      "created_at AS createdAt"
    );

    res.status(200).send(result);
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
