import { useState, useEffect } from 'react';

function useFormValidateLogin(initialState, validate, callback) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false); //memastikan udah submit

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0
            if (noErrors) {
                setSubmitting(false);
                callback();
            } else {
                setSubmitting(false);
            }
        }
    }, [errors, isSubmitting, callback])

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });

        setErrors({
            ...errors,
            [event.target.name]: ''
        });
    }

    const handleBlur = () => {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    const handleSubmit = event => {
        event.preventDefault();
        //validasi dahulu sbeelum melanjutkan 
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }

    return { values, handleChange, handleSubmit, handleBlur, errors, isSubmitting }
}

export default useFormValidateLogin;