import $api from "../http/http";
import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface registrationData {
  username: string,
  email: string,
  password1: string,
  password2: string
}

interface ErrorResponseData {
  email?: string;
  password1?: string;
  password2?: string;
  username?: string;
}

interface ErrorData {
  response?: {
    data: ErrorResponseData;
  };
}

const errorTranslate = (error: ErrorResponseData) => {
  const translate: Record<string, string> = {
    "A user with that username already exists.": "Пользователь с таким именем уже существует"
  }
  if (error.username && error.username.length > 0) {
    return translate[error.username[0]]
  }
  return "Возникла ошибка попробуйте еще раз позже"
}

export const register = createAsyncThunk<
  any, // Возвращаемый тип данных (можете заменить на более точный тип, например User)
  registrationData, // Тип аргумента (loginData)
  { rejectValue: string } // Тип для thunkAPI.rejectWithValue
  >(
  'auth/register', // Уникальное имя действия
  async (registrationData, thunkAPI) => { // Асинхронная функция, которая делает запрос
    try {
      const response = await $api.post('auth/registration', registrationData);
      // console.log(response.data); // Данные передаются в 'fulfilled'
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseData>;
      if (axiosError.response && axiosError.response.data) {
        // Если у нас есть ответ с ошибкой от сервера, возвращаем его
        console.error(axiosError)
        return thunkAPI.rejectWithValue(errorTranslate(axiosError.response.data) );
      }
      // Иначе возвращаем общую ошибку
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

const registerSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle', // idle | loading | succeeded | failed
    error : '' as string ,
  },
  reducers: {
    removeError: (state) => {
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading'; // Обновляем статус на 'loading' при отправке запроса
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Обновляем статус на 'succeeded' при успешном запросе
        state.list = action.payload; // Сохраняем полученные данные
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'; // Обновляем статус на 'failed' при ошибке{
        state.error = action.payload || 'failed to register'; // Сохраняем сообщение об ошибке
      });
  },
});

export const { removeError } = registerSlice.actions
export default registerSlice.reducer;