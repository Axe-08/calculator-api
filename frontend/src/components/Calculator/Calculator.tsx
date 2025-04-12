import React, { useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import OperationHistory from "./OperationHistory";
import { calculatorService } from "../../services/calculatorService";
import { CalculationHistoryItem } from "../../types/calculator.types";
import styles from "./Calculator.module.css";

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);

  const resetCalculator = () => {
    setDisplay("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const handleDecimalPoint = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = async (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setWaitingForSecondOperand(true);
      setOperator(nextOperator);
      return;
    }

    if (operator && !waitingForSecondOperand) {
      try {
        const result = await performCalculation();
        setDisplay(result.toString());
        setFirstOperand(parseFloat(result.toString()));
        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
      } catch (error) {
        setDisplay("Error");
        setFirstOperand(null);
        setWaitingForSecondOperand(false);
        setOperator(null);
      }
    } else {
      setOperator(nextOperator);
      setWaitingForSecondOperand(true);
    }
  };

  const performCalculation = async () => {
    if (firstOperand === null || operator === null) {
      return display;
    }

    const secondOperand = parseFloat(display);
    let result;

    try {
      const response = await calculatorService.calculate(
        firstOperand,
        secondOperand,
        operator
      );
      result = response.result;

      // Add to history
      const expression = `${firstOperand} ${getOperatorSymbol(operator)} ${secondOperand} = ${result}`;
      const historyItem: CalculationHistoryItem = {
        expression,
        result,
        timestamp: new Date()
      };
      setHistory([historyItem, ...history].slice(0, 10));

      return result;
    } catch (error) {
      console.error("Calculation error:", error);
      throw new Error("Calculation failed");
    }
  };

  const getOperatorSymbol = (op: string): string => {
    switch (op) {
      case "add": return "+";
      case "subtract": return "-";
      case "multiply": return "×";
      case "divide": return "÷";
      default: return op;
    }
  };

  const handleEquals = async () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    try {
      const result = await performCalculation();
      setDisplay(result.toString());
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    } catch (error) {
      setDisplay("Error");
      resetCalculator();
    }
  };

  const handleClear = () => {
    resetCalculator();
  };

  return (
    <div className={styles.calculator}>
      <Display value={display} />
      <Keypad
        onDigitClick={handleDigit}
        onOperatorClick={handleOperator}
        onEqualsClick={handleEquals}
        onClearClick={handleClear}
        onDecimalClick={handleDecimalPoint}
      />
      <OperationHistory history={history} />
    </div>
  );
};

export default Calculator;

