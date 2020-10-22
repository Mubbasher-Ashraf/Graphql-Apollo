import mongoose from 'mongoose';
const User = mongoose.model('User');

exports.createUser = async data => {
    try {
        return await User.newUser(data);
    } catch (e) {
        throw new Error(JSON.stringify(e.message));
    }
};

exports.Login = async data => {
    try {
        return await User.findByIdentifier(data);
    } catch (e) {
        throw new Error(JSON.stringify(e.message));
    }
};