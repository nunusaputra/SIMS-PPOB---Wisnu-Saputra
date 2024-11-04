import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url = import.meta.env.VITE_API_URL;

export const regisAction = createAsyncThunk(
  "auth/regis",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/registration`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        data
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Menyimpan token ke sessionStorage jika login berhasil
      if (response.data.status === 0) {
        sessionStorage.setItem("token", response.data.data.token);
      }

      // Mendekode token untuk mendapatkan email
      const decode = jwtDecode(response.data.data.token);
      return {
        email: decode.email,
        token: sessionStorage.getItem("token"),
      };
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
