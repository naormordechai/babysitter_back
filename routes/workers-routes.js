const workersRoutes = (client, app) => {
    app.post('/workers', (req, res) => {
        return client.connect(async (err, db) => {
            if (err) {
                console.log('Unable to connect...')
            } else {
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
};

module.exports = workersRoutes;

