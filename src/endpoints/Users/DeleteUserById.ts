import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const DeleteUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id) {
      const [user] = await db("users").where({ id: id });

      if (!user) {
        res.status(400);
        throw new Error("Usuário não encontrado!");
      }

      if (id.charAt(0) !== "u") {
        res.status(400);
        throw new Error("ID precisa começar com a letra u!");
      }

      if (id.length !== 4) {
        res.status(400);
        throw new Error("ID deve possuir 4 caracteres!");
      }

      await db("users").del().where({ id: id });

      res.status(200).send("Usuário apagado com sucesso!");
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
