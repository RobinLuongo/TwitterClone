const express = require('express');
const chalk = require('chalk');
const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('Working');
//   console.log(chalk.green(req.method) + ' /');
// });

router.use('/special', (req, res, next) => {
  console.log(chalk.green(`you've reached the special area`));
  next();
})

router.use(['/:route', '/'], (req, res) => {
  let output = ''
  if (req.method === 'POST') {
    output = chalk.red('POST') + ' /' + req.params.route;
  } else if (req.method === 'GET') {
    if (req.params.route === undefined) {
      output = chalk.green('GET') + ' /';
    } else {
      output = chalk.green('GET') + ' /' + req.params.route;
    }
  } else {
    output = chalk.blue(req.method) + ' /' + req.params.route;
  }
  console.log(output);
});

module.exports = router;
