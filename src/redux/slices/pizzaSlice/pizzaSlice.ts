import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6404d49ceed195a99f76e7a3.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const pizzaSelect = (state: RootState) => state.pizzaReducer;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
