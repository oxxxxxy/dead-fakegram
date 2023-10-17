const express = require('express');

const router = express.Router();



const path = require('path');
const draftHTMLs = path.join(process.cwd(), 'src/draftHTMLs');

router.use('/misc', function (req, res, next) {
  res.sendFile(path.join(draftHTMLs, 'trash', 'misc.html'));
});
router.use('/', function (req, res, next) {
  // res.send('mpa');
  res.sendFile(path.join(draftHTMLs, 'trash', 'index.html'));
});



module.exports = router;
