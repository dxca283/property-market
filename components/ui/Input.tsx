import clsx from "clsx";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  as?: "input" | "textarea";
  value: string;
  onchange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = ({
  label,
  name,
  as = "input",
  value,
  id,
  error,
  className,
  onchange,
  ...props
}: InputProps | TextAreaProps) => {
  const hasValue = value !== "";
  const inputId = id ?? name;
  const shareClasses = clsx(
    `
            peer w-full text-gray-600 border bg-white focus:border-2 px-4 text-sm outline-none transition disabled: opacity-70
        `,
    error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-400 focus:border-black",
    as === "textarea"
      ? "min-h-[120px] pt-6 pb-3 resize-none rounded-xl"
      : "h-14 pt-6 rounded-xl",
    className,
  );
  return (
    <div className="w-full">
      <div className="relative">
        {as === "textarea" ? (
          <textarea
            name={name}
            id={inputId}
            value={value}
            placeholder=" "
            className={shareClasses}
            onChange={onchange}
          />
        ) : (
          <input
            type="text"
            name={name}
            id={inputId}
            value={value}
            placeholder=" "
            className={shareClasses}
            onChange={onchange}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        <label htmlFor={inputId} className={clsx(`
                absolute left-4 top-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left
            `, hasValue ? "scale-75 -translate-y-3 text-gray-700 " : "peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-gray-700")}>
                {label}
        </label>
      </div>
      {error && <p className="text-xs font-medium text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Input;
