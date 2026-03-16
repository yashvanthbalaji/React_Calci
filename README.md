# Ex04 Simple Calculator - React Project
## Date: Balaji A
## Date: 13-03-2026

## AIM
To  develop a Simple Calculator using React.js with clean and responsive design, ensuring a smooth user experience across different screen sizes.

## ALGORITHM
### STEP 1
Create a React App.

### STEP 2
Open a terminal and run:
  <ul><li>npx create-react-app simple-calculator</li>
  <li>cd simple-calculator</li>
  <li>npm start</li></ul>

### STEP 3
Inside the src/ folder, create a new file Calculator.js and define the basic structure.

### STEP 4
Plan the UI: Display screen, number buttons (0-9), operators (+, -, *, /), clear (C), and equal (=).

### STEP 5
Create a new file Calculator.css in src/ and add the styling.

### STEP 6
Open src/App.js and modify it.

### STEP 7
Start the development server.
  npm start

### STEP 8
Open http://localhost:3000/ in the browser.

### STEP 9
Test the calculator by entering numbers and operations.

### STEP 10
Fix styling issues and refine content placement.

### STEP 11
Deploy the website.

### STEP 12
Upload to GitHub Pages for free hosting.

## PROGRAM
App.jsx
```
import React, { useState } from 'react';
import { Delete, Divide, X, Minus, Plus, Equal } from 'lucide-react';

export default function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);

  const clear = () => {
    setCurrentValue('0');
    setPreviousValue('');
    setOperator(null);
    setOverwrite(false);
  };

  const deleteLast = () => {
    if (overwrite) {
      setCurrentValue('0');
      setOverwrite(false);
      return;
    }
    if (currentValue === 'Error') {
      clear();
      return;
    }
    setCurrentValue(currentValue.length > 1 ? currentValue.slice(0, -1) : '0');
  };

  const appendNumber = (number) => {
    if (currentValue === 'Error') clear();
    if (overwrite) {
      setCurrentValue(number);
      setOverwrite(false);
    } else {
      if (number === '.' && currentValue.includes('.')) return;
      setCurrentValue(currentValue === '0' && number !== '.' ? number : currentValue + number);
    }
  };

  const chooseOperation = (operation) => {
    if (currentValue === 'Error') return;
    if (previousValue !== '' && !overwrite) {
      const result = calculate(previousValue, currentValue, operator);
      setCurrentValue(result);
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(operation);
    setOverwrite(true);
  };

  const evaluate = () => {
    if (operator === null || previousValue === '') return;
    const result = calculate(previousValue, currentValue, operator);
    setCurrentValue(result);
    setPreviousValue('');
    setOperator(null);
    setOverwrite(true);
  };

  const calculate = (a, b, op) => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    if (isNaN(num1) || isNaN(num2)) return '';

    let computation = '';
    switch (op) {
      case '+':
        computation = num1 + num2;
        break;
      case '-':
        computation = num1 - num2;
        break;
      case '*':
        computation = num1 * num2;
        break;
      case '÷':
        computation = num2 === 0 ? 'Error' : num1 / num2;
        break;
      default:
        return '';
    }
    
    // Prevent extremely long decimals
    if (typeof computation === 'number' && !Number.isInteger(computation)) {
      return parseFloat(computation.toFixed(8)).toString();
    }
    return computation.toString();
  };

  // Helper component for buttons
  const Button = ({ children, onClick, variant = 'default', className = '' }) => {
    const baseStyle = "flex items-center justify-center text-xl font-medium p-4 rounded-2xl transition-all active:scale-95 select-none";
    const variants = {
      default: "bg-slate-800 text-slate-200 hover:bg-slate-700 active:bg-slate-600",
      primary: "bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700",
      secondary: "bg-slate-700 text-blue-400 hover:bg-slate-600 active:bg-slate-500",
      danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30 active:bg-red-500/40",
    };

    return (
      <button 
        onClick={onClick} 
        className={`${baseStyle} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-slate-900 p-6 rounded-[2rem] shadow-2xl shadow-black/50 border border-slate-800">
        
        {/* Display Section */}
        <div className="mb-6 bg-slate-950 p-6 rounded-3xl border border-slate-800/50 flex flex-col items-end justify-end h-32 overflow-hidden relative">
          <div className="text-slate-500 text-sm h-6 font-medium tracking-wider absolute top-4 right-6">
            {previousValue} {operator}
          </div>
          <div 
            className={`text-right font-light tracking-tight truncate w-full transition-all ${
              currentValue.length > 10 ? 'text-4xl' : 'text-5xl'
            } text-white`}
          >
            {currentValue}
          </div>
        </div>

        {/* Keypad Section */}
        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clear} variant="danger" className="col-span-2">AC</Button>
          <Button onClick={deleteLast} variant="secondary"><Delete size={24} /></Button>
          <Button onClick={() => chooseOperation('÷')} variant="secondary"><Divide size={24} /></Button>

          <Button onClick={() => appendNumber('7')}>7</Button>
          <Button onClick={() => appendNumber('8')}>8</Button>
          <Button onClick={() => appendNumber('9')}>9</Button>
          <Button onClick={() => chooseOperation('*')} variant="secondary"><X size={24} /></Button>

          <Button onClick={() => appendNumber('4')}>4</Button>
          <Button onClick={() => appendNumber('5')}>5</Button>
          <Button onClick={() => appendNumber('6')}>6</Button>
          <Button onClick={() => chooseOperation('-')} variant="secondary"><Minus size={24} /></Button>

          <Button onClick={() => appendNumber('1')}>1</Button>
          <Button onClick={() => appendNumber('2')}>2</Button>
          <Button onClick={() => appendNumber('3')}>3</Button>
          <Button onClick={() => chooseOperation('+')} variant="secondary"><Plus size={24} /></Button>

          <Button onClick={() => appendNumber('0')} className="col-span-2">0</Button>
          <Button onClick={() => appendNumber('.')}>.</Button>
          <Button onClick={evaluate} variant="primary"><Equal size={24} /></Button>
        </div>
        
      </div>
    </div>
  );
}
```



## OUTPUT
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5e7df7ef-57d9-4110-addf-40628947a36e" />
<img width="671" height="829" alt="image" src="https://github.com/user-attachments/assets/a78bcd83-9dfd-4649-bd94-b4540e32bc7f" />


## RESULT
The program for developing a simple calculator in React.js is executed successfully.
