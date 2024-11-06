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

interface filterData {
    minWidth?: string,
    maxWidth?: string,
    minHeight?: string
    maxHeight?: string,
    minLength?: string,
    maxLength?: string,
    minNoseLength?: string,
    maxNoseLength?: string
}

export const getWateringCans = createAsyncThunk<
  wateringCan[], // Возвращаемый тип данных (можете заменить на более точный тип, например User)
  void, // Тип аргумента (loginData)
  { rejectValue: object | string } // Тип для thunkAPI.rejectWithValue
  >(
  'main/shop', // Уникальное имя действия
  async (_, thunkAPI) => { // Асинхронная функция, которая делает запрос
    try {
      const response = await $api.get('main/shop');
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

export const getFilteredWateringCans = createAsyncThunk<
  wateringCan[], // Возвращаемый тип данных (можете заменить на более точный тип, например User)
  filterData, // Тип аргумента (loginData)
  { rejectValue: object | string } // Тип для thunkAPI.rejectWithValue
  >(
  'main/shop/filtered', // Уникальное имя действия
  async (initData, thunkAPI) => { // Асинхронная функция, которая делает запрос

    const filterData = new URLSearchParams() 
    if (initData.minWidth !== undefined) filterData.append('min_width', initData.minWidth)
    if (initData.maxWidth !== undefined) filterData.append('max_width', initData.maxWidth)

    if (initData.minHeight !== undefined) filterData.append('min_height', initData.minHeight)
    if (initData.maxHeight !== undefined) filterData.append('max_height', initData.maxHeight)

    if (initData.minLength !== undefined) filterData.append('min_lenght', initData.minLength)
    if (initData.maxLength !== undefined) filterData.append('max_lenght', initData.maxLength)

    if (initData.minNoseLength !== undefined) filterData.append('min_nose_length', initData.minNoseLength)
    if (initData.maxNoseLength !== undefined) filterData.append('max_nose_length', initData.maxNoseLength)

    try {
      const response = await $api.get(`main/shop?${filterData.toString()}`);
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

const shopSlice = createSlice({
  name: 'wateringCans',
  initialState: {
    list: [] as wateringCan[] | [],
    status: 'idle', // idle | loading | succeeded | failed
    error : '' as string | object,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getWateringCans.pending, (state) => {
        state.status = 'loading'; // Обновляем статус на 'loading' при отправке запроса
      })
      .addCase(getWateringCans.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Обновляем статус на 'succeeded' при успешном запросе
        state.list = action.payload; // Сохраняем полученные данные
      })
      .addCase(getWateringCans.rejected, (state, action) => {
        state.status = 'failed'; // Обновляем статус на 'failed' при ошибке{
        state.error = action.payload || 'failed to register'; // Сохраняем сообщение об ошибке
      })

      .addCase(getFilteredWateringCans.pending, (state) => {
        state.status = 'loading'; // Обновляем статус на 'loading' при отправке запроса
      })
      .addCase(getFilteredWateringCans.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Обновляем статус на 'succeeded' при успешном запросе
        state.list = action.payload; // Сохраняем полученные данные
      })
      .addCase(getFilteredWateringCans.rejected, (state, action) => {
        state.status = 'failed'; // Обновляем статус на 'failed' при ошибке{
        state.list = []
        state.error = action.payload || 'failed to register'; // Сохраняем сообщение об ошибке
      });
  },
});

// export const {  } = shopSlice.actions
export default shopSlice.reducer;