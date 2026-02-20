export default function DashboardPage() {
    return (
    <div className="space-y-12">
        <header>
            <h1 className="text-3xl font-serif font-black text-text tracking-tight">Welcome back, John</h1>
            <p className="text-text-muted font-medium mt-2">Here's what's happening with your wedding planning.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface p-8 border border-editorial shadow-premium">
                <h3 className="text-text-dim text-[10px] font-black uppercase tracking-widest mb-4">Days to Go</h3>
                <div className="text-4xl font-serif font-black text-text">142</div>
                <p className="text-purple text-xs font-bold mt-2 uppercase tracking-widest">March 24, 2027</p>
            </div>
            <div className="bg-surface p-8 border border-editorial shadow-premium">
                <h3 className="text-text-dim text-[10px] font-black uppercase tracking-widest mb-4">Confirmed Guests</h3>
                <div className="text-4xl font-serif font-black text-text">86</div>
                <p className="text-text-muted text-xs font-medium mt-2 italic">out of 120 invited</p>
            </div>
            <div className="bg-surface p-8 border border-editorial shadow-premium">
                <h3 className="text-text-dim text-[10px] font-black uppercase tracking-widest mb-4">Budget Used</h3>
                <div className="text-4xl font-serif font-black text-text">$12,450</div>
                <p className="text-green-500 text-xs font-bold mt-2 uppercase tracking-widest">45% of total budget</p>
            </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-surface border border-editorial overflow-hidden">
            <div className="px-8 py-6 border-b border-editorial flex justify-between items-center">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-text">Recent Activity</h2>
                <button className="text-[9px] font-black text-purple uppercase tracking-widest hover:text-text transition-colors">View All</button>
            </div>
            <div className="p-12 text-center text-text-dim font-black uppercase tracking-[0.2em] text-[10px] italic">
                No recent activity recorded.
            </div>
        </div>
        </div>
    );
}
