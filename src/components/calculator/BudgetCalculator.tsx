'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BudgetInputs, CategoryPriorities, City, WeddingType, WeddingScale } from '@/lib/calculator/types';
import { calculateBudget } from '@/lib/calculator/budgetLogic';
import WelcomeStep from './steps/WelcomeStep';
import WeddingBasicsStep from './steps/WeddingBasicsStep';
import GuestBudgetStep from './steps/GuestBudgetStep';
import PrioritiesStep from './steps/PrioritiesStep';
import ResultsView from './ResultsView';

type Step = 'welcome' | 'basics' | 'guest-budget' | 'priorities' | 'results';

export default function BudgetCalculator() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  
  // Form state
  const [city, setCity] = useState<City>('lagos');
  const [weddingType, setWeddingType] = useState<WeddingType>('both');
  const [weddingScale, setWeddingScale] = useState<WeddingScale>('standard');
  const [guestCount, setGuestCount] = useState<number>(200);
  const [totalBudget, setTotalBudget] = useState<number | undefined>(undefined);
  const [priorities, setPriorities] = useState<CategoryPriorities>({
    venue: 3,
    catering: 3,
    decor: 3,
    photography: 3,
    attire: 3,
    makeup: 3,
    entertainment: 3,
    planning: 3,
  });

  // Results state
  const [results, setResults] = useState<ReturnType<typeof calculateBudget> | null>(null);

  const handleStart = () => {
    setCurrentStep('basics');
  };

  const handleBasicsNext = () => {
    setCurrentStep('guest-budget');
  };

  const handleGuestBudgetNext = () => {
    setCurrentStep('priorities');
  };

  const handlePrioritiesNext = () => {
    // Calculate budget
    const inputs: BudgetInputs = {
      city,
      weddingType,
      weddingScale,
      guestCount,
      totalBudget,
      priorities,
    };

    const calculatedResults = calculateBudget(inputs);
    setResults(calculatedResults);
    setCurrentStep('results');
  };

  const handleStartOver = () => {
    setCurrentStep('welcome');
    setResults(null);
    // Reset to defaults
    setCity('lagos');
    setWeddingType('both');
    setWeddingScale('standard');
    setGuestCount(200);
    setTotalBudget(undefined);
    setPriorities({
      venue: 3,
      catering: 3,
      decor: 3,
      photography: 3,
      attire: 3,
      makeup: 3,
      entertainment: 3,
      planning: 3,
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 selection:bg-purple-100 selection:text-purple-900">
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WelcomeStep onStart={handleStart} />
          </motion.div>
        )}

        {currentStep === 'basics' && (
          <motion.div key="basics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WeddingBasicsStep
              city={city}
              weddingType={weddingType}
              weddingScale={weddingScale}
              onCityChange={setCity}
              onWeddingTypeChange={setWeddingType}
              onWeddingScaleChange={setWeddingScale}
              onNext={handleBasicsNext}
              onBack={() => setCurrentStep('welcome')}
            />
          </motion.div>
        )}

        {currentStep === 'guest-budget' && (
          <motion.div key="guest-budget" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GuestBudgetStep
              city={city}
              guestCount={guestCount}
              totalBudget={totalBudget}
              onGuestCountChange={setGuestCount}
              onTotalBudgetChange={setTotalBudget}
              onNext={handleGuestBudgetNext}
              onBack={() => setCurrentStep('basics')}
            />
          </motion.div>
        )}

        {currentStep === 'priorities' && (
          <motion.div key="priorities" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PrioritiesStep
              priorities={priorities}
              onPrioritiesChange={setPriorities}
              onNext={handlePrioritiesNext}
              onBack={() => setCurrentStep('guest-budget')}
            />
          </motion.div>
        )}

        {currentStep === 'results' && results && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsView
              results={results}
              onStartOver={handleStartOver}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
