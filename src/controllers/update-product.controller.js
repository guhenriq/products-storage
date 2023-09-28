import { updateProductSchema } from "../schemas/schemas.js"

export class UpdateProductController {
    #productRepository

    constructor(productRepository){
        this.#productRepository = productRepository
    }

    async handle(request, response) {
        try {
            let data = request.body

            let userId = request.user.id
            let productId = parseInt(request.params.id, 10)

            let { error } = updateProductSchema.validate(data)

            if (error){
                return response.status(400).send(error.details[0])
            }

            let { count } = await this.#productRepository.updateById(
                userId,
                productId,
                data
            )

            if (count == 0) {
                return response.status(404).send({
                    message: "product not found"
                })
            }

            return response.status(200).send({
                message: "product updated"
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}