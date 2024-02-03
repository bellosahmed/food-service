const express = require('express');
const { createVendor, editvendor, delvendor } = require('./controller');

const router = express.Router();

router.post('/', createVendor);
router.patch('/', editvendor);
router.delete('/', delvendor);

module.exports = router;