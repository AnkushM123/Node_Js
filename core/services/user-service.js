const userModel = require('../schema/user-schema');

const getUser = async function () {
    try {
        const data = await userModel.find({});
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getUserById = async function (id) {
    try {
        const data = await userModel.find({ _id: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getUserByEmail = async function (_email) {
    try {
        const data = await userModel.find({ email: _email })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const getUserByEmailAndPassword = async function (user) {
    try {
        const data = await userModel.find({$and : [{email: user.email},{password: user.password}]})
        return data;
    } catch (err) {
        console.log(err);
    }
}

const createUser = async function (user) {
    try {
        const data = await userModel.create(user)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const editUser = async function (user, id) {
    try {
        const data = await userModel.updateOne({ _id: id }, { $set: user })
        return data;
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async function (id) {
    try {
        const data = await userModel.deleteOne({ _id: id })
        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { getUser, getUserById, deleteUser, editUser, createUser, getUserByEmail,getUserByEmailAndPassword }