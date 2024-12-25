const {Course,validateCourse}=require('../Models/courseModel.js');
const {Category}=require('../Models/categoryModel.js')
const express=require('express');
const router=express.Router();

router.get('/',async (req,res)=>{
    let course=await Course.find();
    res.send(course);

})  
router.post('/',async(req,res)=>{
    const result = validateCourse(req.body);

    if (!result) {
        return res.status(500).send("Validation function returned undefined.");
    }

    const { error } = result;
    if (error) return res.status(400).send(error.details[0].message);
    const category=await Category.findById(req.body.categoryId);
    if(!category) res.status(404).send('category not found');

    let course=new Course({
        title:req.body.title,
        category:{
            _id:category._id,
            name:category.name
        },
        creator:req.body.creator,
        rating:req.body.rating})

    await course.save()
    res.send(course);
    })

router.put('/:id',async (req,res)=>{
    const result = validateCourse(req.body);

    if (!result) {
        return res.status(500).send("Validation function returned undefined.");
    }

    const { error } = result;
    if (error) return res.status(400).send(error.details[0].message);
    const category=await Category.findById(req.body.categoryId);
    if(!category) res.status(404).send('category not found');
    const course=await Course.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        category:{
            _id:category._id,
            name:category.name
        },
        creator:req.body.creator,
        rating:req.body.rating
    },{new:true});
    
    await course.save();
    res.send(course);
})

router.delete('/:id',async (req,res)=>{
    const course=await Course.findByIdAndDelete(req.params.id);

    if(!course) res.status(404).send('course not found');

    res.send(course);
});

module.exports=router;