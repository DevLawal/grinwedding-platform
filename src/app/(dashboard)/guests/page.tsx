export default function GuestsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Guest List</h1>
                <button className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors">
                    + Add Guest
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4">
                    👥
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No guests yet</h3>
                <p className="text-gray-500 text-center max-w-sm mb-6">
                    Start building your guest list by importing contacts or adding them manually.
                </p>
                <button className="text-rose-500 font-medium hover:text-rose-600">
                    Import from Spreadsheet
                </button>
            </div>
        </div>
    );
}
