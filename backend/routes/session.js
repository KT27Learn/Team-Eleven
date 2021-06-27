const path = require('path');
const router = require('express').Router();
let Session = require('../models/session-model');

//log a newly completed study session to the database
router.route('/log').post(async (req, res) => {
    
    const { userid, googleId, studymethod, cumulatedtime, tasks } = req.body;

    try {
        
        const session = await Session.create({userid, googleId, studymethod, cumulatedtime, tasks});
        res.status(201).json({ session });
        
    } catch (error) {

        res.status(500).json({ message: "Something went wrong" });
        
        console.log(error);
    }

});

//retrieve all previously completed study session by a user from the database
router.route('/past').post(async (req, res) => {
    
    const { userid } = req.body;

    try {
        
        const session = await Session.find({userid});
        res.status(201).json({ session });
        
    } catch (error) {

        res.status(500).json({ message: "Something went wrong" });
        
        console.log(error);
    }

});

module.exports = router;