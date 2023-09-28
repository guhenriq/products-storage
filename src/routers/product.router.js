import { Router } from "express";
import { CreateProductController } from "../controllers/create-product.controller.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { authAuthorization } from "../middlewares/auth.middleware.js";
import { ListAllProductsController } from "../controllers/list-all-products.controller.js";
import { ListOneProductController } from "../controllers/list-one-product.controller.js";
import { DeleteProductController } from "../controllers/delete-product.controller.js";
import { UpdateProductController } from "../controllers/update-product.controller.js";

export const routerProduct = Router()

const productRepository = new ProductRepository()

routerProduct.post("/", authAuthorization, async (req, res, next) => {
    const createProductController = new CreateProductController(productRepository)
    await createProductController.handle(req, res)

    next()
})

routerProduct.get("/", authAuthorization, async (req, res, next) => {
    const listAllProductsController = new ListAllProductsController(productRepository)
    await listAllProductsController.handle(req, res)

    next()
})

routerProduct.get("/:id", authAuthorization, async (req, res, next) => {
    const listOneProductController = new ListOneProductController(productRepository)
    await listOneProductController.handle(req, res)

    next()
})

routerProduct.delete("/:id", authAuthorization, async (req, res, next) => {
    const deleteProductController = new DeleteProductController(productRepository)
    await deleteProductController.handle(req, res)

    next()
})

routerProduct.patch("/:id", authAuthorization, async (req, res, next) => {
    const updateProductController = new UpdateProductController(productRepository)
    await updateProductController.handle(req, res)

    next()
})
