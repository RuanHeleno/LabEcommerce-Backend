import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";
import { TPurchases, TPurchasesProducts } from "../../types";

export const CreatePurchase = async (req: Request, res: Response) => {
  try {
    const {
      id,
      buyer,
      products,
    }: {
      id: string;
      buyer: string;
      products: Array<any>;
    } = req.body;
    const createdAt: string = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    if (id) {
      if (id.substring(0, 3) !== "pur") {
        res.status(400);
        throw new Error("ID precisa começar com a palavra pur!");
      }

      if (id.length !== 6) {
        res.status(400);
        throw new Error("ID deve possuir 6 caracteres!");
      }

      const [purchaseID] = await db("purchases").where("id", "like", `${id}`);

      if (purchaseID) {
        res.status(400);
        throw new Error("ID já existente!");
      }
    } else {
      res.status(400);
      throw new Error("Digite o ID!");
    }

    if (buyer) {
      if (buyer.charAt(0) !== "u") {
        res.status(400);
        throw new Error("ID do usuário precisa começar com a letra u!");
      }

      if (buyer.length !== 4) {
        res.status(400);
        throw new Error("ID do usuário deve possuir 4 caracteres!");
      }

      const [user] = await db("users").where("id", "like", `${buyer}`);

      if (!user) {
        res.status(400);
        throw new Error("Usuário não encontrado!");
      }
    } else {
      res.status(400);
      throw new Error("Digite o ID do usuário!");
    }

    if (products) {
      let total_price = 0;

      for (let value of products) {
        const productID = value.id;
        const prodQuantity = value.quantity;

        const productPrice = await db("products")
          .select("price")
          .where("id", "like", `${productID}`);
        const resultProduct = productPrice[0].price * prodQuantity;
        total_price += resultProduct;
      }

      const newPurchase: TPurchases = {
        id,
        buyer,
        total_price,
        created_at: createdAt,
      };

      await db("purchases").insert(newPurchase);

      for (let value of products) {
        const productID = value.id;
        const prodQuantity = value.quantity;

        const newPurchaseProduct: TPurchasesProducts = {
          purchase_id: id,
          product_id: productID,
          quantity: prodQuantity,
        };

        await db("purchases_products").insert(newPurchaseProduct);
      }
    } else {
      res.status(400);
      throw new Error("Insira os produtos comprados!");
    }

    res.status(201).send("Pedido realizado com sucesso!");
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
