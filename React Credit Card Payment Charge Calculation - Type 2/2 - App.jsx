import React, { useState } from 'react';
import PaymentCalculator from './components/PaymentCalculator';

const App = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMobileSubmit = async () => {
    if (mobileNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/mobile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber }),
      });

      if (response.ok) {
        setIsSubmitted(true); // Show PaymentCalculator after submission
      } else {
        console.log(import.meta.env.VITE_API_BASE_URL);
        
        alert('Failed to save mobile number');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>React Credit Card Payment Charge Calculator</h1>
        <PaymentCalculator />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Enter your Mobile Number</h1>
      <input
        type="text"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        placeholder="Enter mobile number"
        maxLength="10"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={handleMobileSubmit} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Submit
      </button>
    </div>
  );
};

export default App;