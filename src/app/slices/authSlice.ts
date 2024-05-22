import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { User, UserRole } from "@app/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  error: string | null
}

// const getUserFromLocalStorage = (): User | null => {
//   try {
//     const userData = localStorage.getItem("user")
//     if (userData && userData !== "undefined") {
//       return JSON.parse(userData) as User
//     }
//   } catch (error) {
//     console.error("Error parsing user from localStorage:", error)
//   }
//   return null
// }

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!localStorage.getItem('isAuthenticated'), //!! или Boolean()
  error: null,
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }) => {
    const response = await axios.post(
      "/api/login",
      new URLSearchParams(credentials),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      },
    )
    return response.data.user
  },
)

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: User) => {
    const response = await axios.post("/api/users/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    return response.data
  },
)

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await axios.post("/api/logout", {}, { withCredentials: true })
})

export const fetchCurrentUser = createAsyncThunk("auth/user", async () => {
  const response = await axios.get("/api/users/profile")
  return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem("user")
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true
        state.error = null
        localStorage.setItem("isAuthenticated", JSON.stringify(true))
      })
      .addCase(loginUser.rejected, state => {
        state.error = "Неверный логин или пароль"
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true
        state.error = null
        // localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, state => {
        state.error = "Ошибка регистрации"
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null
        state.isAuthenticated = false
        state.error = null
        localStorage.removeItem("isAuthenticated")
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload
          state.isAuthenticated = true
          state.error = null
        },
      )
      .addCase(fetchCurrentUser.rejected, state => {
        state.user = null
        state.isAuthenticated = false
        state.error = "Access to user denied"
        localStorage.removeItem("isAuthenticated")
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
