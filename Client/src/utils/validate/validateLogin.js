function ValidateAuthLogin(values) {
    let errors = {};

    //email validation
    if (!values.username) {
        errors.username = 'Username tidak boleh kosong'
    }

    //password validation
    if (!values.password) {
        errors.password = 'Password tidak boleh kosong'
    }

    return errors;

}

export default ValidateAuthLogin;