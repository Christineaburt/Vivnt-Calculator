import React, { useState } from 'react';
import './App.css';

const VivintCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    zipCode: '',
    homeSize: '1000-2000',
    peopleCount: 5,
    monthlyBill: '',
    electricityRate: ''
  });

  // Smart products state
  const [selectedProducts, setSelectedProducts] = useState({});

  // Contact form state
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    bestTime: 'Morning'
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  return (
    <div className="App">
      <h1>Vivint Calculator</h1>
    </div>
  );
}

export default VivintCalculator;