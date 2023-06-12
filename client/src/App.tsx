import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { MainLayout } from "./components/Layouts/Main";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <MainLayout />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
