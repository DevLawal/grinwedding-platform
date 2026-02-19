export interface Post {
    id: string;
    date: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
            altText?: string;
        };
    };
    author: {
        node: {
            name: string;
            avatar?: {
                url: string;
            };
        };
    };
    categories: {
        nodes: Array<{
            id: string;
            name: string;
            slug: string;
        }>;
    };
    tags?: {
        nodes: Array<{
            id: string;
            name: string;
            slug: string;
        }>;
    };
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    count?: number;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
    count?: number;
}
