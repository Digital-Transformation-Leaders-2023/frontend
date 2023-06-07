import { Container } from "@shared";
import { Link, useLocation, useNavigate } from "react-router-dom";
import s from "./Header.module.scss";
import { Button, DropdownMenu, Text, User } from "@gravity-ui/uikit";
import clsx from "clsx";
import { useIsAuthenticated, userActions, useUser } from "@entities/user";
import { useCallback } from "react";
import Cookies from "js-cookie";
import { useAppDispatch, useTheme } from "@app/providers";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();

  const dispatch = useAppDispatch();
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

  const handleLogout = useCallback(() => {
    dispatch(userActions.logout());
    Cookies.remove("access_token");
    navigate("/auth/login");
  }, [user, isAuthenticated]);

  return (
    <header className={s.header}>
      <Container>
        <nav className={s.header__nav}>
          <ul>
            <li className={clsx(
              s.header__nav_item,
              location.pathname === "/" && s.header__nav_active,
            )}>
              <Link to={"/"}>
                <Text as={"h6"} variant={"body-3"}>
                  Главная
                </Text>
              </Link>
            </li>
            <li className={clsx(
              s.header__nav_item,
              location.pathname.includes("reports") && s.header__nav_active,
            )}>
              <Link to={"/reports"}>
                <Text as={"h6"} variant={"body-3"}>
                  Отчеты
                </Text>
              </Link>
            </li>
          </ul>

          <>
            {
              !isAuthenticated && (
                <Link to={"/auth/login"}>
                  <Button view={"flat"}>
                    Войти в аккаунт
                  </Button>
                </Link>
              )
            }
          </>

          <>
            {
              isAuthenticated && (
                <>
                  <DropdownMenu size={"l"} items={[
                    {
                      action: () => setTheme(theme === "light" ? "dark" : "light"),
                      text: "Сменить тему",
                    },
                    {
                      action: handleLogout,
                      theme: "danger",
                      text: "Выйти",
                    },
                  ]} switcher={(
                    <User
                      className={s.user}
                      description={user?.email ?? ""}
                      imgUrl={user?.pic ?? ""}
                      name={user?.username ?? ""}
                      size="l"
                    />
                  )} />
                </>
              )
            }
          </>
        </nav>
      </Container>
    </header>
  );
};
