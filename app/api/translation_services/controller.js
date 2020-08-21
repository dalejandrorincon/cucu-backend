const servicesRepository = require('./repository');
//const { validationResult } = require('express-validator');


async function index(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = '',
            status = '', 
            service_site  = '',
            service_type  = '',
            client_id  = '',
            translator_id  = '',
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

async function servicesByTranslator(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = '',
            status = '', 
            service_site  = '',
            service_type  = '',
            client_id  = '',
            translator_id  = '',
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
        const services = await servicesRepository.getServicesByTranslator(page, page_limit, user.id, name, status, service_site, service_type, client_id);
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

async function getService(req, res) {

    try {

        const {
            params: { id }
        } = req;

        const service = await servicesRepository.getService();
        return res.status(200).send(service);

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


async function cancel(req, res) {
    try {
        const {
            params: { id },
        } = req;

        const service = await servicesRepository.findOne({
            id
        });
        if (!service) {
            return res.status(400).send({
                message:
                    'No existe este servicio.'
            });
        }

        await usersRepository.update(
            { status: "cancelled" },
            { id: id }
        )

        return res
            .status(201)
            .send({ message: 'Servicio cancelado exitosamente' });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function reprogram(req, res) {
    try {
        const {
            params: { id },
            body : {
                date
            }
        } = req;

        const service = await servicesRepository.findOne({
            id
        });
        if (!service) {
            return res.status(400).send({
                message:
                    'No existe este servicio.'
            });
        }

        await usersRepository.update(
            { status: "reprogrammed", date: date },
            { id: id }
        )

        return res
            .status(201)
            .send({ message: 'Servicio cancelado exitosamente' });

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
    cancel,
    getService,
    reprogram,
    servicesByTranslator
};
