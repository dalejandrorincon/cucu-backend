const usersRepository = require('./repository');
const bcrypt = require('bcryptjs');
const { decodeToken } = require('../../utils/helpers');

const { validationResult } = require('express-validator');


async function index(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = '',
            email='',
            disabled='',
            city_id='',
            department_id='',
            city_id='',
            country_id=''
        }
    } = req;

    try {
        const users = await usersRepository.getUsers(page, page_limit, name, email, disabled, city_id, department_id, city_id, country_id);
        return res.status(200).send({
            ...users,
            page: parseInt(page),
            pages: Math.ceil(users.total / page_limit),
            total: users.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function getUser(req, res) {

    try {

        const {
            params: { id }
        } = req;

        return getPermissions(req, res, id)

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
            const { password } = body;

            console.log(req.body)
            //console.log(body)

            await usersRepository.create({
                ...body,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),

            });

            return res
                .status(201)
                .send({ message: 'Usuario creado exitosamente' });
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
                headers: { authorization },
                body
            } = req;

            const tokenUser = await decodeToken(authorization.replace("Bearer ", ""));

            if (body.password) {
                body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))
            }

            await usersRepository.update(
                { ...body },
                { id: tokenUser }
            )

            return res
                .status(201)
                .send({ message: 'Usuario actualizado exitosamente' });
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
            
            await usersRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'Usuario removido exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    index,
    getUser,
    store,
    update,
    remove
};
