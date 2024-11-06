import { useDispatch, useSelector } from "react-redux";
import './Header.less'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const navigateMain = () => {
        navigate('/main/')
    }
    return(
        <div className="main-header-cont">
            <h1 className="header-logo">LeikoShop</h1>
            <nav className="header-nav-cont">
                <div onClick={() => navigateMain()} className="navigate-main">
                    На главную
                </div>
            </nav>
        </div>
    )
}

export default Header;
