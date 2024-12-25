const express=require('express');
const router=express.Router();
const {Students,validateStudent}=require('../Models/studentModel.js')


router.get('/',async (req,res)=>{
    let student=await Students.find();
    res.send(student);

})
router.post('/',async(req,res)=>{
    const result = validateStudent(req.body);

    if (!result) {
        return res.status(500).send("Validation function returned undefined.");
    }

    const { error } = result;
    if (error) return res.status(400).send(error.details[0].message);

    const student=new Students({
        name:req.body.name,
        isenrolled:req.body.isenrolled,
        phone:req.body.phone
    })

        
    
    await student.save()
    res.send(student);
})
router.put('/:id',async (req,res)=>{
    const result = validateCategory(req.body);

    if (!result) {
        return res.status(500).send("Validation function returned undefined.");
    }

    const { error } = result;
    if (error) return res.status(400).send(error.details[0].message);

    // const categories=category.find(category=>category.id===parseInt(req.params.id));
    const student=await Students.findByIdAndUpdate(req.params.id,{name:req.body.name,isenrolled:req.body.isenrolled,phone:req.body.phone},{new:true});
    if(!student) res.status(404).send("student not found");

    // categories.name=req.body.name;
    res.send(student);
})
router.delete('/:id',async (req,res)=>{
    const student=await Students.findByIdAndDelete(req.params.id);
    // const categories=category.find(category=>category.id===parseInt(req.params.id))
    if(!student) res.status(404).send('student not found');
    // const index=category.indexOf(categories);
    // category.splice(index,1);

    res.send(student);
})
router.get('/:id',async (req,res)=>{
    // const categories=category.find(category=>category.id===parseInt(req.params.id));
    const student=await Students.findById(req.params.id);
    if(!student) res.status(404).send("student not found");
    res.send(student);
})

    
module.exports=router;