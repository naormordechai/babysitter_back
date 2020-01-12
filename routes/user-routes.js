const { ObjectId } = require('mongodb');
const userRoutes = (client, app, cookieParser) => {
    app.get('/user', (req, res) => {
        return client.connect(async (err, db) => {
            if (err) {
                console.log('Unable to connect...')
            } else {
                const uid = new ObjectId(req.cookies['uid']);
                const user = await client.db('babysitter').collection('users').findOne({ _id: uid });
                if (user) {
                    const activeUser = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        id: user._id
                    };
                    res.json(activeUser)
                } else {
                    res.json(null)
                }
            }
        });
    })
};

module.exports = userRoutes;

