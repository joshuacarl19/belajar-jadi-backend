var express = require('express');
var router = express.Router();
import {getUsers} from '../controllers/user.ctrl';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/users', getUsers);

module.exports = router;
