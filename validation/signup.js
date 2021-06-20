const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateSignupInput(data) {
    let errors = {};

    data.username = validText(data.username) ? data.username : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.username, {min:2, max:16})) {
        errors.username = 'Username must be between 2 and 16 letters';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username can not be blank';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field can not be blank';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field can not be blank';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password can not be blank';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};