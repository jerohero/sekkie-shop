const express = require('express');
const mongoose = require('mongoose');
const itemsRouter = require('./routes/ItemRoutes');
const userRouter = require('./routes/UserRoutes');
const orderRouter = require('./routes/OrderRoutes');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
const PORT = 3000;
require('dotenv').config()

const app = express();

app.use(cookieParser());

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// // External access (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/items', itemsRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/jeroenbol.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/jeroenbol.com/fullchain.pem'),
}, app);

// mongoDB connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
      httpsServer.listen(PORT);
    })
    .catch((err) => console.log(err));
