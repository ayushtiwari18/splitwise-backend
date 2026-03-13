const express = require('express');
const app = express();
const routes = require('./src/routes/index');
app.use('/api', routes);

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;
