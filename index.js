const express = require('express');
const path = require('path');
const app = express()
const bodyparser = require('body-parser')

const hostname = '127.0.0.1';
const port = 80;



const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/contactDance",{
    useNewUrlParser:true, useUnifiedTopology:true
},(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("we are connected")
    }
})
var contactSchema = new mongoose.Schema({
    name : String,
    email : String,
    phone : String,
    age : String,
    address : String
});
var Contact = mongoose.model('Contact', contactSchema);


// express specific stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'template'))

app.get('/', (req, res) => {
    res.render('index.pug')
})
app.get('/services', (req, res) => {
    res.render('services.pug')
})
app.get('/about', (req, res) => {
    res.render('about.pug')
})
app.get('/contact', (req, res) => {
    res.render('contact.pug')
})

app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send("Item saved in database")
    }).catch(()=>{
        res.send("Item not saved in database")
    })   
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





