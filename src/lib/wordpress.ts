import { Post, Category, Tag } from "@/types/wordpress";
export type { Post, Category, Tag };

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://grinweddings.ng/graphql';

const MOCK_POSTS: Post[] = [
  {
    id: 'mock-1',
    date: new Date().toISOString(),
    slug: 'the-future-of-wedding-analytics',
    title: 'The Future of Wedding Analytics: 2027 Trends',
    excerpt: 'Discover how modern couples are using data to optimize their big day.',
    content: '<p>Content for mock analytics post...</p>',
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
        altText: 'Wedding analytics'
      }
    },
    author: {
      node: {
        name: 'John Analytics',
        avatar: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80' }
      }
    },
    categories: {
      nodes: [{ id: 'cat-1', name: 'Planning', slug: 'planning' }]
    }
  },
  {
    id: 'mock-2',
    date: new Date().toISOString(),
    slug: 'capital-allocation-for-elite-weddings',
    title: 'Capital Allocation: Where to Spend and Where to Save',
    excerpt: 'An executive breakdown of the $122Bn wedding industry dynamics.',
    content: '<p>Content for mock capital allocation post...</p>',
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80',
        altText: 'Capital allocation'
      }
    },
    author: {
      node: {
        name: 'Sarah Finance',
        avatar: { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80' }
      }
    },
    categories: {
      nodes: [{ id: 'cat-2', name: 'Finance', slug: 'finance' }]
    }
  }
];

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Planning', slug: 'planning', count: 12 },
  { id: 'cat-2', name: 'Finance', slug: 'finance', count: 8 },
  { id: 'cat-3', name: 'Venues', slug: 'venues', count: 45 }
];

async function wpFetch(query: string, variables = {}) {
    console.log('>>> [DEBUG] wpFetch called with API_URL:', API_URL);
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            next: { revalidate: 3600 } 
        });

        if (!res.ok) {
            console.warn(`WP Fetch failed with status: ${res.status}`);
            return null;
        }

        const json = await res.json();
        if (json.errors) {
            console.error('WPGraphQL Errors:', json.errors);
            return null;
        }
        return json.data;
    } catch (error) {
        console.error('WP Fetch Network/Socket Error:', error);
        return null;
    }
}

export async function getPosts(perPage = 10, page = 1): Promise<Post[]> {
    const query = `
        query GetPosts($first: Int) {
          posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
              id
              date
              slug
              title
              excerpt
              content
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              author {
                node {
                  name
                  avatar {
                    url
                  }
                }
              }
              categories {
                nodes {
                  id
                  name
                  slug
                }
              }
            }
          }
        }
    `;

    const data = await wpFetch(query, { first: perPage });
    if (!data?.posts?.nodes) {
        console.warn('>>> [DEBUG] No posts nodes found, using mock data');
        return MOCK_POSTS.slice(0, perPage);
    }

    return data.posts.nodes;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    // ... query stays the same ...
    const query = `
        query GetPostBySlug($id: ID!) {
          post(id: $id, idType: SLUG) {
            id
            date
            slug
            title
            excerpt
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            categories {
              nodes {
                id
                name
                slug
              }
            }
          }
        }
    `;

    const data = await wpFetch(query, { id: slug });
    if (!data?.post) {
        console.warn(`>>> [DEBUG] Post not found for slug ${slug}, using mock search`);
        return MOCK_POSTS.find(p => p.slug === slug) || null;
    }

    return data.post;
}

export async function getCategories(): Promise<Category[]> {
    const query = `
        query GetCategories {
          categories {
            nodes {
              id
              name
              slug
              count
            }
          }
        }
    `;
    const data = await wpFetch(query);
    if (!data?.categories?.nodes) {
        console.warn('>>> [DEBUG] No categories nodes found, using mock categories');
        return MOCK_CATEGORIES;
    }

    return data.categories.nodes;
}

export async function getPostsByCategory(categoryId: string, perPage = 10): Promise<Post[]> {
    const query = `
        query GetPostsByCategory($categoryId: Int, $first: Int) {
          posts(first: $first, where: { categoryId: $categoryId }) {
            nodes {
              id
              date
              slug
              title
              excerpt
              content
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
    `;

    const data = await wpFetch(query, { categoryId: parseInt(categoryId), first: perPage });
    if (!data?.posts?.nodes) {
        console.warn(`>>> [DEBUG] No posts nodes found for category ${categoryId}, using mock fallback`);
        return MOCK_POSTS.slice(0, perPage);
    }

    return data.posts.nodes;
}
