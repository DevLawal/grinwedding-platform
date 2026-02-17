// TypeScript interfaces for the budget calculator

export type WeddingType = 'traditional' | 'white' | 'both';
export type WeddingScale = 'intimate' | 'standard' | 'luxury';
export type City = 'lagos' | 'abuja' | 'port-harcourt' | 'ibadan' | 'other';

export interface BudgetInputs {
  city: City;
  weddingType: WeddingType;
  weddingScale: WeddingScale;
  guestCount: number;
  totalBudget?: number; // Optional - will be estimated if not provided
  priorities: CategoryPriorities;
}

export interface CategoryPriorities {
  venue: number; // 1-5 scale
  catering: number;
  decor: number;
  photography: number;
  attire: number;
  makeup: number;
  entertainment: number;
  planning: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  description: string;
  amount: number;
  percentage: number;
  basePercentage: number; // Original percentage before adjustments
}

export interface BudgetResults {
  totalBudget: number;
  estimatedBudget: boolean; // True if budget was auto-calculated
  costPerGuest: number;
  categories: BudgetCategory[];
  warnings: Warning[];
  suggestions: Suggestion[];
  hiddenCosts: string[];
}

export interface Warning {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  category?: string; // Optional - if warning is category-specific
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  potentialSavings?: number; // Optional - estimated savings in Naira
  icon?: string; // Optional - emoji or icon identifier
}

export interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji
  basePercentages: {
    traditional: number;
    white: number;
    both: number;
  };
}
