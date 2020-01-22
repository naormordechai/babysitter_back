const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const MongoClient = require('mongodb').MongoClient;
const uri = require('./env/url-mongo');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const history = require('connect-history-api-fallback');
const citiesRoutes = require('./routes/cities-routes');
const workersRoutes = require('./routes/workers-routes');
const userRoutes = require('./routes/user-routes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true // enable set cookie
}));



app.use(bodyParser.json());


app.use(cookieParser());
app.use(express.static('build'));


workersRoutes(app);
citiesRoutes(app);
userRoutes(app);

app.use(history());

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('./build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
};

app.listen(PORT, () => console.log(`App is listing to port ${PORT}`));
