const express=require('express');
const categories=require('./Routes/category.js');
const app=express();

app.use(express.json())
app.use(categories)
const port=3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})