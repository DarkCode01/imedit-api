var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  console.log('tetststs')
  res
    .status(200)
    .send({
      test: true
    })
});

module.exports = router;
