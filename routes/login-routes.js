const loginRoutes = (client, app) => {

    app.post('/login', (req, res) => {
        rc = req.headers.cookie;
        console.log('rc', rc);

        return client.connect(async (err, db) => {
            if (err) {
                console.log('Unable to connect...', err);
            }
            else {
                const user = await client.db('babysitter').collection('users').findOne({ email: req.body.email, password: req.body.password });
                if (user) {
                    const activeUser = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        id: user._id
                    }
                    res.cookie('uid', activeUser.id, { httpOnly: true });
                    res.json(activeUser);
                } else {
                    res.json(false)
                }
            }
        });
    });


};

module.exports = loginRoutes;