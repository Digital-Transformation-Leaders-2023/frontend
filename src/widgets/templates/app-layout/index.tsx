import { FC, PropsWithChildren } from "react";
import { Container, Footer } from "@shared";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main>
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
};
