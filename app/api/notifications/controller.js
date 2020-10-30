const notificationRepository = require('./repository');
const usersRepository = require('../users/repository');
const { validationResult } = require('express-validator');


const helper = require("../../utils/helpers")

async function userNotifications(req, res) {
    try {

        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({
                message: 'Olvidó autenticarse'
            });
        }

        const token = authorization.replace("Bearer ", "")
        const userId = await helper.decodeToken(token);
        console.log("userId")

        console.log("userId"+ userId)
        const user = await usersRepository.findById(userId);
        if (!user) return res.status(403).send({ message: 'Olvidó autenticarse' });


        const notifications = await notificationRepository.getNotifications(userId);
        return res.status(200).send(notifications);

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

            await notificationRepository.create({
                ...body
            });

            return res
                .status(201)
                .send({ message: 'Notificación creada exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function create(req, res, data) {
    try {
        
        let notif = await notificationRepository.create({
            ...data
        });

        const io = req.app.get('socketio');
        let socket_id = await helper.validateSocket(data.receiver_id)
        io.to(socket_id).emit('notifications', { ...data, id: notif.id, read: false} );

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

            await notificationRepository.create({
                ...body
            });

            return res
                .status(201)
                .send({ message: 'Notificación creada exitosamente' });
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
            
            await notificationRepository.update(
                { ...body },
                { id: id }
            )

            return res
                .status(201)
                .send({ message: 'Notificación actualizada exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

async function setRead(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res
                .status(409)
                .send({ errors: errors.formatWith(formatError).mapped() });
        else {
            const {
                body: {ids}
            } = req;

            console.log(ids)

            for (let i = 0; i < ids.length; i++) {
                const currentId = ids[i];
                await notificationRepository.update(
                    { read: true },
                    { id: currentId }
                )
                
            }

            return res
                .status(201)
                .send({ message: 'Notificaciones actualizadas exitosamente' });
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
            
            await notificationRepository.deleteById(id)

            return res
                .status(201)
                .send({ message: 'Notificación removida exitosamente' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    userNotifications,
    create,
    store,
    update,
    setRead,
    remove
};
