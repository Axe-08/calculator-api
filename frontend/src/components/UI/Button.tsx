import React from "react";
import styles from "../Calculator/Calculator.module.css";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button 
      className={`${styles.button} ${className || ""}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

