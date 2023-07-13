import { Request, Response } from "express";

import { db } from "../../database/knex";

import { HandleError } from "../../Error/HandleError";

export const EditPurchaseById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (id) {
      const [purchase] = await db("purchases").where({ id: id });

      if (!purchase) {
        res.status(400);
        throw new Error("Compra não encontrada!");
      }

      const newId = req.body.id as string | undefined;
      const newBuyer = req.body.buyer as string | undefined;
      const newProducts = req.body.products as Array<any> | undefined;

      if (newId) {
        if (newId.substring(0, 3) !== "pur") {
          res.status(400);
          throw new Error("ID precisa começar com a palavra pur!");
        }

        if (newId.length !== 6) {
          res.status(400);
          throw new Error("ID deve possuir 6 caracteres!");
        }

        const [purchaseID] = await db("purchases").where({ id: newId });

        if (purchaseID) {
          res.status(400);
          throw new Error("ID já existente!");
        }
      }

      if (newBuyer) {
        if (newBuyer.charAt(0) !== "u") {
          res.status(400);
          throw new Error("ID do usuário precisa começar com a letra u!");
        }

        if (newBuyer.length !== 4) {
          res.status(400);
          throw new Error("ID do usuário deve possuir 4 caracteres!");
        }

        const [user] = await db("users").where("id", "like", `${newBuyer}`);

        if (!user) {
          res.status(400);
          throw new Error("Usuário não encontrado!");
        }
      }

      if (newProducts) {
        const [purchaseProduct] = await db("purchases_products").where({
          purchase_id: id,
        });

        if (!purchaseProduct) {
          res.status(400);
          throw new Error("Registro da compra não encontrado!");
        }

        let total_price = 0;

        for (let value of newProducts) {
          const productID = value.id;
          const prodQuantity = value.quantity;

          const productPrice = await db("products")
            .select("price")
            .where("id", "like", `${productID}`);
          const resultProduct = productPrice[0].price * prodQuantity;
          total_price += resultProduct;
        }

        const updatePurchases = {
          id: newId || purchase.id,
          buyer: newBuyer || purchase.name,
          total_price: total_price > 0 ? total_price : purchase.total_price,
        };

        await db("purchases").update(updatePurchases).where({ id: id });

        for (let value of newProducts) {
          if (!value.id) {
            res.status(400);
            throw new Error("Digite o ID do produto!");
          }

          const productID = value.id;
          const prodQuantity = value.quantity;

          const updatePurchasesProduct = {
            purchase_id: newId || purchaseProduct.purchase_id,
            product_id: productID || purchaseProduct.product_id,
            quantity: prodQuantity || purchaseProduct.quantity,
          };

          await db("purchases_products")
            .update(updatePurchasesProduct)
            .where({ purchase_id: id })
            .where({ product_id: productID });
        }
      } else {
        res.status(400);
        throw new Error("Insira os produtos comprados!");
      }

      res.status(200).send("Pedido atualizado com sucesso!");
    }
  } catch (error) {
    error instanceof Error
      ? HandleError(error, res)
      : res.send("Erro inesperado!");
  }
};
