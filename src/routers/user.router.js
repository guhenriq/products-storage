import { Router } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import { HashService } from "../helpers/hash/hash.js";
import { CreateUserController } from "../controllers/create-user.controller.js";

export const routerUser = Router()

routerUser.post("/signup", async (req, res) => {
  const userRepository = new UserRepository()
  const hashService = new HashService()

  const createUserController = new CreateUserController(
    userRepository,
    hashService
  )

  await createUserController.handle(req, res)
})
