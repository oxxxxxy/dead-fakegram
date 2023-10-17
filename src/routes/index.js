const express = require('express');

const router = express();

router.use(require('./API'));
router.use(require('./SPA'));
router.use(require('./MPA'));

module.exports = router;
