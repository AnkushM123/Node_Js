const mongoose=require('mongoose');

const schemaData=mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    address:{
      type:String,
      required:true
    },
    age:{
       type:Number,
       required:true
    },
    mobile: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[0-9]{10}$/.test(value);
        },
        message: props => `${props.value} is not a valid mobile number!`,
      },
    },
    is_active:{
       type: Boolean
    },
    date:{
      type: Date,
      default:Date.now
    },
    
})

const Model=mongoose.model("users",schemaData)

mongoose.connect("mongodb://localhost:27017/Employee")
.then(async function(){
console.log("connect to db");
})
.catch((err)=>console.log(err))

module.exports=Model;