import React, { useState } from 'react';
import './App.css';

const VivintCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    zipCode: '',
    homeSize: '1000-2000',
    peopleCount: 5,
    monthlyBill: '',
    electricityRate: ''
  });
  const [selectedProducts, setSelectedProducts] = useState({});
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    bestTime: 'Morning'
  });

  const smartProducts = [
    { id: 'thermostat', name: 'Smart Thermostat', annualSavings: 180, icon: 'https://images.pexels.com/photos/14401717/pexels-photo-14401717.jpeg' },
    { id: 'lighting', name: 'Smart Lighting', annualSavings: 60, icon: 'https://images.unsplash.com/photo-1619506147448-b56ba8ee11d7' },
    { id: 'plugs', name: 'Smart Plugs', annualSavings: 40, icon: 'https://images.unsplash.com/photo-1586254116648-d33e0fada133' },
    { id: 'doorlock', name: 'Smart Door Lock', annualSavings: 10, icon: 'https://images.unsplash.com/photo-1713557112617-e12d67bddc3a' },
    { id: 'garage', name: 'Smart Garage Door Controller', annualSavings: 20, icon: 'https://images.pexels.com/photos/16773548/pexels-photo-16773548.jpeg' },
    { id: 'sensors', name: 'Security Sensors', annualSavings: 25, icon: 'https://images.unsplash.com/photo-1655195215404-a89325e7dd3e' },
    { id: 'cameras', name: 'Smart Cameras', annualSavings: 15, icon: 'https://images.pexels.com/photos/29942709/pexels-photo-29942709.jpeg' },
    { id: 'hub', name: 'Vivint Smart Hub', annualSavings: 5, icon: 'https://images.pexels.com/photos/10991709/pexels-photo-10991709.jpeg' }
  ];

  const calculateResults = () => {
    const totalAnnualSavings = Object.keys(selectedProducts)
      .filter(productId => selectedProducts[productId])
      .reduce((total, productId) => {
        const product = smartProducts.find(p => p.id === productId);
        return total + (product ? product.annualSavings : 0);
      }, 0);
    return { annualSavings: totalAnnualSavings, monthlySavings: totalAnnualSavings / 12 };
  };

  const getHomeSizeLabel = (value) => {
    const labels = {
      '<1000': 'Less than 1,000 sq. ft.',
      '1000-2000': '1,000–2,000 sq. ft.',
      '2000-3000': '2,000–3,000 sq. ft.',
      '>3000': 'More than 3,000 sq. ft.'
    };
    return labels[value] || labels['1000-2000'];
  };

  const getHomeSizePercentage = (value) => {
    const percentages = { '<1000': 0, '1000-2000': 33, '2000-3000': 66, '>3000': 100 };
    return percentages[value] || 33;
  };

  const ProgressIndicator = ({ step }) => (
    <div className="progress-container">
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className={`progress-dot ${step === index ? 'active' : ''}`} />
      ))}
    </div>
  );

  const IntroPage = () => (
    <div className="intro-page">
      <div className="intro-content">
        <div className="vivint-logo">
          <svg width="186" height="41" viewBox="0 0 186 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.6394 40.6755H2.94682C2.45385 40.6755 1.96637 40.6755 1.63773 40.512C0.821603 40.3484 0.328641 39.8633 0.164321 39.0455C0.164321 38.5549 0.164321 38.0697 0 37.7427V17.8996C0 16.9237 0.492962 16.1115 1.14477 15.4573C3.4343 13.5057 5.72384 11.3906 8.00789 9.27543C10.4617 6.99674 13.0744 4.55997 15.5283 2.28128C16.1801 1.63256 16.8374 1.14194 17.4892 0.493221C18.3053 -0.155496 19.1214 -0.155496 19.943 0.493221C23.213 3.42062 26.3187 6.34803 29.5887 9.43897C31.7139 11.3906 33.8391 13.3422 35.9643 15.2938C36.293 15.6209 36.7804 16.106 37.1091 16.5967C37.602 17.2454 37.602 18.0631 37.602 18.8754V37.5846C37.602 38.0752 37.602 38.7239 37.4377 39.2091C37.2734 39.8578 36.9448 40.512 36.1286 40.512C35.6357 40.512 35.1482 40.6755 34.6552 40.6755C29.26 40.6755 24.0292 40.6755 18.6394 40.6755ZM18.8038 32.7056H28.2851C29.0482 32.7056 29.4298 32.3258 29.4298 31.5662V20.9905C29.4298 20.4999 29.2655 20.1782 28.9369 19.8512C25.6669 16.9237 22.3969 13.8328 19.2912 10.9054C18.9626 10.5783 18.6358 10.5783 18.3108 10.9054C15.2051 13.8328 12.0995 16.5967 9.15814 19.5295C8.50633 20.0201 8.34201 20.6689 8.34201 21.4811V32.0568C8.23246 32.3839 8.34201 32.6002 8.67065 32.7056H18.8038Z" fill="white"/>
          </svg>
        </div>
        <div className="smart-home-icons">
          <svg width="154" height="173" viewBox="0 0 154 173" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M92.8784 90.7878V64.7393" stroke="#E2B95D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M60.7408 90.7878V64.7393" stroke="#E2B95D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M52.7039 90.7878C48.2685 90.7878 44.667 94.6277 44.667 99.3687V116.525C44.667 126.002 51.86 133.682 60.7358 133.682H92.8784C101.754 133.682 108.947 126.002 108.947 116.525V99.3687C108.947 94.6331 105.351 90.7878 100.91 90.7878H52.6989H52.7039Z" stroke="#E2B95D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M104.934 168H133.058C141.934 168 149.127 160.32 149.127 150.844V73.6313C149.127 68.5793 147.042 63.7847 143.431 60.5239L87.1822 9.05449C81.1947 3.6485 72.4245 3.6485 66.437 9.05449L10.1886 60.5186C6.57703 63.7793 4.49246 68.5739 4.49246 73.6259V150.838C4.49246 160.315 11.6855 167.995 20.5613 167.995H60.7358C69.6115 167.995 76.8046 160.315 76.8046 150.838V133.682" stroke="#E2B95D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="intro-title">How much can you save with Vivint smart home products?</h1>
        <p className="intro-subtitle">Estimate your energy savings by selecting the smart devices you use—or plan to install—in your home.</p>
        <button onClick={() => setCurrentStep(1)} className="get-started-btn">
          <span>Get started</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );

  const HomeProfilePage = () => (
    <div className="calculator-page">
      <div className="calculator-container">
        <button onClick={() => setCurrentStep(0)} className="reset-link">
          <svg width="89" height="14" viewBox="0 0 89 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 7C80 4.8 81.8 3 84 3C86.2 3 88 4.8 88 7C88 9.2 86.2 11 84 11H80M80 11L82 13M80 11L82 9" stroke="#5F7775" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.432 5.368H3.696V6.479H3.168C2.112 6.479 1.771 7.304 1.771 8.173V11H0.583V5.368H1.639L1.771 6.215C2.057 5.742 2.508 5.368 3.432 5.368Z" fill="#5F7775"/>
          </svg>
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
              <input type="range" min="1" max="4" value={
                formData.homeSize === '<1000' ? 1 : formData.homeSize === '1000-2000' ? 2 : formData.homeSize === '2000-3000' ? 3 : 4
              } onChange={(e) => {
                const val = parseInt(e.target.value);
                const newSize = val === 1 ? '<1000' : val === 2 ? '1000-2000' : val === 3 ? '2000-3000' : '>3000';
                setFormData(prev => ({...prev, homeSize: newSize}));
              }} className="range-input house-size-slider" />
            </div>
          </div>
          <div className="form-row">
            <label>Number of people in home</label>
            <div className="form-value">{formData.peopleCount}</div>
            <div className="slider-container">
              <div className="slider-track"></div>
              <div className="slider-fill" style={{width: `${(formData.peopleCount - 1) * 11}%`}}></div>
              <div className="slider-thumb" style={{left: `${(formData.peopleCount - 1) * 11}%`}}></div>
              <input type="range" min="1" max="10" value={formData.peopleCount} onChange={(e) => setFormData(prev => ({...prev, peopleCount: parseInt(e.target.value)}))} className="range-input" />
            </div>
          </div>
          <div className="input-group">
            <label>Monthly electric bill</label>
            <input type="text" value={formData.monthlyBill} onChange={(e) => setFormData(prev => ({...prev, monthlyBill: e.target.value}))} placeholder="e.g., $120" className="form-input" />
            <p className="input-help">If you're not sure, we'll use the national average.</p>
          </div>
          <div className="input-group">
            <label>Electricity rate <span className="optional">Optional</span></label>
            <input type="text" value={formData.electricityRate} onChange={(e) => setFormData(prev => ({...prev, electricityRate: e.target.value}))} placeholder="e.g., $0.19 per kWh" className="form-input" />
            <p className="input-help">National average: $0.19 per kWh (as of March 2025)</p>
          </div>
          <div className="input-group">
            <label>Zip code <span className="optional">Optional</span></label>
            <input type="text" value={formData.zipCode} onChange={(e) => setFormData(prev => ({...prev, zipCode: e.target.value}))} placeholder="e.g., 84043" className="form-input" maxLength="5" />
          </div>
        </div>
        <button onClick={() => setCurrentStep(2)} className="next-btn">
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <ProgressIndicator step={0} />
      </div>
    </div>
  );

  const SmartProductsPage = () => (
    <div className="calculator-page">
      <div className="calculator-container products-container">
        <button onClick={() => setCurrentStep(0)} className="reset-link">
          <svg width="89" height="14" viewBox="0 0 89 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 7C80 4.8 81.8 3 84 3C86.2 3 88 4.8 88 7C88 9.2 86.2 11 84 11H80M80 11L82 13M80 11L82 9" stroke="#5F7775" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.432 5.368H3.696V6.479H3.168C2.112 6.479 1.771 7.304 1.771 8.173V11H0.583V5.368H1.639L1.771 6.215C2.057 5.742 2.508 5.368 3.432 5.368Z" fill="#5F7775"/>
          </svg>
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
                <p className="product-savings">Save up to <span className="savings-amount">${product.annualSavings}/year</span></p>
                <label className="switch">
                  <input type="checkbox" checked={selectedProducts[product.id] || false} onChange={() => setSelectedProducts(prev => ({...prev, [product.id]: !prev[product.id]}))} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setCurrentStep(3)} className="next-btn">
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <ProgressIndicator step={1} />
      </div>
    </div>
  );

  const ResultsPage = () => {
    const currentResults = calculateResults();
    const monthlyBill = parseFloat(formData.monthlyBill) || 120;
    const newBill = Math.max(0, monthlyBill - currentResults.monthlySavings);
    const selectedProductsList = Object.keys(selectedProducts).filter(productId => selectedProducts[productId]).map(productId => smartProducts.find(p => p.id === productId));

    return (
      <div className="calculator-page">
        <div className="calculator-container">
          <button onClick={() => setCurrentStep(0)} className="reset-link">
            <svg width="89" height="14" viewBox="0 0 89 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M80 7C80 4.8 81.8 3 84 3C86.2 3 88 4.8 88 7C88 9.2 86.2 11 84 11H80M80 11L82 13M80 11L82 9" stroke="#5F7775" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.432 5.368H3.696V6.479H3.168C2.112 6.479 1.771 7.304 1.771 8.173V11H0.583V5.368H1.639L1.771 6.215C2.057 5.742 2.508 5.368 3.432 5.368Z" fill="#5F7775"/>
            </svg>
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
              <span className="savings-amount">${currentResults.annualSavings}</span>
              <span className="savings-period">annual savings</span>
            </div>
            <div className="bill-comparison">
              <div className="bill-item">
                <p className="bill-label">Your average monthly bill</p>
                <div className="bill-bar original"><span className="bill-amount">${monthlyBill}</span></div>
              </div>
              <div className="bill-item">
                <p className="bill-label">Your bill with Vivint</p>
                <div className="bill-bar savings" style={{width: `${Math.max((newBill / monthlyBill) * 100, 20)}%`}}>
                  <span className="bill-amount">${Math.round(newBill)}</span>
                </div>
              </div>
            </div>
          </div>
          {selectedProductsList.length > 0 && (
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
          )}
          <button onClick={() => setCurrentStep(4)} className="quote-btn">
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

  const ContactPage = () => (
    <div className="calculator-page">
      <div className="calculator-container">
        <button onClick={() => setCurrentStep(0)} className="reset-link">
          <svg width="89" height="14" viewBox="0 0 89 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 7C80 4.8 81.8 3 84 3C86.2 3 88 4.8 88 7C88 9.2 86.2 11 84 11H80M80 11L82 13M80 11L82 9" stroke="#5F7775" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.432 5.368H3.696V6.479H3.168C2.112 6.479 1.771 7.304 1.771 8.173V11H0.583V5.368H1.639L1.771 6.215C2.057 5.742 2.508 5.368 3.432 5.368Z" fill="#5F7775"/>
          </svg>
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
            <input type="text" value={contactData.name} onChange={(e) => setContactData(prev => ({...prev, name: e.target.value}))} placeholder="John" className="form-input" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={contactData.email} onChange={(e) => setContactData(prev => ({...prev, email: e.target.value}))} placeholder="Johns@email.com" className="form-input" />
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input type="tel" value={contactData.phone} onChange={(e) => setContactData(prev => ({...prev, phone: e.target.value}))} placeholder="900 999 999" className="form-input" />
          </div>
          <div className="input-group">
            <label>Best time to contact</label>
            <select value={contactData.bestTime} onChange={(e) => setContactData(prev => ({...prev, bestTime: e.target.value}))} className="form-input">
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
        </div>
        <button onClick={() => alert('Thank you! Your information has been submitted.')} className="send-btn">
          <span>Send</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <ProgressIndicator step={3} />
      </div>
    </div>
  );

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