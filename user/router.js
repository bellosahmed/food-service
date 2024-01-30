const express = require('express');
const { profile, edituser, deluser } = require('./controller');

const router = express.Router();

router.get('/:id', profile);
router.patch('/:id', edituser);
router.delete('/:id', deluser);

module.exports = router;