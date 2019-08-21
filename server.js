const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./routes/users');
const profile = require('./routes/profile');
const posts = require('./routes/posts');
const axios = require('axios');

const app = express();

require('dotenv').config()

// process.env.apiKey

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




var mongo_URI = process.env.MONGODB_URI || "mongodb://localhost/project3db";

mongoose.connect(mongo_URI, { useNewUrlParser: true });
// DB Config
//const db = require('./config/keys').mongoURI;
// Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true },
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/users', users);
app.use('/profile', profile);
app.use('/posts', posts);

// Define API routes here
app.get('/api/books/:search', function (req, res) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${req.params.search}&orderBy=relevance&maxResults=40&printType=books&&key=${process.env.apiKEY}`;
  console.log(url);
  axios.get(url).then(function (response) {
    res.json(response.data)
  }).catch(function (error) {
    console.log(error);
  })
  // res.send("it worked")

})

// Send every other request to the React app
// Define any API routes before this runs




// // Server static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// // Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Magic happening on port ${PORT} `);
});
