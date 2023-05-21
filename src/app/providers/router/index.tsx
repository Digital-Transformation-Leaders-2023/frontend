import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const RootPageLazy = lazy(() => import("@pages/root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPageLazy />,
  },
]);

export const RouterDOMProvider = () => {
  return (
    <RouterProvider router={router} />
  );
};
