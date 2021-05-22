const path = require('path');
const router = require('express').Router();
let User = require('../models/user-model');

router.route('/').get((req, res) => {
    //get a user details from the db
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req, res) => {
    //add a new user detail to the db
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
