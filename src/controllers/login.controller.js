import "dotenv/config";
import jwt from "jsonwebtoken";
import { loginSchema } from "../schemas/schemas.js";

export class LoginController {
  #userRepository;
  #hashService;

  constructor(userRepository, hashService) {
    this.#userRepository = userRepository;
    this.#hashService = hashService;
  }

  async handle(request, response) {
    try {
      let data = request.body;

      let { error } = loginSchema.validate(data);

      if (error) {
        return response.status(400).send(error.details[0]) 
      } 
      
      let user = await this.#userRepository.findByEmail(data.email)

      if (!user) {
        return response.status(404).send({ message: "usuário não encontrado" }) 
      } 

      let passwordVerify = this.#hashService.verify(data.password, user.password)

      if (!passwordVerify) {
        return response.status(401).send({ message: "senha inválida" });
      } 
      
      let payload = {id: user.id, email: user.email}

      let token = jwt.sign(payload, process.env.PRIVATE_KEY_JWT, { expiresIn: "1h" })

      response.status(200).send({
        message: "logado com sucesso",
        email: user.email,
        token: token,
      });
    } catch (error) {
      throw new Error(error)
    }
  }
}
