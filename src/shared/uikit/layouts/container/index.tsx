import { FC, HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";
import s from "./Container.module.scss";

export const Container: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={clsx(s.container, className)}>
      {children}
    </div>
  );
};
