import { cva } from "class-variance-authority";

const selectStyles = cva();

const defaultOptions = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
];

const Select = ({
  register,
  name = "string",
  label,
  message,
  options = defaultOptions,
  ...rest
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <select
        {...register(name)}
        {...rest}
        id="countries"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-4 text-sm text-gray-900 focus:border-brand-500 focus:ring-brand-500"
        defaultValue="CA"
      >
        {options.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {message && (
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
          Write a 60 character course title.
        </p>
      )}
    </div>
  );
};

export default Select;
