import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserRole } from "@app/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  validationErrors: { [key: string]: string };
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!localStorage.getItem('isAuthenticated'),
  error: null,
  validationErrors: {}
};

const validateLogin = (credentials: { username: string; password: string }) => {
  const errors: { [key: string]: string } = {};
  if (credentials.username.trim().length < 3) {
    errors.username = 'Имя пользователя должно содержать минимум 3 символа';
  }
  if (credentials.password.length < 8) {
    errors.password = 'Пароль должен содержать минимум 8 символов';
  }
  return errors;
};

const validateRegister = (userData: User) => {
  const errors: { [key: string]: string } = {};
  if (userData.firstName.trim().length < 2) {
    errors.firstName = 'Имя должно содержать минимум 2 символа';
  }
  if (userData.lastName.trim().length < 2) {
    errors.lastName = 'Фамилия должна содержать минимум 2 символа';
  }
  if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
    errors.email = 'Неверный формат email';
  }
  if (userData.password.length < 8) {
    errors.password = 'Пароль должен содержать минимум 8 символов';
  }
  if (!/[A-Z]/.test(userData.password)) {
    errors.password = 'Пароль должен содержать хотя бы одну заглавную букву';
  }
  if (!/[a-z]/.test(userData.password)) {
    errors.password = 'Пароль должен содержать хотя бы одну строчную букву';
  }
  if (!/[0-9]/.test(userData.password)) {
    errors.password = 'Пароль должен содержать хотя бы одну цифру';
  }
  if (!/[!@#$%^&*]/.test(userData.password)) {
    errors.password = 'Пароль должен содержать хотя бы один специальный символ';
  }
  if (!/^\+?[0-9]{3}-?[0-9]{6,12}$/.test(userData.phoneNumber)) {
    errors.phoneNumber = 'Неверный формат номера телефона';
  }
  return errors;
};

export const loginUser = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }, { rejectWithValue }) => {
  const errors = validateLogin(credentials);
  if (Object.keys(errors).length > 0) {
    return rejectWithValue(errors);
  }

  const response = await axios.post('/api/users/login', new URLSearchParams(credentials), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: true,
  });
  return response.data;
});

export const registerUser = createAsyncThunk('auth/register', async (userData: User, { rejectWithValue }) => {
  const errors = validateRegister(userData);
  if (Object.keys(errors).length > 0) {
    return rejectWithValue(errors);
  }

  const response = await axios.post('/api/users/register', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await axios.post("/api/logout", {}, { withCredentials: true });
});

export const fetchCurrentUser = createAsyncThunk("auth/user", async () => {
  const response = await axios.get("/api/users/profile");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
    clearLoginError(state) {
      state.error = null;
      state.validationErrors = {};
    },
    clearRegisterError(state) {
      state.error = null;
      state.validationErrors = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.validationErrors = {};
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = 'Неверный логин или пароль';
        state.validationErrors = action.payload || {};
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.validationErrors = {};
        localStorage.setItem("isAuthenticated", JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = 'Ошибка регистрации';
        state.validationErrors = action.payload || {};
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.validationErrors = {};
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem('user');
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, state => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = "Access to user denied";
        localStorage.removeItem("isAuthenticated");
      });
  },
});

export const { logout, clearLoginError, clearRegisterError } = authSlice.actions;
export default authSlice.reducer;

