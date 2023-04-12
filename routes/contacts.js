const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// For getting contacts to website
router.get('/', auth, async (req, res) => {
    // res.send('Get all Contacts');
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// For adding new contacts to db
router.post('/', [auth,
    [
        check('name', 'Name is required')
            .not()
            .isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }

        const { name, email, phone, type} = req.body;

        try{
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user : req.user.id
            });
            const contact = await newContact.save();
            res.json(contact);

        }catch(err){
            console.log(err.message);
            res.status(400).send('Server Error');

        }

    // res.send('Add Contact');
});

// For updating contacts 
router.put('/:id', auth, async (req, res) => {
    // res.send('Update Contact');
    const {name, email, phone, type} = req.body;

    // Build Contact Object 
    const contactFields = {};

    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try{ 
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: "Contact not found"});

        // Make sure user owns contact
        if( contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "Not Authorised" });
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields},
            { new: true }
        );
        // console.log("update success");
        res.json(contact);

    }catch(err){
        console.log(err.message);
        res.status(400).send('Server Error');
    }

});

// For deleting contact
router.delete('/:id', auth, async(req, res) => {
    // res.send('Delete Contact');
    try{ 
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({ msg: "Contact not found"});

        // Make sure user owns contact
        if( contact.user.toString() !== req.user.id){
            return res.status(401).json({ msg: "Not Authorised" });
        }

        await Contact.findByIdAndRemove(req.params.id);

        console.log("deleted");
        res.json({ msg: "Contact Removed"});

    }catch(err){
        console.log(err.message);
        res.status(400).send('Server Error');
    }

});
module.exports = router;