import { useDispatch, useSelector } from "react-redux";
import './Search.less'
import React, { useEffect, useState, FormEvent} from "react";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

interface producer {
    id: number,
    name: string
}

interface owner {
    username: string
}

interface filterData {
    minWidth?: string,
    maxWidth?: string,
    minHeight?: string,
    maxHeight?: string,
    minLength?: string,
    maxLength?: string,
    minNoseLength?: string,
    maxNoseLength?: string,
}

interface props {
    isOpen: boolean,
    onClose: () => void
}

const Card: React.FC<props> = ({isOpen, onClose}) => {
    const [minWidth, setMinWidth] = useState('')
    const [maxWidth, setMaxWidth] = useState('')
    const [minHeight, setMinHeight] = useState('')
    const [maxHeight, setMaxHeight] = useState('')
    const [minLength, setMinLength] = useState('')
    const [maxLength, setMaxLength] = useState('')
    const [minNoseLength, setMinNoseLength] = useState('')
    const [maxNoseLength, setMaxNoseLength] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    if (!isOpen) {return null}

    const handleClick = (event: FormEvent) => {
        event.preventDefault();
        const params = new URLSearchParams()
        if (minWidth !== '') params.append('minWidth', minWidth)
        if (maxWidth !== '') params.append('maxWidth', maxWidth)
    
        if (minHeight !== '') params.append('minHeight', minHeight)
        if (maxHeight !== '') params.append('maxHeight', maxHeight)
    
        if (minLength !== '') params.append('minLength', minLength)
        if (maxLength !== '') params.append('maxLength', maxLength)
    
        if (minNoseLength !== '') params.append('minNoseLength', minNoseLength)
        if (maxNoseLength !== '') params.append('maxNoseLength', maxNoseLength)

        navigate(`/main?${params.toString()}`)
        onClose()
    }

    return (
        <div className="overlay">

            <form onSubmit={handleClick} className="search-form-cont">
                <button onClick={() => onClose()} className="close-btn">✖</button>
                <div>
                    <input
                        type="text"
                        placeholder="мин ширина"
                        value={minWidth}
                        onChange={(e) => {setMinWidth(e.target.value)}}
                    />
                    <input
                        type="text"
                        placeholder="макс ширина"
                        value={maxWidth}
                        onChange={(e) => {setMaxWidth(e.target.value)}}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="мин высота"
                        value={minHeight}
                        onChange={(e) => {setMinHeight(e.target.value)}}
                    />
                    <input
                        type="text"
                        placeholder="макс высота"
                        value={maxHeight}
                        onChange={(e) => {setMaxHeight(e.target.value)}}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="мин длина"
                        value={minLength}
                        onChange={(e) => {setMinLength(e.target.value)}}
                    />
                    <input
                        type="text"
                        placeholder="макс длина"
                        value={maxLength}
                        onChange={(e) => {setMaxLength(e.target.value)}}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="мин длина носа"
                        value={minNoseLength}
                        onChange={(e) => {setMinNoseLength(e.target.value)}}
                    />
                    <input
                        type="text"
                        placeholder="макс длина носа"
                        value={maxNoseLength}
                        onChange={(e) => {setMaxNoseLength(e.target.value)}}
                    />
                </div>
                <button type="submit">искать</button>
            </form>
        </div>
    )
}

export default Card;