const express = require('express');
const chalk = require('chalk');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Working');
  console.log(chalk.green(req.method) + ' /');
});

router.use('/:route', (req, res) => {
  if (req.method === 'POST') {
    console.log(chalk.red('POST') + ' /' + req.params.route);
  } else if (req.method === 'GET') {
    console.log(chalk.green('GET') + ' /' + req.params.route);
  } else {
    console.log(chalk.blue(req.method) + ' /' + req.params.route);
  }
});

module.exports = router;
