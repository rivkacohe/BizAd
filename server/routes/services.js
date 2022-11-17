var express = require('express');
var router = express.Router();
const services = require('../controllers/services');

router.get('/', services.getServices);
router.get('/user', services.getServicesForUsers);
router.post('/add', services.addServiceForUser);
router.delete('/', services.deleteService);
router.patch('/:id', services.updateService);

module.exports = router;