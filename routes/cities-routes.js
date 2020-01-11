const citiesRoutes = (client, app) => {
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
};

module.exports = citiesRoutes;