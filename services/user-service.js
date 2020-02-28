const mongoService = require('./mongo-service');
const { ObjectId } = require('mongodb');

const login = (userDetail) => {
    return mongoService.connect()
        .then(db => {
            return db.collection('users').findOne({ email: userDetail.email, password: userDetail.password })
                .then(user => {
                    if (user && user._id) {
                        const activeUser = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            id: user._id,
                            activates: user.activates || []
                        };
                        // res.cookie('uid', user._id, { httpOnly: true })
                        return activeUser
                    } else {
                        return false;
                    }
                })
        })
};

const logout = (cookie) => {
};

const getCurrentUser = (id) => {
    return mongoService.connect()
        .then(db => {
            if (id) {
                const uid = new ObjectId(id);
                return db.collection('users').findOne({ _id: uid })
                    .then(user => {
                        if (user) {
                            const activeUser = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                id: user._id,
                                activates: user.activates
                            }
                            return activeUser;
                        } else {
                            return null;
                        }
                    })
            } else {
                return null;
            }
        });
};

const insertActivate = (userId, workerId, infoActivates) => {
    const uid = new ObjectId(userId);
    return mongoService.connect()
        .then(db => {
            return db.collection('users').findOneAndUpdate({ _id: uid },
                { $push: { activates: { [workerId]: { ...infoActivates } } } }, { returnOriginal: false })
        }).then(result => {
            if (!result) {
                return false;
            };
            return true;
        })
}

const updateActivate = (userId, workerId, infoActivates) => {
    const uid = new ObjectId(userId);
    return mongoService.connect()
        .then(db => {
            const keyInActivates = `activates.${workerId}`;
            return db.collection('users').findOneAndUpdate(
                { _id: uid, [keyInActivates]: workerId },
                { $set: { 'activates.$.scoreRatings': 1 } }
            )
        }).then(result => {
            console.log('RESULT', result)
            return true;
        })
};

module.exports = {
    login,
    logout,
    getCurrentUser,
    insertActivate,
    updateActivate
}