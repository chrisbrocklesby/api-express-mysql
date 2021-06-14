require('dotenv').config();
const express = require('express');
const glob = require('glob');
const cookieParser = require('cookie-parser');
const errorController = require('./api/controllers/errorController');
const userController = require('./api/controllers/userController');

const app = express();

app.auth = userController.verify;
app.use(cookieParser());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

glob.sync('./api/routes/**/*Route.js').forEach((file) => {
  require(file)(app);
});

app.use(errorController.notFound);
app.use(errorController.error);

app.listen(process.env.PORT || 3000);
