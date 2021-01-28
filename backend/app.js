const express = require('express');
const mongoose = require('mongoose');
const itemsRouter = require('./routes/ItemRoutes');
const userRouter = require('./routes/UserRoutes');
const orderRouter = require('./routes/OrderRoutes');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const PORT = 3000;
require('dotenv').config()

const app = express();

const key = fs.readFileSync(__dirname + '/ssl/server.key');
const cert = fs.readFileSync(__dirname + '/ssl/server.crt');
const options = {
  key: key,
  cert: cert
};

app.use(cookieParser());

// app.use(cors({
//   origin: process.env.ORIGIN_URL,
//   credentials: true
// }));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// // External access (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL); // Allow client to send requests from given origin, * serving as a wildcard
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow client to use given request methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, User');   // Allow client to send request headers
  next();
});

app.use('/api/items', itemsRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const server = https.createServer(options, app);

// mongoDB connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
      server.listen(PORT);
    })
    .catch((err) => console.log(err));
