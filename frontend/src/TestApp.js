import React, { useState } from 'react';

function TestApp() {
  const [inputValue, setInputValue] = useState('');
  
  console.log('TestApp render, inputValue:', inputValue);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Input</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          console.log('onChange called with:', e.target.value);
          setInputValue(e.target.value);
        }}
        placeholder="Type here..."
        style={{ padding: '10px', fontSize: '16px', width: '300px' }}
      />
      <p>Current value: {inputValue}</p>
    </div>
  );
}

export default TestApp;