const express=require('express');
const mongoose=require('mongoose');
const categories=require('./Routes/category.js');
const student=require('./Routes/student.js')
const app=express();
mongoose.connect('mongodb://127.0.0.1/online-elearning-platform').then(()=>{
    console.log("Connection is successful")}).catch((err)=>{
        console.error("Connection is unsuccessful",err)
    })

app.use(express.json())
app.use('/api/category',categories)
app.use('/api/students',student)
const port=3001;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})