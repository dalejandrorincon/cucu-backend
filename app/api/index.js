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
const stripe = require('./stripe');


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
routes.use('/stripe', stripe);


module.exports = routes;
