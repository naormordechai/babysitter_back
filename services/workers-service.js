const mongoService = require('./mongo-service');
const { ObjectId } = require('mongodb');
const uuidv1 = require('uuid/v1');

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

const addComment = (data) => {
    id = ObjectId(data.workerId);
    return mongoService.connect()
        .then(db => {
            const newComment = { ...data, commentId: uuidv1() };
            return db.collection('workers').findOneAndUpdate({ _id: id },
                { $push: { comments: newComment } })
                .then(_ => {
                    return newComment;
                })
                .catch(err => {
                    return false;
                })
        });
};

const deleteComment = (data) => {
    id = ObjectId(data.workerId);
    return mongoService.connect()
        .then(db => {
            return db.collection('workers').findOneAndUpdate({ _id: id },
                { $pull: { comments: { commentId: data.commentId } } })
                .then(result => {
                    console.log('result', result);
                    return true
                })
                .catch(err => {
                    return false
                })
        })
};

const updateComment = (data) => {
    id = ObjectId(data.workerId);
    return mongoService.connect()
        .then(db => {
            return db.collection('workers').findOneAndUpdate({ _id: id, "comments.commentId": data.commentId },
                { $set: { "comments.$": data } })
                .then(result => {
                    return true;
                })
        })
};

module.exports = {
    getWorkers,
    getWorkerById,
    updateWorkerRating,
    addComment,
    deleteComment,
    updateComment

}