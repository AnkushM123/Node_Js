
const userModel=require('../employeeModel');

const getEmployee=async function(){
  try{
    const data=await userModel.find({});
    return data;
  }catch(err){
    console.log(err);
  }

}

const getEmployeeById=async function(id){
    try{
        const data=await userModel.find({_id:id})
        return data;
    }catch(err){
        console.log(err);
    }

}

const createEmployee=async function(employee){
    try{
        const data=await userModel.create(employee)
        return data;
    }catch(err){
        console.log(err);
    }
}

const editEmployee=async function(employee,id){
    try{
        const data=await userModel.updateOne({_id:id},{$set:employee})
        return data;
    }catch(err){
        console.log(err);
    }

}

const deleteEmployee=async function(id){
    try{
        const data=await userModel.deleteOne({_id:id})
        return data;
    }catch(err){
        console.log(err);
    }
    
}

module.exports={getEmployee,getEmployeeById,deleteEmployee,editEmployee,createEmployee}