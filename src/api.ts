import type { Transaction, ApiErrorResponse } from "./types";

export const getAllTransactions = async () => {
  const response = await fetch("/api/transactions");
  if (!response.ok) {
    const result: ApiErrorResponse = await response.json();
    throw new Error(result.message);
  }
  const result: Transaction[] = await response.json();
  return result;
};

export const refundAllTransactions = async () => {
  const response = await fetch("/api/transactions/refund-all", {
    method: "PUT",
  });
  if (!response.ok) {
    const result: ApiErrorResponse = await response.json();
    throw new Error(result.message);
  }
};
