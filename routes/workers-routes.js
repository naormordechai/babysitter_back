const checkAuth = require('../middleware/check-auth');
const { ObjectId } = require('mongodb');
const workersService = require('../services/workers-service');
const userService = require('../services/user-service');

const workersRoutes = (app) => {

    app.post('/workers', async (req, res) => {
        const criteria = req.body;
        const resultPromise = await workersService.getWorkers(criteria);
        const result = await Promise.all(resultPromise);
        res.json({ workers: result[0], count: result[1] })
    });

    app.get('/workers/:id', async (req, res) => {
        const id = req.params.id;
        const worker = await workersService.getWorkerById(id);
        res.json(worker);
    });

    app.post('/workers/:workerId/update-rating', async (req, res) => {
        const workerId = req.params.workerId;
        const { ratingInfo } = req.body;
        const updatedWorker = await workersService.updateWorkerRating(workerId, ratingInfo);
        res.json(updatedWorker)
        // const updatedUser = await userService.updateUser(userId);
        // return client.connect(async (err, db) => {
        //     if (err) {
        //         console.log('Unable to connect...')
        //     } else {
        //         const uid = new ObjectId(req.cookies['uid']);
        //         const user = await client.db('babysitter').collection('users').findOne({ _id: uid });
        //         if (user) {
        //             const workerId = new ObjectId(req.params.id);
        //             const reqWorker = await client.db('babysitter').collection('workers').findOne({ _id: workerId });
        //             const scoreRatings = reqWorker.scoreRatings.concat(req.body.ratingScore);
        //             const totalScore = scoreRatings.reduce((acc, val) => acc + val);
        //             let avgScoreRating = (totalScore / scoreRatings.length).toFixed(1);
        //             avgScoreRating = +avgScoreRating;
        //             const updatedWorker = await client.db('babysitter').collection('workers').findOneAndUpdate(
        //                 { _id: workerId },
        //                 { $set: { scoreRatings, avgScoreRating } },
        //                 { returnOriginal: false }
        //             );
        //             const updatedUser = await client.db('babysitter').collection('users').findOneAndUpdate(
        //                 { _id: user._id },
        //                 { set: }
        //             )
        //         }
        //         console.log('updatedWorker', updatedWorker);

        //     }
        // });
    });

};

module.exports = workersRoutes;

