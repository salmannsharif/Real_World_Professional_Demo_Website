const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const app=express();
const port=80;
const hostname='127.0.0.1';
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/salmanKart', {useNewUrlParser: true, useUnifiedTopology:true} )

// Mongoose
const contactSchema= new mongoose.Schema({
    name:String,
    age:String,
    email:String,
    address:String,
    Position:String
})

// Set the model
const Contact= mongoose.model('Contact', contactSchema);

// for serving static file's
app.use('/static' , express.static('static'));
app.use(express.urlencoded());

//for set the pug template's
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,"views"))


//End Point's
app.get('/',(req,res)=>{
    res.status(200).render('index.pug')
})

app.get('/home',(req,res)=>{
    res.status(200).render('index.pug')
})


app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug')
})

app.post('/contact',(req,res)=>{
    const myData=new Contact(req.body)
    myData.save().then(()=>{console.log('Your data Submitted Successfuly')}).catch(()=>{
        console.log('Your Data cannot Submit Please Try Again Later')
    })
})


// Liten the  server
app.listen(port, hostname,()=>{
  console.log(`The Server Running at : http://${hostname}:${port}`);  
})