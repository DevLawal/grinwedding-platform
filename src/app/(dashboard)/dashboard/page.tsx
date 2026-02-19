export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, John</h1>
                <p className="text-gray-500">Here's what's happening with your wedding planning.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Days to Go</h3>
                    <div className="text-3xl font-bold text-gray-900">142</div>
                    <p className="text-purple-600 text-sm mt-1">March 24, 2027</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Confirmed Guests</h3>
                    <div className="text-3xl font-bold text-gray-900">86</div>
                    <p className="text-gray-400 text-sm mt-1">out of 120 invited</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Budget Used</h3>
                    <div className="text-3xl font-bold text-gray-900">$12,450</div>
                    <p className="text-emerald-500 text-sm mt-1">45% of total budget</p>
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-900">Recent Activity</h2>
                    <button className="text-sm text-purple-600 font-medium hover:text-purple-700">View All</button>
                </div>
                <div className="p-6 text-center text-gray-500 italic">
                    No recent activity to show.
                </div>
            </div>
        </div>
    );
}
