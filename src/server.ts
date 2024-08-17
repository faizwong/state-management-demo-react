import { createServer, Response } from "miragejs";
import type { Transaction, ApiErrorResponse } from "./types";

export const seedTransactions: Transaction[] = [
  {
    id: "1",
    merchantName: "Quantum Innovations",
    amount: 120,
    currency: "EUR",
    created: "2019-11-10T03:03:12.383Z",
    state: "CONFIRMED",
  },
  {
    id: "2",
    merchantName: "Apex Solutions Group",
    amount: 170,
    currency: "EUR",
    created: "2019-11-10T03:03:12.383Z",
    state: "QR_CODE_GENERATED",
  },
  {
    id: "3",
    merchantName: "Stellar Dynamics",
    amount: 130,
    currency: "JPY",
    created: "2019-11-10T03:03:12.383Z",
    state: "CONFIRMED",
  },
  {
    id: "4",
    merchantName: "Horizon Ventures",
    amount: 60,
    currency: "USD",
    created: "2019-11-10T03:03:12.383Z",
    state: "CONFIRMED",
  },
  {
    id: "5",
    merchantName: "BlueWave Technologies",
    amount: 470,
    currency: "USD",
    created: "2019-11-10T03:03:12.383Z",
    state: "CONFIRMED",
  },
];

const genericErrorResponse: ApiErrorResponse = {
  message: "Internal server error",
};

export default function makeServer(args: { environment: string }) {
  const { environment = "development" } = args;
  return createServer({
    environment,

    seeds(server) {
      server.db.loadData({
        transactions: seedTransactions,
      });
    },

    routes() {
      this.namespace = "api";
      this.timing = 500;

      this.get("/transactions", (schema) => {
        // About 5% chance will fail
        if (environment === "development" && Math.random() > 0.95) {
          return new Response(500, {}, genericErrorResponse);
        }

        return schema.db.transactions ? schema.db.transactions : [];
      });

      this.put("/transactions/refund-all", (schema) => {
        // About 10% chance will fail
        if (environment === "development" && Math.random() > 0.9) {
          return new Response(500, {}, genericErrorResponse);
        }

        try {
          schema.db.transactions.update({ state: "REFUNDED" });
          return { success: true };
        } catch (error) {
          return new Response(500, {}, genericErrorResponse);
        }
      });
    },
  });
}
