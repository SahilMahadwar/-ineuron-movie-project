import { cva } from "class-variance-authority";

const inputStyles = cva(
  "duration-0.15 transition ease-in block w-full rounded-lg border outline-none text-sm p-2.5",
  {
    variants: {
      status: {
        default:
          "border-gray-800 bg-gray-900  focus:ring-brand-500 focus:ring-1",

        success: "border-green-500 bg-gray-50 text-green-500 ",

        error: "border-red-500 bg-gray-50 text-red-500",

        disabled: "border-gray-300 bg-gray-50 text-gray-900 cursor-not-allowed",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

const TextArea = ({
  register = () => {},
  name = "string",
  label,
  config,
  status,
  isError,
  message,
  errorMessage = "something bad happened",
  placeholder = "i am placeholder",
  rows = 3,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label htmlFor="email" className="mb-2 block text-sm font-medium ">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        {...register(name, config)}
        {...props}
        disabled={status === "disabled" && true}
        type="string"
        aria-describedby="helper-text-explanation"
        className={inputStyles({ status: isError ? "error" : status })}
        placeholder={placeholder}
      />

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

export default TextArea;
