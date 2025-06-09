import React, { useState, useEffect } from 'react';
import './App.css';

const EnergyCalculator = () => {
  // Form state
  const [formData, setFormData] = useState({
    zipCode: '',
    homeSize: '',
    peopleCount: 2,
    monthlyBill: '',
    electricityRate: 0.19
  });

  // Smart products state
  const [selectedProducts, setSelectedProducts] = useState({});

  // Results state
  const [results, setResults] = useState({
    annualSavings: 0,
    monthlySavings: 0,
    percentageSaved: 0
  });

  // Smart products data with savings
  const smartProducts = [
    {
      id: 'thermostat',
      name: 'Smart Thermostat',
      description: 'Save up to $180/year',
      annualSavings: 180,
      icon: 'https://images.pexels.com/photos/14401717/pexels-photo-14401717.jpeg',
      tip: 'Use smart scheduling for bigger savings'
    },
    {
      id: 'lighting',
      name: 'Smart Lighting',
      description: 'Save up to $60/year',
      annualSavings: 60,
      icon: 'https://images.unsplash.com/photo-1619506147448-b56ba8ee11d7',
      tip: 'Automate lights to turn off when rooms are unoccupied'
    },
    {
      id: 'plugs',
      name: 'Smart Plugs',
      description: 'Save up to $40/year',
      annualSavings: 40,
      icon: 'https://images.unsplash.com/photo-1586254116648-d33e0fada133',
      tip: 'Pair with energy-heavy appliances to cut idle power use'
    },
    {
      id: 'doorlock',
      name: 'Smart Door Lock',
      description: 'Save up to $10/year',
      annualSavings: 10,
      icon: 'https://images.unsplash.com/photo-1713557112617-e12d67bddc3a',
      tip: 'Integrates with your smart home automation'
    },
    {
      id: 'garage',
      name: 'Smart Garage Door',
      description: 'Save up to $20/year',
      annualSavings: 20,
      icon: 'https://images.pexels.com/photos/16773548/pexels-photo-16773548.jpeg',
      tip: 'Smart scheduling reduces unnecessary power usage'
    },
    {
      id: 'sensors',
      name: 'Security Sensors',
      description: 'Save up to $25/year',
      annualSavings: 25,
      icon: 'https://images.unsplash.com/photo-1655195215404-a89325e7dd3e',
      tip: 'Motion sensors help optimize lighting automation'
    },
    {
      id: 'cameras',
      name: 'Smart Cameras',
      description: 'Save up to $15/year',  
      annualSavings: 15,
      icon: 'https://images.pexels.com/photos/29942709/pexels-photo-29942709.jpeg',
      tip: 'Motion detection reduces continuous recording power'
    },
    {
      id: 'hub',
      name: 'Vivint Smart Hub',
      description: 'Save up to $5/year',
      annualSavings: 5,
      icon: 'https://images.pexels.com/photos/10991709/pexels-photo-10991709.jpeg',
      tip: 'Central control optimizes entire system efficiency'
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
    const monthlyBill = parseFloat(formData.monthlyBill) || 120; // Default to national average
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

  const handleProductToggle = (productId) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const resetCalculator = () => {
    setFormData({
      zipCode: '',
      homeSize: '',
      peopleCount: 2,
      monthlyBill: '',
      electricityRate: 0.19
    });
    setSelectedProducts({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            How Much Can You Save with Vivint?
          </h1>
          <p className="text-lg text-gray-600 text-center mt-2 max-w-2xl mx-auto">
            Estimate your energy savings by selecting the smart devices you use—or plan to install—in your home.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step 1: Your Home Setup */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
            Tell us about your home
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zip Code (optional)
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="e.g., 84043"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's the size of your home?
              </label>
              <select
                value={formData.homeSize}
                onChange={(e) => handleInputChange('homeSize', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select home size</option>
                <option value="<1000">Less than 1,000 sq. ft.</option>
                <option value="1000-2000">1,000–2,000 sq. ft.</option>
                <option value="2000-3000">2,000–3,000 sq. ft.</option>
                <option value=">3000">More than 3,000 sq. ft.</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many people live in your home?
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.peopleCount}
                onChange={(e) => handleInputChange('peopleCount', parseInt(e.target.value))}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1</span>
                <span className="font-medium text-orange-600">{formData.peopleCount} people</span>
                <span>10</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's your average monthly electric bill?
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.monthlyBill}
                  onChange={(e) => handleInputChange('monthlyBill', e.target.value)}
                  placeholder="120"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">If you're not sure, we'll use the national average.</p>
            </div>
          </div>
        </div>

        {/* Step 2: Choose Your Smart Home Products */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
            Which Vivint products are you using or considering?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {smartProducts.map((product) => (
              <div
                key={product.id}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedProducts[product.id]
                    ? 'border-orange-500 bg-orange-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
                onClick={() => handleProductToggle(product.id)}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={product.icon}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      {product.name}
                    </h3>
                    <p className="text-orange-600 font-medium text-sm">
                      {product.description}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedProducts[product.id]
                      ? 'bg-orange-500 border-orange-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedProducts[product.id] && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {Object.values(selectedProducts).some(Boolean) && (
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Here's What You Could Save
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <h3 className="text-sm font-medium opacity-90 mb-2">Estimated yearly savings</h3>
                <div className="text-3xl font-bold">${results.annualSavings}</div>
                <div className="text-sm opacity-75">per year</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <h3 className="text-sm font-medium opacity-90 mb-2">Estimated monthly savings</h3>
                <div className="text-3xl font-bold">${Math.round(results.monthlySavings)}</div>
                <div className="text-sm opacity-75">per month</div>
              </div>
              
              {formData.monthlyBill && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <h3 className="text-sm font-medium opacity-90 mb-2">You could reduce your energy bill by</h3>
                  <div className="text-3xl font-bold">{Math.round(results.percentageSaved)}%</div>
                  <div className="text-sm opacity-75">reduction</div>
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">💡 Tips to Maximize Your Smart Home Savings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(selectedProducts)
                  .filter(productId => selectedProducts[productId])
                  .slice(0, 4)
                  .map(productId => {
                    const product = smartProducts.find(p => p.id === productId);
                    return (
                      <div key={productId} className="text-sm">
                        <span className="font-medium">{product.name}:</span> {product.tip}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm opacity-75">
                Actual savings may vary based on usage patterns, local rates, home size, and product configuration. 
                <br />
                Estimates are based on the national average electricity rate of $0.19 per kWh (March 2025).
              </p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Take the Next Step Toward a Smarter Home
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105">
              Get a Free Quote
            </button>
            <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 px-8 rounded-lg transition-all duration-200">
              Customize Your Smart Home Package
            </button>
          </div>

          <button
            onClick={resetCalculator}
            className="text-gray-500 hover:text-gray-700 text-sm underline transition-colors duration-200"
          >
            Reset Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <EnergyCalculator />
    </div>
  );
}

export default App;