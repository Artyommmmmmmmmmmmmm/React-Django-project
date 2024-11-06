import { useDispatch, useSelector } from "react-redux";
import './Card.less'
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../store/store";
import { storeId } from "../../../Slices/DetailCanSlice";
import { useNavigate } from "react-router-dom";
import { UseDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

interface producer {
    id: number,
    name: string
}

interface owner {
    username: string
}

interface wateringCan {
    id: number,
    name: string,
    width: string,
    heigth: string,
    length: string,
    nose_length: string,
    handle_type: string,
    image: string,
    producer: producer,
    owner: owner,
}

const Card: React.FC<wateringCan> = (cardData) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [idParam, setIdParam] = useSearchParams()
    const handleClick = (id: number) => {
        const newParams = new URLSearchParams(idParam);
        newParams.set('id', id.toString())
        
        navigate({
            pathname: '/main/detail',
            search: newParams.toString()
        })
    }
    return (
        <div className="main-card">
            <img className="image" src={cardData.image} alt="watering can image"/>
            <div className="card-text">
                {cardData.name}
                <button className="detail-btn" onClick={() => handleClick(cardData.id)}>
                    Подробнее
                </button>
            </div>
        </div>
    )
}

export default Card;