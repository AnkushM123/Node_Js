
const employeeModel = require('../schema/employee-schema');

const getEmployee = async function () {
    try {
        const data = await employeeModel.find({});
        return data;
    } catch (err) {
        console.log(err);
        return 
    }

}

const getEmployeeById = async function (id) {
    try {
        const data = await employeeModel.find({ _id: id })
        return data;
    } catch (err) {
        console.log(err);
    }

}

const createEmployee = async function (employee) {
    try {
        const data = await employeeModel.create(employee)
        return data;
    } catch (err) {
        console.log(err);
    }
}

const editEmployee = async function (employee, id) {
    try {
        const data = await employeeModel.updateOne({ _id: id }, { $set: employee })
        return data;
    } catch (err) {
        console.log(err);
    }

}

const deleteEmployee = async function (id) {
    try {
        const data = await employeeModel.deleteOne({ _id: id })
        return data;
    } catch (err) {
        console.log(err);
    }

}

module.exports = { getEmployee, getEmployeeById, deleteEmployee, editEmployee, createEmployee }