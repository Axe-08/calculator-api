import React from "react";
import Button from "../UI/Button";
import styles from "./Calculator.module.css";

interface KeypadProps {
  onDigitClick: (digit: string) => void;
  onOperatorClick: (operator: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onDecimalClick: () => void;
}

const Keypad: React.FC<KeypadProps> = ({
  onDigitClick,
  onOperatorClick,
  onEqualsClick,
  onClearClick,
  onDecimalClick
}) => {
  return (
    <div className={styles.keypad}>
      <Button onClick={onClearClick} className={styles.clearButton}>C</Button>
      <Button onClick={() => {}} className={styles.operatorButton}>()</Button>
      <Button onClick={() => onOperatorClick("divide")} className={styles.operatorButton}>÷</Button>
      <Button onClick={() => onOperatorClick("multiply")} className={styles.operatorButton}>×</Button>
      
      <Button onClick={() => onDigitClick("7")}>7</Button>
      <Button onClick={() => onDigitClick("8")}>8</Button>
      <Button onClick={() => onDigitClick("9")}>9</Button>
      <Button onClick={() => onOperatorClick("subtract")} className={styles.operatorButton}>-</Button>
      
      <Button onClick={() => onDigitClick("4")}>4</Button>
      <Button onClick={() => onDigitClick("5")}>5</Button>
      <Button onClick={() => onDigitClick("6")}>6</Button>
      <Button onClick={() => onOperatorClick("add")} className={styles.operatorButton}>+</Button>
      
      <Button onClick={() => onDigitClick("1")}>1</Button>
      <Button onClick={() => onDigitClick("2")}>2</Button>
      <Button onClick={() => onDigitClick("3")}>3</Button>
      <Button onClick={onEqualsClick} className={styles.equalsButton}>=</Button>
      
      <Button onClick={() => onDigitClick("0")} className={styles.zeroButton}>0</Button>
      <Button onClick={onDecimalClick}>.</Button>
    </div>
  );
};

export default Keypad;

