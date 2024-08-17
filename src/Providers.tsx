import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./redux/store";

const queryClient = new QueryClient();

type ProvidersProps = {
  children: React.ReactNode;
};
const Providers = (props: ProvidersProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{props.children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
