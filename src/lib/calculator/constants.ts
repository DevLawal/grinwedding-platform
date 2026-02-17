import { WeddingType, City, CategoryDefinition } from './types';

// Category definitions with base percentages for different wedding types
export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'venue',
    name: 'Venue',
    description: 'Ceremony and reception location costs',
    icon: '🏛️',
    basePercentages: {
      traditional: 12,
      white: 18,
      both: 15,
    },
  },
  {
    id: 'catering',
    name: 'Food & Catering',
    description: 'Meals, drinks, and catering services',
    icon: '🍽️',
    basePercentages: {
      traditional: 35,
      white: 32,
      both: 30,
    },
  },
  {
    id: 'decor',
    name: 'Decor & Styling',
    description: 'Flowers, decorations, and event styling',
    icon: '💐',
    basePercentages: {
      traditional: 10,
      white: 13,
      both: 12,
    },
  },
  {
    id: 'photography',
    name: 'Photography & Video',
    description: 'Professional photography and videography',
    icon: '📸',
    basePercentages: {
      traditional: 8,
      white: 12,
      both: 10,
    },
  },
  {
    id: 'attire',
    name: 'Attire',
    description: 'Wedding outfits for bride, groom, and bridal party',
    icon: '👗',
    basePercentages: {
      traditional: 12,
      white: 10,
      both: 8,
    },
  },
  {
    id: 'makeup',
    name: 'Makeup & Grooming',
    description: 'Hair, makeup, and beauty services',
    icon: '💄',
    basePercentages: {
      traditional: 6,
      white: 5,
      both: 5,
    },
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'DJ, live band, MC, and performers',
    icon: '🎵',
    basePercentages: {
      traditional: 10,
      white: 5,
      both: 8,
    },
  },
  {
    id: 'planning',
    name: 'Planning & Coordination',
    description: 'Wedding planner and day-of coordination',
    icon: '📋',
    basePercentages: {
      traditional: 2,
      white: 3,
      both: 5,
    },
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous & Hidden Costs',
    description: 'Unexpected expenses, vendor meals, logistics',
    icon: '💰',
    basePercentages: {
      traditional: 5,
      white: 2,
      both: 7,
    },
  },
];

// City-based cost multipliers
export const CITY_MULTIPLIERS: Record<City, number> = {
  lagos: 1.3,
  abuja: 1.2,
  'port-harcourt': 1.1,
  ibadan: 1.0,
  other: 0.9,
};

// City display names
export const CITY_NAMES: Record<City, string> = {
  lagos: 'Lagos',
  abuja: 'Abuja',
  'port-harcourt': 'Port Harcourt',
  ibadan: 'Ibadan',
  other: 'Other City',
};

// Base cost per guest ranges (in Naira) by city
export const COST_PER_GUEST_RANGES: Record<City, { min: number; max: number }> = {
  lagos: { min: 25000, max: 50000 },
  abuja: { min: 20000, max: 40000 },
  'port-harcourt': { min: 18000, max: 35000 },
  ibadan: { min: 15000, max: 30000 },
  other: { min: 15000, max: 30000 },
};

// Wedding type multipliers for budget estimation
export const WEDDING_TYPE_MULTIPLIERS: Record<WeddingType, number> = {
  traditional: 0.8,
  white: 1.0,
  both: 1.6,
};

// Wedding type display names
export const WEDDING_TYPE_NAMES: Record<WeddingType, string> = {
  traditional: 'Traditional Wedding',
  white: 'White Wedding',
  both: 'Both (Traditional + White)',
};

// Guest count thresholds
export const GUEST_COUNT_THRESHOLDS = {
  intimate: 100,
  standard: 300,
  large: 500,
};

// Warning thresholds
export const WARNING_THRESHOLDS = {
  minCostPerGuest: 5000, // Minimum realistic cost per guest
  lowBudgetPerGuest: 15000, // Low but possible
  guestCountInflation: 0.25, // Expect 25% growth for large weddings
  minCateringPercentage: 25, // Minimum for catering
  minPhotographyPercentage: 8, // Minimum for photography
  contingencyPercentage: 10, // Recommended contingency buffer
};

// Hidden cost reminders
export const HIDDEN_COSTS = [
  'Vendor meals and refreshments',
  'Fuel and transportation logistics',
  'Overtime fees for vendors',
  'Printing (invitations, programs, signage)',
  'Marriage license and legal fees',
  'Gifts for bridal party',
  'Accommodation for out-of-town guests',
  'Day-of emergency kit supplies',
];

// Money-saving suggestions
export const SAVING_SUGGESTIONS = [
  {
    title: 'Book vendors 6-9 months in advance',
    description: 'Early booking often comes with better rates and more availability',
    potentialSavings: 0.15, // 15% potential savings
  },
  {
    title: 'Avoid peak wedding season',
    description: 'December weddings are most expensive. Consider off-peak months',
    potentialSavings: 0.20, // 20% potential savings
  },
  {
    title: 'Negotiate package deals',
    description: 'Bundle venue + catering or photography + video for discounts',
    potentialSavings: 0.10, // 10% potential savings
  },
  {
    title: 'Limit the guest list',
    description: 'Every 50 guests removed can save ₦500,000 - ₦1,000,000',
    potentialSavings: 0.25, // 25% potential savings
  },
  {
    title: 'DIY some decorations',
    description: 'Simple centerpieces and favors can be made at home',
    potentialSavings: 0.30, // 30% savings on decor
  },
];

// Priority adjustment factors
export const PRIORITY_ADJUSTMENTS = {
  high: 0.05, // +5% for priority 4-5
  low: -0.05, // -5% for priority 1-2
  threshold: {
    high: 4,
    low: 2,
  },
};
