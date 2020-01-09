const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient;
const uri = require('./env/url-mongo');
const history = require('connect-history-api-fallback');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true // enable set cookie
}));

app.use(bodyParser.json());
app.use(express.static('build'));
app.use(history());


app.post('/cities', (req, res) => {
    return client.connect(async (err, db) => {
        if (err) {
            console.log('Unable to connect...', err);
        }
        else {
            const cities = await client.db('babysitter').collection('cities').find({ "name": { $regex: req.body.name } })
                .limit(5)
                .toArray();
            return res.json(cities)
        }
    });
});


app.post('/workers', (req, res) => {
    return client.connect(async (err, db) => {
        if (err) {
            console.log('Unable to connect...')
        } else {
            console.log(req.body);
            const workers = await client.db('babysitter').collection('workers').find({ cityId: req.body.cityId.trim() })
                .skip(req.body.offset)
                .limit(req.body.pageSize)
                .toArray();
            const count = await client.db('babysitter').collection('workers').count({ cityId: req.body.cityId.trim() })
            const result = {
                workers,
                count
            };
            return res.json(result);
        }
    });
})

app.listen(PORT, () => console.log(`App is listing to port ${PORT}`));
