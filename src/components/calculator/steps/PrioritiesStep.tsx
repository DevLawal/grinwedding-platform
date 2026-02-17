'use client';

import { CategoryPriorities } from '@/lib/calculator/types';
import { CATEGORIES } from '@/lib/calculator/constants';

interface PrioritiesStepProps {
  priorities: CategoryPriorities;
  onPrioritiesChange: (priorities: CategoryPriorities) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRIORITY_LABELS = [
  { value: 1, label: 'Minimal', description: 'Keep it simple' },
  { value: 2, label: 'Basic', description: 'Just the essentials' },
  { value: 3, label: 'Balanced', description: 'Standard quality' },
  { value: 4, label: 'Important', description: 'Above average' },
  { value: 5, label: 'Splurge', description: 'Spare no expense' },
];

export default function PrioritiesStep({
  priorities,
  onPrioritiesChange,
  onNext,
  onBack,
}: PrioritiesStepProps) {
  const handlePriorityChange = (categoryId: string, value: number) => {
    onPrioritiesChange({
      ...priorities,
      [categoryId]: value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Step 3 of 4</p>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-rose-600 rounded-full transition-all" style={{ width: '75%' }} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">What matters most to you?</h2>
      <p className="text-gray-600 mb-8">
        Move the sliders to show where you want to invest more or save money
      </p>

      <div className="space-y-6">
        {CATEGORIES.filter(cat => cat.id !== 'miscellaneous').map((category) => {
          const priority = priorities[category.id as keyof CategoryPriorities] || 3;
          const priorityLabel = PRIORITY_LABELS.find(p => p.value === priority);

          return (
            <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-rose-600">{priorityLabel?.label}</p>
                  <p className="text-xs text-gray-500">{priorityLabel?.description}</p>
                </div>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={priority}
                  onChange={(e) => handlePriorityChange(category.id, parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #f43f5e 0%, #f43f5e ${((priority - 1) / 4) * 100}%, #e5e7eb ${((priority - 1) / 4) * 100}%, #e5e7eb 100%)`
                  }}
                />
                
                {/* Slider Labels */}
                <div className="flex justify-between mt-2 px-1">
                  {PRIORITY_LABELS.map((label) => (
                    <button
                      key={label.value}
                      onClick={() => handlePriorityChange(category.id, label.value)}
                      className={`text-xs transition-colors ${
                        priority === label.value
                          ? 'text-rose-600 font-medium'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {label.value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helper Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <div className="flex gap-3">
          <span className="text-blue-600 text-xl">💡</span>
          <div>
            <p className="font-medium text-blue-900 text-sm">Tip: Be honest about your priorities</p>
            <p className="text-blue-800 text-sm mt-1">
              Setting realistic priorities helps us create a budget that reflects what truly matters to you. 
              You can always adjust later!
            </p>
          </div>
        </div>
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
          className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
        >
          See My Budget
        </button>
      </div>
    </div>
  );
}
