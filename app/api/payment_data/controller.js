const dataRepository = require('./repository');
const usersRepository = require('../users/repository');
const { validationResult } = require('express-validator');

const helper = require("../../utils/helpers")

async function index(req, res) {
    try {
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
        
        const data = await dataRepository.getPaymentData(userId);
        return res.status(200).send(
            ...data
        );
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

            await dataRepository.create({
                ...body
            });

            return res
                .status(201)
                .send({ message: 'Datos creados exitosamente' });
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
                body
            } = req;
            
            await dataRepository.update(
                { ...body },
                { user_id: body.user_id }
            )

            return res
                .status(201)
                .send({ message: 'Datos actualizados exitosamente' });
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
            
            await dataRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'Datos removidos exitosamente' });
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
};
