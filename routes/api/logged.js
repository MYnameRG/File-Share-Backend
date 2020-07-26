const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const {check,validationResult} = require('express-validator');

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fname, lname, email, password} = req.body;

    User.findOne({email}).then((user) => {
        
        if(user === null)
        {
            return res.status(400).json({ errors: [{msg: 'Invalid User'}]});
        }
        
        const isMatch = password.localeCompare(user.password);
        if(isMatch != 0)
        {
            return res.status(400).json({ errors: [{msg: 'Invalid User'}]});
        }

        res.status(200).json({user});
        
    }).catch(() => {
        res.status(500).send('Server error');
    })
});

module.exports = router;