You can create a simple React app that calculates the payment charge based on the rules you provided. Here's an example of how you could implement it:

### Steps:
1. If the amount is less than ₹2000, there is no charge.
2. If the amount is more than ₹2000:
   - For the **grocery** category, a 1.3% charge is applied.
   - For **other categories**, a 1.9% charge is applied.

### Example Implementation:

```jsx
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
```

### How it works:
- The user enters an amount and selects a category (either "grocery" or "other").
- The `handleCalculate` function applies the correct logic:
  - If the amount is less than ₹2000, no charge.
  - If the amount is over ₹2000, the charge is calculated based on the selected category:
    - **1.3% for grocery**
    - **1.9% for other categories**
- The result is displayed below the button.

You can further style the form or extend this functionality as needed.


Here's how you can structure your `App.jsx` to include the `PaymentCalculator` component:

### `App.jsx`

```jsx
import React from 'react';
import PaymentCalculator from './PaymentCalculator';

const App = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>React Credit Card Payment Charge Calculator</h1>
      <PaymentCalculator />
    </div>
  );
};

export default App;
```

### Explanation:
- `App.jsx` is the main entry point of your React app.
- It imports the `PaymentCalculator` component and renders it inside a `div` with some basic styling.
- You can customize the text, styling, or layout as needed.

### Steps:
1. Create `App.jsx` as shown above.
2. Ensure that you have the `PaymentCalculator.jsx` file with the logic from the previous example.
3. Run your React app (`npm start` or `yarn start` depending on your setup).

This will render your credit card payment charge calculator with a heading and a simple UI.