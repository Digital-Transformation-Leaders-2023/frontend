import { FC, PropsWithChildren } from "react";
import { Container, Footer } from "@shared";
import { Header } from "@widgets";
import s from "./styles.module.scss";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={s.layout}>
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
};
