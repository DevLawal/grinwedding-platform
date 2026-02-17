import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Wedding Budget Calculator | Grin Weddings',
    description: 'Estimate your wedding costs with our easy-to-use budget calculator.',
};

export default function BudgetCalculatorPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="font-serif text-4xl font-bold text-center mb-8">Wedding Budget Calculator</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Plan your perfect day without breaking the bank. Use our calculator to allocate your budget across different categories.
            </p>

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
                <p className="text-gray-400 italic">Budget Calculator Component Coming Soon</p>
                {/* 
                    TODO: Implement interactive calculator here.
                    - Input total budget
                    - Sliders for categories (Venue, Catering, Attire, etc.)
                    - Visual breakdown (Pie chart)
                */}
            </div>
        </div>
    );
}
