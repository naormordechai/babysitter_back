const loginRoutes = (client, app, jwt) => {
    app.post('/login', (req, res) => {
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
                    };
                    // const token = jwt.sign({ email: req.body.email, uId: user._id },
                    //     process.env.JWT_KEY,
                    //     {
                    //         expiresIn: "1h"
                    //     })
                    // res.cookie('token', token, { httpOnly: true });
                    res.cookie('uid', user._id, { httpOnly: true })
                    res.json(activeUser);
                } else {
                    res.json(false)
                }
            }
        });
    });


};

module.exports = loginRoutes;