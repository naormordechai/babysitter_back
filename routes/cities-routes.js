const citiesService = require('../services/cities-service');

const citiesRoutes = (app) => {
    app.post('/cities', async (req, res) => {
        const cities = await citiesService.getCititesByTerm(req.body.name);
        return res.json(cities);
    });
}

module.exports = citiesRoutes;