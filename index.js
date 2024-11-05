// server.js
const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS for all requests
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from public directory
app.use(express.static('public'));

// Route for homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint
app.get('/api/:date?', (req, res) => {
  let date;
  const dateParam = req.params.date;

  // If no date parameter is provided, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if dateParam is a Unix timestamp (all digits)
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check if date is valid
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
    return;
  }

  // Return both unix and utc formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});