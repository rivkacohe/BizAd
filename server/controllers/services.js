const Joi = require('joi');
const { Service }= require('../models/services');
const { ServicesForUser } = require('../models/servicesForUser');

module.exports = {
    getServices: async function (req, res, next) {
        try {
            const result = await Service.find().sort({ "name": 1 }).limit(20); // 1 = ascending
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error getting cards');
        }
    },

    getServicesForUsers: async function (req, res, next) {

        const schema = Joi.object({
            userId: Joi.string().required().min(6).max(100024),
        });

        const { error, value } = schema.validate(req.query);

        if (error) {
            console.log(error.details[0].message);
            res.status(401).send('Not found');
            return;
        }

        try {
            const result = await ServicesForUser.find({userId:value.userId}); 
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error getting cards');
        }
    },

    addServiceForUser: async function (req, res, next) {
        const schema = Joi.object({
            serviceName: Joi.string().required().min(6).max(100),
            userId: Joi.string().required().min(6).max(1024),
            status: Joi.string().required().min(6).max(100),
            userServiceID:Joi.string().required().min(6).max(1024),

        });

        const { error, value } = schema.validate(req.body);

        

        if (error) {
            console.log(error.details[0].message);
            return res.status(400).send({error:"Server error"});
        }


     
        try {
            const service = await ServicesForUser.findOne({userServiceID: value.userServiceID});
            if (service) {
                return res.status(400).send({error:"service already Exist."});
            }
            
            const newService = new ServicesForUser({
                _id: value._id,
                serviceName: value.serviceName,
                userId: value.userId,
                status: value.status,
                userServiceID: value.userServiceID,
            });

            await newService.save();

            res.json({
                serviceName: newService.serviceName,
                userId: newService.userId,
                status: newService.status,
                userServiceID: newService.userServiceID,
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send({error:'Server error'});
        }
    },

    deleteService: async function (req, res, next) {
        try {
            await ServicesForUser.deleteOne({ userServiceID: req.body.userServiceID }).exec();
            res.json({ userServiceID: req.body.userServiceID, serviceName:req.body.serviceName});
            console.log(req.body);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error delete Service');
        }
    },

    updateService: async function (req, res, next) {
        try {
            const scheme = Joi.object({
                id: Joi.string().required(),
                status: Joi.string().min(6).required(),
                remark: Joi.string(),
            });

            const { error, value } = scheme.validate({
                ...req.body,
                id: req.params.id
            });

            if (error) {
                res.status(400).send({error:'error update service'});
                return;
            }

            const result = await ServicesForUser.findOneAndUpdate(
                { _id: value._id },
                req.body
            );

            if (!result){
                res.status(400).send({error:'error update service'});
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send({error:'error update service'});
        }
    },
}