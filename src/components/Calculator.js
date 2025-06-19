import React, { useState, useEffect } from 'react';
import { 
  Plus, Minus, X, Divide, Percent, Square, 
  RotateCcw, Delete, Equal, Dot, Hash, Pi, Infinity 
} from 'lucide-react';

const Calculator = ({ onCalculate }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '%':
        return firstValue % secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (!previousValue || !operation) return;

    const inputValue = parseFloat(display);
    const result = calculate(previousValue, inputValue, operation);
    
    const calculationString = `${previousValue} ${operation} ${inputValue}`;
    onCalculate(calculationString, result);

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const square = () => {
    const value = parseFloat(display);
    const result = value * value;
    onCalculate(`${value}²`, result);
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const squareRoot = () => {
    const value = parseFloat(display);
    if (value < 0) {
      setDisplay('Error');
      return;
    }
    const result = Math.sqrt(value);
    onCalculate(`√${value}`, result);
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const percentage = () => {
    const value = parseFloat(display);
    const result = value / 100;
    onCalculate(`${value}%`, result);
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const negate = () => {
    const value = parseFloat(display);
    const result = -value;
    setDisplay(String(result));
  };

  const insertPi = () => {
    const piValue = Math.PI;
    onCalculate('π', piValue);
    setDisplay(String(piValue));
    setWaitingForOperand(true);
  };

  const memoryStore = () => {
    setMemory(parseFloat(display));
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
    setWaitingForOperand(true);
  };

  const memoryClear = () => {
    setMemory(0);
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputDigit(parseInt(key));
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        performCalculation();
      } else if (key === 'Escape') {
        clearAll();
      } else if (key === 'Backspace') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [display, waitingForOperand, inputDigit, inputDecimal, performOperation, performCalculation, clearAll]);

  return (
    <div className="glass-effect rounded-2xl p-6 shadow-2xl">
      {/* Display */}
      <div className="mb-6">
        <div className="bg-dark-800 rounded-xl p-4 min-h-[80px] flex flex-col justify-end">
          <div className="text-right text-gray-400 text-sm mb-1">
            {previousValue !== null && operation && `${previousValue} ${operation}`}
          </div>
          <div className="text-right text-white text-3xl font-mono font-bold break-all">
            {display}
          </div>
        </div>
      </div>

      {/* Memory Row */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <button onClick={memoryStore} className="function-button text-xs">MS</button>
        <button onClick={memoryRecall} className="function-button text-xs">MR</button>
        <button onClick={memoryAdd} className="function-button text-xs">M+</button>
        <button onClick={memorySubtract} className="function-button text-xs">M-</button>
        <button onClick={memoryClear} className="function-button text-xs">MC</button>
      </div>

      {/* Scientific Functions */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <button onClick={square} className="function-button">
          <Square className="w-5 h-5 mx-auto" />
        </button>
        <button onClick={squareRoot} className="function-button">
          <span className="text-xl font-bold">√</span>
        </button>
        <button onClick={percentage} className="function-button">
          <Percent className="w-5 h-5 mx-auto" />
        </button>
        <button onClick={insertPi} className="function-button">
          <Pi className="w-5 h-5 mx-auto" />
        </button>
      </div>

      {/* Main Calculator Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {/* Row 1 */}
        <button onClick={clearAll} className="clear-button">
          <RotateCcw className="w-5 h-5 mx-auto" />
        </button>
        <button onClick={clearDisplay} className="function-button">
          <Delete className="w-5 h-5 mx-auto" />
        </button>
        <button onClick={() => performOperation('÷')} className="operator-button">
          <Divide className="w-5 h-5 mx-auto" />
        </button>
        <button onClick={() => performOperation('×')} className="operator-button">
          <X className="w-5 h-5 mx-auto" />
        </button>

        {/* Row 2 */}
        <button onClick={() => inputDigit(7)} className="number-button">7</button>
        <button onClick={() => inputDigit(8)} className="number-button">8</button>
        <button onClick={() => inputDigit(9)} className="number-button">9</button>
        <button onClick={() => performOperation('-')} className="operator-button">
          <Minus className="w-5 h-5 mx-auto" />
        </button>

        {/* Row 3 */}
        <button onClick={() => inputDigit(4)} className="number-button">4</button>
        <button onClick={() => inputDigit(5)} className="number-button">5</button>
        <button onClick={() => inputDigit(6)} className="number-button">6</button>
        <button onClick={() => performOperation('+')} className="operator-button">
          <Plus className="w-5 h-5 mx-auto" />
        </button>

        {/* Row 4 */}
        <button onClick={() => inputDigit(1)} className="number-button">1</button>
        <button onClick={() => inputDigit(2)} className="number-button">2</button>
        <button onClick={() => inputDigit(3)} className="number-button">3</button>
        <button onClick={performCalculation} className="equals-button row-span-2">
          <Equal className="w-6 h-6 mx-auto" />
        </button>

        {/* Row 5 */}
        <button onClick={() => inputDigit(0)} className="number-button col-span-2">0</button>
        <button onClick={inputDecimal} className="number-button">
          <Dot className="w-5 h-5 mx-auto" />
        </button>
      </div>

      {/* Additional Functions */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        <button onClick={negate} className="function-button">±</button>
        <button onClick={() => performOperation('%')} className="function-button">%</button>
        <button className="function-button">
          <Infinity className="w-5 h-5 mx-auto" />
        </button>
        <button className="function-button">
          <Hash className="w-5 h-5 mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default Calculator; 