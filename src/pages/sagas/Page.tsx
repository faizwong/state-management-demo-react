import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectData,
  selectDataStatus,
  selectFetchStatus,
  selectDataError,
  selectMutationStatus,
  selectMutationError,
} from "../../redux/slice";
import TransactionList from "../../components/TransactionList";

const SagasPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const dataStatus = useAppSelector(selectDataStatus);
  const fetchStatus = useAppSelector(selectFetchStatus);
  const dataError = useAppSelector(selectDataError);
  const mutationStatus = useAppSelector(selectMutationStatus);
  const mutationError = useAppSelector(selectMutationError);

  useEffect(() => {
    dispatch({ type: "transactions/getAllSaga" });
  }, [dispatch]);

  const handleMutate = () => {
    dispatch({ type: "transactions/refundAllSaga" });
  };

  return (
    <TransactionList
      title="Sagas"
      subtitle="This example uses Redux Sagas"
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

export default SagasPage;
