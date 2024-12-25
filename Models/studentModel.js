const mongoose=require('mongoose');
const Joi=require('joi');



const studentSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:50},
    isenrolled:{type:Boolean,default:false},
    phone:{type:String,required:true,minlength:10,maxlength:10},
    
});
const Students=mongoose.model('Student',studentSchema)

function validateStudent(studentData) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isenrolled:Joi.boolean(),
        phone:Joi.string().min(10).max(10).required()   
    });

    return schema.validate({ name: studentData});
}

module.exports.Students=Students;
module.exports.validateStudent=validateStudent;