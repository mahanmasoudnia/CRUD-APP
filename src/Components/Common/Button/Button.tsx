import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

const SubmitButton = ({
  className,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className={`btn bg-orange uppercase hover:bg-orange_hover active:bg-orange_active text-white text-[1.6rem] content-center p-7 ${className}`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
