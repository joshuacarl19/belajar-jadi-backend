var express = require('express');
var router = express.Router();
import {getUsers, getMitra} from '../controllers/user.ctrl';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/users', getUsers);
router.get('/api/mitra', getMitra);

module.exports = router;
