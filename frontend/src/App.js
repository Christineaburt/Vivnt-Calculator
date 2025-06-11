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
    electricityRate: '' // Empty initially
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
    // Input validation for numeric fields
    if (field === 'monthlyBill' || field === 'electricityRate') {
      // Allow empty string, numbers, and decimal points
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [field]: value
        }));
      }
      // Don't update state if invalid characters are entered
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    // Phone number validation
    if (field === 'phone') {
      // Allow empty string, numbers, spaces, hyphens, and parentheses
      if (value === '' || /^[\d\s\-\(\)]*$/.test(value)) {
        setContactData(prev => ({
          ...prev,
          [field]: value
        }));
      }
      return;
    }
    
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
      electricityRate: '' // Empty initially
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
          <svg width="186" height="41" viewBox="0 0 186 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.6394 40.6755H2.94682C2.45385 40.6755 1.96637 40.6755 1.63773 40.512C0.821603 40.3484 0.328641 39.8633 0.164321 39.0455C0.164321 38.5549 0.164321 38.0697 0 37.7427V17.8996C0 16.9237 0.492962 16.1115 1.14477 15.4573C3.4343 13.5057 5.72384 11.3906 8.00789 9.27543C10.4617 6.99674 13.0744 4.55997 15.5283 2.28128C16.1801 1.63256 16.8374 1.14194 17.4892 0.493221C18.3053 -0.155496 19.1214 -0.155496 19.943 0.493221C23.213 3.42062 26.3187 6.34803 29.5887 9.43897C31.7139 11.3906 33.8391 13.3422 35.9643 15.2938C36.293 15.6209 36.7804 16.106 37.1091 16.5967C37.602 17.2454 37.602 18.0631 37.602 18.8754V37.5846C37.602 38.0752 37.602 38.7239 37.4377 39.2091C37.2734 39.8578 36.9448 40.512 36.1286 40.512C35.6357 40.512 35.1482 40.6755 34.6552 40.6755C29.26 40.6755 24.0292 40.6755 18.6394 40.6755ZM18.8038 32.7056H28.2851C29.0482 32.7056 29.4298 32.3258 29.4298 31.5662V20.9905C29.4298 20.4999 29.2655 20.1782 28.9369 19.8512C25.6669 16.9237 22.3969 13.8328 19.2912 10.9054C18.9626 10.5783 18.6358 10.5783 18.3108 10.9054C15.2051 13.8328 12.0995 16.5967 9.15814 19.5295C8.50633 20.0201 8.34201 20.6689 8.34201 21.4811V32.0568C8.23246 32.3839 8.34201 32.6002 8.67065 32.7056H18.8038Z" fill="white"/>
            <path d="M146.454 14.6502C146.618 14.3232 146.782 14.1596 147.106 13.838C148.086 12.6986 149.231 12.2135 150.54 11.5593C152.336 10.747 154.297 10.747 156.258 11.0687C158.712 11.3957 160.837 12.3715 162.305 14.3231C162.957 15.1354 163.614 16.2748 163.938 17.2506C164.589 19.0386 164.918 20.8267 164.918 22.7837V39.6994C164.918 40.2409 164.646 40.5117 164.102 40.5117H157.726C157.182 40.5117 156.91 40.1864 156.91 39.5359V22.6202C156.746 21.1538 156.258 19.8563 154.949 18.8805C154.297 18.3899 153.64 18.2318 152.988 18.2318C151.515 18.0683 150.047 18.0683 148.738 19.0441C147.922 19.5347 147.429 20.347 147.106 21.1592C146.613 22.2986 146.454 23.4379 146.454 24.7353V40.0265C146.454 40.5171 146.289 40.5171 145.961 40.6752H139.098C138.769 40.6752 138.446 40.5117 138.605 40.0265V12.8622C138.605 11.5593 138.605 11.7228 139.75 11.7228H145.797C146.341 11.7228 146.613 11.9936 146.613 12.5351V14.4867C146.284 14.4867 146.284 14.6502 146.448 14.6502H146.454Z" fill="white"/>
            <path d="M64.403 30.7537C65.0548 29.1292 65.5478 27.8263 66.0353 26.3599C66.5282 25.057 66.8514 23.7595 67.3444 22.6202C67.8373 21.3173 68.3248 20.178 68.6535 18.8805C68.9821 17.9047 69.3053 16.9289 69.6339 15.9531C69.9625 14.9773 70.2857 14.0015 70.7787 13.0257C70.943 12.6986 71.1073 12.377 71.1073 12.0499C71.2716 11.7228 71.4359 11.7228 71.7591 11.7228H79.2795C79.6082 11.7228 79.7725 11.8864 79.6082 12.2135C79.2795 13.0257 78.9564 13.6799 78.792 14.4922C78.2991 15.6315 77.9759 16.7708 77.4829 17.9102C76.99 19.0495 76.5025 20.1889 76.0095 21.3282C75.5166 22.4676 75.1934 23.6069 74.7004 24.7462C74.2075 26.2127 73.5557 27.5101 73.0682 28.9765C72.5752 30.1159 72.2521 31.2552 71.7591 32.3946C71.2662 33.5339 70.943 34.5097 70.45 35.649C70.1214 36.6248 69.7982 37.4371 69.3053 38.4129C68.9766 39.2252 68.6535 39.8793 68.3248 40.6916C68.3248 40.8551 68.1605 40.8551 67.9962 40.8551H61.133C60.3169 40.8551 60.1526 40.8551 59.9883 40.0429C59.4953 38.9035 59.0078 37.7642 58.6792 36.6248C58.1862 35.4855 57.8631 34.3462 57.3701 33.2068C56.8771 31.9039 56.2253 30.6065 55.7379 29.3036C55.2449 28.1643 54.9217 27.0249 54.4288 25.8856C54.1001 25.0733 53.777 24.0975 53.4483 23.2853C52.9554 22.1459 52.4679 21.0066 52.1392 19.8672C51.6463 18.7279 51.3231 17.7521 50.8301 16.6127C50.3372 15.4734 49.8497 14.3341 49.3567 13.1947C49.1924 12.8676 49.1924 12.7041 49.0281 12.3825C49.0281 12.0554 49.0281 11.8918 49.3567 11.8918H56.3842C57.1474 11.8918 57.6385 12.2716 57.8576 13.0312C58.1862 14.1705 58.6737 15.3099 59.0024 16.4492C59.4953 17.7521 59.8185 18.8914 60.3114 20.1889C60.8044 21.4863 61.2919 22.7892 61.6205 23.9285C61.9492 24.9043 62.2723 25.8801 62.601 26.8559C62.7653 27.5046 63.0939 28.1588 63.2528 28.8075C63.4171 29.2982 63.5814 29.7833 63.7457 30.1104C64.2387 30.274 64.2387 30.4375 64.3975 30.7591L64.403 30.7537Z" fill="white"/>
            <path d="M107.877 30.5901C108.041 30.0995 108.37 29.6143 108.529 29.1237C108.857 28.3115 109.022 27.4992 109.345 26.845C109.673 25.8692 109.997 24.8934 110.325 23.9176C110.654 23.2689 110.818 22.4512 111.141 21.8025C111.306 21.1538 111.634 20.4996 111.793 19.8509C112.122 19.0386 112.286 18.3845 112.609 17.5722C112.774 16.9235 113.102 16.2693 113.261 15.6206C113.59 14.6448 114.077 13.5055 114.406 12.5296C114.57 11.7174 115.058 11.7174 115.551 11.7174H122.578C123.23 11.7174 123.394 11.8809 123.071 12.5296C122.578 13.669 122.091 14.8083 121.598 16.1058C121.105 17.2451 120.781 18.2209 120.288 19.3603C119.796 20.4996 119.308 21.6389 118.979 22.7783C118.486 23.9176 117.999 25.057 117.506 26.1963C117.013 27.3357 116.69 28.475 116.197 29.4508C115.704 30.9172 115.052 32.2147 114.565 33.6811C114.072 34.8204 113.749 35.9598 113.256 37.0991C112.763 38.2385 112.439 39.2143 111.946 40.3536C111.946 40.5172 111.618 40.6807 111.13 40.6807H104.59C103.774 40.6807 103.61 40.1901 103.446 39.5414C102.794 37.7533 101.972 36.1233 101.32 34.3353C100.827 33.0324 100.34 31.5714 99.6881 30.2685C99.1952 28.9656 98.5434 27.6682 98.0559 26.2018C97.5629 25.0624 97.2398 23.9231 96.7468 22.7837C96.4182 21.9715 96.095 21.1592 95.7664 20.3415C95.2734 19.2022 94.7859 18.0628 94.4573 16.9235C94.1286 16.1112 93.8055 15.299 93.4768 14.3232C93.1482 13.5109 92.825 12.6986 92.4964 11.8809C92.3321 11.7174 92.4964 11.5538 92.6607 11.5538H100.181C100.997 11.5538 101.162 11.5538 101.326 12.3661C101.655 13.5055 102.142 14.4813 102.471 15.6206C102.799 16.5964 103.122 17.5722 103.451 18.548C103.944 19.8509 104.432 20.9902 104.76 22.2877C105.089 23.2635 105.412 24.2393 105.741 25.2151C106.234 26.518 106.557 27.6573 107.05 28.9547C107.378 29.6034 107.543 30.0941 107.866 30.5792L107.877 30.5901Z" fill="white"/>
            <path d="M170.97 26.6869V20.3415C170.97 19.909 170.753 19.6928 170.319 19.6928H166.884C166.391 19.6928 166.233 19.6928 166.233 19.0441V12.377C166.233 11.9445 166.45 11.7283 166.884 11.7283H170.319C170.753 11.7283 170.97 11.512 170.97 11.0796V4.07451C170.97 3.53301 171.242 3.26225 171.787 3.26225H178.162C178.706 3.26225 178.978 3.53301 178.978 4.07451V10.9051C178.978 11.5538 179.143 11.5538 179.63 11.5538H184.861C185.624 11.5538 186.006 11.9336 186.006 12.6932V18.8751C186.006 19.5238 185.841 19.6873 185.19 19.6873H179.63C179.086 19.6873 178.814 19.9581 178.814 20.4996V30.0995C178.814 30.7482 178.814 31.4024 178.978 32.0511C179.143 32.8634 179.63 33.1905 180.287 33.5175C180.939 33.8446 181.596 33.8446 182.248 33.8446H184.209C184.538 33.8446 184.861 33.6811 185.19 33.6811C185.683 33.5175 185.841 33.6811 185.841 34.1717V39.0507C185.841 39.863 185.841 40.0265 185.025 40.1901C184.045 40.5171 182.9 40.8388 181.92 40.8388C181.591 40.8388 181.427 41.0023 181.104 41.0023H179.143C178.814 41.0023 178.65 40.8388 178.327 40.8388C176.694 40.6752 175.385 40.1901 174.076 39.2143C172.931 38.402 171.951 37.2627 171.463 35.7962C171.135 34.8204 170.812 33.8446 170.812 32.8688C170.976 30.9172 170.976 28.8021 170.976 26.6869H170.97Z" fill="white"/>
            <path d="M133.703 26.2018V40.1901C133.703 40.5171 133.538 40.6807 133.21 40.6807H126.511C125.857 40.6807 125.53 40.3554 125.53 39.7049V12.5351C125.53 11.8864 125.53 11.7228 126.346 11.7228H132.886C133.538 11.7228 133.703 11.7228 133.703 12.5351V23.9231C133.703 24.5718 133.703 25.3895 133.703 26.2018Z" fill="white"/>
            <path d="M82.2154 26.2018V12.6986C82.2154 11.8864 82.2154 11.7228 83.1958 11.7228H89.5715C90.0644 11.7228 90.2233 11.8864 90.2233 12.3716V39.6994C90.2233 40.35 89.8965 40.6752 89.2428 40.6752H83.1958C82.6517 40.6752 82.3797 40.4045 82.3797 39.863C82.2154 35.3056 82.2154 30.7537 82.2154 26.1963V26.2018Z" fill="white"/>
            <path d="M134.354 4.89222C134.519 7.49254 132.065 9.77123 129.616 9.60768C126.839 9.44414 124.878 7.65608 124.878 4.89222C124.878 2.2919 126.839 0.176757 129.781 0.176757C132.07 0.013215 134.519 2.12836 134.36 4.89222H134.354Z" fill="white"/>
            <path d="M86.1426 0.00777547C88.7553 -0.155767 91.0449 2.28646 90.8806 4.88678C90.8806 7.65064 88.7554 9.60224 85.9783 9.60224C83.3656 9.60224 81.2404 7.4871 81.2404 4.88678C81.2404 2.44455 83.5299 -0.155767 86.1426 0.00777547Z" fill="white"/>
            <path d="M44.46 40.6752C41.8473 40.8388 39.5577 38.3965 39.7221 35.9598C39.7221 33.1959 41.8473 31.2443 44.6243 31.0808C47.237 31.0808 49.3622 33.0324 49.3622 35.9598C49.1979 38.402 47.0727 40.8388 44.46 40.6752Z" fill="white"/>
          </svg>
        </div>
        
        {/* Smart Home Icons */}
        <div className="smart-home-icons">
          <svg width="154" height="173" viewBox="0 0 154 173" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M92.8784 90.7878V64.7393" stroke="#E2B95D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M60.7408 90.7878V64.7393" stroke="#E2B95D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M52.7039 90.7878C48.2685 90.7878 44.667 94.6277 44.667 99.3687V116.525C44.667 126.002 51.86 133.682 60.7358 133.682H92.8784C101.754 133.682 108.947 126.002 108.947 116.525V99.3687C108.947 94.6331 105.351 90.7878 100.91 90.7878H52.6989H52.7039Z" stroke="#E2B95D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M104.934 168H133.058C141.934 168 149.127 160.32 149.127 150.844V73.6313C149.127 68.5793 147.042 63.7847 143.431 60.5239L87.1822 9.05449C81.1947 3.6485 72.4245 3.6485 66.437 9.05449L10.1886 60.5186C6.57703 63.7793 4.49246 68.5739 4.49246 73.6259V150.838C4.49246 160.315 11.6855 167.995 20.5613 167.995H60.7358C69.6115 167.995 76.8046 160.315 76.8046 150.838V133.682" stroke="#E2B95D" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
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
            <div className="slider-container" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = (x / rect.width) * 100;
              
              if (percentage < 25) {
                handleInputChange('homeSize', '<1000');
              } else if (percentage < 50) {
                handleInputChange('homeSize', '1000-2000');
              } else if (percentage < 75) {
                handleInputChange('homeSize', '2000-3000');
              } else {
                handleInputChange('homeSize', '>3000');
              }
            }}>
              <div className="slider-track"></div>
              <div className="slider-fill" style={{width: `${getHomeSizePercentage(formData.homeSize)}%`}}></div>
              <div className="slider-thumb" style={{left: `${getHomeSizePercentage(formData.homeSize)}%`}}></div>
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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