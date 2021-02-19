const MongoClient = require('mongodb').MongoClient

async function dbConnect () {
    const connection = await MongoClient.connect('mongodb://root:password@localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true})
    const db = connection.db('Todo')
    return db
}

module.exports = dbConnect