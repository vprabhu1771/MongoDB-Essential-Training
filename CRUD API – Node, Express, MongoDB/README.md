

To create a CRUD (Create, Read, Update, Delete) API using Node.js, Express, and MongoDB, follow these steps:

### 1. **Setup the Project**

1. **Initialize the project:**
   ```bash
   mkdir node-crud-api
   cd node-crud-api
   npm init -y
   ```

2. **Install dependencies:**
   ```bash
   npm install express mongoose dotenv body-parser
   npm install nodemon --save-dev
   ```

   - `express`: Fast, unopinionated web framework.
   - `mongoose`: ODM library to interact with MongoDB.
   - `dotenv`: To load environment variables.
   - `body-parser`: Middleware to parse incoming request bodies.
   - `nodemon`: Development tool to automatically restart the server when files change.

3. **Project Structure:**
   ```
   node-crud-api/
   ├── models/
   │   └── itemModel.js
   ├── routes/
   │   └── itemRoutes.js
   ├── .env
   ├── server.js
   └── package.json
   ```

### 2. **MongoDB Setup**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or set up MongoDB locally.
2. Create a `.env` file in the root directory:
   ```
   MONGO_URI=<Your MongoDB URI>
   PORT=5000
   ```

### 3. **Model Creation (models/itemModel.js)**

Define the schema for your MongoDB collection using Mongoose:

```javascript
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
```

### 4. **Routes Definition (routes/itemRoutes.js)**

Define the routes for CRUD operations:

```javascript
const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');

// CREATE an item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ a single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE an item
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### 5. **Server Setup (server.js)**

Configure the main Express server and connect to MongoDB:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/items', itemRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### 6. **Test the API**

1. Start the server using `nodemon`:
   ```bash
   npx nodemon server.js
   ```

2. Use an API testing tool like Postman or `curl` to test the endpoints:

   - **Create an item:**
     ```
     POST http://localhost:5000/api/items
     Body: 
     {
       "name": "Laptop",
       "price": 1000,
       "description": "A powerful laptop"
     }
     ```

   - **Get all items:**
     ```
     GET http://localhost:5000/api/items
     ```

   - **Get a single item:**
     ```
     GET http://localhost:5000/api/items/{id}
     ```

   - **Update an item:**
     ```
     PUT http://localhost:5000/api/items/{id}
     Body:
     {
       "price": 1200
     }
     ```

   - **Delete an item:**
     ```
     DELETE http://localhost:5000/api/items/{id}
     ```

### Conclusion
You now have a basic CRUD API setup using Node.js, Express, and MongoDB. You can expand upon this by adding more features such as authentication, validation, and more sophisticated error handling.