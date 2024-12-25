const Joi=require('joi');
const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:50}
})
const Category=mongoose.model('Category',categorySchema)

function validateCategory(categoryName) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate({ name: categoryName });
}

module.exports.Category=Category;
module.exports.categorySchema=categorySchema
module.exports.validateCategory=validateCategory;