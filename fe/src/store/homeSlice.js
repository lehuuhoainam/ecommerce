/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "common/api"
import axios from "common/axios"

const initialState = {
  user: null,
  cart: null,
}

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    addToCart: (state, action) => {
      state.cart = action.payload
    },
    setCart: (state, action) => {
      state.cart = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.user = action.payload
    })
  },
})

// thunk
export const loginThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API.user, {
        params: {
          username,
          password,
        },
      })
      return response.data
    } catch (error) {
      return rejectWithValue({ status: error.response.status })
    }
  }
)

// Action creators are generated for each case reducer function
export const { setUser, addToCart, setCart } = homeSlice.actions

export default homeSlice.reducer
