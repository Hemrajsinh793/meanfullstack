let express = require('express');
let router = express.Router();
let mongoose=require('mongoose');

//create a reference to db schema
let contactModel=require("../models/contact");

/*GET contact list page- READ operation */
router.get('/',(req, res, next)=>{
    contactModel.find((err, contactList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
          //  console.log(contactList);
        res.render('contacts/index',{
            title:'Contact List',
            contactList:contactList
        }); 
        }
    });
});

//GET route for Add page adn will display add page
router.get('/add',(req, res, next)=>{
    res.render('contacts/add',{
        title:'Add New Contact'
    });
});

//POST routes for Add Contact
router.post('/add',(req, res, next)=>{

    let newContact=contactModel({
        "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "age": req.body.age
    });

    contactModel.create(newContact, (err, contactModel)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh contact list and redirect to the page
            res.redirect('/contact-list');
        }
    });
});

module.exports = router;