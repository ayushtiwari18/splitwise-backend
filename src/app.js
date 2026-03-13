// Pattern only
const express = require('express');
const app = express();

app.use(express.json());
// mount routes here later

module.exports = app;
