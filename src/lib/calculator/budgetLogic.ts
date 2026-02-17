import {
  BudgetInputs,
  BudgetResults,
  BudgetCategory,
  Warning,
  Suggestion,
  WeddingType,
  City,
} from './types';
import {
  CATEGORIES,
  CITY_MULTIPLIERS,
  COST_PER_GUEST_RANGES,
  WEDDING_TYPE_MULTIPLIERS,
  WARNING_THRESHOLDS,
  HIDDEN_COSTS,
  SAVING_SUGGESTIONS,
  PRIORITY_ADJUSTMENTS,
  GUEST_COUNT_THRESHOLDS,
  CITY_NAMES,
} from './constants';

/**
 * Main function to calculate budget distribution
 */
export function calculateBudget(inputs: BudgetInputs): BudgetResults {
  // Step 1: Determine total budget (estimate if not provided)
  const totalBudget = inputs.totalBudget || estimateTotalBudget(inputs);
  const estimatedBudget = !inputs.totalBudget;

  // Step 2: Calculate base category allocations
  const baseCategories = getBaseCategoryAllocations(inputs.weddingType, totalBudget);

  // Step 3: Adjust for priorities
  const adjustedCategories = adjustForPriorities(baseCategories, inputs.priorities);

  // Step 4: Calculate cost per guest
  const costPerGuest = totalBudget / inputs.guestCount;

  // Step 5: Generate warnings
  const warnings = generateWarnings(inputs, totalBudget, costPerGuest, adjustedCategories);

  // Step 6: Generate suggestions
  const suggestions = generateSuggestions(inputs, totalBudget, adjustedCategories);

  return {
    totalBudget,
    estimatedBudget,
    costPerGuest,
    categories: adjustedCategories,
    warnings,
    suggestions,
    hiddenCosts: HIDDEN_COSTS,
  };
}

/**
 * Estimate total budget based on guest count and city
 */
export function estimateTotalBudget(inputs: BudgetInputs): number {
  const { city, guestCount, weddingType } = inputs;

  // Get average cost per guest for the city
  const costRange = COST_PER_GUEST_RANGES[city];
  const avgCostPerGuest = (costRange.min + costRange.max) / 2;

  // Apply wedding type multiplier
  const weddingMultiplier = WEDDING_TYPE_MULTIPLIERS[weddingType];

  // Calculate estimated budget
  const estimatedBudget = guestCount * avgCostPerGuest * weddingMultiplier;

  // Round to nearest 100,000
  return Math.round(estimatedBudget / 100000) * 100000;
}

/**
 * Get base category allocations based on wedding type
 */
function getBaseCategoryAllocations(
  weddingType: WeddingType,
  totalBudget: number
): BudgetCategory[] {
  return CATEGORIES.map((category) => {
    const basePercentage = category.basePercentages[weddingType];
    const amount = (totalBudget * basePercentage) / 100;

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      amount,
      percentage: basePercentage,
      basePercentage,
    };
  });
}

/**
 * Adjust category allocations based on user priorities
 */
function adjustForPriorities(
  categories: BudgetCategory[],
  priorities: Record<string, number>
): BudgetCategory[] {
  const totalBudget = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const adjustments: Record<string, number> = {};

  // Calculate adjustments for each category
  categories.forEach((category) => {
    const priority = priorities[category.id] || 3; // Default to balanced (3)

    if (priority >= PRIORITY_ADJUSTMENTS.threshold.high) {
      // High priority: +5%
      adjustments[category.id] = PRIORITY_ADJUSTMENTS.high;
    } else if (priority <= PRIORITY_ADJUSTMENTS.threshold.low) {
      // Low priority: -5%
      adjustments[category.id] = PRIORITY_ADJUSTMENTS.low;
    } else {
      // Balanced: no adjustment
      adjustments[category.id] = 0;
    }
  });

  // Apply adjustments
  const adjustedCategories = categories.map((category) => {
    const adjustment = adjustments[category.id];
    const newPercentage = category.basePercentage + adjustment * 100;
    const newAmount = (totalBudget * newPercentage) / 100;

    return {
      ...category,
      percentage: newPercentage,
      amount: newAmount,
    };
  });

  // Normalize to ensure total is 100%
  return normalizeCategories(adjustedCategories, totalBudget);
}

/**
 * Normalize category percentages to ensure they sum to 100%
 */
function normalizeCategories(
  categories: BudgetCategory[],
  totalBudget: number
): BudgetCategory[] {
  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0);

  if (Math.abs(totalPercentage - 100) < 0.01) {
    return categories; // Already normalized
  }

  // Adjust each category proportionally
  return categories.map((category) => {
    const normalizedPercentage = (category.percentage / totalPercentage) * 100;
    const normalizedAmount = (totalBudget * normalizedPercentage) / 100;

    return {
      ...category,
      percentage: normalizedPercentage,
      amount: normalizedAmount,
    };
  });
}

/**
 * Generate warnings based on budget and inputs
 */
function generateWarnings(
  inputs: BudgetInputs,
  totalBudget: number,
  costPerGuest: number,
  categories: BudgetCategory[]
): Warning[] {
  const warnings: Warning[] = [];

  // Warning: Budget vs. Guest Count Mismatch
  const minCostPerGuest = COST_PER_GUEST_RANGES[inputs.city].min;
  if (costPerGuest < minCostPerGuest) {
    const suggestedReduction = Math.ceil(
      inputs.guestCount - totalBudget / minCostPerGuest
    );
    warnings.push({
      id: 'low-budget-per-guest',
      type: 'warning',
      title: 'Budget May Be Challenging',
      message: `Your budget of ₦${totalBudget.toLocaleString()} for ${inputs.guestCount} guests (₦${Math.round(costPerGuest).toLocaleString()} per guest) may be challenging. Typical weddings in ${CITY_NAMES[inputs.city]} cost ₦${minCostPerGuest.toLocaleString()}+ per guest. Consider reducing guests by ${suggestedReduction} to stay within budget.`,
    });
  }

  // Warning: Extremely low budget
  if (costPerGuest < WARNING_THRESHOLDS.minCostPerGuest) {
    warnings.push({
      id: 'extremely-low-budget',
      type: 'error',
      title: 'Budget Is Very Low',
      message: `At ₦${Math.round(costPerGuest).toLocaleString()} per guest, this budget will be very difficult to execute. Consider a smaller, more intimate ceremony or increasing your budget.`,
    });
  }

  // Info: Large guest count inflation
  if (inputs.guestCount > GUEST_COUNT_THRESHOLDS.standard) {
    const inflationBuffer = Math.ceil(
      inputs.guestCount * WARNING_THRESHOLDS.guestCountInflation
    );
    warnings.push({
      id: 'guest-count-inflation',
      type: 'info',
      title: 'Large Guest Lists Often Grow',
      message: `Guest lists for large weddings typically grow by 20-30%. Budget for ${inputs.guestCount + inflationBuffer} guests to be safe.`,
    });
  }

  // Warning: Low catering percentage
  const cateringCategory = categories.find((cat) => cat.id === 'catering');
  if (cateringCategory && cateringCategory.percentage < WARNING_THRESHOLDS.minCateringPercentage) {
    warnings.push({
      id: 'low-catering-budget',
      type: 'warning',
      title: 'Catering Budget May Be Low',
      message: `Food is typically 30%+ of wedding costs. Your current allocation of ${cateringCategory.percentage.toFixed(1)}% may require adjusting expectations or reducing guests.`,
      category: 'catering',
    });
  }

  // Info: Photography investment
  const photographyCategory = categories.find((cat) => cat.id === 'photography');
  if (photographyCategory && photographyCategory.percentage < WARNING_THRESHOLDS.minPhotographyPercentage) {
    warnings.push({
      id: 'low-photography-budget',
      type: 'info',
      title: 'Consider Investing in Photography',
      message: `Quality photography is a lasting investment. Your current allocation of ${photographyCategory.percentage.toFixed(1)}% is below the recommended 10-12%.`,
      category: 'photography',
    });
  }

  // Info: Hidden costs reminder
  warnings.push({
    id: 'hidden-costs',
    type: 'info',
    title: 'Don\'t Forget Hidden Costs',
    message: `Budget an extra 7-10% for unexpected costs like vendor meals, fuel/logistics, and overtime fees. We've included this in the "Miscellaneous" category.`,
  });

  // Info: Deposit requirements
  warnings.push({
    id: 'deposit-requirements',
    type: 'info',
    title: 'Plan for Deposits',
    message: `Most vendors require 30-50% deposits 2-3 months in advance. Ensure you have cash flow to cover these upfront costs.`,
  });

  return warnings;
}

/**
 * Generate smart suggestions based on budget and inputs
 */
function generateSuggestions(
  inputs: BudgetInputs,
  totalBudget: number,
  categories: BudgetCategory[]
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Add general saving suggestions
  SAVING_SUGGESTIONS.forEach((suggestion, index) => {
    let potentialSavings: number | undefined;

    if (suggestion.title.includes('guest list')) {
      // Calculate savings from reducing guests
      const guestsToRemove = 50;
      const costPerGuest = totalBudget / inputs.guestCount;
      potentialSavings = Math.round(guestsToRemove * costPerGuest);
    } else if (suggestion.title.includes('DIY')) {
      // Calculate savings on decor
      const decorCategory = categories.find((cat) => cat.id === 'decor');
      if (decorCategory) {
        potentialSavings = Math.round(decorCategory.amount * suggestion.potentialSavings);
      }
    } else {
      // General percentage savings
      potentialSavings = Math.round(totalBudget * suggestion.potentialSavings);
    }

    suggestions.push({
      id: `suggestion-${index}`,
      title: suggestion.title,
      description: suggestion.description,
      potentialSavings,
      icon: '💡',
    });
  });

  // Category-specific suggestions
  const highBudgetCategories = categories.filter((cat) => cat.percentage > 15);
  if (highBudgetCategories.length > 0) {
    suggestions.push({
      id: 'negotiate-high-categories',
      title: 'Negotiate Your Biggest Expenses',
      description: `Focus negotiation efforts on ${highBudgetCategories.map((c) => c.name).join(', ')} as these are your largest budget items.`,
      icon: '🤝',
    });
  }

  // Timeline suggestion
  const monthsUntilWedding = 6; // Could be dynamic if we had a date
  if (monthsUntilWedding >= 6) {
    suggestions.push({
      id: 'early-booking',
      title: 'Book Early for Better Rates',
      description: 'You have time to shop around and negotiate. Vendors often offer discounts for early bookings.',
      icon: '📅',
    });
  }

  return suggestions;
}

/**
 * Format currency in Naira
 */
export function formatCurrency(amount: number): string {
  return `₦${Math.round(amount).toLocaleString()}`;
}

/**
 * Get city multiplier
 */
export function getCityMultiplier(city: City): number {
  return CITY_MULTIPLIERS[city];
}
