To build a **Quotation Generator** in React with a **PDF print** feature, you can follow these steps:

### Steps Overview:
1. **Set up a React project.**
2. **Create a Quotation form** where users input their data (e.g., client details, items, prices).
3. **Generate a PDF** of the quotation using a library like **jsPDF** or **react-to-print**.
4. **Add a print/download button** to export the quotation to PDF.

### 1. Set up React Project
If you haven’t set up a React project yet, you can create one using:
```bash
npx create-react-app quotation-generator
cd quotation-generator
npm start
```

### 2. Install Required Libraries
To generate a PDF, install **jsPDF** or **react-to-print**:
```bash
npm install jspdf
```
Alternatively, for `react-to-print`:
```bash
npm install react-to-print
```

To generate a table in the PDF format with itemized rows in React using the `jsPDF` library, we can take advantage of the `autoTable` plugin. This will allow you to create a clean table layout for the items in your quotation.

### Steps:
1. **Install `jspdf` and `jspdf-autotable`:**
   You need both `jsPDF` and the `autoTable` plugin for table generation.

   ```bash
   npm install jspdf jspdf-autotable
   ```

2. **Use `autoTable` to Generate the Table:**
   We'll define the table headers and rows based on the dynamic `items` in the state and calculate the totals within the table.

Here’s how you can implement the table generation inside your PDF function.

### Updated Code with PDF Table Generation

```jsx
import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const QuotationForm = () => {
  const [quotationData, setQuotationData] = useState({
    clientName: "",
    items: [
      { description: "Intel CORE I5 Processor 12th gen", quantity: 1, price: 14000 },
      { description: "22” Dell Monitor", quantity: 1, price: 8500 },
    ],
  });

  // Function to handle adding a new item row
  const addItemRow = () => {
    const newItem = { description: "", quantity: 1, price: 0 };
    setQuotationData({
      ...quotationData,
      items: [...quotationData.items, newItem],
    });
  };

  // Function to handle removing an item row
  const removeItemRow = (index) => {
    const updatedItems = [...quotationData.items];
    updatedItems.splice(index, 1);
    setQuotationData({
      ...quotationData,
      items: updatedItems,
    });
  };

  // Function to handle item changes dynamically
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...quotationData.items];
    updatedItems[index][field] = value;
    setQuotationData({ ...quotationData, items: updatedItems });
  };

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return quotationData.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate SGST & CGST (9% each)
  const calculateSGST = (subtotal) => (9 / 100) * subtotal;
  const calculateCGST = (subtotal) => (9 / 100) * subtotal;

  // Generate PDF with Table
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Quotation", 10, 10);
    doc.text(`Client: ${quotationData.clientName}`, 10, 20);

    // Define table headers
    const headers = [["Item Description", "Quantity", "Unit Price", "Total Price"]];

    // Define table rows
    const rows = quotationData.items.map((item) => [
      item.description,
      item.quantity,
      `₹${item.price.toFixed(2)}`,
      `₹${(item.quantity * item.price).toFixed(2)}`,
    ]);

    // Add totals row
    const subtotal = calculateSubtotal();
    const sgst = calculateSGST(subtotal);
    const cgst = calculateCGST(subtotal);
    const total = subtotal + sgst + cgst;

    rows.push(["", "", "Subtotal", `₹${subtotal.toFixed(2)}`]);
    rows.push(["", "", "SGST @ 9%", `₹${sgst.toFixed(2)}`]);
    rows.push(["", "", "CGST @ 9%", `₹${cgst.toFixed(2)}`]);
    rows.push(["", "", "Total", `₹${total.toFixed(2)}`]);

    // Add table to the PDF
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 30, // Start the table below the client name
    });

    doc.save("quotation.pdf");
  };

  return (
    <div>
      <h1>Quotation Generator</h1>
      <div>
        <label>Client Name:</label>
        <input
          type="text"
          value={quotationData.clientName}
          onChange={(e) => setQuotationData({ ...quotationData, clientName: e.target.value })}
        />
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotationData.items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, "description", e.target.value)}
                  placeholder="Item description"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                  min="1"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value))}
                  min="0"
                />
              </td>
              <td>₹{(item.quantity * item.price).toFixed(2)}</td>
              <td>
                <button onClick={() => removeItemRow(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Subtotal</td>
            <td>₹{calculateSubtotal().toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3">SGST @ 9%</td>
            <td>₹{calculateSGST(calculateSubtotal()).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3">CGST @ 9%</td>
            <td>₹{calculateCGST(calculateSubtotal()).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td><strong>₹{(calculateSubtotal() + calculateSGST(calculateSubtotal()) + calculateCGST(calculateSubtotal())).toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>

      <button onClick={addItemRow}>Add Item</button>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default QuotationForm;
```

### Key Points:
1. **AutoTable Plugin**: This plugin creates a structured table inside the PDF. We use the `head` and `body` parameters to define the table headers and rows dynamically.
   
2. **Rows Calculation**: The rows include item descriptions, quantities, unit prices, and total prices. After the itemized rows, we add the subtotal, SGST, CGST, and total rows.

3. **Dynamic Table**: The items in the state (`quotationData.items`) dynamically update as users add, edit, or remove items, and the PDF reflects those changes.

### Output:
When the "Generate PDF" button is clicked, the PDF will be generated with a table of items, each with a description, quantity, price, and total price. The table will also include subtotal, SGST, CGST, and total.
