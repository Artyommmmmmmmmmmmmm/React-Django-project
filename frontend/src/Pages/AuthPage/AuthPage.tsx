import { useDispatch, useSelector } from "react-redux";
import './AuthPage.less'
import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../store/store";
import Login from '../../Components/auth/Login/Login'
import Register from '../../Components/auth/Register/Register'

export const AuthPage: React.FC = () => {
    const [method, setMethod] = useState('login')
    const showLogin = () => {
        setMethod('login')
    }

    const showRegister = () => {
        setMethod('register')
    }
    useEffect(() => {
    }, [])
    return(
        <div className="main-auth-cont">
            <div className="auth-cont">
                <div className="method-select">
                    <div 
                     onClick={() => showLogin()}
                     className={method === 'login' ? 'active' : '' }
                    >Вход</div>
                    <div
                     onClick={() => showRegister()}
                     className={method === 'register' ? 'active' : '' }
                    >Регистрация</div>                    
                </div>
                {method === 'login' ? 
                    <Login/>
                :
                    <Register/>
                }
            </div>
        </div>
    )
}

export default AuthPage;
