const bankRepository = require('./repository');
const { validationResult } = require('express-validator');


async function index(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = ''
        }
    } = req;

    try {
        const banks = await bankRepository.getBanks(page, page_limit, name);
        return res.status(200).send({
            ...banks,
            page: parseInt(page),
            pages: Math.ceil(banks.total / page_limit),
            total: banks.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function getAll(req, res) {
    try {
        const banks = await bankRepository.getAllBanks();
        return res.status(200).send(banks);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function index(req, res) {
    try {
        const banks = await bankRepository.find().orderBy('name');
        return res.status(200).send(banks);
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

            await bankRepository.create({
                ...body
            });

            return res
                .status(201)
                .send({ message: 'Banco creado exitosamente' });
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
            
            await bankRepository.update(
                { ...body },
                { id: id }
            )

            return res
                .status(201)
                .send({ message: 'Banco actualizado exitosamente' });
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
            
            await bankRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'Banco removido exitosamente' });
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
    getAll
};
