import { Container } from "@shared";
import { Link, useLocation } from "react-router-dom";
import s from "./Header.module.scss";
import { DropdownMenu, Text, User } from "@gravity-ui/uikit";
import clsx from "clsx";

export const Header = () => {
  const location = useLocation();

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
              location.pathname === "/reports" && s.header__nav_active,
            )}>
              <Link to={"/reports"}>
                <Text as={"h6"} variant={"body-3"}>
                  Отчеты
                </Text>
              </Link>
            </li>
          </ul>
          <DropdownMenu size={"l"} items={[
            {
              action: () => console.log("выйти"),
              theme: "danger",
              text: "Выйти",
            },
          ]} switcher={(
            <User
              className={s.user}
              description="mayatin@itmo.ru"
              imgUrl={"https://photo.itmo.su/avatar/ab7389a33ecd63e4bd6c96ddd9551d73c791806f/cover/320/320/"}
              name="Александр Маятин"
              size="l"
            />
          )} />
        </nav>
      </Container>
    </header>
  );
};
