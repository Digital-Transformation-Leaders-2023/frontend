import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@app/providers";
import { useIsAuthenticated, userActions } from "@entities/user";
import { FC, PropsWithChildren, useEffect } from "react";
import Cookies from "js-cookie";
import { api } from "@shared";
import { faker } from "@faker-js/faker/locale/ru";

export const ProtectedRoute: FC<PropsWithChildren> = () => {
  const navigate = useNavigate();

  const isAuthenticated = useIsAuthenticated();
  const dispatch = useAppDispatch();
  const accessToken = Cookies.get("access_token");

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    if (!accessToken) {
      navigate("/auth/login");
      return;
    }

    (async () => {
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        const { data: user } = await api.get("me");

        dispatch(userActions.setUser({
          ...user,
          pic: faker.image.avatar(),
        }));
        navigate("/");
      } catch (e) {
        Cookies.remove("access_token");
        api.defaults.headers.common["Authorization"] = null;
        navigate("/auth/login");
      }
    })();
  }, [dispatch, isAuthenticated, accessToken, navigate]);

  return <Outlet />;
};
