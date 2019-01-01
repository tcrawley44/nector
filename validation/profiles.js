const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};

    
    // data.handle = !isEmpty(data.handle) ? data.handle : '';
    // data.status = !isEmpty(data.status) ? data.status : '';
    

   

    // if(Validator.isEmpty(data.handle)){
    //     errors.handle = 'handle is required';
    // }

    // if(Validator.isEmpty(data.status)){
    //     errors.status = 'status is required';
    // }


    

    

    return {
        errors,
        isValid: isEmpty(errors)
    }; 
};