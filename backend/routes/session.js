const path = require('path');
const router = require('express').Router();
let Session = require('../models/session-model');

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