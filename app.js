const express = require('express');
const config = require('./appconfig');

let app = express();

app.use('/', require('./mymodule'));

app.listen(config.PORT);