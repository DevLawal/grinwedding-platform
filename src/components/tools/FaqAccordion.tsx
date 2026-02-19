'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How much does a typical Nigerian wedding cost?",
    answer: "Wedding costs in Nigeria vary significantly by location and scale. In Lagos, expect to budget ₦25,000-₦50,000 per guest for a standard wedding. Traditional and white weddings combined typically cost 1.6x more than a single ceremony. Our calculator provides city-specific estimates."
  },
  {
    question: "What percentage of my budget should go to catering?",
    answer: "Food and catering typically account for 30-35% of your total wedding budget. This is usually the largest single expense. Our calculator automatically allocates appropriate percentages based on your wedding type and priorities."
  },
  {
    question: "Should I budget differently for traditional vs. white weddings?",
    answer: "Yes! Traditional weddings often allocate more to catering and entertainment, while white weddings may spend more on venue and photography. If you're planning both, budget for approximately 1.6x the cost of a single ceremony."
  },
  {
    question: "What are common hidden costs in Nigerian weddings?",
    answer: "Hidden costs include vendor meals, fuel/transportation logistics, overtime fees, printing (invitations, programs), marriage license fees, gifts for bridal party, and accommodation for out-of-town guests. Budget an extra 7-10% for unexpected expenses."
  },
  {
    question: "How can I reduce my wedding costs without compromising quality?",
    answer: "Book vendors 6-9 months in advance for better rates, avoid peak season (December), negotiate package deals, limit your guest list, and consider DIY decorations. Our calculator provides personalized money-saving suggestions based on your budget."
  },
  {
    question: "Is this calculator accurate for weddings outside Lagos?",
    answer: "Yes! Our calculator includes city-specific cost multipliers for Lagos, Abuja, Port Harcourt, Ibadan, and other cities. Costs are adjusted based on typical vendor pricing in each location."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-200 mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index}
            className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-50/50 focus:outline-hidden"
              aria-expanded={openIndex === index}
            >
              <h3 className="text-lg font-bold text-gray-900 pr-8">
                {item.question}
              </h3>
              <div className={`shrink-0 text-purple-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50/50">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
