import React, { useState, useEffect } from "react";

import type {
  Transaction,
  DataStatus,
  FetchStatus,
  MutationStatus,
} from "../../types";
import { getAllTransactions, refundAllTransactions } from "../../api";
import TransactionList from "../../components/TransactionList";

const VanillaPage = () => {
  const [data, setData] = useState<Transaction[] | undefined>(undefined);
  const [dataError, setDataError] = useState("");
  const [dataStatus, setDataStatus] = useState<DataStatus>("pending");
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("fetching");
  const [mutationStatus, setMutationStatus] = useState<MutationStatus>("idle");
  const [mutationError, setMutationError] = useState("");

  const getData = async () => {
    try {
      setFetchStatus("fetching");
      const result = await getAllTransactions();
      setData(result);
      setDataStatus("success");
    } catch (error) {
      if (error instanceof Error) {
        setDataError(error.message);
      } else {
        setDataError("Something went wrong");
      }

      setData(undefined);
      setDataStatus("error");
    } finally {
      setFetchStatus("idle");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMutate = async () => {
    try {
      setMutationStatus("pending");
      await refundAllTransactions();
      setMutationStatus("success");
    } catch (error) {
      if (error instanceof Error) {
        setMutationError(error.message);
      } else {
        setMutationError("Something went wrong");
      }
      setMutationStatus("error");
      return;
    }

    await getData();
  };

  return (
    <TransactionList
      title="Vanilla"
      subtitle="This example uses plain React hooks"
      data={data}
      dataStatus={dataStatus}
      fetchStatus={fetchStatus}
      dataError={dataError}
      mutationStatus={mutationStatus}
      mutationError={mutationError}
      handleMutate={handleMutate}
    />
  );
};

export default VanillaPage;
