export default function GuestsPage() {
    return (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-serif font-black text-text tracking-tight uppercase">Guest List</h1>
            <button className="bg-text text-base dark:text-base-dark px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-purple hover:text-white transition-all">
                + Add Guest
            </button>
        </div>

        <div className="bg-surface border border-editorial p-12 flex flex-col items-center justify-center min-h-[500px] shadow-premium">
            <div className="w-20 h-20 bg-surface-2 border border-editorial rounded-full flex items-center justify-center text-3xl mb-8">
                👥
            </div>
            <h3 className="text-lg font-black text-text uppercase tracking-tight mb-2">No guests mapped</h3>
            <p className="text-text-muted text-center max-w-sm mb-10 font-medium leading-relaxed">
                Start building your guest list by importing contacts or adding them manually to the Grin Intelligence database.
            </p>
            <button className="text-[10px] font-black text-purple uppercase tracking-[0.3em] hover:text-text transition-colors border-b-2 border-purple hover:border-text pb-1">
                Import from Spreadsheet &rarr;
            </button>
        </div>
        </div>
    );
}
