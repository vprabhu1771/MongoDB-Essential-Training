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
    const newItem = { description: "", quantity: 1, price: 0 }; // Default empty new row
    setQuotationData({
      ...quotationData,
      items: [...quotationData.items, newItem],
    });
  };

  // Function to handle removing an item row
  const removeItemRow = (index) => {
    const updatedItems = [...quotationData.items];
    updatedItems.splice(index, 1); // Remove item at the given index
    setQuotationData({
      ...quotationData,
      items: updatedItems,
    });
  };

  // Function to handle item changes dynamically
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...quotationData.items];
    updatedItems[index][field] = value; // Update the specific field in the item
    setQuotationData({ ...quotationData, items: updatedItems });
  };

  // Calculate Subtotal
  const calculateSubtotal = () => {
    return quotationData.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate SGST & CGST (9% each)
  const calculateSGST = (subtotal) => (9 / 100) * subtotal;
  const calculateCGST = (subtotal) => (9 / 100) * subtotal;

  // Generate PDF
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