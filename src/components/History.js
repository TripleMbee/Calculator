import React from 'react';
import { Trash2, Clock, Calculator, Copy } from 'lucide-react';

const History = ({ history, onClear, onUseItem, onClose }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatCalculation = (calculation) => {
    return calculation.replace('×', '*').replace('÷', '/');
  };

  return (
    <div className="glass-effect rounded-2xl p-6 shadow-2xl h-fit max-h-[600px] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary-400" />
          History
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors duration-200"
            title="Clear History"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-200"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="overflow-y-auto max-h-[500px]">
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No calculations yet</p>
            <p className="text-sm mt-1">Your calculation history will appear here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((item) => (
              <div key={item.id} className="history-item group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">
                      {item.timestamp}
                    </div>
                    <div className="text-white font-mono text-sm mb-1">
                      {item.calculation}
                    </div>
                    <div className="text-primary-400 font-bold">
                      = {item.result}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => copyToClipboard(item.result.toString())}
                      className="p-1 rounded bg-dark-600 hover:bg-dark-500 transition-colors duration-200"
                      title="Copy Result"
                    >
                      <Copy className="w-3 h-3 text-gray-300" />
                    </button>
                    <button
                      onClick={() => onUseItem(item)}
                      className="p-1 rounded bg-primary-600 hover:bg-primary-500 transition-colors duration-200"
                      title="Use Result"
                    >
                      <Calculator className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-dark-600 text-center text-sm text-gray-400">
          {history.length} calculation{history.length !== 1 ? 's' : ''} in history
        </div>
      )}
    </div>
  );
};

export default History; 