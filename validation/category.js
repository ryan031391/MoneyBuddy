const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCategoryInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';
    // data.icon = (data.icon) ? data.icon : '';

    if (!Validator.isLength(data.name, {min: 2, max: 20})) {
        errors.text = 'Category name must be between 2 and 20 letters!';
    }

    if (Validator.isEmpty(data.name)) {
        errors.text = 'Category name can not be blank!'
    }

    // if (Validator.isEmpty(data.icon)) {
    //     errors.text = 'Please choose an icon!'
    // }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}