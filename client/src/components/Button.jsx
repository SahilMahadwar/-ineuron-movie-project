import { cva } from "class-variance-authority";
import clsx from "clsx";

import Icon from "./Icon";
import Spinner from "./Spinner";

const buttonStyles = cva(
  "duration-0.15 transition ease-in rounded-lg text-center focus:outline-none focus:ring-4 font-medium select-none relative inline-flex items-center",
  {
    variants: {
      intent: {
        primary:
          "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-300",

        secondary:
          "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-gray-200 hover:text-brand-500",
      },
      disabledIntents: {
        primary:
          "bg-brand-500 hover:bg-brand-500  text-white cursor-not-allowed",
        secondary:
          "bg-white text-gray-700 hover:text-gray-700 cursor-not-allowed",
      },
      size: {
        xs: "px-3 py-2 text-xs",
        sm: "px-3 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
        xl: "px-6 py-3.5 text-base",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

const Button = ({
  children = "Button",
  intent = "primary",
  size = "md",
  isLoading,
  isDisabled,
  fullWidth,
  loadingText,
  spinnerPlacement = "left",
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <button
      className={buttonStyles({
        intent,
        disabledIntents: isLoading || isDisabled ? intent : null,
        fullWidth,
        size,
      })}
      {...props}
      disabled={isLoading || isDisabled ? true : false}
    >
      {leftIcon && (
        <span
          className={clsx(
            "mr-2 -ml-0.5",
            isLoading && !loadingText && "invisible",
            isLoading && loadingText && "hidden"
          )}
        >
          <Icon size={size}>{leftIcon}</Icon>
        </span>
      )}

      <span
        className={clsx(
          "w-full font-body",
          isLoading && !loadingText && "invisible",
          isLoading && loadingText && "hidden"
        )}
      >
        {children}
      </span>

      {rightIcon && (
        <span
          className={clsx(
            "-mr-0.5 ml-2",
            isLoading && !loadingText && "invisible",
            isLoading && loadingText && "hidden"
          )}
        >
          <Icon size={size}>{rightIcon}</Icon>
        </span>
      )}

      {spinnerPlacement === "left" && loadingText && isLoading && (
        <span className="mr-2 -ml-0.5 flex flex-col">
          <Spinner color={intent} size={size} />
        </span>
      )}

      {loadingText && isLoading && <p>{loadingText}</p>}
      {spinnerPlacement === "right" && loadingText && isLoading && (
        <span className=" -mr-0.5  ml-2 flex flex-col">
          <Spinner color={intent} size={size} />
        </span>
      )}

      {isLoading && !loadingText && (
        <span className="absolute left-0 bottom-0 top-0  right-0  flex  flex-col items-center justify-center">
          <Spinner color={intent} size={size} />
        </span>
      )}
    </button>
  );
};

export default Button;
