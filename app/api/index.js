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

routes.use('/users', users);
routes.use('/auth', auth);
routes.use('/countries', countries);
routes.use('/departments', departments);
routes.use('/cities', cities);
routes.use('/languages', languages);
routes.use('/translation_services', translation_services);
routes.use('/specialities', specialities);

module.exports = routes;
