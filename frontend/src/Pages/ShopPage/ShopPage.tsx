import { useDispatch, useSelector } from "react-redux";
import './ShopPage.less'
import React, { useEffect, useState } from "react";
import { getWateringCans, getFilteredWateringCans } from "../../Slices/ShopSlice";
import { AppDispatch, RootState } from "../../store/store";
import Card from "../../Components/shop/Card/Card";
import Search from '../../Components/shop/Search/Search'
import { useLocation, useNavigate } from "react-router-dom";

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

const ShopPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector((state: RootState) => state.cans.list as wateringCan[])

    const onClose = () => {
        setIsOpen(!isOpen)
    }

    const cleanFilters = () => {
        navigate('/main')
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)

        const searchData = {
            minWidth: params.get('minWidth') || undefined,
            maxWidth: params.get('maxWidth') || undefined,
            minHeight: params.get('minHeight') || undefined,
            maxHeight: params.get('maxHeight') || undefined,
            minLength: params.get('minLength') || undefined,
            maxLength: params.get('maxLength') || undefined,
            minNoseLength: params.get('minNoseLength') || undefined,
            maxNoseLength: params.get('maxNoseLength') || undefined,
        }
        console.log(searchData)
        dispatch(getFilteredWateringCans(searchData))
    }, [location.search])

    return (
        <div>
            <div>
                <button onClick={onClose}>фильтры</button>
                <button onClick={cleanFilters}>очистить фильтры</button>
                <Search isOpen={isOpen} onClose={() => onClose()}/>
                {/* <input
                placeholder="поиск"
                type="text"
                /> */}
            </div>
            <div className="card-cont">
                {state.map((card, key) => 
                    <Card 
                    key={key}
                    id={card.id}
                    name = {card.name}
                    width = {card.width}
                    heigth = {card.height}
                    length = {card.length}
                    nose_length = {card.nose_length}
                    handle_type = {card.handle_type}
                    image = {card.image}
                    producer = {card.producer}
                    owner = {card.owner}
                    />
                )}

            </div>
        </div>
    )
}

export default ShopPage;