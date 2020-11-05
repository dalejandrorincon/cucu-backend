const unavailabilityRepository = require('./repository');
const { validationResult } = require('express-validator');
const helper = require('../../utils/helpers');
const usersRepository = require('../users/repository');


async function index(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
        }
    } = req;

    try {
        const unavailabilities = await unavailabilityRepository.getUnavailabilities(page, page_limit);
        return res.status(200).send({
            ...unavailabilities,
            page: parseInt(page),
            pages: Math.ceil(unavailabilities.total / page_limit),
            total: unavailabilities.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function unavailabilitiesByUser(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            max_date = "",
            min_date = "",
            sort_by = 'created_at',
            sort_order = 'desc',
        }
    } = req;

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({
            message: 'Olvidó autenticarse'
        });
    }

    const token = authorization.replace("Bearer ", "")
    const userId = await helper.decodeToken(token);
    const user = await usersRepository.findById(userId);
    if (!user) return res.status(403).send({ message: 'Olvidó autenticarse' });

    try {

        if(user.role!="2"){
            return res.status(500).send({ message: "No es posible solicitar disponibles en este rol." });
        }

        let unavailabilities = await unavailabilityRepository.getUserUnavailabilities(page, page_limit, userId, min_date, max_date, sort_by, sort_order);

        return res.status(200).send({
            ...unavailabilities,
            page: parseInt(page),
            pages: Math.ceil(unavailabilities.total / page_limit),
            total: unavailabilities.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

/* async function transactionsByUser(req, res) {

    const {
        params: { id }
    } = req;

  
    try {

        let unavailabilities = await unavailabilityRepository.getUserUnavailabilities(id);

        return res.status(200).send({
            unavailabilities
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
} */


async function getAll(req, res) {
    try {
        const unavailabilities = await unavailabilityRepository.getAllUnavailabilities();
        return res.status(200).send(unavailabilities);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function index(req, res) {
    try {
        const unavailabilities = await unavailabilityRepository.find();
        return res.status(200).send(unavailabilities);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function store(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res
                .status(409)
                .send({ errors: errors.formatWith(formatError).mapped() });
        else {
            const { body } = req;
            console.log(req.body)
            //console.log(body)

            await unavailabilityRepository.create({
                ...body
            });

            return res
                .status(201)
                .send({ message: 'No disponibilidad creada exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function update(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res
                .status(409)
                .send({ errors: errors.formatWith(formatError).mapped() });
        else {
            const {
                params: { id },
                body
            } = req;
            
            await unavailabilityRepository.update(
                { ...body },
                { id: id }
            )

            return res
                .status(201)
                .send({ message: 'No disponibilidad actualizada exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function remove(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res
                .status(409)
                .send({ errors: errors.formatWith(formatError).mapped() });
        else {
            const {
                params: { id }
            } = req;
            
            await unavailabilityRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'No disponibilidad removida exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    index,
    store,
    update,
    remove,
    getAll,
    unavailabilitiesByUser
};
