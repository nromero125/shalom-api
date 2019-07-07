const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
require('dotenv').config();

const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    birthday: Joi.required()
});

exports.register = async (req, res) => {
    try {
        const validate = schema.validate(req.body, {
            abortEarly: false
        });
        if(validate.error) return res.json(validate.error.details);
        let validatedUser = validate.value;
        validatedUser.password = bcrypt.hashSync(validatedUser.password, 8);
        validatedUser.role = 2;
        const user = new User(validatedUser);
        await user.save((err, user) => {
           if(err) return res.send(err);
           const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
               expiresIn: 86400 // expires in 24 hours
           });
           res.status(201).json({auth: true, token: token})
        });

    } catch (err) {
        console.log(err)
    }
};


exports.login = async (req, res) => {
    try {
        await User.findOne({email: req.body.email }, (err, user) => {
            if (err) return res.status(500).json({message: 'Error on the server.'});
            if (!user) return res.status(404).json({message: 'No user found.'});

            const checkPassword = bcrypt.compareSync(req.body.password, user.password);
            if (!checkPassword) return res.status(401).json({auth: false, message: 'Email or password invalid.'});

            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.json({auth: true, token: token})
        });
    }  catch (err) {
        console.log(err)
    }
};

exports.user = async (req, res) => {
    try{
        await User.findOne({_id: req.userId}, { password: 0 }, (err, user) => {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).json({message: 'No user found.'});
            res.json(user);
        });
    }  catch (err) {
        console.log(err);
    }
};