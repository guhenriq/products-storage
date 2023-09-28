import { createProductSchema } from "../schemas/schemas.js"

export class CreateProductController {
    #productRepository

    constructor(productRepository) {
        this.#productRepository = productRepository
    }

    async handle(request, response) {
        let data = request.body

        const { error } = createProductSchema.validate(data)

        if (error) {
            return response.status(400).send(error.details[0])
        }

        let responseCreate = await this.#productRepository.create(
            request.user.id,
            data.name,
            data.description,
            data.amount
        )
        
        return response.status(201).send(responseCreate)
    }
}