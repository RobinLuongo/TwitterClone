const express = require('express');
// const routes = require('./routes');
const nunjucks = require('nunjucks');
const chalk = require('chalk');
const app = express();
const PORT  = 3000;

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views',
                  { noCache: true }); // point nunjucks to the proper directory for templates

const obj = {
    title: 'myTitle',
    people: [{name: 'Allen'}, {name: 'Robin'}, {name: 'Vanessa'}, {name: 'Max'}, {name: 'Cassio'} ]
};

// nunjucks.render('index.html', obj, (err, res) => {
//   if (err) {
//     throw err;
//   }
//   // console.log(res);
// });

app.use('/special', (req, res, next) => {
  console.log(chalk.green(`you've reached the special area`));
  next();
});

app.use(['/:route', '/'], (req, res, next) => {
  let output = '';
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
  // console.log('got there');
  res.render('index.html', obj);
});

// app.use(routes);
