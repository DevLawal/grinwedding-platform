import { Metadata } from 'next';
import BudgetCalculator from '@/components/calculator/BudgetCalculator';

export const metadata: Metadata = {
  title: 'Wedding Budget Calculator - Plan Your Dream Wedding | Grin Weddings',
  description: 'Free wedding budget calculator for Nigerian and African weddings. Get realistic cost estimates, budget breakdowns, and smart planning tips. Perfect for traditional and white weddings.',
  keywords: 'wedding budget calculator, wedding cost, Nigerian wedding budget, traditional wedding cost, wedding planning, African wedding budget',
  openGraph: {
    title: 'Wedding Budget Calculator | Grin Weddings',
    description: 'Plan your dream wedding without budget stress. Free calculator with realistic estimates for Nigerian weddings.',
    type: 'website',
  },
};

export default function BudgetCalculatorPage() {
  return (
    <>
      {/* SEO Content - Hidden but indexable */}
      <div className="sr-only">
        <h1>Wedding Budget Calculator</h1>
        <p>
          Calculate your wedding budget with our free, comprehensive wedding budget calculator. 
          Designed specifically for Nigerian and African weddings, our tool helps you plan traditional weddings, 
          white weddings, or both. Get realistic cost estimates based on your city, guest count, and priorities.
        </p>
        <h2>How It Works</h2>
        <p>
          Our wedding budget calculator takes into account your wedding location, type of ceremony, 
          guest count, and personal priorities to create a customized budget breakdown. We provide 
          realistic estimates for all major categories including venue, catering, photography, decor, 
          and more.
        </p>
        <h2>Why Use This Calculator</h2>
        <ul>
          <li>Get realistic budget estimates for Nigerian weddings</li>
          <li>Avoid hidden costs and budget overruns</li>
          <li>Customize based on your priorities</li>
          <li>Receive smart money-saving suggestions</li>
          <li>100% free, no signup required</li>
        </ul>
      </div>

      {/* Main Calculator */}
      <BudgetCalculator />

      {/* FAQ Section for SEO */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-200 mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How much does a typical Nigerian wedding cost?
            </h3>
            <p className="text-gray-600">
              Wedding costs in Nigeria vary significantly by location and scale. In Lagos, expect to budget 
              ₦25,000-₦50,000 per guest for a standard wedding. Traditional and white weddings combined 
              typically cost 1.6x more than a single ceremony. Our calculator provides city-specific estimates.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What percentage of my budget should go to catering?
            </h3>
            <p className="text-gray-600">
              Food and catering typically account for 30-35% of your total wedding budget. This is usually 
              the largest single expense. Our calculator automatically allocates appropriate percentages 
              based on your wedding type and priorities.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Should I budget differently for traditional vs. white weddings?
            </h3>
            <p className="text-gray-600">
              Yes! Traditional weddings often allocate more to catering and entertainment, while white 
              weddings may spend more on venue and photography. If you're planning both, budget for 
              approximately 1.6x the cost of a single ceremony.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What are common hidden costs in Nigerian weddings?
            </h3>
            <p className="text-gray-600">
              Hidden costs include vendor meals, fuel/transportation logistics, overtime fees, printing 
              (invitations, programs), marriage license fees, gifts for bridal party, and accommodation 
              for out-of-town guests. Budget an extra 7-10% for unexpected expenses.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How can I reduce my wedding costs without compromising quality?
            </h3>
            <p className="text-gray-600">
              Book vendors 6-9 months in advance for better rates, avoid peak season (December), negotiate 
              package deals, limit your guest list, and consider DIY decorations. Our calculator provides 
              personalized money-saving suggestions based on your budget.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Is this calculator accurate for weddings outside Lagos?
            </h3>
            <p className="text-gray-600">
              Yes! Our calculator includes city-specific cost multipliers for Lagos, Abuja, Port Harcourt, 
              Ibadan, and other cities. Costs are adjusted based on typical vendor pricing in each location.
            </p>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Grin Weddings Budget Calculator',
            description: 'Free wedding budget calculator for Nigerian and African weddings',
            applicationCategory: 'FinanceApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'NGN',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '10000',
            },
          }),
        }}
      />
    </>
  );
}
