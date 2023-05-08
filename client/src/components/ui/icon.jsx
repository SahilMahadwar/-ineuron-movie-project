import { cva } from "class-variance-authority";

import { IconContext } from "react-icons";
import { HiOutlineDownload } from "react-icons/hi";

const iconStyles = {
  variants: {
    size: {
      xs: "12px",
      sm: "16px",
      md: "16px",
      lg: "20px",
      xl: "20px",
    },
  },
  defaultVariants: {
    size: "md",
  },
};

export function Icon({
  children = <HiOutlineDownload />,
  color,
  size = "20px",
  className,
  ...rest
}) {
  return (
    <span className={className}>
      <IconContext.Provider
        value={{
          color: color,
          size:
            size === "xs"
              ? "1rem"
              : size === "sm"
              ? "1rem"
              : size === "md"
              ? "1.25rem"
              : size === "lg"
              ? "1.25rem"
              : size === "xl"
              ? "1.50rem"
              : size,
        }}
        {...rest}
      >
        {children}
      </IconContext.Provider>
    </span>
  );
}

export default Icon;
