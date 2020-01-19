var dbConn = null;

// function connectToMongo() {
//     // Reuse existing connection if exist
//     if (dbConn) return Promise.resolve(dbConn);
//     const MongoClient = require('mongodb').MongoClient;

//     // const url = 'mongodb+srv://naor123:naor123@cluster0-wqy1p.mongodb.net/test?retryWrites=true&w=majority';
//     const url = 'mongodb+srv://naor:naor315@comparepricescluster-utxr6.mongodb.net/test?retryWrites=true&w=majority'

//     return MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(client => {
//             console.log('Connected to MongoDB');
//             // If we get disconnected (e.g. db is down)
//             client.on('close', () => {

//                 console.log('MongoDB Disconnected!');
//                 dbConn = null;
//             })
//             dbConn = client.db()
//             return dbConn;
//         })
// }
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
// const db = client.db('babysitter')
// client.on('close', () => {
//     dbConn = null;
// });
// dbConn = db;
// return dbConn;
// function connectToMongo() {
//     const MongoClient = require('mongodb').MongoClient;
//     const uri = 'mongodb+srv://naor:naor315@comparepricescluster-utxr6.mongodb.net/test?retryWrites=true&w=majority'
//     return MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then(client => {
//             console.log('Connected to MongoDB');
//             // If we get disconnected (e.g. db is down)
//             client.on('close', () => {
//                 console.log('MongoDB Disconnected!');
//                 dbConn = null;
//             });
//             dbConn = client.db()
//             return dbConn;
//         });
// }
module.exports = {
    connect: connectToMongo
}

