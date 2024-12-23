const express=require('express');
const router=express.Router();


const category=[{
    id:1,name:'WebDevelopment'
},{
    id:2,name:'AppDevelopment'
},{
    id:3,name:'DataScience'   
},]
router.get('api/category',(req,res)=>{
    res.send(category);
})
router.post('api/category',(req,res)=>{
    const categories=[{
        id:category.length+1,
        name:req.body.name
    }];
    category.push(categories);
    res.send(categories);
})
router.put('api/category/:id',(req,res)=>{
    const categories=category.find(category=>category.id===parseInt(req.params.id));

    if(!categories) res.status(404).send("cousre not found");

    categories.name=req.body.name;
    res.send(categories);
})
router.get('api/category/:id',(req,res)=>{
    const categories=category.find(category=>category.id===parseInt(req.params.id));
    if(!categories) res.status(404).send("course not found");
    res.send(categories);
})
module.exports=router;