import { BudgetResults } from '@/lib/calculator/types';
import { formatCurrency } from '@/lib/calculator/budgetLogic';
import { CATEGORIES } from '@/lib/calculator/constants';

interface ResultsViewProps {
  results: BudgetResults;
  onStartOver: () => void;
}

export default function ResultsView({ results, onStartOver }: ResultsViewProps) {
  const { totalBudget, estimatedBudget, costPerGuest, categories, warnings, suggestions, hiddenCosts } = results;

  // Separate warnings by type
  const errors = warnings.filter(w => w.type === 'error');
  const warningsList = warnings.filter(w => w.type === 'warning');
  const infos = warnings.filter(w => w.type === 'info');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <span>✓</span>
          <span>Your budget is ready!</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wedding Budget Breakdown</h1>
        {estimatedBudget && (
          <p className="text-gray-600">
            We've estimated your budget based on typical costs. Adjust as needed!
          </p>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-lg border border-rose-200">
          <p className="text-sm text-rose-700 font-medium mb-1">Total Budget</p>
          <p className="text-3xl font-bold text-rose-900">{formatCurrency(totalBudget)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 font-medium mb-1">Cost Per Guest</p>
          <p className="text-3xl font-bold text-blue-900">{formatCurrency(costPerGuest)}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-700 font-medium mb-1">Budget Categories</p>
          <p className="text-3xl font-bold text-purple-900">{categories.length}</p>
        </div>
      </div>

      {/* Errors (if any) */}
      {errors.length > 0 && (
        <div className="mb-8">
          {errors.map((error) => (
            <div key={error.id} className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex gap-3">
                <span className="text-red-600 text-xl">🚨</span>
                <div>
                  <p className="font-semibold text-red-900">{error.title}</p>
                  <p className="text-red-800 text-sm mt-1">{error.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Budget Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Breakdown by Category</h2>
        
        <div className="space-y-4">
          {categories.map((category) => {
            const categoryDef = CATEGORIES.find(c => c.id === category.id);
            return (
              <div key={category.id} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{categoryDef?.icon}</span>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{formatCurrency(category.amount)}</span>
                    <span className="text-sm text-gray-500 ml-2">({category.percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                
                {/* Visual Bar */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-500 group-hover:from-rose-600 group-hover:to-rose-700"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Warnings */}
      {warningsList.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚠️ Reality Check</h2>
          <div className="space-y-4">
            {warningsList.map((warning) => (
              <div key={warning.id} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="font-semibold text-amber-900 text-sm">{warning.title}</p>
                <p className="text-amber-800 text-sm mt-1">{warning.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Messages */}
      {infos.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Good to Know</h2>
          <div className="space-y-4">
            {infos.map((info) => (
              <div key={info.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-blue-900 text-sm">{info.title}</p>
                <p className="text-blue-800 text-sm mt-1">{info.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Money-Saving Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{suggestion.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-900 text-sm">{suggestion.title}</p>
                    <p className="text-green-800 text-sm mt-1">{suggestion.description}</p>
                    {suggestion.potentialSavings && (
                      <p className="text-green-700 text-xs font-medium mt-2">
                        Potential savings: {formatCurrency(suggestion.potentialSavings)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden Costs */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Don't Forget These Costs</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {hiddenCosts.map((cost, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-700">
              <span className="text-rose-600">•</span>
              <span className="text-sm">{cost}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
        >
          Print / Save as PDF
        </button>
        <button
          onClick={onStartOver}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Start Over
        </button>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
