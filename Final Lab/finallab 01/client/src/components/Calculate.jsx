import React from "react";
import { useState } from "react";

const Calculate = () => {
  const [operator1, setOperator1] = useState('');
  const [operator2, setOperator2] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');

  const handleOperator1Change = (e) => {
    setOperator1(e.target.value);
  };

  const handleOperator2Change = (e) => {
    setOperator2(e.target.value);
  };

  const handleSelectedOperatorChange = (e) => {
    setSelectedOperator(e.target.value);
  };

  const handleCalculate = () => {
    // Placeholder for future implementation
    // You can add your calculation logic here
  };

  return (
    <div>
      <form>
        <label>
          Operator 1:
          <input type="text" value={operator1} onChange={handleOperator1Change} />
        </label>
        <select value={selectedOperator} onChange={handleSelectedOperatorChange}>
          <option value="">Select Operator</option>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <label>
          Operator 2:
          <input type="text" value={operator2} onChange={handleOperator2Change} />
        </label>
        <button type="button" onClick={handleCalculate}>
          Calculate
        </button>
      </form>
    </div>
  );
};

export default Calculate;
