import React from "react";
import styled, { css } from "styled-components";

import type {
  Transaction,
  TransactionStatus,
  DataStatus,
  FetchStatus,
  MutationStatus,
} from "../types";

type TransactionListProps = {
  title: string;
  subtitle: string;
  data: Transaction[] | undefined;
  dataStatus: DataStatus;
  fetchStatus: FetchStatus;
  dataError: string;
  mutationStatus: MutationStatus;
  mutationError: string;
  handleMutate: () => void;
};
const TransactionList = (props: TransactionListProps) => {
  const {
    title,
    subtitle,
    data,
    dataStatus,
    fetchStatus,
    dataError,
    mutationStatus,
    mutationError,
    handleMutate,
  } = props;

  return (
    <Container>
      <Heading>
        <div>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
      </Heading>

      {dataStatus === "pending" && <p>Loading...</p>}
      {dataStatus === "error" && (
        <ErrorMessage>Error: {dataError}</ErrorMessage>
      )}
      {dataStatus === "success" && data && data.length > 0 && (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.merchantName}</td>
                  <td>
                    {transaction.amount} {transaction.currency}
                  </td>
                  <td>
                    <StatusBadge status={transaction.state} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <DataFetchingIndicatorContainer>
            {fetchStatus === "fetching" ? (
              <p>Fetching latest data...</p>
            ) : (
              <></>
            )}
          </DataFetchingIndicatorContainer>

          <div>
            <Button
              type="button"
              onClick={handleMutate}
              disabled={mutationStatus === "pending"}
              data-testid="refund-button"
            >
              {mutationStatus === "pending" ? "Refunding..." : "Refund all"}
            </Button>
          </div>
          {mutationStatus === "error" && mutationError && (
            <ErrorMessage>Error: {mutationError}</ErrorMessage>
          )}
        </div>
      )}
    </Container>
  );
};

export default TransactionList;

const Container = styled.div`
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const Heading = styled.div`
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: rgb(31 41 55);
  padding-bottom: 0.25rem;
`;

const Subtitle = styled.p`
  color: rgb(107 114 128);
`;

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(220 38 38);
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`;

const Button = styled.button<{ $loading?: boolean }>`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background-color: rgb(185 28 28);
  color: rgb(255 255 255);
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;

  &:hover {
    background-color: rgb(153 27 27);
  }

  &:disabled {
    opacity: 0.65;
    pointer-events: none;
  }
`;

const Table = styled.table`
  width: 100%;
  color: rgb(31 41 55);

  tbody tr {
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: rgb(209 213 219);
  }

  th {
    text-align: left;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-weight: 600;
  }

  td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    width: 33.33%;
  }
`;

const DataFetchingIndicatorContainer = styled.div`
  height: 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.875rem;
`;

const Badge = styled.span<{ $variant?: "success" | "warning" | "danger" }>`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  background-color: rgb(243 244 246);
  color: rgb(31 41 55);

  ${(props) => {
    switch (props.$variant) {
      case "success":
        return css`
          background-color: rgb(220 252 231);
          color: rgb(22 101 52);
        `;
      case "warning":
        return css`
          background-color: rgb(254 243 199);
          color: rgb(146 64 14);
        `;
      case "danger":
        return css`
          background-color: rgb(254 226 226);
          color: rgb(153 27 27);
        `;
    }
  }}
`;

const StatusBadge = (props: { status: TransactionStatus }) => {
  const { status } = props;

  if (status === "CONFIRMED") {
    return (
      <Badge $variant="success" data-testid="transaction-status-badge">
        Confirmed
      </Badge>
    );
  }

  if (status === "QR_CODE_GENERATED") {
    return (
      <Badge $variant="warning" data-testid="transaction-status-badge">
        QR Code Generated
      </Badge>
    );
  }

  if (status === "REFUNDED") {
    return (
      <Badge $variant="danger" data-testid="transaction-status-badge">
        Refunded
      </Badge>
    );
  }

  return <></>; // unreachable
};
