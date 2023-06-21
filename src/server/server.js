const express = require('express');
const path = require('path');

const app = express();
PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// create static
app.use(express.static(path.resolve(__dirname, '../public')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'))
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});