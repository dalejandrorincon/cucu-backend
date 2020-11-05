const { checkSchema } = require('express-validator');
const { VALIDATION_ERRORS } = require('../../utils/constants');

module.exports = option => {
    let ret = [];
    switch (option) {


        case 'store':
            ret.push(...[
                checkSchema({

                    grade:{
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        }
                    },
                    date:{
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        }
                    },
                    translator_id:{
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        }
                    },
                    client_id:{
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        }
                    },
                    service_id:{
                        isEmpty: {
                            negated: true,
                            errorMessage: VALIDATION_ERRORS.REQUIRED_FIELD
                        },
                    }
                })
            ])


        case 'update':
            
        default:
            return ret;
    }
};
