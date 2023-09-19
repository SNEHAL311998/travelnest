"use client";

import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  const [showPassword, setPasswordVisibility] = useState(false);

  const handleToggle = () => {
    setPasswordVisibility(!showPassword);
  };
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <>
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={`
              peer
              w-full
              p-4
              pt-6 
              font-light 
              bg-red 
              border-2
              rounded-md
              outline-none
              transition
              disabled:opacity-70
              disabled:cursor-not-allowed
              ${formatPrice ? "pl-9" : "pl-4"}
              ${errors[id] ? "border-rose-500" : "border-neutral-300"}
              ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
              ${type === "password" && "relative"}
            `}
        />
        {type === "password" && (
          <span
            className="absolute top-6 right-7 cursor-pointer"
            onClick={handleToggle}
          >
            {showPassword ? (
              <AiOutlineEye size={24} style={{ opacity: 0.3 }} />
              ) : (
              <AiOutlineEyeInvisible size={24} style={{ opacity: 0.3 }} />
            )}
          </span>
        )}
      </>
      <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
