export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl">
            <div className="text-center mb-12">
                <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                <p className="text-gray-600">
                    Have a question or want to feature your wedding? We&apos;d love to hear from you.
                </p>
            </div>

            <form className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500" placeholder="your@email.com" />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input type="text" id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500" placeholder="Inquiry" />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="message" rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500" placeholder="How can we help?"></textarea>
                </div>

                <button type="button" className="w-full bg-rose-500 text-white font-semibold py-3 rounded-md hover:bg-rose-600 transition-colors">
                    Send Message
                </button>
            </form>
        </div>
    );
}
