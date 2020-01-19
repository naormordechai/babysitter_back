const { ObjectId } = require('mongodb');
const assert = require('assert');
const userRoutes = (client, app) => {
    app.get('/user', (req, res) => {
        return client.connect(async (err, db) => {
            if (err) {
                console.log('Unable to connect...')
            } else {
                // res.cookie('uid', '12', { httpOnly: true, maxAge: Date.now() })
                const uidCoockie = req.cookies['uid'];
                const uid = new ObjectId(uidCoockie);
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

