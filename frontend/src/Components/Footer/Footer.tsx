import { useDispatch, useSelector } from "react-redux";
import './Footer.less'
import React, { useEffect, useState } from "react";

export const Footer: React.FC = () => {

    return(
        <div className="main-footer-cont">
            <span>LeikoShop trademark</span>
            <span>all rights reserved</span>
        </div>
    )
}

export default Footer;
