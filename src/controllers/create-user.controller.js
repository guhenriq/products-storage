import { createUserSchema } from "../schemas/schemas.js"

export class CreateUserController {
    #userRepository
    #hashService
 
    constructor(userRepository, hashService){
        this.#userRepository = userRepository
        this.#hashService = hashService
    }

    async handle(request, response){
        let data = request.body

        const { error } = createUserSchema.validate(data)

        if (error){
            response.status(400).send(error.details[0])
        } else {
            let responseCreate = await this.#userRepository.create(
                data.email, 
                this.#hashService.encrypt(data.password)
            )
    
            response.status(201).send(responseCreate)
        }
    }
}