const mongoService = require('./mongo-service');
const { ObjectId } = require('mongodb');

const getWorkers = async (criteria) => {
    return mongoService.connect()
        .then(db => {
            const workers = db.collection('workers').find({ cityId: criteria.cityId.trim() })
                .skip(criteria.offset)
                .limit(criteria.pageSize)
                .toArray();
            const count = db.collection('workers').countDocuments({ cityId: criteria.cityId.trim() });
            const result = [workers, count];
            return result;
        });
};

const getWorkerById = (id) => {
    id = ObjectId(id);
    return mongoService.connect()
        .then(db => {
            const worker = db.collection('workers').findOne({ _id: id })
            return worker;
        });
};

const updateWorkerRating = (id, ratingInfo) => {
    id = ObjectId(id);
    return mongoService.connect()
        .then(db => {
            return db.collection('workers').findOneAndUpdate({ _id: id },
                { $set: { scoreRatings: ratingInfo.scoreRatings, avgScoreRating: ratingInfo.avgScoreRating } }, { returnOriginal: false })
                .then(result => {
                    console.log('RESULT', result);
                    return result;
                })
        });
};

module.exports = {
    getWorkers,
    getWorkerById,
    updateWorkerRating
}