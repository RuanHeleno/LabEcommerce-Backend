import { Request, Response } from "express";

import { db } from "../../database/knex";
import { TUsers } from "../../types";

import { HandleError } from "../../Error/HandleError";

export const EditUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id) {
      const [user] = await db("users").where({ id: id });

      if (!user) {
        res.status(400);
        throw new Error("Usuário não encontrado!");
      }

      const newId = req.body.id as string | undefined;
      const newName = req.body.name as string | undefined;
      const newEmail = req.body.email as string | undefined;
      const newPassword = req.body.password as string | undefined;

      if (newId) {
        if (newId.charAt(0) !== "u") {
          res.status(400);
          throw new Error("ID precisa começar com a letra u!");
        }

        if (newId.length !== 4) {
          res.status(400);
          throw new Error("ID deve possuir 4 caracteres!");
        }

        const [userID] = await db("users").where({ id: newId });

        if (userID) {
          res.status(400);
          throw new Error("ID já existente!");
        }
      }

      if (newName) {
        if (newName.length <= 2) {
          res.status(400);
          throw new Error("Nome deve possuir 3 caracteres, pelo menos!");
        }
      }

      if (newEmail) {
        const [userEmail] = await db("users").where({ email: newEmail });

        if (userEmail) {
          res.status(400);
          throw new Error("Email já existente!");
        }

        const regex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
        const test = regex.test(newEmail);

        if (!test) {
          res.status(400);
          throw new Error("Digite corretamente o email: teste@teste.com");
        }
      }

      if (newPassword) {
        const regex = new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
        );
        const test = regex.test(newPassword);

        if (!test) {
          res.status(400);
          throw new Error(
            "A senha precisa ter: \n-mínimo de 8 caratecteres; \n-Uma letra maiúscula; \n-Um número; \n-Um caractere especial"
          );
        }
      }

      const updateUser: TUsers = {
        id: newId || user.id,
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password,
        created_at: user.created_at,
      };

      await db("users").update(updateUser).where({ id: id });

      res.status(200).send("Usuário atualizado com sucesso!");
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
