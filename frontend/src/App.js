import React, { useState, useEffect } from 'react';
import './App.css';

const VivintCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    zipCode: '',
    homeSize: '1000-2000',
    peopleCount: 5,
    monthlyBill: '',
    electricityRate: '0.19'
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

  // Results state
  const [results, setResults] = useState({
    annualSavings: 0,
    monthlySavings: 0,
    percentageSaved: 0
  });

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
      name: 'Smart Garage Door',
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

  // Calculate savings whenever selections change
  useEffect(() => {
    const totalAnnualSavings = Object.keys(selectedProducts)
      .filter(productId => selectedProducts[productId])
      .reduce((total, productId) => {
        const product = smartProducts.find(p => p.id === productId);
        return total + (product ? product.annualSavings : 0);
      }, 0);

    const monthlySavings = totalAnnualSavings / 12;
    const monthlyBill = parseFloat(formData.monthlyBill) || 120;
    const percentageSaved = monthlyBill > 0 ? (monthlySavings / monthlyBill) * 100 : 0;

    setResults({
      annualSavings: totalAnnualSavings,
      monthlySavings: monthlySavings,
      percentageSaved: percentageSaved
    });
  }, [selectedProducts, formData.monthlyBill]);

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
      electricityRate: '0.19'
    });
    setSelectedProducts({});
    setContactData({
      name: '',
      email: '',
      phone: '',
      bestTime: 'Morning'
    });
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
      case '<1000': return 15;
      case '1000-2000': return 35;
      case '2000-3000': return 65;
      case '>3000': return 85;
      default: return 35;
    }
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

  // Intro Page (Step 0)
  const IntroPage = () => (
    <div className="intro-page">
      <div className="intro-content">
        {/* Vivint Logo */}
        <div className="vivint-logo">
          <svg width="186" height="41" viewBox="0 0 186 41" fill="none">
            {/* V */}
            <path d="M10 10L18 31L26 10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            {/* I */}
            <line x1="35" y1="10" x2="35" y2="31" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            {/* V */}
            <path d="M44 10L52 31L60 10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            {/* I */}
            <line x1="69" y1="10" x2="69" y2="31" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            {/* N */}
            <line x1="78" y1="31" x2="78" y2="10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="78" y1="10" x2="94" y2="31" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="94" y1="31" x2="94" y2="10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            {/* T */}
            <line x1="103" y1="10" x2="119" y2="10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="111" y1="10" x2="111" y2="31" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        
        {/* Smart Home Icons */}
        <div className="smart-home-icons">
          <svg width="145" height="163" viewBox="0 0 145 163" fill="none">
            {/* Main house structure */}
            <path d="M72.5 20L20 65V150H125V65L72.5 20Z" stroke="#E2B95D" strokeWidth="9" fill="none" strokeLinejoin="round"/>
            {/* Roof peak */}
            <path d="M10 65L72.5 10L135 65" stroke="#E2B95D" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Smart device indicators */}
            <circle cx="40" cy="90" r="8" stroke="#E2B95D" strokeWidth="6" fill="none"/>
            <circle cx="105" cy="90" r="8" stroke="#E2B95D" strokeWidth="6" fill="none"/>
            <circle cx="72" cy="110" r="8" stroke="#E2B95D" strokeWidth="6" fill="none"/>
            {/* Door */}
            <rect x="60" y="125" width="25" height="25" stroke="#E2B95D" strokeWidth="6" fill="none"/>
            {/* Signal waves */}
            <path d="M72 70C80 70 87 77 87 85" stroke="#E2B95D" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M72 70C85 70 95 80 95 93" stroke="#E2B95D" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        
        <h1 className="intro-title">
          How much can you save with Vivint smart home products?
        </h1>
        
        <p className="intro-subtitle">
          Estimate your energy savings by selecting the smart devices you use—or plan to install—in your home.
        </p>
        
        <button onClick={nextStep} className="get-started-btn">
          <span>Get started</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );

  // Home Profile Page (Step 1)
  const HomeProfilePage = () => (
    <div className="calculator-page">
      <div className="calculator-container">
        <button onClick={resetCalculator} className="reset-link">
          reset&nbsp;calculator
        </button>
        
        <div className="page-header">
          <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#BFC8C7" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          <h2>Home profile</h2>
        </div>

        <div className="form-section">
          <div className="form-row">
            <label>House size</label>
            <div className="form-value">{getHomeSizeLabel(formData.homeSize)}</div>
            <div className="slider-container">
              <div className="slider-track"></div>
              <div className="slider-fill" style={{width: `${getHomeSizePercentage(formData.homeSize)}%`}}></div>
              <div className="slider-thumb" style={{left: `${getHomeSizePercentage(formData.homeSize)}%`}}></div>
              <select
                value={formData.homeSize}
                onChange={(e) => handleInputChange('homeSize', e.target.value)}
                className="invisible-select"
              >
                <option value="<1000">Less than 1,000 sq. ft.</option>
                <option value="1000-2000">1,000–2,000 sq. ft.</option>
                <option value="2000-3000">2,000–3,000 sq. ft.</option>
                <option value=">3000">More than 3,000 sq. ft.</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <label>Number of people in home</label>
            <div className="form-value">{formData.peopleCount}</div>
            <div className="slider-container">
              <div className="slider-track"></div>
              <div className="slider-fill" style={{width: `${(formData.peopleCount - 1) * 11}%`}}></div>
              <div className="slider-thumb" style={{left: `${(formData.peopleCount - 1) * 11}%`}}></div>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.peopleCount}
                onChange={(e) => handleInputChange('peopleCount', parseInt(e.target.value))}
                className="range-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Monthly electric bill</label>
            <input
              type="text"
              value={formData.monthlyBill}
              onChange={(e) => handleInputChange('monthlyBill', e.target.value)}
              placeholder="e.g., $120"
              className="form-input"
              autoComplete="off"
            />
            <p className="input-help">If you're not sure, we'll use the national average.</p>
          </div>

          <div className="input-group">
            <label>Electricity rate <span className="optional">Optional</span></label>
            <input
              type="text"
              value={formData.electricityRate}
              onChange={(e) => handleInputChange('electricityRate', e.target.value)}
              placeholder="e.g., $0.19 per kWh"
              className="form-input"
              autoComplete="off"
            />
            <p className="input-help">National average: $0.19 per kWh (as of March 2025)</p>
          </div>

          <div className="input-group">
            <label>Zip code <span className="optional">Optional</span></label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="e.g., 84043"
              className="form-input"
              autoComplete="off"
            />
          </div>
        </div>

        <button onClick={nextStep} className="next-btn">
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <ProgressIndicator step={0} />
      </div>
    </div>
  );

  // Smart Products Page (Step 2)
  const SmartProductsPage = () => (
    <div className="calculator-page">
      <div className="calculator-container products-container">
        <button onClick={resetCalculator} className="reset-link">
          reset&nbsp;calculator
        </button>
        
        <div className="page-header">
          <svg width="36" height="38" viewBox="0 0 24 24" fill="none" stroke="#BFC8C7" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <h2>Choose your smart home products</h2>
        </div>

        <div className="products-list">
          {smartProducts.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                <img src={product.icon} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-savings">{product.description}</p>
                <div 
                  className={`product-toggle ${selectedProducts[product.id] ? 'active' : ''}`}
                  onClick={() => handleProductToggle(product.id)}
                >
                  <div className="toggle-circle"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={nextStep} className="next-btn">
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <ProgressIndicator step={1} />
      </div>
    </div>
  );

  // Results Page (Step 3)
  const ResultsPage = () => {
    const monthlyBill = parseFloat(formData.monthlyBill) || 120;
    const newBill = monthlyBill - results.monthlySavings;
    const selectedProductsList = Object.keys(selectedProducts)
      .filter(productId => selectedProducts[productId])
      .map(productId => smartProducts.find(p => p.id === productId));

    return (
      <div className="calculator-page">
        <div className="calculator-container">
          <button onClick={resetCalculator} className="reset-link">
            reset&nbsp;calculator
          </button>
          
          <div className="page-header">
            <svg width="30" height="32" viewBox="0 0 24 24" fill="none" stroke="#BFC8C7" strokeWidth="2">
              <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
            </svg>
            <h2>Results</h2>
          </div>

          <div className="results-card">
            <h3 className="results-title">Here's how much you could save with Vivint:</h3>
            
            <div className="savings-display">
              <span className="savings-amount">${results.annualSavings}</span>
              <span className="savings-period">annual savings</span>
            </div>

            <div className="bill-comparison">
              <div className="bill-item">
                <p className="bill-label">Your average monthly bill</p>
                <div className="bill-bar original">
                  <span className="bill-amount">${monthlyBill}</span>
                </div>
              </div>
              
              <div className="bill-item">
                <p className="bill-label">Your bill with Vivint</p>
                <div className="bill-bar savings" style={{width: `${(newBill / monthlyBill) * 100}%`}}>
                  <span className="bill-amount">${Math.round(newBill)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="savings-breakdown">
            <h3 className="breakdown-title">Savings breakdown</h3>
            
            {selectedProductsList.map((product) => (
              <div key={product.id} className="breakdown-item">
                <div className="breakdown-info">
                  <span className="breakdown-name">{product.name}</span>
                  <span className="breakdown-amount">${Math.round(product.annualSavings / 12)}</span>
                </div>
                <div className="breakdown-bar">
                  <div className="breakdown-fill" style={{width: `${(product.annualSavings / 200) * 100}%`}}></div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={nextStep} className="quote-btn">
            <span>Get a quote</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <ProgressIndicator step={2} />
        </div>
      </div>
    );
  };

  // Contact Page (Step 4)
  const ContactPage = () => (
    <div className="calculator-page">
      <div className="calculator-container">
        <button onClick={resetCalculator} className="reset-link">
          reset&nbsp;calculator
        </button>
        
        <div className="page-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BFC8C7" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <h2>Contact</h2>
        </div>

        <p className="contact-subtitle">Get a personalized quote</p>

        <div className="contact-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={contactData.name}
              onChange={(e) => handleContactChange('name', e.target.value)}
              placeholder="John"
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              placeholder="Johns@email.com"
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              value={contactData.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              placeholder="900 999 999"
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label>Best time to contact</label>
            <select
              value={contactData.bestTime}
              onChange={(e) => handleContactChange('bestTime', e.target.value)}
              className="form-input"
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
        </div>

        <button onClick={() => alert('Quote request sent!')} className="send-btn">
          <span>Send</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <ProgressIndicator step={3} />
      </div>
    </div>
  );

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 0: return <IntroPage />;
      case 1: return <HomeProfilePage />;
      case 2: return <SmartProductsPage />;
      case 3: return <ResultsPage />;
      case 4: return <ContactPage />;
      default: return <IntroPage />;
    }
  };

  return (
    <div className="vivint-calculator">
      {renderStep()}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <VivintCalculator />
    </div>
  );
}

export default App;