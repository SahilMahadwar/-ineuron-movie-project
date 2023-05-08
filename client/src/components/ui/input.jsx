import { cva } from "class-variance-authority";

const inputStyles = cva(
  "duration-0.15 transition ease-in block w-full rounded-lg border outline-none text-sm p-2.5 appearance-none",
  {
    variants: {
      status: {
        default:
          "border-gray-800 bg-gray-900  focus:ring-brand-500 focus:ring-1",

        success: "border-green-500 bg-gray-900 text-green-500 ",

        error: "border-red-500 bg-gray-900 text-red-500",

        disabled:
          "border-gray-700 bg-gray-700 text-gray-900 cursor-not-allowed",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

const Input = ({
  register = () => {},
  name = "string",
  label,
  config,
  status,
  isError,
  message,
  errorMessage = "something bad happened",
  placeholder = "i am placeholder",
  type = "string",
  rightIcon,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label htmlFor="email" className="mb-2 block text-sm font-medium ">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...register(name, config)}
          {...props}
          disabled={status === "disabled" && true}
          type={type}
          aria-describedby="helper-text-explanation"
          className={inputStyles({ status: isError ? "error" : status })}
          placeholder={placeholder}
        />
        {rightIcon && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightIcon}
          </span>
        )}
      </div>
      {message && !isError && (
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
          {message}
        </p>
      )}

      {isError && (
        <p id="helper-text-explanation" className="mt-2 text-sm text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
