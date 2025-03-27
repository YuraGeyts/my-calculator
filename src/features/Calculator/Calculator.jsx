import React, { useState } from 'react';
import { calculateExpression } from './calculator.logic.js';
import Display from '../../components/Display/Display';
import Button from '../../components/Button/Button';
import styles from './calculator.module.css';

const Operators = {
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
  Percent: '%',
  Dot: '.',
  Equal: '=',
  ChangeSign: '+/-',
  Clear: 'C'
}

function getSymbol(operator) {
  switch (operator) {
    case Operators.Add:
      return '+';
    case Operators.Subtract:
      return '-';
    case Operators.Multiply:
      return '*';
    case Operators.Divide:
      return '÷';
    case Operators.Percent:
      return '%';
    case Operators.Dot:
      return '.';
    case Operators.Equal:
      return '=';
    case Operators.ChangeSign:
      return '+/-';
    case Operators.Clear:
      return 'C';
    default:
      return '';
  }
}

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (input === 'Error') {
      setInput('');
    }

    if (value === 'C') {
      setInput('');
      return;
    }
  
    if (value === '+/-') {
      setInput((prev) =>
        prev.startsWith('-') ? prev.slice(1) : '-' + prev
      );
      return;
    }
  
    if (value === '=') {
      const result = calculateExpression(input);
      setInput(result);
      return;
    }
  
    // Double-dot prevention
    if (value === '.' && input.endsWith('.')) {
      return;
    }
  
    // Operators prevention
    const lastChar = input.slice(-1);
    const operators = ['+', '-', '*', '/', '*', '÷'];
    if (operators.includes(lastChar) && operators.includes(value)) {
      setInput((prev) => prev.slice(0, -1) + value); // замінюємо останній оператор
      return;
    }
  
    setInput((prev) => prev + value);
  };
  

  const buttons = [
    getSymbol(Operators.Clear), getSymbol(Operators.Percent), getSymbol(Operators.ChangeSign), getSymbol(Operators.Divide),
    '7', '8', '9', getSymbol(Operators.Multiply),
    '4', '5', '6', getSymbol(Operators.Subtract),
    '1', '2', '3', getSymbol(Operators.Add),
    '0', getSymbol(Operators.Dot), getSymbol(Operators.Equal)
  ];

  const getButtonType = (btn) => {
    if (['÷', '*', '-', '+', '='].includes(btn)) return 'operator';
    if (['C', '+/-', '%'].includes(btn)) return 'control';
    if (btn === '0') return 'zero';
    return '';
  };

  return (
    <div className={styles.calculator}>
      <Display value={input || '0'} />
      <div className="buttons">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            label={btn}
            onClick={handleClick}
            type={getButtonType(btn)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;