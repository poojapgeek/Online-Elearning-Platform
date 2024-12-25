const Joi=require('joi');
const mongoose=require('mongoose');
const { categorySchema } = require('./categoryModel.js');


const courseSchema=new mongoose.Schema({
    title:{type:String,required:true,trim:true,minlength:3,maxlength:50},
    category:{
        type:categorySchema,
        required:true
    },
    creator:{type:String,required:true},
    rating:{
        type:Number,
        required:true
    }
})

const Course=mongoose.model('Course',courseSchema)
function validateCourse(courseData){
    const schema=Joi.object({
        title:Joi.string().min(3).required(),
        categoryId: Joi.string().required(), 
        creator:Joi.string().min(3).required(),
        rating:Joi.number().min(1).max(5).required()    
    })
    return schema.validate(courseData)
}
module.exports.Course=Course
module.exports.validateCourse=validateCourse