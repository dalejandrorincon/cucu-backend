const express = require('express');
const routes = express();

const users = require('./users');
const auth = require('./auth');
const countries = require('./countries');
const departments = require('./departments');
const cities = require('./cities');
const languages = require('./languages');
const translation_services = require('./translation_services');
const specialities = require('./specialities');
const reviews = require('./reviews');
const payments = require('./payments');
const transactions = require('./transactions');
const unavailabilities = require('./unavailabilities');
const platforms = require('./platforms');
const services = require('./services');
const stripe = require('./stripe');
const notifications = require('./notifications');
const banks = require('./banks');
const payment_data = require('./payment_data');


routes.use('/users', users);
routes.use('/auth', auth);
routes.use('/countries', countries);
routes.use('/departments', departments);
routes.use('/cities', cities);
routes.use('/languages', languages);
routes.use('/translation_services', translation_services);
routes.use('/specialities', specialities);
routes.use('/reviews', reviews);
routes.use('/payments', payments);
routes.use('/transactions', transactions);
routes.use('/unavailabilities', unavailabilities);
routes.use('/platforms', platforms);
routes.use('/services',services);
routes.use('/stripe', stripe);
routes.use('/notifications', notifications);
routes.use('/banks', banks);
routes.use('/payment_data', payment_data);


module.exports = routes;
