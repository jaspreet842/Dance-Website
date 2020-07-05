const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");
//ESTABLISH MONGOOSE CONNECTION
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

//CREATE MONGOOSE SCHEMA AND CONVERT IT INTO MODEL
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());
 
//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
});

//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});