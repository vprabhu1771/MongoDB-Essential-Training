import React, { useState } from 'react';

const PaymentCalculator = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('grocery');
  const [charge, setCharge] = useState(null);

  const handleCalculate = () => {
    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    let calculatedCharge = 0;

    if (amountNumber > 2000) {
      if (category === 'grocery') {
        calculatedCharge = (1.3 / 100) * amountNumber;
      } else {
        calculatedCharge = (1.9 / 100) * amountNumber;
      }
    } else {
      calculatedCharge = 0;
    }

    setCharge(calculatedCharge.toFixed(2));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Credit Card Payment Charge Calculator</h1>

      <div>
        <label>Enter Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>Select Category: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="grocery">Grocery</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button onClick={handleCalculate}>Calculate Charge</button>

      {charge !== null && (
        <div style={{ marginTop: '20px' }}>
        <h2>amount : ₹{amount}</h2>
          <h2>Payment Charge: ₹{charge}</h2>
          <h2>total: ₹{amount-charge}</h2>
        </div>
      )}
    </div>
  );
};

export default PaymentCalculator;
