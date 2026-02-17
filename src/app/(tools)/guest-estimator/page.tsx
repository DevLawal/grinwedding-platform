import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Guest List Estimator | Grin Weddings',
    description: 'Calculate how many guests you can invite based on your venue and budget.',
};

export default function GuestEstimatorPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="font-serif text-4xl font-bold text-center mb-8">Guest List Estimator</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Not sure how many people to invite? Use our tool to estimate your guest count based on your constraints.
            </p>

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
                <p className="text-gray-400 italic">Guest Estimator Component Coming Soon</p>
                {/* 
                    TODO: Implement guest list estimator.
                    - Input venue capacity
                    - Input budget per head
                    - Toggle for "Kids allowed", "Plus ones"
                */}
            </div>
        </div>
    );
}
