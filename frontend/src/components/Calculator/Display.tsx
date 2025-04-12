import React from "react";
import styles from "./Calculator.module.css";

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return <div className={styles.display}>{value}</div>;
};

export default Display;

