import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getAll,
  refundAll,
  selectData,
  selectDataStatus,
  selectFetchStatus,
  selectDataError,
  selectMutationStatus,
  selectMutationError,
} from "../../redux/slice";
import TransactionList from "../../components/TransactionList";

const ThunksPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const dataStatus = useAppSelector(selectDataStatus);
  const fetchStatus = useAppSelector(selectFetchStatus);
  const dataError = useAppSelector(selectDataError);
  const mutationStatus = useAppSelector(selectMutationStatus);
  const mutationError = useAppSelector(selectMutationError);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const handleMutate = () => {
    dispatch(refundAll());
  };

  return (
    <TransactionList
      title="Thunks"
      subtitle="This example uses Redux Thunks"
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

export default ThunksPage;
