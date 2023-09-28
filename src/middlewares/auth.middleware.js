import "dotenv/config";
import jwt from "jsonwebtoken";

export const authAuthorization = (req, res, next) => {
    try {
        const token = req.headers.authorization 

        if (!token) return  res.status(401).send('Necessário o envio de um token!');

        jwt.verify(token.split(' ')[1], process.env.PRIVATE_KEY_JWT, function(err, decoded)  {
            if (err) return res.status(500).send({ auth: false, message: 'Token inválido' });
            req.user = decoded
            next()
        })
    } catch(err) {
        next(err)
    }
}