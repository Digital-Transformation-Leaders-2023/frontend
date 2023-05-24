import { FC, PropsWithChildren } from "react";
import s from "./Tab.module.scss";

export const Tab: FC<PropsWithChildren> = ({ children }) => {
  return <section className={s.tab}>{children}</section>;
};
