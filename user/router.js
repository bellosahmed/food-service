const express = require('express');
const { profile } = require('./controller');

const router = express.Router();

router.get('/:id', profile);

module.exports = router;