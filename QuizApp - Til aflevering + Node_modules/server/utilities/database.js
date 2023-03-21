const { MongoClient } = require('mongodb')
let connection = null

module.exports = {
    connect: async () => {
        
        // connecting to database
        connection = await MongoClient.connect(process.env.MONGODB_URL);

        // connection error
        if(!connection) {
            throw Error('The connection to the database could not be established')
        }

        // return connection
        return connection.db('Quizapp');
    },
    get: ()=> {

        // connection error
        if(!connection) {
            throw Error('The connection to the database could not be established')
        }

        // return connection
        return connection.db('Quizapp')
    }
}