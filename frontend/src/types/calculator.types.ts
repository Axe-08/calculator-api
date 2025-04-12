export interface CalculationResult {
  result: number;
  expression?: string;
}

export type OperationType = "add" | "subtract" | "multiply" | "divide";

export interface CalculationHistoryItem {
  expression: string;
  result: number;
  timestamp: Date;
}

