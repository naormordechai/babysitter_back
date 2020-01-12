const loginRoutes = (client, app) => {
    app.post('/login', (req, res) => {
        return client.connect(async (err, db) => {
            if (err) {
                console.log('Unable to connect...', err);
            }
            else {
                const user = await client.db('babysitter').collection('users').findOne({ email: req.body.email, password: req.body.password });
                if (user) {
                    var randomNumber = Math.random().toString();
                    randomNumber = randomNumber.substring(2, randomNumber.length);
                    res.setHeader('Set-Cookie', 'foo=bar;');
                    res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
                    console.log('cookie created successfully');
                }
                console.log('user', user)
            }
        });
    });
};

module.exports = loginRoutes;