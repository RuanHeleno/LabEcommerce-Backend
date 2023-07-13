import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const GetPurchaseById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id) {
      if (id.length !== 6) throw new Error("ID deve possuir 6 caracteres");

      const [purchase] = await db("purchases")
        .select(
          "purchases.id AS purchaseId",
          "purchases.buyer AS buyerId",
          "users.name AS buyerName",
          "users.email AS buyerEmail",
          "purchases.total_price AS totalPrice",
          "purchases.created_at AS createdAt"
        )
        .innerJoin("users", "purchases.buyer", "users.id");

      const purchaseProducts = await db("purchases_products")
        .select(
          "products.id",
          "products.name",
          "products.price",
          "products.description",
          "products.image_url AS imageUrl",
          "purchases_products.quantity"
        )
        .innerJoin("products", "purchases_products.product_id", "products.id")
        .where("purchases_products.purchase_id", "like", `${id}`);

      const result = { ...purchase, products: purchaseProducts };

      res.status(200).send(result);
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
