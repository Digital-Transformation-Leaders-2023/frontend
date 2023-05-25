import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const RootPageLazy = lazy(() => import("@pages/root"));
const ReportsPageLazy = lazy(() => import("@pages/reports"));
const ReportPageLazy = lazy(() => import("@pages/reports/[id]"));
const Page404Lazy = lazy(() => import("@pages/404"));
const PageAuthLoginLazy = lazy(() => import("@pages/auth/login"));
const PageAuthSignupLazy = lazy(() => import("@pages/auth/signup"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPageLazy />,
  },
  {
    path: "/reports",
    element: <ReportsPageLazy />,
  },
  {
    path: "/reports/:id",
    element: <ReportPageLazy />,
  },
  {
    path: "/auth/login",
    element: <PageAuthLoginLazy />,
  },
  {
    path: "/auth/signup",
    element: <PageAuthSignupLazy />,
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
