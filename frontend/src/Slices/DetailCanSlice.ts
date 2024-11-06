import $api from "../http/http";
import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface producer {
    id: number,
    name: string
}

interface owner {
    username: string
}

interface wateringCan {
    width: string,
    heigth: string,
    length: string,
    nose_length: string,
    handle_type: string,
    producer: producer,
    owner: owner
}

export const getDetailCan = createAsyncThunk<
wateringCan[], // Возвращаемый тип данных (можете заменить на более точный тип, например User)
  number, // Тип аргумента (loginData)
  { rejectValue: object | string } // Тип для thunkAPI.rejectWithValue
  >(
  'main/shop/id', // Уникальное имя действия
  async (id, thunkAPI) => { // Асинхронная функция, которая делает запрос
    try {
      const response = await $api.get('main/shop/' + id);
      // console.log(response.data); // Данные передаются в 'fulfilled'
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        // Если у нас есть ответ с ошибкой от сервера, возвращаем его
        console.error(axiosError)
        return thunkAPI.rejectWithValue(axiosError.response.data);
      }
      // Иначе возвращаем общую ошибку
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

const detailCanSlice = createSlice({
  name: 'wateringCans',
  initialState: {
    id: 1 as number,
    data: {} as wateringCan | {},
    status: 'idle', // idle | loading | succeeded | failed
    error : '' as string | object,
  },
  reducers: {
    storeId: (state, action: PayloadAction<number>) => {
        state.id = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailCan.pending, (state) => {
        state.status = 'loading'; // Обновляем статус на 'loading' при отправке запроса
      })
      .addCase(getDetailCan.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Обновляем статус на 'succeeded' при успешном запросе
        state.data = action.payload; // Сохраняем полученные данные
      })
      .addCase(getDetailCan.rejected, (state, action) => {
        state.status = 'failed'; // Обновляем статус на 'failed' при ошибке{
        state.error = action.payload || 'failed to register'; // Сохраняем сообщение об ошибке
      });
  },
});

export const { storeId } = detailCanSlice.actions
export default detailCanSlice.reducer;