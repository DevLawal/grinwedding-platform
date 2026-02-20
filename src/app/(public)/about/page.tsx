// Image import removed as it was unused in MVP


export default function AboutPage() {
    return (
        <div className="bg-base min-h-screen py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl font-black text-text mb-6 tracking-tight">Our Story</h1>
                    <p className="text-xl text-text-muted leading-relaxed font-medium">
                        Celebrating love, elegance, and the art of modern weddings.
                    </p>
                </div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                <div className="relative h-[500px] w-full bg-surface-2 rounded-lg overflow-hidden border border-editorial">
                    {/* Placeholder for About Image if we had one */}
                    <div className="absolute inset-0 flex items-center justify-center text-text-dim/20 bg-purple-dim">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Proprietary Visual</span>
                    </div>
                </div>

                <div className="prose prose-lg dark:prose-invert prose-neutral">
                    <h3 className="font-serif text-2xl font-black text-text tracking-tight">Why We Started</h3>
                    <p className="text-text-muted font-medium leading-relaxed">
                        We believe every love story deserves a beautiful beginning. Our blog is dedicated to helping couples navigate the journey of wedding planning with style, grace, and confidence.
                    </p>
                    <p className="text-text-muted font-medium leading-relaxed">
                        From intimate elopements to grand celebrations, we curate the best inspiration from real weddings around the world.
                    </p>

                    <h3 className="font-serif text-2xl font-black text-text mt-12 tracking-tight">Our Mission</h3>
                    <p className="text-text-muted font-medium leading-relaxed">
                        To provide authentic, diverse, and timeless inspiration for the modern couple. We focus on quality over quantity, highlighting vendors and ideas that truly stand out.
                    </p>
                </div>
            </div>
            </div>
        </div>
    );
}
