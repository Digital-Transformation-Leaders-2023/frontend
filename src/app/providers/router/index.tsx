import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const RootPageLazy = lazy(() => import("@pages/root"));
const ReportPageLazy = lazy(() => import("@pages/reports/[id]"));
const Page404Lazy = lazy(() => import("@pages/404"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPageLazy />,
  },
  {
    path: "/reports/:id",
    element: <ReportPageLazy />,
  },
  {
    path: "*",
    element: <Page404Lazy />,
  },
]);

export const RouterDOMProvider = () => {
  return (
    <RouterProvider router={router} />
  );
};
