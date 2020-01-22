const mongoService = require('./mongo-service');

const getCititesByTerm = (term) => {
    return mongoService.connect()
        .then(db => {
            const cities = db.collection('cities').find({ 'name': { $regex: term } })
                .limit(5)
                .toArray();
            return cities;

        })
};


module.exports = {
    getCititesByTerm
}