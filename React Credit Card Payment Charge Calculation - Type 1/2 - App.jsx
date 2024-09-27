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