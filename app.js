const express = require('express');
const routes = require('./routes');
const nunjucks = require('nunjucks');
const chalk = require('chalk');
const app = express();
const PORT  = 3000;


nunjucks.configure('views', {
  noCache: true
});

const obj = {
    title: "myTitle",
    people: [{name: 'Allen'}, {name: 'asdf'}, {name: 'Vanessa'}, {name: 'Max'}, {name: 'Cassio'} ]
};

nunjucks.render('index.html', obj, (err, res) => {
  if (err) {
    throw err;
  }
  console.log(res);
});

app.use('/special', (req, res, next) => {
  console.log(chalk.green(`you've reached the special area`));
  next();
})

app.use(['/:route', '/'], (req, res, next) => {
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
  next();
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.get('/', (req, res) => {
  console.log("got there");
});

app.use(routes);
