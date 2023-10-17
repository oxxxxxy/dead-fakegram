const express = require('express');

const router = express.Router();

router.use('/api', function (req, res, next) {
  res.send('api');
});

module.exports = router;
