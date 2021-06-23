const path = require('path');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
let UserModal = require('../models/user-model');
const jwt = require('jsonwebtoken');

const SECRET_TOKEN = 'adjwjiqejojqwpjwqpjdwqp';

router.route('/signup').post(async (req, res) => {
    
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign( { email: result.email, id: result._id }, SECRET_TOKEN, { expiresIn: "1h" } );

        res.status(201).json({ result, token });

    } catch (error) {

        res.status(500).json({ message: "Something went wrong" });
        
        console.log(error);
    }

});

router.route('/signin').post(async (req, res) => {
    
    const { email, password } = req.body;

    try {

        const oldUser = await UserModal.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SECRET_TOKEN, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });

    } catch (err) {

        res.status(500).json({ message: "Something went wrong" });

    }
    
});

router.route('/googlesignin').post(async (req, res) => {
    
    const { name, email, imageUrl, googleId } = req.body;

    try {

        const signInBefore = await UserModal.findOne({ email });
        
        if (!signInBefore) {

            const result = await UserModal.create({name, email, googleId, imageUrl});
            const token = jwt.sign({email: result.email, id: result._id}, SECRET_TOKEN, { expiresIn: '1h'});
            res.status(200).json({result,token})

        } else {

            signInBefore.googleId = googleId;
            signInBefore.imageUrl = imageUrl;
            await signInBefore.save();
            const result = await UserModal.findOne({email});
            const token = jwt.sign({email: result.email, id: result._id}, SECRET_TOKEN, { expiresIn: '1h'});
            res.status(200).json({ result, token })

        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
    
});


module.exports = router;
