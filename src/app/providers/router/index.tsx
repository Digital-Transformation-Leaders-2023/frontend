import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { FC, lazy } from "react";
import { ProtectedRoute } from "@app/providers/router/protected-route";

const RootPageLazy = lazy(() => import("@pages/root"));
const ReportsPageLazy = lazy(() => import("@pages/reports"));
const ReportPageLazy = lazy(() => import("@pages/reports/[id]"));
const Page404Lazy = lazy(() => import("@pages/404"));
const PageAuthLoginLazy = lazy(() => import("@pages/auth/login"));
const PageAuthSignupLazy = lazy(() => import("@pages/auth/signup"));

const WrappedRoute: FC = () => (
  <ProtectedRoute>
    <Outlet />
  </ProtectedRoute>
);

const router = createHashRouter([
  {
    element: <WrappedRoute />,
    children: [
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
    ],
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
