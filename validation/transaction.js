const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTransactionInput(data) {
    let errors = {};
    
    data.description = validText(data.description) ? data.description : '';

    if (!Validator.isLength(data.description, {min: 0, max: 140})) {
        errors.text = 'No more than 140 letters!';
    }

    if (Validator.isEmpty(data.category)) {
        errors.text = 'You must choose a category';
    }

    if (Validator.isEmpty(data.amount)) {
        errors.text = 'Please enter an amount';
    }

    if (Validator.isEmpty(data.type)) {
        errors.text = 'Please choose your transaction type';
    }

    if (data.amount < 0) {
        errors.text =  'Amount must be positive'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}