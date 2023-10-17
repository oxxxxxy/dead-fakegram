const express = require('express');

const router = express.Router();

router.use('/spa', function (req, res, next) {
  res.send('spa');
});

module.exports = router;
