export type Transaction = {
  id: string;
  merchantName: string;
  amount: number;
  currency: string;
  created: string;
  state: TransactionStatus;
};
export type TransactionStatus = "CONFIRMED" | "QR_CODE_GENERATED" | "REFUNDED";

export type ApiErrorResponse = {
  message: string;
};

export type DataStatus = "pending" | "error" | "success";
export type FetchStatus = "fetching" | "idle" | "paused";
export type MutationStatus = "idle" | "pending" | "error" | "success";
