import { useState, useEffect } from 'react';

function useFormValidationMaster(initialState, validate, callback) {
  const [values, setValues] = useState(initialState);
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        callback();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors, isSubmitting, callback]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });

    setErrors({
      ...errors,
      [event.target.name]: ''
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting
  };
}

export default useFormValidationMaster;
