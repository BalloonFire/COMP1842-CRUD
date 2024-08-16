// Requiring module
const express = require('express');
// Creating express object
const app = express();
// Port Number
const port = 8000;

// Handling GET request
app.get('/', (req, res) => {
  res.send('This is home page.');
  res.end() 
});

// Handling GET request
app.get('/student', (req, res) => {
  res.send('This is student page.');
  res.end() 
});

// Handling GET request
app.get('/admin', (req, res) => {
  res.send('This is admin page.');
  res.end() 
});

// Handling JSON request
app.get('/data', (req, res) => {
  res.json({ message: "Hello World JSON" });
});

// Handling invalid request
app.get('*', (req, res) => {
  res.status(404).send('Invalid Request!');
});

// Server Setup
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});