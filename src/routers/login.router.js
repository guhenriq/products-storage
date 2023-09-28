import { Router } from "express";
import { UserRepository } from "../repositories/user.repository.js";
import { HashService } from "../helpers/hash/hash.js";
import { LoginController } from "../controllers/login.controller.js";
import { authAuthorization } from "../middlewares/auth.middleware.js";

export const routerLogin = Router()

routerLogin.get("/me", authAuthorization, (req, res, next) => {

    console.log(req.user)
    
    res.send('OK')
})

routerLogin.post("/", async (req, res) => {
    const userRepository = new UserRepository()
    const hashService = new HashService()
    
    const loginController = new LoginController(
        userRepository,
        hashService
    )

    await loginController.handle(req, res)
})