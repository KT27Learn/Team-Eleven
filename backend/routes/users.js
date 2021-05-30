const path = require('path');
const router = require('express').Router();
let User = require('../models/user-model');

router.route('/login').post((req, res) => {
    //get a user details from the db
    const {email, password} = req.body;
    const authUser = {
        email: email,
        password: password
    }

    User.findOne(authUser,
    (err, result) => {
        if (err) {
            res.json({msg: 'Invalid Details'});
        } else {
            if (result === null) {
                res.json({msg:'Invalid Details'})
            } else {
                res.json(result);
            }      
        }
    });
        
});

router.route('/add').post((req, res) => {
    //add a new user detail to the db
    const {username, email, password} = req.body;

    const newUser = new User({
        
        username: username,
        email: email,
        password: password
    
    });

    newUser.save()
        .then(() => res.json({msg:'User added!'}))
        .catch(err => res.status(400).json({msg: 'Error: ' + err}));

});

module.exports = router;

