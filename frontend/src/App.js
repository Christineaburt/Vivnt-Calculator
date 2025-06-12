import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state variables
  const [zipCode, setZipCode] = useState('');
  const [homeSize, setHomeSize] = useState('1000-2000');
  const [peopleCount, setPeopleCount] = useState(5);
  const [monthlyBill, setMonthlyBill] = useState('');
  const [electricityRate, setElectricityRate] = useState('');
  
  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bestTime, setBestTime] = useState('Morning');
  
  // Products state
  const [thermostat, setThermostat] = useState(false);
  const [lighting, setLighting] = useState(false);
  const [plugs, setPlugs] = useState(false);
  const [doorlock, setDoorlock] = useState(false);
  const [garage, setGarage] = useState(false);
  const [sensors, setSensors] = useState(false);
  const [cameras, setCameras] = useState(false);
  const [hub, setHub] = useState(false);

  // Error state variables
  const [errors, setErrors] = useState({});

  const smartProducts = [
    { id: 'thermostat', name: 'Smart Thermostat', annualSavings: 180, checked: thermostat, setter: setThermostat, image: 'https://raw.githubusercontent.com/Christineaburt/Vivnt-Calculator/main/public/images/thermostat.jpeg' },
    { id: 'lighting', name: 'Smart Lighting', annualSavings: 60, checked: lighting, setter: setLighting, image: 'https://raw.githubusercontent.com/Christineaburt/Vivnt-Calculator/main/public/images/lighting.jpeg' },
    { id: 'plugs', name: 'Smart Plugs', annualSavings: 40, checked: plugs, setter: setPlugs, image: 'https://raw.githubusercontent.com/Christineaburt/Vivnt-Calculator/main/public/images/plugs.jpeg' },
    { id: 'doorlock', name: 'Smart Door Lock', annualSavings: 10, checked: doorlock, setter: setDoorlock, image: 'https://raw.githubusercontent.com/Christineaburt/Vivnt-Calculator/main/public/images/doorlock.jpeg' },
    { id: 'garage', name: 'Smart Garage Door Controller', annualSavings: 20, checked: garage, setter: setGarage, image: 'https://raw.githubusercontent.com/Christineaburt/Vivnt-Calculator/main/public/images/garage.jpeg' },
    { id: 'sensors', name: 'Security Sensors', annualSavings: 25, checked: sensors, setter: setSensors, image: 'https://raw.githubusercontent.com/Christineaburt/Vivnt-Calculator/main/public/images/sensors.jpeg' },
    { id: 'cameras', name: 'Smart Cameras', annualSavings: 15, checked: cameras, setter: setCameras, image: 'https://raw.githubusercontent.com/Christineaburt/Vivnt-Calculator/main/public/images/cameras.jpeg' },
    { id: 'hub', name: 'Vivint Smart Hub', annualSavings: 5, checked: hub, setter: setHub, image: 'https://raw.githubusercontent.com/Christineaburt/Vivnt-Calculator/main/public/images/hub.jpeg' }
];

  // Validation functions
  const validateZipCode = (value) => {
    if (!value) return true; // Optional field
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length !== 5) {
      return 'Zip code must be exactly 5 digits';
    }
    return true;
  };

  const validateMonthlyBill = (value) => {
    if (!value) return true; // Optional field
    const cleanValue = value.replace(/[$,]/g, '');
    if (!/^\d+(\.\d{1,2})?$/.test(cleanValue)) {
      return 'Please enter numbers only';
    }
    const numValue = parseFloat(cleanValue);
    if (numValue > 3000) {
      return 'Monthly bill cannot exceed $3,000';
    }
    return true;
  };

  const validateElectricityRate = (value) => {
    if (!value) return true; // Optional field
    const cleanValue = value.replace(/[$]/g, '');
    if (!/^\d+(\.\d{1,2})?$/.test(cleanValue)) {
      return 'Please enter numbers only';
    }
    const numValue = parseFloat(cleanValue);
    if (numValue > 0.50) {
      return 'Electricity rate cannot exceed $0.50';
    }
    return true;
  };

  const validateName = (value) => {
    if (!value.trim()) {
      return 'Name is required';
    }
    if (/\d/.test(value)) {
      return 'Name cannot contain numbers';
    }
    return true;
  };

  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return true;
  };

  const validatePhone = (value) => {
    if (!value.trim()) {
      return 'Phone number is required';
    }
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length !== 9) {
      return 'Phone number must be exactly 9 digits';
    }
    return true;
  };

  // Input handlers with validation
  const handleZipCodeChange = (value) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 5);
    setZipCode(cleanValue);
    
    const validation = validateZipCode(cleanValue);
    if (validation !== true) {
      setErrors(prev => ({ ...prev, zipCode: validation }));
    } else {
      setErrors(prev => ({ ...prev, zipCode: null }));
    }
  };

  const handleMonthlyBillChange = (value) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setMonthlyBill(cleanValue);
    
    const validation = validateMonthlyBill(cleanValue);
    if (validation !== true) {
      setErrors(prev => ({ ...prev, monthlyBill: validation }));
    } else {
      setErrors(prev => ({ ...prev, monthlyBill: null }));
    }
  };

  const handleElectricityRateChange = (value) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setElectricityRate(cleanValue);
    
    const validation = validateElectricityRate(cleanValue);
    if (validation !== true) {
      setErrors(prev => ({ ...prev, electricityRate: validation }));
    } else {
      setErrors(prev => ({ ...prev, electricityRate: null }));
    }
  };

  const handleNameChange = (value) => {
    setName(value);
    
    const validation = validateName(value);
    if (validation !== true) {
      setErrors(prev => ({ ...prev, name: validation }));
    } else {
      setErrors(prev => ({ ...prev, name: null }));
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    
    const validation = validateEmail(value);
    if (validation !== true) {
      setErrors(prev => ({ ...prev, email: validation }));
    } else {
      setErrors(prev => ({ ...prev, email: null }));
    }
  };

  const handlePhoneChange = (value) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 9);
    setPhone(cleanValue);
    
    const validation = validatePhone(cleanValue);
    if (validation !== true) {
      setErrors(prev => ({ ...prev, phone: validation }));
    } else {
      setErrors(prev => ({ ...prev, phone: null }));
    }
  };

  const calculateResults = () => {
    const totalAnnualSavings = smartProducts
      .filter(product => product.checked)
      .reduce((total, product) => total + product.annualSavings, 0);
    return { annualSavings: totalAnnualSavings, monthlySavings: totalAnnualSavings / 12 };
  };

  const getHomeSizeLabel = (value) => {
    const labels = {
      '<1000': '<1,000 sq ft',
      '1000-2000': '1,000–2,000 sq ft',
      '2000-3000': '2,000–3,000 sq ft',
      '>3000': '>3,000 sq ft'
    };
    return labels[value] || labels['1000-2000'];
  };

  const getHomeSizePercentage = (value) => {
    const values = { '<1000': 0, '1000-2000': 1, '2000-3000': 2, '>3000': 3 };
    const numValue = values[value] || 0;
    // Use same calculation as people slider: (value / (max - 1)) * 100
    // For 4 positions (0,1,2,3), max-1 = 3
    return (numValue / 3) * 100;
  };

  const resetCalculator = () => {
    setCurrentStep(0);
    setZipCode('');
    setHomeSize('1000-2000');
    setPeopleCount(5);
    setMonthlyBill('');
    setElectricityRate('');
    setName('');
    setEmail('');
    setPhone('');
    setBestTime('Morning');
    setThermostat(false);
    setLighting(false);
    setPlugs(false);
    setDoorlock(false);
    setGarage(false);
    setSensors(false);
    setCameras(false);
    setHub(false);
    setErrors({});
  };

  const canProceedFromProducts = () => {
    return smartProducts.some(product => product.checked);
  };

  const canProceedFromContact = () => {
    const nameValid = validateName(name) === true;
    const emailValid = validateEmail(email) === true;
    const phoneValid = validatePhone(phone) === true;
    return nameValid && emailValid && phoneValid;
  };

  const ProgressIndicator = ({ step }) => (
    <div className="progress-container">
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className={`progress-dot ${step === index ? 'active' : ''}`} />
      ))}
    </div>
  );

  if (currentStep === 0) {
    return (
      <div className="vivint-calculator">
        <div className="intro-page">
          <div className="intro-content">
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
              <svg width="134" height="51" viewBox="0 0 134 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="134" height="51" rx="25.5" fill="#E2B95D"/>
                <path d="M36.5732 33H34.3132V19H36.4132L43.2332 28.92V19H45.4932V33H43.3932L36.5732 23.08V33ZM47.4437 27.9C47.4437 24.72 49.4637 22.64 52.4237 22.64C55.4437 22.64 57.4237 24.52 57.4837 27.52C57.4837 27.78 57.4637 28.06 57.4237 28.34H49.7037V28.46C49.8037 30.22 50.8637 31.36 52.5637 31.36C53.8837 31.36 54.8437 30.7 55.1437 29.56H57.3037C56.9437 31.58 55.2437 33.12 52.7237 33.12C49.4837 33.12 47.4437 31.04 47.4437 27.9ZM49.7837 26.76H55.2437C55.0637 25.24 54.0037 24.38 52.5037 24.38C51.1237 24.38 49.9437 25.3 49.7837 26.76ZM57.8602 33L61.7002 27.76L58.0802 22.76H60.6002L63.0602 26.22L65.5602 22.76H67.9202L64.2802 27.76L68.1402 33H65.6202L62.9202 29.28L60.2002 33H57.8602ZM69.9876 30.22V24.66H68.2076V22.76H69.9876V19.9H72.1676V22.76H74.6276V24.66H72.1676V30C72.1676 30.8 72.4476 31.1 73.2276 31.1H74.8676V33H72.7876C70.8276 33 69.9876 32.08 69.9876 30.22Z" fill="black"/>
                <path d="M97 22.8333L99.6666 25.5M99.6666 25.5L97 28.1666M99.6666 25.5H86.3333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className="vivint-calculator">
        <div className="calculator-page">
          <div className="calculator-container">
            <button onClick={resetCalculator} className="reset-link">
              <svg width="89" height="14" viewBox="0 0 89 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 7C80 4.8 81.8 3 84 3C86.2 3 88 4.8 88 7C88 9.2 86.2 11 84 11H80M80 11L82 13M80 11L82 9" stroke="#5F7775" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.432 5.368H3.696V6.479H3.168C2.112 6.479 1.771 7.304 1.771 8.173V11H0.583V5.368H1.639L1.771 6.215C2.057 5.742 2.508 5.368 3.432 5.368ZM3.97263 8.195C3.97263 6.446 5.08363 5.302 6.71163 5.302C8.37263 5.302 9.46163 6.336 9.49463 7.986C9.49463 8.129 9.48363 8.283 9.46163 8.437H5.21563V8.503C5.27063 9.471 5.85363 10.098 6.78863 10.098C7.51463 10.098 8.04263 9.735 8.20763 9.108H9.39563C9.19763 10.219 8.26263 11.066 6.87663 11.066C5.09463 11.066 3.97263 9.922 3.97263 8.195ZM5.25963 7.568H8.26263C8.16363 6.732 7.58063 6.259 6.75563 6.259C5.99663 6.259 5.34763 6.765 5.25963 7.568ZM10.2248 9.141H11.3688C11.4128 9.724 11.9518 10.142 12.7658 10.142C13.4808 10.142 13.9758 9.856 13.9758 9.394C13.9758 8.8 13.4698 8.745 12.6118 8.635C11.3468 8.481 10.3348 8.217 10.3348 7.051C10.3348 5.984 11.2918 5.291 12.6228 5.302C13.9978 5.302 14.9658 5.94 15.0428 7.095H13.8878C13.8328 6.589 13.3378 6.215 12.6448 6.215C11.9518 6.215 11.4898 6.501 11.4898 6.952C11.4898 7.48 12.0288 7.524 12.8318 7.623C14.0968 7.766 15.1418 8.052 15.1418 9.306C15.1418 10.384 14.1298 11.066 12.7768 11.066C11.2808 11.066 10.2578 10.362 10.2248 9.141ZM15.8965 8.195C15.8965 6.446 17.0075 5.302 18.6355 5.302C20.2965 5.302 21.3855 6.336 21.4185 7.986C21.4185 8.129 21.4075 8.283 21.3855 8.437H17.1395V8.503C17.1945 9.471 17.7775 10.098 18.7125 10.098C19.4385 10.098 19.9665 9.735 20.1315 9.108H21.3195C21.1215 10.219 20.1865 11.066 18.8005 11.066C17.0185 11.066 15.8965 9.922 15.8965 8.195ZM17.1835 7.568H20.1865C20.0875 6.732 19.5045 6.259 18.6795 6.259C17.9205 6.259 17.2715 6.765 17.1835 7.568ZM22.6989 9.471V6.413H21.7199V5.368H22.6989V3.795H23.8979V5.368H25.2509V6.413H23.8979V9.35C23.8979 9.79 24.0519 9.955 24.4809 9.955H25.3829V11H24.2389C23.1609 11 22.6989 10.494 22.6989 9.471ZM32.817 8.976H34.027C33.807 10.263 32.872 11.066 31.431 11.066C29.737 11.066 28.626 9.911 28.626 8.173C28.626 6.446 29.748 5.302 31.464 5.302C32.883 5.302 33.807 6.105 34.027 7.37H32.806C32.652 6.732 32.146 6.314 31.431 6.314C30.474 6.314 29.847 7.073 29.847 8.173C29.847 9.284 30.474 10.054 31.431 10.054C32.168 10.054 32.674 9.636 32.817 8.976ZM40.1385 9.966H40.3695V11H39.7425C38.9725 11 38.7085 10.659 38.7085 10.098C38.3345 10.67 37.7625 11.066 36.8495 11.066C35.6175 11.066 34.7595 10.461 34.7595 9.416C34.7595 8.261 35.5955 7.612 37.1685 7.612H38.5875V7.271C38.5875 6.644 38.1145 6.259 37.3445 6.259C36.6515 6.259 36.1785 6.589 36.0905 7.084H34.9245C35.0455 5.951 35.9805 5.302 37.3995 5.302C38.8955 5.302 39.7645 6.017 39.7645 7.348V9.57C39.7645 9.856 39.9075 9.966 40.1385 9.966ZM38.5875 8.69V8.492H37.1135C36.3875 8.492 35.9695 8.767 35.9695 9.339C35.9695 9.812 36.3655 10.142 37.0145 10.142C38.0045 10.142 38.5765 9.559 38.5875 8.69ZM41.0166 11V3.3H42.2046V11H41.0166ZM47.3511 8.976H48.5611C48.3411 10.263 47.4061 11.066 45.9651 11.066C44.2711 11.066 43.1601 9.911 43.1601 8.173C43.1601 6.446 44.2821 5.302 45.9981 5.302C47.4171 5.302 48.3411 6.105 48.5611 7.37H47.3401C47.1861 6.732 46.6801 6.314 45.9651 6.314C45.0081 6.314 44.3811 7.073 44.3811 8.173C44.3811 9.284 45.0081 10.054 45.9651 10.054C46.7021 10.054 47.2081 9.636 47.3511 8.976ZM53.3747 8.162V5.368H54.5627V11H53.5177L53.3857 10.285C53.0337 10.714 52.5167 11.066 51.6477 11.066C50.4487 11.066 49.4257 10.417 49.4257 8.47V5.368H50.6137V8.349C50.6137 9.449 51.0537 10.032 51.9227 10.032C52.8247 10.032 53.3747 9.328 53.3747 8.162ZM55.7334 11V3.3H56.9214V11H55.7334ZM63.2449 9.966H63.4759V11H62.8489C62.0789 11 61.8149 10.659 61.8149 10.098C61.4409 10.67 60.8689 11.066 59.9559 11.066C58.7239 11.066 57.8659 10.461 57.8659 9.416C57.8659 8.261 58.7019 7.612 60.2749 7.612H61.6939V7.271C61.6939 6.644 61.2209 6.259 60.4509 6.259C59.7579 6.259 59.2849 6.589 59.1969 7.084H58.0309C58.1519 5.951 59.0869 5.302 60.5059 5.302C62.0019 5.302 62.8709 6.017 62.8709 7.348V9.57C62.8709 9.856 63.0139 9.966 63.2449 9.966ZM61.6939 8.69V8.492H60.2199C59.4939 8.492 59.0759 8.767 59.0759 9.339C59.0759 9.812 59.4719 10.142 60.1209 10.142C61.1109 10.142 61.6829 9.559 61.6939 8.69ZM64.486 9.471V6.413H63.507V5.368H64.486V3.795H65.685V5.368H67.038V6.413H65.685V9.35C65.685 9.79 65.839 9.955 66.268 9.955H67.17V11H66.026C64.948 11 64.486 10.494 64.486 9.471ZM70.3514 11.066C68.6354 11.066 67.4804 9.911 67.4804 8.184C67.4804 6.468 68.6354 5.302 70.3514 5.302C72.0674 5.302 73.2224 6.468 73.2224 8.184C73.2224 9.911 72.0674 11.066 70.3514 11.066ZM70.3514 10.054C71.3524 10.054 72.0124 9.273 72.0124 8.184C72.0124 7.095 71.3524 6.314 70.3514 6.314C69.3504 6.314 68.7014 7.095 68.7014 8.184C68.7014 9.273 69.3504 10.054 70.3514 10.054ZM77.0267 5.368H77.2907V6.479H76.7627C75.7067 6.479 75.3657 7.304 75.3657 8.173V11H74.1777V5.368H75.2337L75.3657 6.215C75.6517 5.742 76.1027 5.368 77.0267 5.368Z" fill="#5F7775"/>
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
                <div className="slider-label-row">
                  <label>House size</label>
                  <div className="form-value">{getHomeSizeLabel(homeSize)}</div>
                </div>
                <div className="slider-container">
                  <div className="slider-track"></div>
                  <div className="slider-fill" style={{width: `${getHomeSizePercentage(homeSize)}%`}}></div>
                  <div className="slider-thumb" style={{left: `${getHomeSizePercentage(homeSize)}%`}}></div>
                  <input type="range" min="0" max="3" value={
                    homeSize === '<1000' ? 0 : homeSize === '1000-2000' ? 1 : homeSize === '2000-3000' ? 2 : 3
                  } onChange={(e) => {
                    const val = parseInt(e.target.value);
                    const newSize = val === 0 ? '<1000' : val === 1 ? '1000-2000' : val === 2 ? '2000-3000' : '>3000';
                    setHomeSize(newSize);
                  }} className="range-input house-size-slider" />
                </div>
              </div>
              <div className="form-row">
                <div className="slider-label-row">
                  <label>Number of people in home</label>
                  <div className="form-value">{peopleCount}</div>
                </div>
                <div className="slider-container">
                  <div className="slider-track"></div>
                  <div className="slider-fill" style={{width: `${(peopleCount - 1) * 11.11}%`}}></div>
                  <div className="slider-thumb" style={{left: `${(peopleCount - 1) * 11.11}%`}}></div>
                  <input type="range" min="1" max="10" value={peopleCount} onChange={(e) => setPeopleCount(parseInt(e.target.value))} className="range-input" />
                </div>
              </div>
              <div className="input-group">
                <label>Monthly electric bill</label>
                <input 
                  type="text" 
                  value={monthlyBill} 
                  onChange={(e) => handleMonthlyBillChange(e.target.value)} 
                  placeholder="e.g., 120" 
                  className={`form-input ${errors.monthlyBill ? 'error' : ''}`}
                />
                {errors.monthlyBill && <span className="error-text">{errors.monthlyBill}</span>}
                <p className="input-help">If you're not sure, we'll use the national average.</p>
              </div>
              <div className="input-group">
                <label>Electricity rate <span className="optional">Optional</span></label>
                <input 
                  type="text" 
                  value={electricityRate} 
                  onChange={(e) => handleElectricityRateChange(e.target.value)} 
                  placeholder="e.g., 0.19" 
                  className={`form-input ${errors.electricityRate ? 'error' : ''}`}
                />
                {errors.electricityRate && <span className="error-text">{errors.electricityRate}</span>}
                <p className="input-help">National average: $0.19 per kWh (as of March 2025)</p>
              </div>
              <div className="input-group">
                <label>Zip code <span className="optional">Optional</span></label>
                <input 
                  type="text" 
                  value={zipCode} 
                  onChange={(e) => handleZipCodeChange(e.target.value)} 
                  placeholder="e.g., 84043" 
                  className={`form-input ${errors.zipCode ? 'error' : ''}`}
                  maxLength="5" 
                />
                {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
              </div>
            </div>
            <button onClick={() => setCurrentStep(2)} className="next-btn">
              <svg width="134" height="51" viewBox="0 0 134 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="134" height="51" rx="25.5" fill="#E2B95D"/>
                <path d="M36.5732 33H34.3132V19H36.4132L43.2332 28.92V19H45.4932V33H43.3932L36.5732 23.08V33ZM47.4437 27.9C47.4437 24.72 49.4637 22.64 52.4237 22.64C55.4437 22.64 57.4237 24.52 57.4837 27.52C57.4837 27.78 57.4637 28.06 57.4237 28.34H49.7037V28.46C49.8037 30.22 50.8637 31.36 52.5637 31.36C53.8837 31.36 54.8437 30.7 55.1437 29.56H57.3037C56.9437 31.58 55.2437 33.12 52.7237 33.12C49.4837 33.12 47.4437 31.04 47.4437 27.9ZM49.7837 26.76H55.2437C55.0637 25.24 54.0037 24.38 52.5037 24.38C51.1237 24.38 49.9437 25.3 49.7837 26.76ZM57.8602 33L61.7002 27.76L58.0802 22.76H60.6002L63.0602 26.22L65.5602 22.76H67.9202L64.2802 27.76L68.1402 33H65.6202L62.9202 29.28L60.2002 33H57.8602ZM69.9876 30.22V24.66H68.2076V22.76H69.9876V19.9H72.1676V22.76H74.6276V24.66H72.1676V30C72.1676 30.8 72.4476 31.1 73.2276 31.1H74.8676V33H72.7876C70.8276 33 69.9876 32.08 69.9876 30.22Z" fill="black"/>
                <path d="M97 22.8333L99.6666 25.5M99.6666 25.5L97 28.1666M99.6666 25.5H86.3333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <ProgressIndicator step={0} />
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="vivint-calculator">
        <div className="calculator-page">
          <div className="calculator-container products-container">
            <button onClick={resetCalculator} className="reset-link">
              <svg width="89" height="14" viewBox="0 0 89 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 7C80 4.8 81.8 3 84 3C86.2 3 88 4.8 88 7C88 9.2 86.2 11 84 11H80M80 11L82 13M80 11L82 9" stroke="#5F7775" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.432 5.368H3.696V6.479H3.168C2.112 6.479 1.771 7.304 1.771 8.173V11H0.583V5.368H1.639L1.771 6.215C2.057 5.742 2.508 5.368 3.432 5.368ZM3.97263 8.195C3.97263 6.446 5.08363 5.302 6.71163 5.302C8.37263 5.302 9.46163 6.336 9.49463 7.986C9.49463 8.129 9.48363 8.283 9.46163 8.437H5.21563V8.503C5.27063 9.471 5.85363 10.098 6.78863 10.098C7.51463 10.098 8.04263 9.735 8.20763 9.108H9.39563C9.19763 10.219 8.26263 11.066 6.87663 11.066C5.09463 11.066 3.97263 9.922 3.97263 8.195ZM5.25963 7.568H8.26263C8.16363 6.732 7.58063 6.259 6.75563 6.259C5.99663 6.259 5.34763 6.765 5.25963 7.568ZM10.2248 9.141H11.3688C11.4128 9.724 11.9518 10.142 12.7658 10.142C13.4808 10.142 13.9758 9.856 13.9758 9.394C13.9758 8.8 13.4698 8.745 12.6118 8.635C11.3468 8.481 10.3348 8.217 10.3348 7.051C10.3348 5.984 11.2918 5.291 12.6228 5.302C13.9978 5.302 14.9658 5.94 15.0428 7.095H13.8878C13.8328 6.589 13.3378 6.215 12.6448 6.215C11.9518 6.215 11.4898 6.501 11.4898 6.952C11.4898 7.48 12.0288 7.524 12.8318 7.623C14.0968 7.766 15.1418 8.052 15.1418 9.306C15.1418 10.384 14.1298 11.066 12.7768 11.066C11.2808 11.066 10.2578 10.362 10.2248 9.141ZM15.8965 8.195C15.8965 6.446 17.0075 5.302 18.6355 5.302C20.2965 5.302 21.3855 6.336 21.4185 7.986C21.4185 8.129 21.4075 8.283 21.3855 8.437H17.1395V8.503C17.1945 9.471 17.7775 10.098 18.7125 10.098C19.4385 10.098 19.9665 9.735 20.1315 9.108H21.3195C21.1215 10.219 20.1865 11.066 18.8005 11.066C17.0185 11.066 15.8965 9.922 15.8965 8.195ZM17.1835 7.568H20.1865C20.0875 6.732 19.5045 6.259 18.6795 6.259C17.9205 6.259 17.2715 6.765 17.1835 7.568ZM22.6989 9.471V6.413H21.7199V5.368H22.6989V3.795H23.8979V5.368H25.2509V6.413H23.8979V9.35C23.8979 9.79 24.0519 9.955 24.4809 9.955H25.3829V11H24.2389C23.1609 11 22.6989 10.494 22.6989 9.471ZM32.817 8.976H34.027C33.807 10.263 32.872 11.066 31.431 11.066C29.737 11.066 28.626 9.911 28.626 8.173C28.626 6.446 29.748 5.302 31.464 5.302C32.883 5.302 33.807 6.105 34.027 7.37H32.806C32.652 6.732 32.146 6.314 31.431 6.314C30.474 6.314 29.847 7.073 29.847 8.173C29.847 9.284 30.474 10.054 31.431 10.054C32.168 10.054 32.674 9.636 32.817 8.976ZM40.1385 9.966H40.3695V11H39.7425C38.9725 11 38.7085 10.659 38.7085 10.098C38.3345 10.67 37.7625 11.066 36.8495 11.066C35.6175 11.066 34.7595 10.461 34.7595 9.416C34.7595 8.261 35.5955 7.612 37.1685 7.612H38.5875V7.271C38.5875 6.644 38.1145 6.259 37.3445 6.259C36.6515 6.259 36.1785 6.589 36.0905 7.084H34.9245C35.0455 5.951 35.9805 5.302 37.3995 5.302C38.8955 5.302 39.7645 6.017 39.7645 7.348V9.57C39.7645 9.856 39.9075 9.966 40.1385 9.966ZM38.5875 8.69V8.492H37.1135C36.3875 8.492 35.9695 8.767 35.9695 9.339C35.9695 9.812 36.3655 10.142 37.0145 10.142C38.0045 10.142 38.5765 9.559 38.5875 8.69ZM41.0166 11V3.3H42.2046V11H41.0166ZM47.3511 8.976H48.5611C48.3411 10.263 47.4061 11.066 45.9651 11.066C44.2711 11.066 43.1601 9.911 43.1601 8.173C43.1601 6.446 44.2821 5.302 45.9981 5.302C47.4171 5.302 48.3411 6.105 48.5611 7.37H47.3401C47.1861 6.732 46.6801 6.314 45.9651 6.314C45.0081 6.314 44.3811 7.073 44.3811 8.173C44.3811 9.284 45.0081 10.054 45.9651 10.054C46.7021 10.054 47.2081 9.636 47.3511 8.976ZM53.3747 8.162V5.368H54.5627V11H53.5177L53.3857 10.285C53.0337 10.714 52.5167 11.066 51.6477 11.066C50.4487 11.066 49.4257 10.417 49.4257 8.47V5.368H50.6137V8.349C50.6137 9.449 51.0537 10.032 51.9227 10.032C52.8247 10.032 53.3747 9.328 53.3747 8.162ZM55.7334 11V3.3H56.9214V11H55.7334ZM63.2449 9.966H63.4759V11H62.8489C62.0789 11 61.8149 10.659 61.8149 10.098C61.4409 10.67 60.8689 11.066 59.9559 11.066C58.7239 11.066 57.8659 10.461 57.8659 9.416C57.8659 8.261 58.7019 7.612 60.2749 7.612H61.6939V7.271C61.6939 6.644 61.2209 6.259 60.4509 6.259C59.7579 6.259 59.2849 6.589 59.1969 7.084H58.0309C58.1519 5.951 59.0869 5.302 60.5059 5.302C62.0019 5.302 62.8709 6.017 62.8709 7.348V9.57C62.8709 9.856 63.0139 9.966 63.2449 9.966ZM61.6939 8.69V8.492H60.2199C59.4939 8.492 59.0759 8.767 59.0759 9.339C59.0759 9.812 59.4719 10.142 60.1209 10.142C61.1109 10.142 61.6829 9.559 61.6939 8.69ZM64.486 9.471V6.413H63.507V5.368H64.486V3.795H65.685V5.368H67.038V6.413H65.685V9.35C65.685 9.79 65.839 9.955 66.268 9.955H67.17V11H66.026C64.948 11 64.486 10.494 64.486 9.471ZM70.3514 11.066C68.6354 11.066 67.4804 9.911 67.4804 8.184C67.4804 6.468 68.6354 5.302 70.3514 5.302C72.0674 5.302 73.2224 6.468 73.2224 8.184C73.2224 9.911 72.0674 11.066 70.3514 11.066ZM70.3514 10.054C71.3524 10.054 72.0124 9.273 72.0124 8.184C72.0124 7.095 71.3524 6.314 70.3514 6.314C69.3504 6.314 68.7014 7.095 68.7014 8.184C68.7014 9.273 69.3504 10.054 70.3514 10.054ZM77.0267 5.368H77.2907V6.479H76.7627C75.7067 6.479 75.3657 7.304 75.3657 8.173V11H74.1777V5.368H75.2337L75.3657 6.215C75.6517 5.742 76.1027 5.368 77.0267 5.368Z" fill="#5F7775"/>
              </svg>
            </button>
            <div className="page-header">
              <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 24.7316C15.4212 23.5984 17.1859 22.9829 19.0035 22.9866C20.8212 22.9902 22.5834 23.6127 24 24.7516M19 30.9998H19.02M9 18.5074C11.8378 16.2353 15.3647 14.9973 19 14.9973C22.6353 14.9973 26.1622 16.2353 29 18.5074M1 16.9994C0.999861 16.4175 1.12667 15.8426 1.37158 15.3148C1.61648 14.787 1.9736 14.3189 2.418 13.9433L16.418 1.94499C17.14 1.33479 18.0547 1 19 1C19.9453 1 20.86 1.33479 21.582 1.94499L35.582 13.9433C36.0264 14.3189 36.3835 14.787 36.6284 15.3148C36.8733 15.8426 37.0001 16.4175 37 16.9994V34.9999C37 36.0608 36.5786 37.0782 35.8284 37.8284C35.0783 38.5786 34.0609 39 33 39H5C3.93913 39 2.92172 38.5786 2.17157 37.8284C1.42143 37.0782 1 36.0608 1 34.9999V16.9994Z" stroke="#BFC8C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h2>Choose your<br/>smart home products</h2>
            </div>
            <div className="products-list">
              {smartProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="image-placeholder">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#BFC8C7" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21,15 16,10 5,21"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-savings">Save up to <span className="savings-amount">${product.annualSavings}</span></p>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={product.checked} 
                        onChange={() => product.setter(!product.checked)} 
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {!canProceedFromProducts() && (
              <div className="validation-message">
                Please select at least one smart home product to continue.
              </div>
            )}
            <button 
              onClick={() => setCurrentStep(3)} 
              className={`next-btn ${!canProceedFromProducts() ? 'disabled' : ''}`}
              disabled={!canProceedFromProducts()}
            >
              <svg width="134" height="51" viewBox="0 0 134 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="134" height="51" rx="25.5" fill="#E2B95D"/>
                <path d="M36.5732 33H34.3132V19H36.4132L43.2332 28.92V19H45.4932V33H43.3932L36.5732 23.08V33ZM47.4437 27.9C47.4437 24.72 49.4637 22.64 52.4237 22.64C55.4437 22.64 57.4237 24.52 57.4837 27.52C57.4837 27.78 57.4637 28.06 57.4237 28.34H49.7037V28.46C49.8037 30.22 50.8637 31.36 52.5637 31.36C53.8837 31.36 54.8437 30.7 55.1437 29.56H57.3037C56.9437 31.58 55.2437 33.12 52.7237 33.12C49.4837 33.12 47.4437 31.04 47.4437 27.9ZM49.7837 26.76H55.2437C55.0637 25.24 54.0037 24.38 52.5037 24.38C51.1237 24.38 49.9437 25.3 49.7837 26.76ZM57.8602 33L61.7002 27.76L58.0802 22.76H60.6002L63.0602 26.22L65.5602 22.76H67.9202L64.2802 27.76L68.1402 33H65.6202L62.9202 29.28L60.2002 33H57.8602ZM69.9876 30.22V24.66H68.2076V22.76H69.9876V19.9H72.1676V22.76H74.6276V24.66H72.1676V30C72.1676 30.8 72.4476 31.1 73.2276 31.1H74.8676V33H72.7876C70.8276 33 69.9876 32.08 69.9876 30.22Z" fill="black"/>
                <path d="M97 22.8333L99.6666 25.5M99.6666 25.5L97 28.1666M99.6666 25.5H86.3333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <ProgressIndicator step={1} />
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    const currentResults = calculateResults();
    const bill = parseFloat(monthlyBill) || 120;
    const newBill = Math.max(0, bill - currentResults.monthlySavings);
    const selectedProductsList = smartProducts.filter(product => product.checked);

    return (
      <div className="vivint-calculator">
        <div className="calculator-page">
          <div className="calculator-container">
            <button onClick={resetCalculator} className="reset-link">
              <svg width="89" height="14" viewBox="0 0 89 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 7C80 4.8 81.8 3 84 3C86.2 3 88 4.8 88 7C88 9.2 86.2 11 84 11H80M80 11L82 13M80 11L82 9" stroke="#5F7775" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.432 5.368H3.696V6.479H3.168C2.112 6.479 1.771 7.304 1.771 8.173V11H0.583V5.368H1.639L1.771 6.215C2.057 5.742 2.508 5.368 3.432 5.368ZM3.97263 8.195C3.97263 6.446 5.08363 5.302 6.71163 5.302C8.37263 5.302 9.46163 6.336 9.49463 7.986C9.49463 8.129 9.48363 8.283 9.46163 8.437H5.21563V8.503C5.27063 9.471 5.85363 10.098 6.78863 10.098C7.51463 10.098 8.04263 9.735 8.20763 9.108H9.39563C9.19763 10.219 8.26263 11.066 6.87663 11.066C5.09463 11.066 3.97263 9.922 3.97263 8.195ZM5.25963 7.568H8.26263C8.16363 6.732 7.58063 6.259 6.75563 6.259C5.99663 6.259 5.34763 6.765 5.25963 7.568ZM10.2248 9.141H11.3688C11.4128 9.724 11.9518 10.142 12.7658 10.142C13.4808 10.142 13.9758 9.856 13.9758 9.394C13.9758 8.8 13.4698 8.745 12.6118 8.635C11.3468 8.481 10.3348 8.217 10.3348 7.051C10.3348 5.984 11.2918 5.291 12.6228 5.302C13.9978 5.302 14.9658 5.94 15.0428 7.095H13.8878C13.8328 6.589 13.3378 6.215 12.6448 6.215C11.9518 6.215 11.4898 6.501 11.4898 6.952C11.4898 7.48 12.0288 7.524 12.8318 7.623C14.0968 7.766 15.1418 8.052 15.1418 9.306C15.1418 10.384 14.1298 11.066 12.7768 11.066C11.2808 11.066 10.2578 10.362 10.2248 9.141ZM15.8965 8.195C15.8965 6.446 17.0075 5.302 18.6355 5.302C20.2965 5.302 21.3855 6.336 21.4185 7.986C21.4185 8.129 21.4075 8.283 21.3855 8.437H17.1395V8.503C17.1945 9.471 17.7775 10.098 18.7125 10.098C19.4385 10.098 19.9665 9.735 20.1315 9.108H21.3195C21.1215 10.219 20.1865 11.066 18.8005 11.066C17.0185 11.066 15.8965 9.922 15.8965 8.195ZM17.1835 7.568H20.1865C20.0875 6.732 19.5045 6.259 18.6795 6.259C17.9205 6.259 17.2715 6.765 17.1835 7.568ZM22.6989 9.471V6.413H21.7199V5.368H22.6989V3.795H23.8979V5.368H25.2509V6.413H23.8979V9.35C23.8979 9.79 24.0519 9.955 24.4809 9.955H25.3829V11H24.2389C23.1609 11 22.6989 10.494 22.6989 9.471ZM32.817 8.976H34.027C33.807 10.263 32.872 11.066 31.431 11.066C29.737 11.066 28.626 9.911 28.626 8.173C28.626 6.446 29.748 5.302 31.464 5.302C32.883 5.302 33.807 6.105 34.027 7.37H32.806C32.652 6.732 32.146 6.314 31.431 6.314C30.474 6.314 29.847 7.073 29.847 8.173C29.847 9.284 30.474 10.054 31.431 10.054C32.168 10.054 32.674 9.636 32.817 8.976ZM40.1385 9.966H40.3695V11H39.7425C38.9725 11 38.7085 10.659 38.7085 10.098C38.3345 10.67 37.7625 11.066 36.8495 11.066C35.6175 11.066 34.7595 10.461 34.7595 9.416C34.7595 8.261 35.5955 7.612 37.1685 7.612H38.5875V7.271C38.5875 6.644 38.1145 6.259 37.3445 6.259C36.6515 6.259 36.1785 6.589 36.0905 7.084H34.9245C35.0455 5.951 35.9805 5.302 37.3995 5.302C38.8955 5.302 39.7645 6.017 39.7645 7.348V9.57C39.7645 9.856 39.9075 9.966 40.1385 9.966ZM38.5875 8.69V8.492H37.1135C36.3875 8.492 35.9695 8.767 35.9695 9.339C35.9695 9.812 36.3655 10.142 37.0145 10.142C38.0045 10.142 38.5765 9.559 38.5875 8.69ZM41.0166 11V3.3H42.2046V11H41.0166ZM47.3511 8.976H48.5611C48.3411 10.263 47.4061 11.066 45.9651 11.066C44.2711 11.066 43.1601 9.911 43.1601 8.173C43.1601 6.446 44.2821 5.302 45.9981 5.302C47.4171 5.302 48.3411 6.105 48.5611 7.37H47.3401C47.1861 6.732 46.6801 6.314 45.9651 6.314C45.0081 6.314 44.3811 7.073 44.3811 8.173C44.3811 9.284 45.0081 10.054 45.9651 10.054C46.7021 10.054 47.2081 9.636 47.3511 8.976ZM53.3747 8.162V5.368H54.5627V11H53.5177L53.3857 10.285C53.0337 10.714 52.5167 11.066 51.6477 11.066C50.4487 11.066 49.4257 10.417 49.4257 8.47V5.368H50.6137V8.349C50.6137 9.449 51.0537 10.032 51.9227 10.032C52.8247 10.032 53.3747 9.328 53.3747 8.162ZM55.7334 11V3.3H56.9214V11H55.7334ZM63.2449 9.966H63.4759V11H62.8489C62.0789 11 61.8149 10.659 61.8149 10.098C61.4409 10.67 60.8689 11.066 59.9559 11.066C58.7239 11.066 57.8659 10.461 57.8659 9.416C57.8659 8.261 58.7019 7.612 60.2749 7.612H61.6939V7.271C61.6939 6.644 61.2209 6.259 60.4509 6.259C59.7579 6.259 59.2849 6.589 59.1969 7.084H58.0309C58.1519 5.951 59.0869 5.302 60.5059 5.302C62.0019 5.302 62.8709 6.017 62.8709 7.348V9.57C62.8709 9.856 63.0139 9.966 63.2449 9.966ZM61.6939 8.69V8.492H60.2199C59.4939 8.492 59.0759 8.767 59.0759 9.339C59.0759 9.812 59.4719 10.142 60.1209 10.142C61.1109 10.142 61.6829 9.559 61.6939 8.69ZM64.486 9.471V6.413H63.507V5.368H64.486V3.795H65.685V5.368H67.038V6.413H65.685V9.35C65.685 9.79 65.839 9.955 66.268 9.955H67.17V11H66.026C64.948 11 64.486 10.494 64.486 9.471ZM70.3514 11.066C68.6354 11.066 67.4804 9.911 67.4804 8.184C67.4804 6.468 68.6354 5.302 70.3514 5.302C72.0674 5.302 73.2224 6.468 73.2224 8.184C73.2224 9.911 72.0674 11.066 70.3514 11.066ZM70.3514 10.054C71.3524 10.054 72.0124 9.273 72.0124 8.184C72.0124 7.095 71.3524 6.314 70.3514 6.314C69.3504 6.314 68.7014 7.095 68.7014 8.184C68.7014 9.273 69.3504 10.054 70.3514 10.054ZM77.0267 5.368H77.2907V6.479H76.7627C75.7067 6.479 75.3657 7.304 75.3657 8.173V11H74.1777V5.368H75.2337L75.3657 6.215C75.6517 5.742 76.1027 5.368 77.0267 5.368Z" fill="#5F7775"/>
              </svg>
            </button>
            <div className="page-header">
              <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.3593 33H4.36589C2.51035 33 1.00659 31.4923 1.00659 29.6319V14.4736C1.00659 13.4818 1.44239 12.5406 2.19741 11.9004L13.9565 1.79597C15.2083 0.734676 17.0417 0.734676 18.2935 1.79597L30.0526 11.8994C30.8076 12.5395 31.2434 13.4808 31.2434 14.4726V29.6308C31.2434 31.4912 29.7396 32.9989 27.8841 32.9989H19.4853" stroke="#BFC8C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.9608 15.4275H13.7077C12.373 15.4275 11.2904 16.513 11.2904 17.8513C11.2904 19.1895 12.373 20.275 13.7077 20.275H18.5424C19.8771 20.275 20.9598 21.3605 20.9598 22.6987C20.9598 24.0369 19.8771 25.1224 18.5424 25.1224H11.2893" stroke="#BFC8C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.1249 27.5472V13.0038" stroke="#BFC8C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h2>Results</h2>
            </div>
            <div className="results-card">
              <h3 className="results-title">Here's how much you<br/>could save with Vivint</h3>
              <div className="savings-display">
                <span className="savings-amount">${currentResults.annualSavings}</span>
                <span className="savings-period">annual savings</span>
              </div>
              <div className="bill-comparison">
                <div className="bill-item">
                  <p className="bill-label">Your average monthly bill</p>
                  <div className="bill-bar original"><span className="bill-amount">${bill}</span></div>
                </div>
                <div className="bill-item">
                  <p className="bill-label">Your bill with Vivint</p>
                  <div className="bill-bar savings" style={{width: `${Math.max((newBill / bill) * 100, 20)}%`}}>
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
        <span className="breakdown-amount">
          {`$${Math.round(product.annualSavings / 12)}/month`}
        </span>
      </div>
      <div className="breakdown-bar">
        <div
          className="breakdown-fill"
          style={{ width: `${(product.annualSavings / 200) * 100}%` }}
        ></div>
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
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="vivint-calculator">
        <div className="calculator-page">
          <div className="calculator-container">
            <button onClick={resetCalculator} className="reset-link">
              <svg width="89" height="14" viewBox="0 0 89 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 7C80 4.8 81.8 3 84 3C86.2 3 88 4.8 88 7C88 9.2 86.2 11 84 11H80M80 11L82 13M80 11L82 9" stroke="#5F7775" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.432 5.368H3.696V6.479H3.168C2.112 6.479 1.771 7.304 1.771 8.173V11H0.583V5.368H1.639L1.771 6.215C2.057 5.742 2.508 5.368 3.432 5.368ZM3.97263 8.195C3.97263 6.446 5.08363 5.302 6.71163 5.302C8.37263 5.302 9.46163 6.336 9.49463 7.986C9.49463 8.129 9.48363 8.283 9.46163 8.437H5.21563V8.503C5.27063 9.471 5.85363 10.098 6.78863 10.098C7.51463 10.098 8.04263 9.735 8.20763 9.108H9.39563C9.19763 10.219 8.26263 11.066 6.87663 11.066C5.09463 11.066 3.97263 9.922 3.97263 8.195ZM5.25963 7.568H8.26263C8.16363 6.732 7.58063 6.259 6.75563 6.259C5.99663 6.259 5.34763 6.765 5.25963 7.568ZM10.2248 9.141H11.3688C11.4128 9.724 11.9518 10.142 12.7658 10.142C13.4808 10.142 13.9758 9.856 13.9758 9.394C13.9758 8.8 13.4698 8.745 12.6118 8.635C11.3468 8.481 10.3348 8.217 10.3348 7.051C10.3348 5.984 11.2918 5.291 12.6228 5.302C13.9978 5.302 14.9658 5.94 15.0428 7.095H13.8878C13.8328 6.589 13.3378 6.215 12.6448 6.215C11.9518 6.215 11.4898 6.501 11.4898 6.952C11.4898 7.48 12.0288 7.524 12.8318 7.623C14.0968 7.766 15.1418 8.052 15.1418 9.306C15.1418 10.384 14.1298 11.066 12.7768 11.066C11.2808 11.066 10.2578 10.362 10.2248 9.141ZM15.8965 8.195C15.8965 6.446 17.0075 5.302 18.6355 5.302C20.2965 5.302 21.3855 6.336 21.4185 7.986C21.4185 8.129 21.4075 8.283 21.3855 8.437H17.1395V8.503C17.1945 9.471 17.7775 10.098 18.7125 10.098C19.4385 10.098 19.9665 9.735 20.1315 9.108H21.3195C21.1215 10.219 20.1865 11.066 18.8005 11.066C17.0185 11.066 15.8965 9.922 15.8965 8.195ZM17.1835 7.568H20.1865C20.0875 6.732 19.5045 6.259 18.6795 6.259C17.9205 6.259 17.2715 6.765 17.1835 7.568ZM22.6989 9.471V6.413H21.7199V5.368H22.6989V3.795H23.8979V5.368H25.2509V6.413H23.8979V9.35C23.8979 9.79 24.0519 9.955 24.4809 9.955H25.3829V11H24.2389C23.1609 11 22.6989 10.494 22.6989 9.471ZM32.817 8.976H34.027C33.807 10.263 32.872 11.066 31.431 11.066C29.737 11.066 28.626 9.911 28.626 8.173C28.626 6.446 29.748 5.302 31.464 5.302C32.883 5.302 33.807 6.105 34.027 7.37H32.806C32.652 6.732 32.146 6.314 31.431 6.314C30.474 6.314 29.847 7.073 29.847 8.173C29.847 9.284 30.474 10.054 31.431 10.054C32.168 10.054 32.674 9.636 32.817 8.976ZM40.1385 9.966H40.3695V11H39.7425C38.9725 11 38.7085 10.659 38.7085 10.098C38.3345 10.67 37.7625 11.066 36.8495 11.066C35.6175 11.066 34.7595 10.461 34.7595 9.416C34.7595 8.261 35.5955 7.612 37.1685 7.612H38.5875V7.271C38.5875 6.644 38.1145 6.259 37.3445 6.259C36.6515 6.259 36.1785 6.589 36.0905 7.084H34.9245C35.0455 5.951 35.9805 5.302 37.3995 5.302C38.8955 5.302 39.7645 6.017 39.7645 7.348V9.57C39.7645 9.856 39.9075 9.966 40.1385 9.966ZM38.5875 8.69V8.492H37.1135C36.3875 8.492 35.9695 8.767 35.9695 9.339C35.9695 9.812 36.3655 10.142 37.0145 10.142C38.0045 10.142 38.5765 9.559 38.5875 8.69ZM41.0166 11V3.3H42.2046V11H41.0166ZM47.3511 8.976H48.5611C48.3411 10.263 47.4061 11.066 45.9651 11.066C44.2711 11.066 43.1601 9.911 43.1601 8.173C43.1601 6.446 44.2821 5.302 45.9981 5.302C47.4171 5.302 48.3411 6.105 48.5611 7.37H47.3401C47.1861 6.732 46.6801 6.314 45.9651 6.314C45.0081 6.314 44.3811 7.073 44.3811 8.173C44.3811 9.284 45.0081 10.054 45.9651 10.054C46.7021 10.054 47.2081 9.636 47.3511 8.976ZM53.3747 8.162V5.368H54.5627V11H53.5177L53.3857 10.285C53.0337 10.714 52.5167 11.066 51.6477 11.066C50.4487 11.066 49.4257 10.417 49.4257 8.47V5.368H50.6137V8.349C50.6137 9.449 51.0537 10.032 51.9227 10.032C52.8247 10.032 53.3747 9.328 53.3747 8.162ZM55.7334 11V3.3H56.9214V11H55.7334ZM63.2449 9.966H63.4759V11H62.8489C62.0789 11 61.8149 10.659 61.8149 10.098C61.4409 10.67 60.8689 11.066 59.9559 11.066C58.7239 11.066 57.8659 10.461 57.8659 9.416C57.8659 8.261 58.7019 7.612 60.2749 7.612H61.6939V7.271C61.6939 6.644 61.2209 6.259 60.4509 6.259C59.7579 6.259 59.2849 6.589 59.1969 7.084H58.0309C58.1519 5.951 59.0869 5.302 60.5059 5.302C62.0019 5.302 62.8709 6.017 62.8709 7.348V9.57C62.8709 9.856 63.0139 9.966 63.2449 9.966ZM61.6939 8.69V8.492H60.2199C59.4939 8.492 59.0759 8.767 59.0759 9.339C59.0759 9.812 59.4719 10.142 60.1209 10.142C61.1109 10.142 61.6829 9.559 61.6939 8.69ZM64.486 9.471V6.413H63.507V5.368H64.486V3.795H65.685V5.368H67.038V6.413H65.685V9.35C65.685 9.79 65.839 9.955 66.268 9.955H67.17V11H66.026C64.948 11 64.486 10.494 64.486 9.471ZM70.3514 11.066C68.6354 11.066 67.4804 9.911 67.4804 8.184C67.4804 6.468 68.6354 5.302 70.3514 5.302C72.0674 5.302 73.2224 6.468 73.2224 8.184C73.2224 9.911 72.0674 11.066 70.3514 11.066ZM70.3514 10.054C71.3524 10.054 72.0124 9.273 72.0124 8.184C72.0124 7.095 71.3524 6.314 70.3514 6.314C69.3504 6.314 68.7014 7.095 68.7014 8.184C68.7014 9.273 69.3504 10.054 70.3514 10.054ZM77.0267 5.368H77.2907V6.479H76.7627C75.7067 6.479 75.3657 7.304 75.3657 8.173V11H74.1777V5.368H75.2337L75.3657 6.215C75.6517 5.742 76.1027 5.368 77.0267 5.368Z" fill="#5F7775"/>
              </svg>
            </button>
            <div className="page-header">
              <svg width="137" height="32" viewBox="0 0 137 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.3702 4.00012C22.8237 4.25877 25.1155 5.34751 26.8665 7.08629C28.6176 8.82507 29.723 11.1097 30 13.5624M20.3702 8.81741C21.5541 9.05097 22.6404 9.63517 23.4883 10.4942C24.3362 11.3532 24.9064 12.4474 25.1249 13.6347M29.9398 21.9686V25.5816C29.9412 25.917 29.8725 26.249 29.7382 26.5563C29.6039 26.8636 29.4069 27.1395 29.1599 27.3662C28.9129 27.593 28.6212 27.7656 28.3036 27.873C27.9861 27.9805 27.6496 28.0204 27.3157 27.9902C23.6116 27.5875 20.0536 26.3212 16.9276 24.293C14.0191 22.4439 11.5533 19.9769 9.7052 17.067C7.67088 13.9252 6.40488 10.3481 6.00977 6.62554C5.97969 6.29251 6.01925 5.95685 6.12593 5.63995C6.23261 5.32305 6.40408 5.03185 6.62941 4.78488C6.85474 4.53791 7.129 4.34059 7.43473 4.20548C7.74046 4.07037 8.07096 4.00043 8.40518 4.00012H12.0164C12.6005 3.99436 13.1669 4.20133 13.6098 4.58245C14.0527 4.96356 14.342 5.49281 14.4238 6.07155C14.5762 7.22778 14.8589 8.36305 15.2664 9.4557C15.4284 9.88675 15.4634 10.3552 15.3674 10.8056C15.2714 11.256 15.0484 11.6694 14.7247 11.9968L13.196 13.5263C14.9096 16.5414 17.4048 19.0378 20.4184 20.7522L21.9471 19.2228C22.2744 18.899 22.6876 18.6758 23.1377 18.5798C23.5879 18.4837 24.0561 18.5188 24.4869 18.6808C25.579 19.0885 26.7138 19.3713 27.8694 19.5238C28.4541 19.6064 28.9882 19.901 29.3699 20.3518C29.7516 20.8026 29.9545 21.378 29.9398 21.9686Z" stroke="#BFC8C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M41.9789 16.6C41.9789 11.44 45.1229 8.056 50.2109 8.056C54.1949 8.056 57.0029 10.552 57.4109 14.2H53.8109C53.4029 12.328 52.0349 11.104 50.0189 11.104C47.2829 11.104 45.6509 13.36 45.6509 16.6C45.6509 19.816 47.2829 22.096 50.0189 22.096C52.0349 22.096 53.4029 20.872 53.8109 19H57.4109C57.0029 22.648 54.1949 25.144 50.2109 25.144C45.1229 25.144 41.9789 21.76 41.9789 16.6ZM65.2625 25.144C61.3265 25.144 58.7585 22.624 58.7585 18.832C58.7585 15.04 61.3265 12.52 65.2625 12.52C69.1985 12.52 71.7665 15.04 71.7665 18.832C71.7665 22.648 69.1985 25.144 65.2625 25.144ZM65.2625 22.384C67.1585 22.384 68.3345 20.92 68.3345 18.832C68.3345 16.744 67.1585 15.28 65.2625 15.28C63.3665 15.28 62.2145 16.744 62.2145 18.832C62.2145 20.92 63.3665 22.384 65.2625 22.384ZM80.7091 12.52C83.2291 12.52 85.6531 13.816 85.6531 18.304V25H82.2691V18.496C82.2691 16.408 81.4771 15.304 79.7731 15.304C78.0211 15.304 77.0131 16.552 77.0131 18.688V25H73.6291V12.664H76.5811L76.8931 14.2C77.6851 13.24 78.8131 12.52 80.7091 12.52ZM88.5774 21.472V15.52H86.5374V12.664H88.5774V9.208H91.9614V12.664H94.7694V15.52H91.9614V20.92C91.9614 21.784 92.2974 22.144 93.1614 22.144H94.9134V25H92.1054C89.7534 25 88.5774 23.824 88.5774 21.472ZM108.03 22.144H108.414V25H106.686C104.934 25 104.382 24.16 104.406 22.984C103.542 24.352 102.294 25.144 100.374 25.144C97.7098 25.144 95.7898 23.872 95.7898 21.52C95.7898 18.904 97.7578 17.416 101.454 17.416H103.902V16.816C103.902 15.712 103.014 14.992 101.598 14.992C100.35 14.992 99.4858 15.592 99.3418 16.504H96.0778C96.3178 13.936 98.4778 12.52 101.766 12.52C105.222 12.52 107.238 14.056 107.238 17.008V21.352C107.238 21.976 107.526 22.144 108.03 22.144ZM103.902 19.912V19.672H101.43C100.038 19.672 99.1978 20.248 99.1978 21.28C99.1978 22.144 99.8938 22.696 101.022 22.696C102.798 22.696 103.878 21.592 103.902 19.912ZM118.099 20.32H121.579C121.123 23.296 118.963 25.144 115.603 25.144C111.715 25.144 109.243 22.624 109.243 18.832C109.243 14.992 111.739 12.52 115.627 12.52C118.963 12.52 121.099 14.344 121.579 17.272H118.075C117.787 16.072 116.899 15.28 115.603 15.28C113.827 15.28 112.699 16.72 112.699 18.832C112.699 20.92 113.827 22.384 115.603 22.384C116.947 22.384 117.835 21.592 118.099 20.32ZM124.202 21.472V15.52H122.162V12.664H124.202V9.208H127.586V12.664H130.394V15.52H127.586V20.92C127.586 21.784 127.922 22.144 128.786 22.144H130.538V25H127.73C125.378 25 124.202 23.824 124.202 21.472Z" fill="#5F7775"/>
              </svg>
            </div>
            <p className="contact-subtitle">Get a personalized quote</p>
            <div className="contact-form">
              <div className="input-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => handleNameChange(e.target.value)} 
                  placeholder="John" 
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => handleEmailChange(e.target.value)} 
                  placeholder="john@email.com" 
                  className={`form-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => handlePhoneChange(e.target.value)} 
                  placeholder="900999999" 
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
              <div className="input-group">
                <label>Best time to contact</label>
                <select 
                  value={bestTime} 
                  onChange={(e) => setBestTime(e.target.value)} 
                  className="form-input"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
            </div>
            <button 
              onClick={() => {
                if (canProceedFromContact()) {
                  alert('Thank you! Your information has been submitted.');
                }
              }} 
              className={`send-btn ${!canProceedFromContact() ? 'disabled' : ''}`}
              disabled={!canProceedFromContact()}
            >
              <svg width="134" height="51" viewBox="0 0 134 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="134" height="51" rx="25.5" fill="#E2B95D"/>
                <path d="M36.5732 33H34.3132V19H36.4132L43.2332 28.92V19H45.4932V33H43.3932L36.5732 23.08V33ZM47.4437 27.9C47.4437 24.72 49.4637 22.64 52.4237 22.64C55.4437 22.64 57.4237 24.52 57.4837 27.52C57.4837 27.78 57.4637 28.06 57.4237 28.34H49.7037V28.46C49.8037 30.22 50.8637 31.36 52.5637 31.36C53.8837 31.36 54.8437 30.7 55.1437 29.56H57.3037C56.9437 31.58 55.2437 33.12 52.7237 33.12C49.4837 33.12 47.4437 31.04 47.4437 27.9ZM49.7837 26.76H55.2437C55.0637 25.24 54.0037 24.38 52.5037 24.38C51.1237 24.38 49.9437 25.3 49.7837 26.76ZM57.8602 33L61.7002 27.76L58.0802 22.76H60.6002L63.0602 26.22L65.5602 22.76H67.9202L64.2802 27.76L68.1402 33H65.6202L62.9202 29.28L60.2002 33H57.8602ZM69.9876 30.22V24.66H68.2076V22.76H69.9876V19.9H72.1676V22.76H74.6276V24.66H72.1676V30C72.1676 30.8 72.4476 31.1 73.2276 31.1H74.8676V33H72.7876C70.8276 33 69.9876 32.08 69.9876 30.22Z" fill="black"/>
                <path d="M97 22.8333L99.6666 25.5M99.6666 25.5L97 28.1666M99.6666 25.5H86.3333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <ProgressIndicator step={3} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
