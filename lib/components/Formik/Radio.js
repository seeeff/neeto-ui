import React from "react";
import classnames from "classnames";
import { Field } from "formik";

const RadioGroup = ({
  label,
  name,
  options,
  className,
  childrenClassName,
  stacked,
  ...rest
}) => {
  const singleChild = options.length == 1;
  const margin = singleChild ? null : stacked ? "mb-2" : "mr-4";
  return (
    <div
      className={classnames([
        "flex flex-col items-start justify-start",
        className
      ])}
    >
      {label && (
        <h4 className="mb-2 text-sm font-medium leading-5 text-gray-800">
          {label}
        </h4>
      )}
      <div
        className={classnames(["flex justify-start"], {
          "flex-row": !stacked,
          "flex-col": stacked
        })}
      >
        <Field name={name}>
          {({ field }) => {
            return options.map(option => {
              return (
                <div
                  key={option.id || option.value}
                  className={classnames([
                    "flex flex-row items-center justify-start cursor-pointer",
                    childrenClassName,
                    margin
                  ])}
                >
                  <input
                    className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
                    type="radio"
                    id={option.id || option.value}
                    {...field}
                    {...rest}
                    value={option.value}
                    checked={field.value + "" === option.value + ""}
                  />
                  {option.label && (
                    <label
                      htmlFor={option.id || option.value}
                      className="mb-0 ml-3 cursor-pointer"
                    >
                      <span className="block text-sm font-medium leading-5 text-gray-600">
                        {option.label}
                      </span>
                    </label>
                  )}
                </div>
              );
            });
          }}
        </Field>
      </div>
    </div>
  );
};

export default RadioGroup;