import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import History from './components/History';
import Stars from './components/Stars';
import { History as HistoryIcon, Calculator as CalculatorIcon, Settings, X } from 'lucide-react';

function App() {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('dark');

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (calculation, result) => {
    const newHistoryItem = {
      id: Date.now(),
      calculation,
      result,
      timestamp: new Date().toLocaleString()
    };
    setHistory(prev => [newHistoryItem, ...prev.slice(0, 49)]); // Keep last 50 items
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const useHistoryItem = (item) => {
    // This could be implemented to populate the calculator with the history item
    console.log('Using history item:', item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-4 relative">
      {/* Animated Stars Background */}
      <Stars />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <CalculatorIcon className="w-8 h-8 text-primary-400" />
            Calculator
          </h1>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-200"
              title="Toggle History"
            >
              <HistoryIcon className="w-5 h-5 text-white" />
            </button>
            
            <button
              className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-200"
              title="Settings"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <Calculator onCalculate={addToHistory} />
          </div>

          {/* History Panel */}
          {showHistory && (
            <div className="animate-slide-up">
              <History 
                history={history}
                onClear={clearHistory}
                onUseItem={useHistoryItem}
                onClose={() => setShowHistory(false)}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Calculator with Advanced Features</p>
          <p className="mt-1">Built with React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App; 