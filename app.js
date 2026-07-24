// const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const app = express();
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//routes
app.use('/api/v1/tours', tourroutes);
app.use('/api/v1/users', userroutes);



module.exports = app;



