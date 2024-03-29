const { User } = require('../models/users');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/dev');

module.exports = {
    login: async function (req, res, next) {

        const schema = joi.object({
            email: joi.string().required().min(6).max(256).email(),
            password: joi.string().required().min(6).max(1024),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(401).send({error:'Unauthorized'});
            return;
        }

        try {
            const user = await User.findOne({ email: value.email });
            if (!user){
               return res.status(401).send({error:'Email Or Password are incorrect'});
            } 
            const validPassword = await bcrypt.compare(value.password, user.password);
            if (!validPassword) {
                return res.status(401).send({error:'Email or Password are incorrect'});
            }

            const param = { email: value.email };
            console.log(config);
            const token = jwt.sign(param, config.jwt_token, { expiresIn: '72800s' });

            res.json({
                token: token,
                id: user._id,
                email: user.email,
                name: user.name,
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({error:'server error'});
        }
    },

    signup: async function (req, res, next) {
        const schema = joi.object({
            name: joi.string().required().min(2).max(256),
            email: joi.string().min(6).max(255).required().email(),
            password: joi.string().min(6).max(1024).required(),
            password_confirmation: joi.string().min(6).max(1024).required(),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).send({error:'Validation error'});
            return;
        }

        try {
            const user = await User.findOne({ email: value.email });
            if (user) {
                return res.status(400).send({error:"User already registered."});
            }

            const hash = await bcrypt.hash(value.password, 10);

            const newUser = new User({
                name: value.name,
                email: value.email,
                password: hash,
            });

            await newUser.save();

            res.json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send({error:'Server error'});
        }
    },
}