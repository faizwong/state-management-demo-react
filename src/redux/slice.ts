import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getAllTransactions, refundAllTransactions } from "../api";
import type {
  Transaction,
  DataStatus,
  FetchStatus,
  MutationStatus,
} from "../types";
import type { RootState } from "./store";

type TransactionsState = {
  data: Transaction[] | undefined;
  dataStatus: DataStatus;
  fetchStatus: FetchStatus;
  dataError: string;
  mutationStatus: MutationStatus;
  mutationError: string;
};

const initialState: TransactionsState = {
  data: undefined,
  dataStatus: "pending",
  fetchStatus: "idle",
  dataError: "",
  mutationStatus: "idle",
  mutationError: "",
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.fetchStatus = "fetching";
      })
      .addCase(
        getAll.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.data = action.payload;
          state.dataStatus = "success";
          state.fetchStatus = "idle";
        }
      )
      .addCase(getAll.rejected, (state, action) => {
        state.dataError = action.error.message
          ? action.error.message
          : "Something went wrong";
        state.dataStatus = "error";
        state.fetchStatus = "idle";
        state.data = undefined;
      })
      .addCase(refundAll.pending, (state) => {
        state.mutationError = "";
        state.mutationStatus = "pending";
      })
      .addCase(refundAll.fulfilled, (state) => {
        state.mutationError = "";
        state.mutationStatus = "success";
      })
      .addCase(refundAll.rejected, (state, action) => {
        state.mutationError = action.error.message
          ? action.error.message
          : "Something went wrong";
        state.mutationStatus = "error";
      });
  },
});

export const getAll = createAsyncThunk("transactions/getAll", async () => {
  const result = await getAllTransactions();
  return result;
});

export const refundAll = createAsyncThunk(
  "transactions/refundAll",
  async (_, thunkApi) => {
    await refundAllTransactions();
    thunkApi.dispatch(getAll());
  }
);

export const selectData = (state: RootState) => state.transactions.data;
export const selectDataStatus = (state: RootState) =>
  state.transactions.dataStatus;
export const selectFetchStatus = (state: RootState) =>
  state.transactions.fetchStatus;
export const selectDataError = (state: RootState) =>
  state.transactions.dataError;
export const selectMutationStatus = (state: RootState) =>
  state.transactions.mutationStatus;
export const selectMutationError = (state: RootState) =>
  state.transactions.mutationError;

export default transactionsSlice.reducer;
