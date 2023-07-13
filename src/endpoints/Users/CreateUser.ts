import { Request, Response } from "express";

import { db } from "../../database/knex";
import { TUsers } from "../../types";

import { HandleError } from "../../Error/HandleError";

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      email,
      password,
    }: { id: string; name: string; email: string; password: string } = req.body;
    const createdAt: string = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    if (id) {
      if (id.charAt(0) !== "u") {
        res.status(400);
        throw new Error("ID precisa começar com a letra u!");
      }

      if (id.length !== 4) {
        res.status(400);
        throw new Error("ID deve possuir 4 caracteres!");
      }

      const [userID] = await db("users").where({ id: id });

      if (userID) {
        res.status(400);
        throw new Error("ID já existente!");
      }
    } else {
      res.status(400);
      throw new Error("Digite o ID!");
    }

    if (name) {
      if (name.length <= 2) {
        res.status(400);
        throw new Error("Nome deve possuir 3 caracteres, pelo menos!");
      }
    } else {
      res.status(400);
      throw new Error("Digite o nome!");
    }

    if (email) {
      const regex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
      const test = regex.test(email);

      if (!test) {
        res.status(400);
        throw new Error("Digite corretamente o email: teste@teste.com");
      }

      const [userEmail] = await db("users").where({ email: email });

      if (userEmail) {
        res.status(400);
        throw new Error("Email já existente!");
      }
    } else {
      res.status(400);
      throw new Error("Digite o email!");
    }

    if (password) {
      const regex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      );
      const test = regex.test(password);

      if (!test) {
        res.status(400);
        throw new Error(
          "A senha precisa ter: \n-mínimo de 8 caratecteres; \n-Uma letra maiúscula; \n-Um número; \n-Um caractere especial"
        );
      }
    } else {
      res.status(400);
      throw new Error("Digite a senha!");
    }

    const newUser: TUsers = {
      id,
      name,
      email,
      password,
      created_at: createdAt,
    };

    await db("users").insert(newUser);

    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
