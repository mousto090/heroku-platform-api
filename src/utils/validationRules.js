import consts from "./constants";

/**
 * Check if an email is valid (in the format of `email@example.com`)
 * @returns boolean
 */
const isEmail = email => {
    if (!email) {
        return false;
    }
    email = email.trim();
    //Adapted from https://stackoverflow.com/questions/46155/how-can-you-validate-an-email-address-in-javascript
    //allowed characters: alphanumeric and !&+-_
    var regex = new RegExp(
        /^([^<>()[\]\\.,;:#$%'*/=?^`{}~\s@"]+(\.[^<>()[\]\\.,;:#$%'*/=?^`{}~\s@"]+)*)/.source +
        /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.source
    );
    return regex.test(email.toLowerCase());
};

const empty = (value = '') => (value.length === 0 ? consts.app.empty_field : false);

/**
 * Get validation error or return false if value is valid
 * @param {String} value 
 * @returns String | boolean
 */
const emptyTrimed = (value = '') => (value.trim().length === 0 ? consts.app.empty_field : false);

const maxLength = (value = '', max) => (value.length > max);

const passwordStrength = (password = '') => {
    //min 3 diff chars
    const notUnique = password.split('');
    const unique = notUnique.filter((val, idx, arr) => arr.indexOf(val) === idx);
    return unique.length < 3 ? consts.app.user.password_not_strong : false;
};

export const validateRequired = (value) => {
    return emptyTrimed(value) || false;
}
/**
 * Get email validation error or return false if email is valid
 * @param {String} value 
 * @returns String | boolean
 */
export const valiateEmail = value => {
    return (emptyTrimed(value) || (isEmail(value) ? (maxLength(value.trim(), 132) ? consts.app.user.email_too_long : false) : consts.app.user.invalid_email));
};

export const validatePassword = (value) => {
    const error = empty(value) || (value.length < 6 ? consts.app.user.password_short :
        value.length > 100 ? consts.app.user.password_long : false);

    return error || passwordStrength(value);
};

export const validatePasswordMatch = (password, confirmPassword) => {
    const error = emptyTrimed(password) || emptyTrimed(confirmPassword);
    return error || (password !== confirmPassword) ? consts.app.user.password_not_match : false;
}