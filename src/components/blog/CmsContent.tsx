'use client';

import parse, { HTMLReactParserOptions, Element, domToReact, DOMNode } from 'html-react-parser';
import Image from 'next/image';

interface CmsContentProps {
    content: string;
    className?: string;
}

const options: HTMLReactParserOptions = {
    replace: (domNode) => {
        if (domNode instanceof Element && domNode.name === 'img') {
            const { src, alt, width, height, class: className } = domNode.attribs;
            
            // Handle WordPress alignment classes
            const isAlignCenter = className?.includes('aligncenter');
            const isAlignLeft = className?.includes('alignleft');
            const isAlignRight = className?.includes('alignright');

            return (
                <div className={`my-12 overflow-hidden border border-editorial bg-surface-2 transition-all hover:shadow-hover group ${
                    isAlignCenter ? 'mx-auto max-w-4xl' : 
                    isAlignLeft ? 'md:float-left md:mr-8 md:max-w-[400px]' : 
                    isAlignRight ? 'md:float-right md:ml-8 md:max-w-[400px]' : 
                    'w-full'
                }`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <img
                            src={src}
                            alt={alt || ''}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                </div>
            );
        }

        if (domNode instanceof Element && domNode.name === 'figure') {
            const className = domNode.attribs.class;
            const isAlignCenter = className?.includes('aligncenter');

            return (
                <figure className={`my-12 ${isAlignCenter ? 'text-center' : ''}`}>
                    {domToReact(domNode.children as DOMNode[], options)}
                </figure>
            );
        }

        if (domNode instanceof Element && domNode.name === 'figcaption') {
            return (
                <figcaption className="mt-4 text-[11px] font-bold text-text-dim uppercase tracking-[0.2em] px-4 border-l-2 border-purple/30">
                    {domToReact(domNode.children as DOMNode[], options)}
                </figcaption>
            );
        }

        if (domNode instanceof Element && domNode.name === 'blockquote') {
            return (
                <blockquote className="my-16 pl-8 pr-4 py-8 border-l-4 border-purple bg-surface-2/50 relative overflow-hidden">
                    <span className="absolute -top-4 -left-2 text-8xl text-purple/10 font-serif pointer-events-none select-none">"</span>
                    <div className="relative z-10 font-serif text-xl md:text-2xl font-black italic text-text leading-relaxed">
                        {domToReact(domNode.children as DOMNode[], options)}
                    </div>
                </blockquote>
            );
        }

        // Handle WordPress gallery or other specific blocks if needed
        if (domNode instanceof Element && domNode.attribs.class?.includes('wp-block-gallery')) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
                     {domToReact(domNode.children as DOMNode[], options)}
                </div>
            );
        }
    },
};

export default function CmsContent({ content, className = '' }: CmsContentProps) {
    if (!content) return null;

    return (
        <div className={`cms-content prose-headings:scroll-mt-20 ${className}`}>
            {parse(content, options)}
        </div>
    );
}
