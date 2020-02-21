const userService = require('../services/user-service');
const userRoutes = (app) => {
    app.post('/user', async (req, res) => {
        const result = await userService.getCurrentUser(req.body.id);
        res.json(result);
    });

    app.post('/login', async (req, res) => {
        console.log(req.body);
        const user = await userService.login(req.body);
        if (user && user.id) {
            res.cookie('uid', user.id, { path: '/' })
        }
        console.log(user);

        res.json(user)
    });

    app.get('/logout', (req, res) => {
        // res.cookie('uid', '', { httpOnly: true, maxAge: Date.now(0) })
        res.clearCookie('uid', { path: '/' });
        // res.cookie('uid', { maxAge: Date.now(0) });
        res.send('cookie foo cleared');
        // userService.logout(res.cookie);
        // res.json(true)
    })

    app.post('/user/update-activates', async (req, res) => {
        console.log('GOTTTTS')
        const { userId, workerId, infoActivates } = req.body;
        const updatedUser = await userService.updateUser(userId, workerId, infoActivates);

    });
};

module.exports = userRoutes;

