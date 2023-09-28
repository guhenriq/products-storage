export class DeleteProductController {
    #productRepository

    constructor(productRepository){
        this.#productRepository = productRepository
    }

    async handle(request, response){
        try {
            let userId = request.user.id
            let productId = parseInt(request.params.id, 10)

            let { count } = await this.#productRepository.deleteById(userId, productId)

            if(count == 0) {
                return response.status(404).send({
                    message: "product not found"
                })
            }
            
            return response.status(200).send({
                message: "product deleted"
            })
        } catch(error) {
            throw new Error(error)
        }
    }
}