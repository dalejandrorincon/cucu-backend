const { checkSchema } = require('express-validator');
const { VALIDATION_ERRORS } = require('../../utils/constants');

const userRepository = require('./repository');

module.exports = option => {
    let ret = [];
    switch (option) {


        case 'store':
            ret.push(...[
                checkSchema({
                    password: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                })
            ])


        case 'update':
            ret.push(...[
                checkSchema({

                    email: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        customSanitizer: {
                            options: (email = '') => {
                                return email.trim().toLowerCase();
                            }
                        },
                        isEmail: {
                            errorMessage: VALIDATION_ERRORS.INVALID_FIELD(
                                'correo eléctronico'
                            )
                        },
                        custom: {
                            options: async (email, { req: { params: { id } } }) => {
                                const user = await userRepository.findOne({
                                    email: email.toLowerCase()
                                });
                                if (user && user.id != id)
                                    throw new Error(
                                        VALIDATION_ERRORS.NOT_AVAILABLE('Correo eléctronico')
                                    );
                            }
                        }
                    }
                })
            ])

        case 'self-update':
            ret.push(...[
                checkSchema({
                    firstname: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    lastname: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },

                    document: {
                        /* isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        }, */
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(16),
                            options: { max: 16 }
                        }
                    },
                    phone: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(16),
                            options: { max: 16 }
                        }
                    },

                })
            ])







        default:
            return ret;
    }
};
