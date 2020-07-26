const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Storage = require('../../models/storage');
const {check,validationResult} = require('express-validator');

router.post('/',[
    check('fname','First name is required').not().isEmpty(),
    check('lname','Last name is required').not().isEmpty(),
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min:6 })
], (req,res) => {

    const errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors : errors.array() });
    }

    const {fname, lname, username, email, password} = req.body;

    User.findOne({email}).then((user) => {
        
        if(user != null)
        {
            return res.status(400).json({ errors: {msg: 'User already exists'}});    
        }
        
        user = new User({
            fname,
            lname,
            username,
            email,
            password
        });

        storage = new Storage();
        user.storageId = storage._id;

        user.save().then(() => {
            storage.save().then((docs) => {
                return res.status(200).json({ msg: 'User Registered', docs: docs });
            });
        });

    }).catch(() => {
        return res.status(400).json({ errors: {msg: 'Server Error'}});
    })

});

module.exports = router;