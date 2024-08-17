import { put, call, takeEvery } from "redux-saga/effects";
import type { SerializedError } from "@reduxjs/toolkit";

import { getAllTransactions, refundAllTransactions } from "../api";
import type { Transaction } from "../types";

function* getAllSaga() {
  try {
    yield put({ type: "transactions/getAll/pending" });
    const result: Transaction[] = yield call(getAllTransactions);
    yield put({ type: "transactions/getAll/fulfilled", payload: result });
  } catch (error) {
    if (error instanceof Error) {
      yield put({
        type: "transactions/getAll/rejected",
        error: { message: error.message } as SerializedError,
      });
    } else {
      yield put({
        type: "transactions/getAll/rejected",
        error: { message: "Something went wrong" } as SerializedError,
      });
    }
  }
}

function* refundAllSaga() {
  try {
    yield put({ type: "transactions/refundAll/pending" });
    yield call(refundAllTransactions);
    yield put({ type: "transactions/refundAll/fulfilled" });
    yield call(getAllSaga);
  } catch (error) {
    if (error instanceof Error) {
      yield put({
        type: "transactions/refundAll/rejected",
        error: { message: error.message } as SerializedError,
      });
    } else {
      yield put({
        type: "transactions/refundAll/rejected",
        error: { message: "Something went wrong" } as SerializedError,
      });
    }
  }
}

export function* transactionsSaga() {
  yield takeEvery("transactions/getAllSaga", getAllSaga);
  yield takeEvery("transactions/refundAllSaga", refundAllSaga);
}
