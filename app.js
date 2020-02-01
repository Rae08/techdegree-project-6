const express = require('express');
const port = 3000;
const data = require('./data/data.json');
const { projects } = data;

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {projects});
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/projects/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find( ({id}) => id === +projectId);
  
  if (project) {
  res.render('project', {project});
  } else {
    const err = new Error('Something went wrong!');
    err.status = 404;
    next(err); 
  }
});

app.use('/static', express.static('public'));

app.use((req, res, next) => {
  const err = new Error('Something went wrong!');
  err.status = 404;
  next(err); 
})

app.use((err, req, res, next) => {
  console.dir(`Something went wrong! Reason: ${err.status}`);
  res.locals.error = err;
  res.render('error');
  next(err);
})

app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
})