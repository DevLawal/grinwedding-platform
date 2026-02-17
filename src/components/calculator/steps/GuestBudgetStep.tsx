import { useState, useEffect } from 'react';
import { City } from '@/lib/calculator/types';
import { COST_PER_GUEST_RANGES, CITY_NAMES } from '@/lib/calculator/constants';

interface GuestBudgetStepProps {
  city: City;
  guestCount: number;
  totalBudget: number | undefined;
  onGuestCountChange: (count: number) => void;
  onTotalBudgetChange: (budget: number | undefined) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function GuestBudgetStep({
  city,
  guestCount,
  totalBudget,
  onGuestCountChange,
  onTotalBudgetChange,
  onNext,
  onBack,
}: GuestBudgetStepProps) {
  const [budgetInput, setBudgetInput] = useState(totalBudget?.toString() || '');
  const [showBudgetWarning, setShowBudgetWarning] = useState(false);

  const costPerGuest = totalBudget && guestCount > 0 ? totalBudget / guestCount : 0;
  const costRange = COST_PER_GUEST_RANGES[city];
  const avgCostPerGuest = (costRange.min + costRange.max) / 2;

  useEffect(() => {
    if (totalBudget && guestCount > 0) {
      const cpg = totalBudget / guestCount;
      setShowBudgetWarning(cpg < costRange.min);
    } else {
      setShowBudgetWarning(false);
    }
  }, [totalBudget, guestCount, costRange.min]);

  const handleBudgetChange = (value: string) => {
    setBudgetInput(value);
    if (value === '') {
      onTotalBudgetChange(undefined);
    } else {
      const numValue = parseInt(value.replace(/,/g, ''), 10);
      if (!isNaN(numValue)) {
        onTotalBudgetChange(numValue);
      }
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const canProceed = guestCount > 0;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Step 2 of 4</p>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-rose-600 rounded-full transition-all" style={{ width: '50%' }} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">Guest count and budget</h2>
      <p className="text-gray-600 mb-8">
        These are the biggest factors in your wedding cost
      </p>

      <div className="space-y-8">
        {/* Guest Count */}
        <div>
          <label htmlFor="guestCount" className="block text-sm font-semibold text-gray-900 mb-3">
            How many guests are you expecting?
          </label>
          <input
            type="number"
            id="guestCount"
            value={guestCount || ''}
            onChange={(e) => onGuestCountChange(parseInt(e.target.value, 10) || 0)}
            placeholder="e.g., 200"
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 text-lg"
          />
          <p className="text-xs text-gray-500 mt-2">
            Be realistic - guest lists often grow by 20-30%
          </p>
        </div>

        {/* Total Budget */}
        <div>
          <label htmlFor="totalBudget" className="block text-sm font-semibold text-gray-900 mb-3">
            What's your total budget? <span className="text-gray-500 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₦</span>
            <input
              type="text"
              id="totalBudget"
              value={budgetInput}
              onChange={(e) => handleBudgetChange(e.target.value)}
              placeholder="e.g., 5,000,000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 text-lg"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Not sure? Leave blank and we'll suggest one based on typical costs in {CITY_NAMES[city]}
          </p>
        </div>

        {/* Cost Per Guest Display */}
        {guestCount > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Cost per guest</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalBudget ? `₦${formatNumber(Math.round(costPerGuest))}` : '—'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Typical range in {CITY_NAMES[city]}</p>
                <p className="text-sm font-medium text-gray-900">
                  ₦{formatNumber(costRange.min)} - ₦{formatNumber(costRange.max)}
                </p>
              </div>
            </div>

            {/* Warning if budget is too low */}
            {showBudgetWarning && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <span className="text-amber-600 text-xl">⚠️</span>
                  <div>
                    <p className="font-medium text-amber-900 text-sm">Budget may be challenging</p>
                    <p className="text-amber-800 text-sm mt-1">
                      Your budget of ₦{formatNumber(Math.round(costPerGuest))} per guest is below the typical 
                      range for {CITY_NAMES[city]}. Consider adjusting your budget or reducing guest count.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info if no budget entered */}
            {!totalBudget && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <span className="text-blue-600 text-xl">ℹ️</span>
                  <div>
                    <p className="font-medium text-blue-900 text-sm">We'll estimate for you</p>
                    <p className="text-blue-800 text-sm mt-1">
                      Based on {guestCount} guests in {CITY_NAMES[city]}, we'll suggest a budget of approximately 
                      ₦{formatNumber(Math.round(guestCount * avgCostPerGuest))}.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-12">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
