const { checkSchema } = require('express-validator');
const { VALIDATION_ERRORS } = require('../../utils/constants');

module.exports = option => {
    let ret = [];
    switch (option) {

        case 'reprogram':

            ret.push(...[
                checkSchema({
                    date: {
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    }
                })
            ])


        case 'store':
            ret.push(...[
                checkSchema({
                    name: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },

                    service_site: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    amount: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    service_type: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    url: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    length: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    platform: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    record: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    files_urls: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    description: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(500),
                            options: { max: 500 }
                        }
                    },
                    status: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    client_id: {
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                        isLength: {
                            errorMessage: VALIDATION_ERRORS.MAX_LENGTH(100),
                            options: { max: 100 }
                        }
                    },
                    translator_id: {
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
            
        default:
            return ret;
    }
};
