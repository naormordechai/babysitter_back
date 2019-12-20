const app = require('express')();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient;
const uri = require('./env/url-mongo');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(express.static('build'))


app.post('/cities', (req, res) => {
    return client.connect(async (err, db) => {
        if (err) {
            console.log('Unable to connect...');
        }
        else {
            const cities = await client.db('babysitter').collection('cities').find({ "name": { $regex: req.body.name } })
                .limit(10)
                .toArray();
            return res.json(cities)
        }
    });
});


app.listen(PORT, () => console.log(`App is listing to port ${PORT}`));
