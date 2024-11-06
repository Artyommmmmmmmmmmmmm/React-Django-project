import $api from "../http/http";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface loginData {
  username: string,
  password: string
}

interface ErrorResponseData {
  non_field_errors?: string[];
  password?: string[];

}

interface ErrorData {
  response?: {
    data: ErrorResponseData;
  };
}

const errorTranslate = (error: ErrorResponseData) => {
  const translate: Record<string, string> = {
    "This field may not be blank.": "Введите логин и пароль",
    "Unable to log in with provided credentials.": "Невверные логин или пароль",
    "Must include \"username\" and \"password\".": "Введите логин и пароль"
  }

  if (error.non_field_errors && error.non_field_errors.length > 0) {
    return translate[error.non_field_errors[0]] || "Возникла ошибка попробуйте еще раз позже"
  }
  if (error.password && error.password.length > 0) {
    return translate[error.password[0]] || "Возникла ошибка попробуйте еще раз позже"
  }
}

export const login = createAsyncThunk<
  any, // Возвращаемый тип данных (можете заменить на более точный тип, например User)
  loginData, // Тип аргумента (loginData)
  { rejectValue: string | ErrorResponseData } // Тип для thunkAPI.rejectWithValue
  >(
  'auth/logins', // Уникальное имя действия
  async (loginData, thunkAPI) => { // Асинхронная функция, которая делает запрос
    try {
      const response = await $api.post('authdj/login', loginData);
      console.log(response.data); // Данные передаются в 'fulfilled'
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseData> // Передача ошибки в 'rejected'
      if (axiosError.response && axiosError.response.data) {
        return thunkAPI.rejectWithValue(errorTranslate(axiosError.response.data) || 'Fetch failed');
      }
      return thunkAPI.rejectWithValue('An unknown error occurred')
    }
  }
);

const loginSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle', // idle | loading | succeeded | failed
    error : '' as ErrorResponseData | string,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'; // Обновляем статус на 'loading' при отправке запроса
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Обновляем статус на 'succeeded' при успешном запросе
        state.list = action.payload; // Сохраняем полученные данные
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'; // Обновляем статус на 'failed' при ошибке{
        state.error = action.payload as ErrorResponseData | string; // Сохраняем сообщение об ошибке
      });
  },
});

export default loginSlice.reducer;
