export class ListOneProductController {
    #productRepository

    constructor(productRepository){
        this.#productRepository = productRepository
    }

    async handle(request, response){
        try {
            let userId = request.user.id
            let productId = request.params.id

            let product = await this.#productRepository.findById(userId, productId)

            if (!product) {
                return response.status(400).send({
                    message: "product not exists"
                })
            }

            return response.status(200).send(product)
        } catch(error) {
            throw new Error(error)
        }
    }
}