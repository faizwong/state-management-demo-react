import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllTransactions, refundAllTransactions } from "../../api";
import TransactionList from "../../components/TransactionList";

const TanstackPage = () => {
  const queryClient = useQueryClient();

  const {
    data,
    status: dataStatus,
    error: dataErrorObject,
    fetchStatus,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
    retry: false,
  });
  const dataError = dataErrorObject ? dataErrorObject.message : "";

  const {
    status: mutationStatus,
    error: mutationErrorObject,
    mutate,
  } = useMutation({
    mutationFn: refundAllTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  const mutationError = mutationErrorObject ? mutationErrorObject.message : "";

  const handleMutate = () => {
    mutate();
  };

  return (
    <TransactionList
      title="TanStack"
      subtitle="This example uses TanStack Query"
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

export default TanstackPage;
