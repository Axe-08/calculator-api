import React, { useState, useEffect, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { CalculatorService } from '../services/CalculatorService';
import '../styles/Calculator.css';

// Keyboard key mapping
interface KeyMapping {
  [key: string]: string;
}

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [currentExpression, setCurrentExpression] = useState<string>('');
  const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<string | null>(null);
  
  // Map keyboard keys to calculator actions
  const keyMapping: KeyMapping = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '.': '.',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    'Enter': '=',
    '=': '=',
    'Backspace': 'backspace',
    'Delete': 'clear',
    'Escape': 'clear',
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      
      // If the key is mapped, prevent default behavior (like page scrolling)
      if (keyMapping[key]) {
        event.preventDefault();
        
        switch (key) {
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            handleDigit(key);
            break;
          case '.':
            handleDecimalPoint();
            break;
          case '+':
          case '-':
          case '*':
          case '/':
            handleOperator(key);
            break;
          case 'Enter':
          case '=':
            handleEquals();
            break;
          case 'Backspace':
            handleBackspace();
            break;
          case 'Delete':
          case 'Escape':
            handleClear();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, currentExpression, shouldResetDisplay, isCalculating]); // Re-add event listener when state changes

  // Clear all calculator state
  const handleClear = () => {
    setDisplay('0');
    setCurrentExpression('');
    setShouldResetDisplay(false);
    setError(null);
    setLastResult(null);
  };

  // Update display and expression with digit
  const handleDigit = (digit: string) => {
    setError(null);
    
    if (shouldResetDisplay) {
      setDisplay(digit);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  // Handle decimal point
  const handleDecimalPoint = () => {
    setError(null);
    
    if (shouldResetDisplay) {
      setDisplay('0.');
      setShouldResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Append current display value to expression and add operator
  const handleOperator = (operator: string) => {
    setError(null);
    
    // Use the last result as the starting point if available
    const expressionBase = lastResult ? lastResult : currentExpression;
    
    // If we're starting a new calculation or continuing from a result
    if (expressionBase === '' || shouldResetDisplay) {
      setCurrentExpression(display + ' ' + operator + ' ');
    } else {
      // Append to existing expression
      setCurrentExpression(expressionBase + display + ' ' + operator + ' ');
    }
    
    setShouldResetDisplay(true);
    setLastResult(null);
  };

  // Evaluate the full expression
  const evaluateExpression = async () => {
    if (isCalculating) return;
    
    setIsCalculating(true);
    setError(null);
    
    try {
      // Construct the complete expression
      let expression = currentExpression + display;
      
      // Trim any trailing operators
      expression = expression.trim().replace(/[+\-*/]\s*$/, '');
      
      if (!expression) {
        // If expression is empty, just use the current display
        expression = display;
      }
      
      const result = await CalculatorService.evaluate(expression);
      
      if (result.success) {
        setDisplay(result.formattedResult);
        setLastResult(result.formattedResult);
        setCurrentExpression('');
        setShouldResetDisplay(true);
      } else {
        setError(result.errorMessage || 'Unknown error');
      }
    } catch (err) {
      setError('Calculation failed. Please try again.');
      console.error('Calculation error:', err);
    } finally {
      setIsCalculating(false);
    }
  };

  // Handle equals button press
  const handleEquals = async () => {
    if (isCalculating) return;
    await evaluateExpression();
  };

  // Handle backspace
  const handleBackspace = () => {
    setError(null);
    
    if (shouldResetDisplay) return;
    
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  // Create a button with keyboard hint
  const createButton = (
    value: string,
    onClick: () => void,
    className: string,
    keyHint?: string
  ) => (
    <div className="button-wrapper">
      <button 
        onClick={onClick}
        className={`calculator-button ${className}`}
        disabled={isCalculating}
      >
        {value}
        {keyHint && <span className="key-hint">{keyHint}</span>}
      </button>
    </div>
  );

  // Generate the calculator buttons with keyboard hints
  const renderButtons = () => {
    const digitButtons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(digit => 
      createButton(
        digit.toString(),
        () => handleDigit(digit.toString()),
        "digit",
        digit.toString()
      )
    );

    const operatorSymbols: Record<string, string> = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷'
    };

    const operatorKeyHints: Record<string, string> = {
      '+': '+',
      '-': '-',
      '*': '*',
      '/': '/'
    };

    const operatorButtons = ['+', '-', '*', '/'].map(operator => 
      createButton(
        operatorSymbols[operator],
        () => handleOperator(operator),
        `operator ${currentExpression.endsWith(operator + ' ') ? 'active' : ''}`,
        operatorKeyHints[operator]
      )
    );

    return (
      <div className="calculator-keypad">
        <div className="digits-container">
          {digitButtons}
          {createButton('.', handleDecimalPoint, "digit", ".")}
        </div>
        <div className="operators-container">
          {createButton('C', handleClear, "clear", "Esc")}
          {createButton('⌫', handleBackspace, "backspace", "⌫")}
          {operatorButtons}
          {createButton('=', handleEquals, "equals", "Enter")}
        </div>
      </div>
    );
  };

  // Format the current expression for display
  const formatExpressionForDisplay = () => {
    if (!currentExpression) return '';
    
    // Replace operators for display
    return currentExpression
      .replace(/\*/g, '×')
      .replace(/\//g, '÷')
      .replace(/-/g, '−');
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="expression-display">
          {formatExpressionForDisplay()}
        </div>
        <div className="display-content">{display}</div>
        {error && <div className="error-message">{error}</div>}
        {isCalculating && <div className="calculating-message">Calculating...</div>}
      </div>
      {renderButtons()}
    </div>
  );
};

export default Calculator;