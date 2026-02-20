export default function ContactPage() {
    return (
        <div className="bg-base min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl font-bold text-text mb-4">Get in Touch</h1>
                    <p className="text-text-muted">
                        Have a question or want to feature your wedding? We&apos;d love to hear from you.
                    </p>
                </div>

            <form className="space-y-6 bg-surface p-8 rounded-lg shadow-sm border border-editorial">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-widest text-text-dim mb-2">Name</label>
                        <input type="text" id="name" className="w-full px-4 py-3 bg-surface-2 border border-editorial text-text rounded-md focus:ring-purple focus:border-purple transition-colors" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-text-dim mb-2">Email</label>
                        <input type="email" id="email" className="w-full px-4 py-3 bg-surface-2 border border-editorial text-text rounded-md focus:ring-purple focus:border-purple transition-colors" placeholder="your@email.com" />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className="block text-[10px] font-black uppercase tracking-widest text-text-dim mb-2">Subject</label>
                    <input type="text" id="subject" className="w-full px-4 py-3 bg-surface-2 border border-editorial text-text rounded-md focus:ring-purple focus:border-purple transition-colors" placeholder="Inquiry" />
                </div>

                <div>
                    <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-widest text-text-dim mb-2">Message</label>
                    <textarea id="message" rows={6} className="w-full px-4 py-3 bg-surface-2 border border-editorial text-text rounded-md focus:ring-purple focus:border-purple transition-colors" placeholder="How can we help?"></textarea>
                </div>

                <button type="button" className="w-full bg-text text-base dark:text-base-dark font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded-md hover:bg-purple hover:text-white transition-all">
                    Send Message
                </button>
            </form>
            </div>
        </div>
    );
}
