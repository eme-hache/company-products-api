import app from './app'
import './database'

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is running on port', port)
})

