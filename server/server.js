const express = require('express');
const path = require('path');

const app = express();
PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// create static
// app.use(express.static(path.resolve(__dirname, '../public')))

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../public/index.html'))
// })

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});


// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});