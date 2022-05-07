import productRoutes from './routes/products.routes'
import { createRoles } from './libs/initialSetup'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import pkg from '../package.json'
import express from 'express'
import morgan from 'morgan'

const app = express()
createRoles() 

app.set('pkg', pkg)

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

export default app