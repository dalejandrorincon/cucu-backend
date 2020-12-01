const servicesRepository = require('./repository');
const unavailabilitiesRepository = require('../unavailabilities/repository');
const usersRepository = require('../users/repository');
const notificationsController = require('../notifications/controller');
const { validationResult } = require('express-validator');
const moment = require('moment');
const helper = require('../../utils/helpers');
const { imageUpload } = require('../../utils/file')
const { sendMail } = require('../../utils/helpers')

const {
    HOST_WEB,
    APP_NAME,
    CONTACT_MAIL
} = process.env;

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
            amount = '',
            min_date = '',
            max_date = '',
            sort_by = 'created_at',
            sort_order = 'desc',
        }
    } = req;

    try {
        const services = await servicesRepository.getServices(page, page_limit, name, status, service_site, service_type, client_id, translator_id, amount, min_date, max_date, sort_by, sort_order);
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
            amount = '',
            min_date = '',
            max_date = '',
            sort_by = 'date',
            sort_order = 'desc',
            duration_type = ""
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
        const services = await servicesRepository.getServicesByTranslator(page, page_limit, user.id, name, status, service_site, service_type, client_id, amount, min_date, max_date, sort_by, sort_order, duration_type);
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

async function servicesByClient(req, res) {

    let {
        query: {
            page = 1,
            page_limit = 10,
            name = '',
            status = '', 
            service_site  = '',
            service_type  = '',
            translator_id  = '',
            amount = '',
            min_date = '',
            max_date = '',
            sort_by = 'date',
            sort_order = 'desc',
            duration_type = ""
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
        const services = await servicesRepository.getServicesByClient(page, page_limit, user.id, name, status, service_site, service_type, translator_id, amount, min_date, max_date, sort_by, sort_order, duration_type);
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
    console.log("etnrasas")

    try {

        const {
            params: { id }
        } = req;

        const service = await servicesRepository.getService(id);
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
            
            let total=0;
            const user = await usersRepository.findById(body.translator_id);
            console.log(user.rate_minute)
            console.log(parseFloat(user.rate_minute))
            switch (body.duration_type) {
                case "0":
                    total = parseFloat(user.rate_hour) * parseFloat(body.duration_amount) + 5
                    break;
            
                case "1":
                    total = parseFloat(user.rate_minute) * parseFloat(body.duration_amount) + 5
                    break;
            }
        const sender = await usersRepository.findById(body.translator_id);

            let service = await servicesRepository.create({
                ...body,
                amount: total
            });

            let notifData ={
                sender_id: body.client_id, 
                type: "0", 
                receiver_id: body.translator_id,
                sender: {
                    firstname: sender.firstname,
                    lastname: sender.lastname
                },
                service_id: service.id
            }

            await notificationsController.create( req, res, notifData )

            let data = {
                clientName: sender.firstname+" "+sender.lastname,
                duration: body.duration_amount,
                duration_type: body.duration_type,
                date: moment(body.date).format('YYYY-MM-DD')
            }

            statusMail(req, res, body.client_id, 0, "client", req.body.lang, data)
            statusMail(req, res, body.translator_id, 0, "translator", req.body.lang, data)
            

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
            body: { cancel_reason, role }
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

        const sender = await usersRepository.findById(service.translator_id);
        
        let notifData ={
            sender_id: service.translator_id,
            type: "5", 
            receiver_id: service.client_id ,
            sender: {
                firstname: sender.firstname,
                lastname: sender.lastname
            },
            service_id: id
        }

        //await notificationsController.create( req, res, notifData )

        await servicesRepository.update(
            { status: "5", cancel_reason: cancel_reason },
            { id: id }
        )

        let data = {role: role}
        if(role=="2"){
            statusMail(req, res, service.client_id, 5, "client", req.body.lang, data)
        }else{
            statusMail(req, res, service.translator_id, 5, "translator", req.body.lang, data)
            statusMail(req, res, service.client_id, 5, "client", req.body.lang, data)
        }

        return res
            .status(201)
            .send(
                await servicesRepository.findOne({id})
            );

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

        await servicesRepository.update(
            { status: "4", date: date },
            { id: id }
        )

        return res
            .status(201)
            .send(
                await servicesRepository.findOne({id})
            );

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function accept(req, res) {
    try {   
        const {
            params: { id }
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
        const sender = await usersRepository.findById(service.translator_id);

        let notifData ={
            sender_id: service.translator_id,
            type: "1", 
            receiver_id: service.client_id ,
            sender: {
                firstname: sender.firstname,
                lastname: sender.lastname
            },
            service_id: id
        }

        await notificationsController.create( req, res, notifData )

        await servicesRepository.update(
            { status: "1" },
            { id: id }
        )

        statusMail(req, res, service.client_id, 1, "client", req.body.lang)

        let newTo;
        if(service.duration_type=="0"){
            newTo = moment(service.date).add(parseInt(service.duration_amount), 'hours').toDate()
        }else{
            newTo = moment(service.date).add(parseInt(service.duration_amount), 'minutes').toDate()
        }
        let remainder = 30 - (moment(newTo).minute() % 30);
        newTo = moment(newTo).add(remainder, "minutes").toDate();

        await unavailabilitiesRepository.create({
            from: service.date,
            to: newTo,
            translator_id: service.translator_id
        });

        return res
            .status(201)
            .send(
                await servicesRepository.findOne({id})
            );

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function reject(req, res) {
    try {   
        const {
            params: { id },
            body: { cancel_reason }
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
        const sender = await usersRepository.findById(service.translator_id);

        let notifData ={
            sender_id: service.translator_id,
            type: "6", 
            receiver_id: service.client_id ,
            sender: {
                firstname: sender.firstname,
                lastname: sender.lastname
            },
            service_id: id
        }

        await notificationsController.create( req, res, notifData )

        await servicesRepository.update(
            { status: "6", cancel_reason: cancel_reason },
            { id: id }
        )

        statusMail(req, res, service.client_id, 6, '', req.body.lang)

        return res
            .status(201)
            .send(
                await servicesRepository.findOne({id})
            );

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function start(req, res) {
    try {
        const {
            params: { id }
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

        await servicesRepository.update(
            { status: "2", start_date: moment().format() },
            { id: id }
        )

        return res
            .status(201)
            .send(
                await servicesRepository.findOne({id})
            );

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function pay(req, res) {
    try {
        const {
            params: { id }
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
        const sender = await usersRepository.findById(service.client_id);

        let notifData ={
            sender_id: service.client_id,
            type: "2", 
            receiver_id: service.translator_id,
            sender: {
                firstname: sender.firstname,
                lastname: sender.lastname
            },
            service_id: id
        }

        await notificationsController.create( req, res, notifData )

        await servicesRepository.update(
            { status: "2"},
            { id: id }
        )

        let data = {
            clientName: sender.firstname+" "+sender.lastname,
            duration: service.duration_amount,
            duration_type: service.duration_type,
            date: moment(service.date).format('YYYY-MM-DD')
        }

        statusMail(req, res, service.translator_id, 2, "translator", req.body.lang, data)
        statusMail(req, res, service.client_id, 2, "client", req.body.lang, data)

        return res
            .status(201)
            .send(
                await servicesRepository.findOne({id})
            );

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function finish(req, res) {
    try {
        const {
            params: { id }
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

        await servicesRepository.update(
            { status: "3", end_date: moment().format() },
            { id: id }
        )

        statusMail(req, res, service.translator_id, 3, "translator", req.body.lang)
        statusMail(req, res, service.client_id, 3, "client", req.body.lang)

        return res
            .status(201)
            .send(
                await servicesRepository.findOne({id})
            );

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function rate(req, res) {
    try {
        const {
            params: { id }
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

        await servicesRepository.update(
            { rated: true, status: "4" },
            { id: id }
        )

        return res
            .status(201)
            .send(
                await servicesRepository.findOne({id})
            );

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}


async function uploadFile(req, res) {
    try {
        let file = await imageUpload(req, "services")
        res.status(200).send({ file: JSON.parse(file[0]) })
    } catch (e) {
        console.log("error", e)
        res.status(400).send({ error: e })
    }
}

async function share(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res
                .status(409)
                .send({ errors: errors.formatWith(formatError).mapped() });
        else {
            const {
                params: { id },
                body: { shared_with }
            } = req;
            
            await servicesRepository.update(
                { shared_with: shared_with },
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

async function statusMail(req, res, client_id, new_status, client_type, lang="ES", data={}) {
    try {
        const client = await usersRepository.findOne({
            id: client_id
        });
        if (!client) {
            return res.status(400).send({
                message:
                    'No existe un usuario con este correo.'
            });
        }

        let status = ""
        let subject = ""
        let template = ""

        template = "status_"+new_status+"_client_"+lang

        switch(new_status){
            case 0:
                subject= "Servicio Creado"
                if(client_type=="translator"){
                    lang="EN"
                    template = "new_order_translator_"+lang
                }
                if(lang=="EN"){
                    subject= "Service Created"
                }
                break;
            case 1:
                subject= "Servicio Aceptado"
                lang="EN"
                if(lang=="EN"){
                    template = "status_"+new_status+"_client_"+lang
                    subject= "Service Accepted"
                }
                break;
            case 2:
                subject= "Servicio Pagado"
                if(client_type=="translator"){
                    lang="EN"
                    template = "paid_order_translator_"+lang
                }
                if(lang=="EN"){
                    subject= "Service Paid"
                }
                break;
            case 3:
                subject= "Servicio Finalizado"
                if(lang=="EN"){
                    subject= "Service Finished"
                }
                break;
            case 5:
                subject = "Servicio cancelado"
                if(data.role=="2"){
                    if(client_type=="client"){
                        lang="EN"
                    }
                    template = "status_5_"+client_type+"_by_translator_"+lang
                }else{
                    if(client_type=="translator"){
                        lang="EN"
                    }
                    template = "status_5_"+client_type+"_by_client_"+lang
                }
                if(lang=="EN"){
                    subject= "Service Cancelled"
                    status = "cancelled";
                }
                break;
            case 6:
                subject = "Servicio rechazado"
                lang="EN"
                if(lang=="EN"){
                    subject= "Service rejected"
                    status = "rejected";
                    template = "status_"+new_status+"_client_"+lang
                }
                break;
        }

        const url = `${HOST_WEB}/services`;

        if(lang=="EN"){
            data.duration_type == "0" ? data.duration_type="hours" : data.duration_type="minutes"
        }else{
            data.duration_type == "0" ? data.duration_type="horas" : data.duration_type="minutos"
        }
        let mailto = client.email + "," + CONTACT_MAIL
        console.log(mailto)
        res.render(
            template,
            {
                status,
                url,
                layout: false,
                appName: APP_NAME,
                contactName: APP_NAME,
                userName: client.firstname,
                clientName: data.clientName,
                duration: data.duration,
                durationType: data.duration_type,
                startDate: data.date,
                contactMail: CONTACT_MAIL
            },
            async (error, html) => {
                let options = {
                    html,
                    to: mailto,
                    text: subject,
                    subject: subject,

                };
                await sendMail(options);
            }
        );
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
    start,
    pay,
    finish,
    accept,
    reject,
    rate,
    servicesByTranslator,
    servicesByClient,
    uploadFile,
    share
};
