import { Container } from "@shared";
import s from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <p>Footer</p>
      </Container>
    </footer>
  );
};
