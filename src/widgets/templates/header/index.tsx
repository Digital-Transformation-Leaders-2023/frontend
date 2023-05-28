import { Container } from "@shared";
import { Link, useLocation } from "react-router-dom";
import s from "./Header.module.scss";
import { Button, DropdownMenu, Text, User } from "@gravity-ui/uikit";
import clsx from "clsx";
import { useIsAuthenticated, useUser } from "@entities/user";

export const Header = () => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

  console.log(isAuthenticated, user);

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
                      action: () => console.log("выйти"),
                      theme: "danger",
                      text: "Выйти",
                    },
                  ]} switcher={(
                    <User
                      className={s.user}
                      imgUrl={"https://photo.itmo.su/avatar/ab7389a33ecd63e4bd6c96ddd9551d73c791806f/cover/320/320/"}
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
