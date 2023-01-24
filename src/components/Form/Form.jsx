import React, { useEffect, useState } from 'react';
import styles from './Form.module.scss'

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
                    break
                case 'isEmail':
                    const re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || maxLengthError || minLengthError || emailError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, maxLengthError, minLengthError, emailError])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        inputValid
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)


    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

const Form = () => {
    const email = useInput('', {isEmpty: true, minLength: 3, isEmail: true})
    const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 8})

    return (
        <form>
            <h1 className={styles.title}>Registration</h1>
            <div className={styles.inputBlock}>
                <input value={email.value}
                       onChange={(e) => email.onChange(e)}
                       onBlur={() => email.onBlur()}
                       name='email'
                       type="text"
                       placeholder='Enter your email...' />
                {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Field cant be empty</div>}
                {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Length is not correct</div>}
                {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>Email is not correct</div>}
            </div>

            <div className={styles.inputBlock}>
                <input value={password.value}
                       onChange={(e) => password.onChange(e)}
                       onBlur={() => password.onBlur()}
                       name='password'
                       type="password"
                       placeholder='Enter your password...' />
                {(password.isDirty && password.isEmpty) && <div style={{color: 'red'}}>Field cant be empty</div>}
                {(password.isDirty && password.minLengthError) && <div style={{color: 'red'}}>Length is not correct</div>}
                {(password.isDirty && password.maxLengthError) && <div style={{color: 'red'}}>Length is too long</div>}
            </div>

            <button disabled={!email.inputValid || !password.inputValid} type='submit'>Registration</button>
        </form>
    );
};

export default Form;