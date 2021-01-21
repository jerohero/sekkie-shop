const express = require('express');
const mongoose = require('mongoose');
const itemsRouter = require('./routes/ItemRoutes');
const userRouter = require('./routes/UserRoutes');
const orderRouter = require('./routes/OrderRoutes');
const passport = require('passport');
const bodyParser = require('body-parser');
const PORT = 3000;
require('dotenv').config()

const app = express();

// mongoDB connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT))
    .catch((err) => console.log(err));

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// External access (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');                              // Allow client to send requests from given origin, * serving as a wildcard
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow client to use given request methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');   // Allow client to send request headers
  next();
});

app.use('/items', itemsRouter);
app.use('/auth', userRouter);
app.use('/orders', orderRouter);

module.exports = app;


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true, // true = .sass and false = .scss
//   sourceMap: true
// }));
// app.use(express.static(path.join(__dirname, 'public')));
