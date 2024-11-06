import {configureStore, combineReducers} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import loginReducer from '../Slices/LoginSlice'
import registerReducer from '../Slices/RegisterSlice'
import shopSlice from '../Slices/ShopSlice'
import detailCanSlice from '../Slices/DetailCanSlice'

export const Store = configureStore({reducer:{
    login: loginReducer,
    register: registerReducer,
    cans: shopSlice,
    detail:detailCanSlice
    }}
)

// Типизируем AppDispatch и RootState для использования в приложении
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;