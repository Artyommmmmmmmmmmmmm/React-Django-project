import { useDispatch, useSelector } from "react-redux";
import './DetailCanPage.less'
import React, { useEffect, useState } from "react";
import { getDetailCan } from "../../Slices/DetailCanSlice";
import { AppDispatch, RootState } from "../../store/store";
import { storeId } from "../../Slices/DetailCanSlice";
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
    height: string,
    length: string,
    nose_length: string,
    handle_type: string,
    image: string,
    producer: producer,
    owner: owner
}

const DetailCanPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get('id') 
    const state = useSelector((state: RootState) => state.detail.data as wateringCan)
    const status = useSelector((state: RootState) => state.detail.status)
    console.log(state)
    useEffect(() => {
        dispatch(getDetailCan(Number(id)))
    }, [])

    return (
        <div className="detail-card-cont">
            <img src={state.image}  className="detail-image" alt="detail image"/>
            {status == 'succeeded' ?  
            <div>
                <p>{state.name}</p>
                <p>Ширина: {state.width}</p>
                <p>Высота: {state.height}</p>
                <p>Длина: {state.length}</p>
                <p>Длина носа: {state.nose_length}</p>
                <p>Тип ручки: {state.handle_type}</p>
                <p>Производитель: {state.producer.name}</p>
            </div>
            :   <div>Загрузка</div> }
        </div>
    )
}

export default DetailCanPage;
