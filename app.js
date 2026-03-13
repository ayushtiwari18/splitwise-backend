const express = require('express');
const routes = require('./src/routes/index');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', routes);

module.exports = app;
