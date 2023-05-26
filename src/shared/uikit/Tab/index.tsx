import { FC, HTMLAttributes, PropsWithChildren } from "react";
import s from "./Tab.module.scss";
import clsx from "clsx";

export const Tab: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className,
  ...rest
}) => {
  return <section {...rest} className={clsx(s.tab, className)}>{children}</section>;
};
