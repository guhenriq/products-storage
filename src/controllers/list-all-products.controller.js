export class ListAllProductsController {
    #productRepository

    constructor(productRepository){
        this.#productRepository = productRepository
    }

    async handle(request, response){
        try {
            let userId = request.user.id

            let products = await this.#productRepository.findAll(userId)

            return response.status(200).send(products)
        } catch(error) {
            throw new Error(error)
        }
    }
}