const servicesRepository = require('./repository');
//const { validationResult } = require('express-validator');


async function index(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = ''
        }
    } = req;

    try {
        const services = await servicesRepository.getServices(page, page_limit, name, status, service_site, service_type, client_id, translator_id);
        return res.status(200).send({
            ...services,
            page: parseInt(page),
            pages: Math.ceil(services.total / page_limit),
            total: services.total
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function getAll(req, res) {
    try {
        const services = await servicesRepository.getAllServices();
        return res.status(200).send(services);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function index(req, res) {
    try {
        const services = await servicesRepository.find().orderBy('name');
        return res.status(200).send(services);
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

            await servicesRepository.create({
                ...body
            });

            return res
                .status(201)
                .send({ message: 'Servicio creado exitosamente' });
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
            
            await servicesRepository.update(
                { ...body },
                { id: id }
            )

            return res
                .status(201)
                .send({ message: 'Servicio actualizado exitosamente' });
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
            
            await servicesRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'Servicio removido exitosamente' });
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
