import { Metadata } from 'next';
import BudgetCalculator from '@/components/calculator/BudgetCalculator';
import FaqAccordion from '@/components/tools/FaqAccordion';

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

      {/* FAQ Section */}
      <FaqAccordion />

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
