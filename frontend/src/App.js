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

  // Smart products data
  const smartProducts = [
    {
      id: 'thermostat',
      name: 'Smart Thermostat',
      description: 'Save up to $180/year',
      annualSavings: 180,
      icon: 'https://images.pexels.com/photos/14401717/pexels-photo-14401717.jpeg'
    },
    {
      id: 'lighting',
      name: 'Smart Lighting',
      description: 'Save up to $60/year',
      annualSavings: 60,
      icon: 'https://images.unsplash.com/photo-1619506147448-b56ba8ee11d7'
    },
    {
      id: 'plugs',
      name: 'Smart Plugs',
      description: 'Save up to $40/year',
      annualSavings: 40,
      icon: 'https://images.unsplash.com/photo-1586254116648-d33e0fada133'
    },
    {
      id: 'doorlock',
      name: 'Smart Door Lock',
      description: 'Save up to $10/year',
      annualSavings: 10,
      icon: 'https://images.unsplash.com/photo-1713557112617-e12d67bddc3a'
    },
    {
      id: 'garage',
      name: 'Smart Garage Door Controller',
      description: 'Save up to $20/year',
      annualSavings: 20,
      icon: 'https://images.pexels.com/photos/16773548/pexels-photo-16773548.jpeg'
    },
    {
      id: 'sensors',
      name: 'Security Sensors',
      description: 'Save up to $25/year',
      annualSavings: 25,
      icon: 'https://images.unsplash.com/photo-1655195215404-a89325e7dd3e'
    },
    {
      id: 'cameras',
      name: 'Smart Cameras',
      description: 'Save up to $15/year',
      annualSavings: 15,
      icon: 'https://images.pexels.com/photos/29942709/pexels-photo-29942709.jpeg'
    },
    {
      id: 'hub',
      name: 'Vivint Smart Hub',
      description: 'Save up to $5/year',
      annualSavings: 5,
      icon: 'https://images.pexels.com/photos/10991709/pexels-photo-10991709.jpeg'
    }
  ];

  // Simple input handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductToggle = (productId) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetCalculator = () => {
    setCurrentStep(0);
    setFormData({
      zipCode: '',
      homeSize: '1000-2000',
      peopleCount: 5,
      monthlyBill: '',
      electricityRate: ''
    });
    setSelectedProducts({});
    setContactData({
      name: '',
      email: '',
      phone: '',
      bestTime: 'Morning'
    });
    setErrors({});
  };

  const getHomeSizeLabel = (value) => {
    switch(value) {
      case '<1000': return 'Less than 1,000 sq. ft.';
      case '1000-2000': return '1,000–2,000 sq. ft.';
      case '2000-3000': return '2,000–3,000 sq. ft.';
      case '>3000': return 'More than 3,000 sq. ft.';
      default: return '1,000–2,000 sq. ft.';
    }
  };

  const getHomeSizePercentage = (value) => {
    switch(value) {
      case '<1000': return 0;
      case '1000-2000': return 33;
      case '2000-3000': return 66;
      case '>3000': return 100;
      default: return 33;
    }
  };

  const calculateResults = () => {
    const totalAnnualSavings = Object.keys(selectedProducts)
      .filter(productId => selectedProducts[productId])
      .reduce((total, productId) => {
        const product = smartProducts.find(p => p.id === productId);
        return total + (product ? product.annualSavings : 0);
      }, 0);

    const monthlySavings = totalAnnualSavings / 12;
    const monthlyBill = parseFloat(formData.monthlyBill) || 120;
    const percentageSaved = monthlyBill > 0 ? (monthlySavings / monthlyBill) * 100 : 0;

    return {
      annualSavings: totalAnnualSavings,
      monthlySavings: monthlySavings,
      percentageSaved: percentageSaved
    };
  };

  const handleContactSubmit = () => {
    alert('Thank you! Your information has been submitted.');
  };

  // Progress indicator component
  const ProgressIndicator = ({ step }) => (
    <div className="progress-container">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`progress-dot ${step === index ? 'active' : ''}`}
        />
      ))}
    </div>
  );