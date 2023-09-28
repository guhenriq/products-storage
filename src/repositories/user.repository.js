import { prisma } from "../prisma.js";

export class UserRepository {
    async create(email, password){
        try {
            const response = await prisma.user.create({
                data: {
                    email,
                    password
                }
            })
            return response
        } catch(error){
            throw new Error(error.message)
        }
    }

    async findByEmail(email) {
        try{
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            return user ?? null
        } catch(error) {
            throw new Error(error.message)
        }
    }
}