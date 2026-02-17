import { City, WeddingType, WeddingScale } from '@/lib/calculator/types';
import { CITY_NAMES, WEDDING_TYPE_NAMES } from '@/lib/calculator/constants';

interface WeddingBasicsStepProps {
  city: City;
  weddingType: WeddingType;
  weddingScale: WeddingScale;
  onCityChange: (city: City) => void;
  onWeddingTypeChange: (type: WeddingType) => void;
  onWeddingScaleChange: (scale: WeddingScale) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WeddingBasicsStep({
  city,
  weddingType,
  weddingScale,
  onCityChange,
  onWeddingTypeChange,
  onWeddingScaleChange,
  onNext,
  onBack,
}: WeddingBasicsStepProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Step 1 of 4</p>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-rose-600 rounded-full" style={{ width: '25%' }} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">Let's start with the basics</h2>
      <p className="text-gray-600 mb-8">
        Tell us about your wedding so we can provide accurate estimates
      </p>

      <div className="space-y-8">
        {/* City Selection */}
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-3">
            Where is your wedding?
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => onCityChange(e.target.value as City)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
          >
            {Object.entries(CITY_NAMES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Costs vary significantly by location
          </p>
        </div>

        {/* Wedding Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            What type of wedding are you planning?
          </label>
          <div className="space-y-3">
            {Object.entries(WEDDING_TYPE_NAMES).map(([value, label]) => (
              <label
                key={value}
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  weddingType === value
                    ? 'border-rose-600 bg-rose-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="weddingType"
                  value={value}
                  checked={weddingType === value}
                  onChange={(e) => onWeddingTypeChange(e.target.value as WeddingType)}
                  className="mt-1 text-rose-600 focus:ring-rose-500"
                />
                <div className="ml-3">
                  <div className="font-medium text-gray-900">{label}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {value === 'traditional' && 'Traditional ceremony only'}
                    {value === 'white' && 'Church/court wedding only'}
                    {value === 'both' && 'Engagement, traditional, and white wedding'}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Wedding Scale */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            What's the scale of your wedding?
          </label>
          <div className="space-y-3">
            <label
              className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                weddingScale === 'intimate'
                  ? 'border-rose-600 bg-rose-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="weddingScale"
                value="intimate"
                checked={weddingScale === 'intimate'}
                onChange={(e) => onWeddingScaleChange(e.target.value as WeddingScale)}
                className="mt-1 text-rose-600 focus:ring-rose-500"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">Intimate</div>
                <div className="text-sm text-gray-600 mt-1">
                  Under 100 guests - Close family and friends
                </div>
              </div>
            </label>

            <label
              className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                weddingScale === 'standard'
                  ? 'border-rose-600 bg-rose-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="weddingScale"
                value="standard"
                checked={weddingScale === 'standard'}
                onChange={(e) => onWeddingScaleChange(e.target.value as WeddingScale)}
                className="mt-1 text-rose-600 focus:ring-rose-500"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">Standard</div>
                <div className="text-sm text-gray-600 mt-1">
                  100-300 guests - Traditional wedding size
                </div>
              </div>
            </label>

            <label
              className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                weddingScale === 'luxury'
                  ? 'border-rose-600 bg-rose-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="weddingScale"
                value="luxury"
                checked={weddingScale === 'luxury'}
                onChange={(e) => onWeddingScaleChange(e.target.value as WeddingScale)}
                className="mt-1 text-rose-600 focus:ring-rose-500"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">Luxury</div>
                <div className="text-sm text-gray-600 mt-1">
                  300+ guests - Grand celebration
                </div>
              </div>
            </label>
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
          Continue
        </button>
      </div>
    </div>
  );
}
