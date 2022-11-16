const { Card }= require('../models/cards')

module.exports ={
    getCards: async function (req, res, next) {
        try {
            const result = await Card.find().sort({ "name": 1 }).limit(30); // 1 = ascending
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).send('error getting cards');
        }
    },
}