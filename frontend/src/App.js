import React, { useState } from 'react';
import './App.css';

function App() {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Simple Test - Can you type continuously?</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Monthly Bill: </label>
        <input
          type="text"
          value={monthlyBill}
          onChange={(e) => setMonthlyBill(e.target.value)}
          placeholder="e.g., $120"
          style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
        />
        <span style={{ marginLeft: '10px' }}>Value: {monthlyBill}</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Zip Code: </label>
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="e.g., 84043"
          style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
        />
        <span style={{ marginLeft: '10px' }}>Value: {zipCode}</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John"
          style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
        />
        <span style={{ marginLeft: '10px' }}>Value: {name}</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@email.com"
          style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
        />
        <span style={{ marginLeft: '10px' }}>Value: {email}</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Phone: </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="123-456-7890"
          style={{ padding: '10px', marginLeft: '10px', width: '200px' }}
        />
        <span style={{ marginLeft: '10px' }}>Value: {phone}</span>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h3>Current Values:</h3>
        <p>Monthly Bill: {monthlyBill}</p>
        <p>Zip Code: {zipCode}</p>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </div>
    </div>
  );
}

export default App;