import { FC } from "react";
import { Button } from "@gravity-ui/uikit";
import s from "./Pagination.module.scss";

type PaginationProps = {
  total: number;
  current: number;
  onChange?: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { total, current, onChange } = props;

  return (
    <div className={s.pagination}>
      {
        Array.from({ length: total }, (_, i) => i + 1).map((page) => {
          const isActive = page === current;

          return (
            <Button
              key={page}
              size={"l"}
              view={isActive ? "action" : "flat"}
              onClick={() => onChange && onChange(page)}
            >
              {page}
            </Button>
          );
        })
      }
    </div>
  );
};
