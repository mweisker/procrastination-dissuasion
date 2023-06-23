
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const taskRouter = require('./routes/task');

const cookieController = require('./controllers/cookieController');
const taskController = require('./controllers/taskController');
const userController = require('./controllers/userController');

const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', express.static(path.join(__dirname, '../assets')));

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

app.post('/register', userController.newUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
})

app.post('/login', userController.findUser, (req, res) => {
  return res.status(200).json(res.locals.result)
})

// serve index.html on the route '/'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.use((req, res) => {
  res.status(400).send('404 not found')
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
}); //listens on port 3000 -> http://localhost:3000/

module.exports = app;

