import isEmail from 'validator/lib/isEmail';
function ValidateAuthLogin(values) {
    let errors = {};

    //email validation
    if (!values.email) {
        errors.email = 'Email tidak boleh kosong'
    } else if (!isEmail(values.email)) {
        errors.email = 'Email tidak valid!'
    }

    if (!values.username) {
        errors.username = 'Username tidak boleh kosong'
    }

    //password validation
    if (!values.password) {
        errors.password = 'Password tidak boleh kosong'
    }

    if (!values.confirm) {
        errors.confirm = 'Konfirmasi password tidak boleh kosong'
    } else if (values.password !== values.confirm) {
        errors.confirm = 'Konfirmasi password tidak sama dengan password'
    }

    return errors;

}

export default ValidateAuthLogin;