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
                            id: user._id
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
                                id: user._id
                            };
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

module.exports = {
    login,
    logout,
    getCurrentUser
}