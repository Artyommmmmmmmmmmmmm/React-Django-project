import { useDispatch, useSelector } from "react-redux";
import './Login.less'
import React, { useEffect, useState, FormEvent } from "react";
import { login } from "../../../Slices/LoginSlice";
import { AppDispatch } from "../../../store/store";
import { RootState } from "../../../store/store";

interface stateInterface {
    non_field_errors?: string[];
    password?: string[];
}

export const Login: React.FC = () => {
    const state = useSelector((state: RootState) => state.login.error as string)
    const dispatch = useDispatch<AppDispatch>()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleClick = (e: FormEvent) => {
        e.preventDefault()
        dispatch(login({
            username: username,
            password: password
        }))
    }
    useEffect(() => {
    }, [])
    return(
        <form onSubmit={(e) => handleClick(e)} className="login-cont">
            <div className="form-cont">


                <input 
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />


                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* Ошибки для пароля */}
                    <div className="error-message">
                        {state}
                    </div>
            </div>
            <button
            type="submit"
            >Войти</button>
        </form>
    )
}

export default Login;
