const express =  require('express');
const path = require('path');
const cookieParser = require('cookie-Parser');
require('dotenv').config({path: `${__dirname}/config.env`});
const productRouter  = require('./Routes/ProductRouter');
const categoryRouter  = require('./Routes/CategoryRouter');
const userRouter  = require('./Routes/UserRouter');
const orderRouter  = require('./Routes/OrderRouter');
const OperationalError = require('./utility/OperationalError');
const globalErrorHandler = require('./ErrorHandler.js/GlobalErrorHandler');
const {validateAuthentication} = require('./Controllers/AuthenticationController');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const app = express();

app.use(xss());
app.use(mongoSanitize());
app.use(helmet());
// app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cookieParser());

app.use(validateAuthentication);

const manageQueryString = (req, res, next) => {
    if(req.query) {
        Object.keys(req.query).map(key => {
            if(Array.isArray(req.query[key])) {
                req.query[key] = req.query[key][0];
            }
        })
    }
    next();
};

app.use('/images', express.static(path.resolve(__dirname, 'public', 'images')));

app.use(manageQueryString);

app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);
app.get('/api/v1/config/paypal', (req, res, next) => res.json({
    status: 'success',
    data: process.env['PAYPAL_CLIENT_ID']
}))
app.use('/api/*', (req, res, next) => next(new OperationalError('Page Not Found', 404, 'fail', 'Page Not Found')));

if (process.env['NODE_ENVIRONMENT'] === 'PRODUCTION' ) {
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
    });
}

app.use(globalErrorHandler);

module.exports = app;