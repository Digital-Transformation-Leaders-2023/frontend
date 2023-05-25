import { Container, GithubIcon } from "@shared";
import s from "./Footer.module.scss";
import { Text } from "@gravity-ui/uikit";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container className={s.footer__container}>
        <Link className={s.link} target={"_blank"} to={"https://github.com/orgs/Digital-Transformation-Leaders-2023/repositories"}>
          <GithubIcon className={s.icon} />
        </Link>
        <Text variant={"body-short"}>Made with love in 2023 // IS team</Text>
      </Container>
    </footer>
  );
};
