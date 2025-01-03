const express=require('express');
const router=express.Router();
const {Category,validateCategory}=require('../Models/categoryModel.js')


// let category=[{
//     id:1,name:'WebDevelopment'
// },{
//     id:2,name:'AppDevelopment'
// },{
//     id:3,name:'DataScience'   
// }];
router.get('/',async (req,res)=>{
    let category=await Category.find();
    res.send(category);

})
router.post('/',async(req,res)=>{
    const result = validateCategory(req.body.name);

    if (!result) {
        return res.status(500).send("Validation function returned undefined.");
    }

    const { error } = result;
    if (error) return res.status(400).send(error.details[0].message);

    const categories=new Category({
        name:req.body.name
    })

        
    
    await categories.save()
    res.send(categories);
})
router.put('/:id',async (req,res)=>{
    const result = validateCategory(req.body.name);

    if (!result) {
        return res.status(500).send("Validation function returned undefined.");
    }

    const { error } = result;
    if (error) return res.status(400).send(error.details[0].message);

    // const categories=category.find(category=>category.id===parseInt(req.params.id));
    const categories=await Category.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if(!categories) res.status(404).send("cousre not found");

    // categories.name=req.body.name;
    res.send(categories);
})
router.delete('/:id',async (req,res)=>{
    const categories=await Category.findByIdAndDelete(req.params.id);
    // const categories=category.find(category=>category.id===parseInt(req.params.id))
    if(!categories) res.status(404).send('course not found');
    // const index=category.indexOf(categories);
    // category.splice(index,1);

    res.send(categories);
})
router.get('/:id',async (req,res)=>{
    // const categories=category.find(category=>category.id===parseInt(req.params.id));
    const categories=await Category.findById(req.params.id);
    if(!categories) res.status(404).send("course not found");
    res.send(categories);
})


module.exports=router;