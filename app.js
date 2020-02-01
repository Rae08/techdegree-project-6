const express = require('express');
const port = 3000;
const data = require('./data/data.json');
const { projects } = data;

const app = express();

app.set('view engine', 'pug');

// Routes
app.get('/', (req, res) => {
  res.render('index', {projects});
});

app.get('/about', (req, res) => {
  res.render('about');
});

// dynamicaly generates route by project id
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

// Serve static files
app.use('/static', express.static('public'));


// create error
app.use((req, res, next) => {
  const err = new Error('Something went wrong!');
  err.status = 404;
  next(err); 
})

// error handler
app.use((err, req, res, next) => {
  console.dir(`Something went wrong! Reason: ${err.status}`);
  res.locals.error = err;
  res.render('error');
  next(err);
})

// serve app
app.listen(port, () => {
  console.log(`The app is running on port ${port}`);
})