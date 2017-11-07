const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.use(express.static('public'));

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

// router.get('/stylesheets/style.css', (req, res, next) => {
//   // res.set('Content-Type', 'text/css');
//   res.sendFile('style.css', {root: './public/stylesheets/'}, function (err) {
//     if (err) {
//       next(err);
//     } else {
//       console.log('Sent:', 'style.css');
//     }
//   });
// });

module.exports = router;
