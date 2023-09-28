import 'dotenv/config'
import express from 'express'
import { routerUser } from './routers/user.router.js';
import { routerLogin } from './routers/login.router.js';
import { routerProduct } from './routers/product.router.js';

const app = express()
const port = process.env.API_PORT

app.use(express.json())
app.use('/user', routerUser)
app.use('/login', routerLogin)
app.use('/product', routerProduct)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})


