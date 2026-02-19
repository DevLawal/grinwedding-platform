// Image import removed as it was unused in MVP


export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    Celebrating love, elegance, and the art of modern weddings.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                <div className="relative h-[500px] w-full bg-gray-100 rounded-lg overflow-hidden">
                    {/* Placeholder for About Image if we had one */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-purple-50">
                        Place for Image
                    </div>
                </div>

                <div className="prose prose-lg prose-violet">
                    <h3 className="font-serif text-2xl font-bold text-gray-900">Why We Started</h3>
                    <p>
                        We believe every love story deserves a beautiful beginning. Our blog is dedicated to helping couples navigate the journey of wedding planning with style, grace, and confidence.
                    </p>
                    <p>
                        From intimate elopements to grand celebrations, we curate the best inspiration from real weddings around the world.
                    </p>

                    <h3 className="font-serif text-2xl font-bold text-gray-900 mt-8">Our Mission</h3>
                    <p>
                        To provide authentic, diverse, and timeless inspiration for the modern couple. We focus on quality over quantity, highlighting vendors and ideas that truly stand out.
                    </p>
                </div>
            </div>
        </div>
    );
}
