import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import { ThemeProvider } from "./context/theme-provider.tsx";
import HomeDashboard from "./pages/HomeDashboard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner";
import ErrorPage from "./pages/ErrorPage.tsx";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<HomeDashboard />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
