import { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import { FetchOld } from "./Pages/FetchOld";
import { FetchRQ } from "./Pages/FetchRQ";
import { MainLayout } from "./components/Layout/MainLayout";
import './App.css';
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createBrowserRouter([
  {
    path : "/",
    element : <MainLayout/>,
    children : [
      {
        path : "/home",
        element : <Home/>
      },
      {
        path : "/trad",
        element : <FetchOld/>
      },
      {
        path : "/rq",
        element : <FetchRQ/>
      }
    ]
  }
])

const App = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>);
}

export default App;