var dbConn = null;

function connectToMongo() {
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    const uri = 'mongodb+srv://naor:naor315@comparepricescluster-utxr6.mongodb.net/test?retryWrites=true&w=majority'
    return MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', () => {
                console.log('MongoDB Disconnected!');
                dbConn = null;
            });
            dbConn = client.db('babysitter');
            return dbConn;
        })
}

module.exports = {
    connect: connectToMongo
}

