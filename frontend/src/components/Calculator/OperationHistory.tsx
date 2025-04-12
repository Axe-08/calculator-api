import React from "react";
import { CalculationHistoryItem } from "../../types/calculator.types";
import styles from "./Calculator.module.css";

interface OperationHistoryProps {
  history: CalculationHistoryItem[];
}

const OperationHistory: React.FC<OperationHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className={styles.history}>
      <h4>History</h4>
      {history.map((item, index) => (
        <div key={index} className={styles.historyItem}>
          <span>{item.expression}</span>
          <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
};

export default OperationHistory;

