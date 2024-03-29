import mongoose from 'mongoose'

let connectionString

if (process.env.ENV === 'production') {
    connectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/`
} else {
    connectionString = `mongodb://${process.env.HOST}:${process.env.PORT}/${process.env.DB}`
}

mongoose.connect(connectionString)
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err))