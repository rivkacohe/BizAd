var express = require('express');
var router = express.Router();
const services = require('../controllers/services');

router.get('/', services.getServices);
router.get('/user', services.getServicesForUsers);
router.post('/add', services.addServiceForUser);
router.delete('/', services.deleteService);
router.patch('/:id', services.updateService);


// router.get('/export', cards.exportToFile);
// router.get('/:id', cards.findCard);
// router.get('/sort/:dir', cards.sortCards);
// router.patch('/:id', cards.updateCard);

module.exports = router;