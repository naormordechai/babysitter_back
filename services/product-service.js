// const mongoService = require('./mongo-service');
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://naor123:naor123@cluster0-wqy1p.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


function query() {
    // client.connect((err, db) => {
    //     const cursor = client.db('example').collection('players').find().toArray();
    // });
    
    return client.connect()
        .then(_ => {
            const collection = client.db('example').collection('players');
            return collection.find().toArray();
            client.close();
        })
};



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://naor123:<password>@cluster0-wqy1p.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });




// function insertItem() {
//     client.connect(err => {
//         return client.db("example").collection("players")
//             .insertOne({ name: 'Naor' })
//     })
//     client.close();
// }

// module.exports = {
//     query,
//     insertItem,
// }