/**
 * Formats a number for display in the calculator
 */
export const formatNumber = (num: number): string => {
    // Handle very large or small numbers to avoid scientific notation
    if (Math.abs(num) < 0.000001 && num !== 0) {
      return num.toExponential(6);
    }
    
    // For "normal" numbers, limit decimal places but don't add trailing zeros
    const maxLength = 10;
    let formatted = num.toString();
    
    if (formatted.length > maxLength) {
      formatted = parseFloat(num.toPrecision(maxLength)).toString();
    }
    
    return formatted;
  };
  
  /**
   * Formats a calculation expression for history display
   */
  export const formatExpression = (
    a: number, 
    b: number, 
    operator: string, 
    result: number
  ): string => {
    let symbol;
    switch (operator) {
      case "add": symbol = "+"; break;
      case "subtract": symbol = "-"; break;
      case "multiply": symbol = "×"; break;
      case "divide": symbol = "÷"; break;
      default: symbol = operator;
    }
    
    return `${a} ${symbol} ${b} = ${result}`;
  };