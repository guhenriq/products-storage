import { prisma } from "../prisma.js";

export class ProductRepository {
    async create(userId, name, description, amount){
        try {
            const response = await prisma.product.create({
                data: {
                    userId,
                    name,
                    description,
                    amount
                }
            })
            return response
        } catch (error) {
            throw new Error(error)
        }
    }

    async findAll(userId) {
        try {
            const products = await prisma.product.findMany({
                where: {
                    userId
                }
            })
            return products
        } catch {
            throw new Error(error)
        }
    }

    async findById(userId, id) {
        try {
            const product = await prisma.product.findFirst({
                where: {
                    AND: [
                        {
                            id: {
                                equals: parseInt(id, 10)
                            }
                        },
                        {
                            userId: {
                                equals: parseInt(userId, 10)
                            }
                        },
                    ],
                },
            })
            return product
        } catch(error) {
            throw new Error(error)
        }
    }

    async updateById(userId, id, data) {
        try {
            const response = await prisma.product.updateMany({
                where: {
                    userId,
                    id
                },
                data: { ...data }
            })
            
            return response
        } catch(error) {
            throw new Error(error)
        }
    }

    async deleteById(userId, id) {
        try {
            const response = await prisma.product.deleteMany({
                where: {
                    userId,
                    id
                },
            })
            return response
        } catch(error) {
            throw new Error(error)
        }
    }
}