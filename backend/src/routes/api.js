var express = require('express');
var router = express.Router();
const {getVocalTrackResource}  = require('../vocal-resource');

function withPromise(func) {
  return (req, res, next) => {
    func(req, res)
      .then(({statusCode, body}) => {
        res
        .status(statusCode)
        .send(body);
    });
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/vocalTrack', withPromise(getVocalTrackResource));

module.exports = router;
