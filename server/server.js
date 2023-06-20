const express = require('express');
const app = express();
const path = require('path');

PORT = 3000;

// create static
app.use(express.static(path.resolve(__dirname, '../build')))

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});