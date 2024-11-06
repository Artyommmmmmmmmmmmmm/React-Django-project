import { useDispatch, useSelector } from "react-redux";
import './Register.less'
import React, { useEffect, useState, FormEvent} from "react";
import { removeError } from "../../../Slices/RegisterSlice";
import { register } from "../../../Slices/RegisterSlice";
import { AppDispatch, RootState } from "../../../store/store";

interface stateInterface {
    username?: string[];
    email?: string[];
    password1?: string[];
    password2?: string[];
}

interface passwordErrors {
    password1: string[],
    password2: string[]
}

export const Register: React.FC = () => {
    const reduxState = useSelector((state: RootState) => state.register.error as string)
    const [state, setState] = useState(reduxState)
    const status = useSelector((state: RootState) => state.register.status as string)
    const dispatch = useDispatch<AppDispatch>()
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [passwordErrors, setPasswordErrors] = useState({password1: [], password2: []} as passwordErrors)
    const [emailError, setEmailError] = useState("")

    const validatePassword = () => {
        let errors = {
            password1: [],
            password2: []
        } as passwordErrors;

        if (password1.length < 8) {
          errors.password1.push('Паполь должен содержать не менее 8 символов');
        }
        if (!/[A-Z]/.test(password1)) {
          errors.password1.push('Пароль должен содержать минимум одну большую букву');
        }
        if (!/[0-9]/.test(password1)) {
          errors.password1.push('Пароль должен содержать минимум одно число');
        }
        if (!/[!@#$%^&*]/.test(password1)) {
          errors.password1.push('Пароль должен содержать минимум один особый символ');
        }
        if (password1 !== password2) {
          errors.password2.push('Пароли не совпадают');
        }
    
        return errors;
      };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Введите корректный адрес электронной почты"
        }
        return "";
      };

    const checkValidity = () => {
        if (passwordErrors.password1.length === 0 &&
            passwordErrors.password2.length === 0 &&
            emailError.length === 0
        ) {
            return true
        } else return false

    }

    const handleClick = (e: FormEvent) => {
        // e.preventDefault()
        dispatch(register({
            username: username,
            email: email,
            password1: password1,
            password2: password2,
        }))
        return false
    }
    useEffect(() => {
        setPasswordErrors(validatePassword())
        setEmailError(validateEmail())
    }, [password1, password2, email])
    useEffect(() => {
        dispatch(removeError())
        setState('')
    }, [username])
    useEffect(() => {
        setState(reduxState)
    }, [reduxState])
    return(
        <form onSubmit={checkValidity() ? handleClick : (e) => e.preventDefault()} className="register-cont">
            <div className="form-errors-cont">
                <div className="form-cont" >
                    {status === 'succeeded' ?
                    <div>
                        Вы успешно зарегистрировались
                    </div> 
                    : null }
                    <input 
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                    />
                    <div className="error-cont">
                        {state}
                    </div>
                    <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    />      
                    <div className="error-cont">
                        {emailError}    
                    </div>
                    <input
                    type="password"
                    placeholder="password"
                    value={password1}
                    onChange={(e) => {setPassword1(e.target.value)}}
                    />
                    <input
                    type="password"
                    placeholder="password"
                    value={password2}
                    onChange={(e) => {setPassword2(e.target.value)}}
                    />      
                    <div className="error-cont">
                        {passwordErrors.password1.map((error, key) => 
                        <div key={key}>
                            {error}
                        </div>)}
                        {passwordErrors.password2.map((error, key) => 
                        <div key={key}>
                            {error}
                        </div>)}
                    </div>
                </div>
            </div>  
            <button 
            type="submit"
            // onClick={checkValidity() ? () => handleClick() : () => null}
            className={checkValidity() ? '' : 'inactive'}>Зарегистрироваться</button>
        </form>
    )
}

export default Register;
