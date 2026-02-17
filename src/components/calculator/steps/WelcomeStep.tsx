interface WelcomeStepProps {
  onStart: () => void;
}

export default function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="text-center max-w-3xl mx-auto py-12">
      {/* Hero Headline */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Plan Your Dream Wedding Without Budget Stress
      </h1>

      {/* Value Proposition */}
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Get a realistic, personalized budget breakdown for your wedding. 
        Our calculator adapts to Nigerian and African wedding realities, 
        helping you avoid common pitfalls and hidden costs.
      </p>

      {/* Trust Signals */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✓</span>
          <span>Used by 10,000+ couples</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">✓</span>
          <span>100% Free</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">✓</span>
          <span>No signup required</span>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="text-3xl mb-3">💰</div>
          <h3 className="font-bold text-gray-900 mb-2">Realistic Estimates</h3>
          <p className="text-sm text-gray-600">
            Budget breakdowns based on actual wedding costs in your city
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="text-3xl mb-3">⚠️</div>
          <h3 className="font-bold text-gray-900 mb-2">Hidden Cost Alerts</h3>
          <p className="text-sm text-gray-600">
            We'll remind you about expenses couples often forget
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div className="text-3xl mb-3">💡</div>
          <h3 className="font-bold text-gray-900 mb-2">Smart Suggestions</h3>
          <p className="text-sm text-gray-600">
            Actionable tips to save money without compromising quality
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-black transition-colors shadow-sm"
      >
        Start Planning Your Budget
      </button>

      {/* Time Estimate */}
      <p className="text-sm text-gray-500 mt-4">
        Takes about 3 minutes to complete
      </p>
    </div>
  );
}
