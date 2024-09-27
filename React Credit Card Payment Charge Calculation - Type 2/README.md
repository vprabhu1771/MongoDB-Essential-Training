To implement the flow you're asking for, where a mobile number is collected and stored in MongoDB before showing the `PaymentCalculator` page, you can follow these steps:

### Steps:
1. **Display a popup to collect the mobile number** when the user first accesses the page.
2. **Store the mobile number in MongoDB** using an API call (Node.js with Express and MongoDB).
3. Once the mobile number is stored, **show the `PaymentCalculator` component**.

### High-Level Architecture:
1. **Frontend (React)**:
   - Show a popup to collect the mobile number.
   - Make an API call to store the mobile number in MongoDB.
   - After a successful insertion, render the `PaymentCalculator`.

2. **Backend (Node.js + Express + MongoDB)**:
   - Create an API endpoint that receives the mobile number and stores it in MongoDB.

---

### Frontend: `App.jsx`

First, you'll need to implement the popup to collect the mobile number and make an API request to the backend. Here's how:

### `.env`
```
VITE_API_BASE_URL="http://192.168.1.111:3000/api"
```

#### `App.jsx`

```jsx
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
```

### Backend: Node.js + Express + MongoDB

You’ll need a simple API to handle the mobile number insertion into MongoDB. Here’s how you can set up your backend.

1. **Install necessary dependencies:**

   ```bash
   npm install dotenv nodemon express mongoose body-parser cors
   ```


2. **open** `.env`

    ```
    PORT=3000
    HOST=192.168.1.111
    MONGO_DB=mongodb://localhost:27017/paymentApp
    ```

3. **open** `package.json`

    ```
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon server.js"
    },
    ```

2. **Create `server.js`:**

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';


// MongoDB Connection this type is a deprecated 
// mongoose.connect(`${process.env.MONGO_DB}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// MongoDB Connection 
mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
  
const mobileSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
});

const Mobile = mongoose.model('Mobile', mobileSchema); // Changed model name to be singular


app.use(cors());
// app.use(bodyParser.json());
app.use(express.json()); // Use express.json() instead of body-parser

// API to save mobile number
app.post('/api/mobile', async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber || mobileNumber.length !== 10) {
    return res.status(400).send('Invalid mobile number');
  }

  try {
    const newMobile = new Mobile({ mobileNumber });
    const savedMobile = await newMobile.save(); // Save the mobile number
    console.log('Saved data:', savedMobile); // Log saved data
    res.status(200).send('Mobile number saved');
  } catch (error) {
    res.status(500).send('Error saving mobile number');
  }
});

app.listen(port, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Server is running on http://${host}:${port}`);
});
```

### Explanation:
- **Frontend:**
  - The React app shows an input field for the user to enter their mobile number.
  - Once the user submits the number, an API call is made to the backend to store the mobile number in MongoDB.
  - After successful submission, the `PaymentCalculator` component is shown.
  
- **Backend:**
  - Node.js with Express is used to create an API endpoint `/api/mobile` to handle storing the mobile number in MongoDB.
  - Mongoose is used to connect to MongoDB and define a schema for mobile numbers.
  
### Running the Application:
1. **Backend**:
   - Start MongoDB locally using `mongod`.
   - Run the Node.js server:
     ```bash
     node server.js
     ```
   
2. **Frontend**:
   - Start your React app with `npm start` or `yarn start`.

Once everything is running, when a user first accesses the app, they’ll be prompted to enter their mobile number. After it’s saved in MongoDB, the `PaymentCalculator` will be displayed.


POSTMAN

- Test your API endpoint using Postman or any HTTP client by making a `POST` request to `http://192.168.1.111:3000/api/mobile` with the following body:
  ```json
  {
    "mobileNumber": "1234567890"
  }
  ```
This should save the mobile number in MongoDB and return a success message.


If you see any errors here, make sure your MongoDB instance is running and accessible.

### 5. Debug with Postman and Logs
After ensuring that the code is set up correctly, send a POST request again using Postman:

- **Endpoint**: `http://localhost:3000/api/mobile`
- **Method**: `POST`
- **Headers**: Set `Content-Type` to `application/json`
- **Body**: Raw JSON:
  ```json
  {
    "mobileNumber": "1234567890"
  }
  ```