const checkAuth = require('../middleware/check-auth');
const workersService = require('../services/workers-service');


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
    });


    app.post('/workers/add-comment', async (req, res) => {
        const { data } = req.body;
        const value = await workersService.addComment(data);
        res.json(value);
    });

    app.delete('/workers/delete-comment', async (req, res) => {
        const { data } = req.body;
        const value = await workersService.deleteComment(data);
        res.json(value);
    });

    app.put('/workers/update-comment', async (req, res) => {
        const { data } = req.body;
        const value = await workersService.updateComment(data)
        res.json(value)
    });

};


module.exports = workersRoutes;

