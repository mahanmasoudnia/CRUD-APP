import React, { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }: CardProps) => {
  return (
    <div className={`max-w-sm rounded overflow-hidden shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
