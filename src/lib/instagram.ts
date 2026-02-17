export interface InstagramMetrics {
    followers: number;
    avgLikes: number;
    avgComments: number;
    postsCount: number;
    engagementRate: number;
}

export async function getVendorInstagramMetrics(handle: string): Promise<InstagramMetrics | null> {
    // In a real app, this would call the Instagram Graph API.
    // For now, we simulate a delay and return mock data based on the handle.

    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock logic to generate consistent "random" numbers based on handle length
    const seed = handle.length;

    return {
        followers: 1000 * seed + 500,
        avgLikes: 50 * seed + 20,
        avgComments: 5 * seed + 2,
        postsCount: 10 * seed + 100,
        engagementRate: 0.05 + (0.01 * (seed % 5)) // Randomish engagement rate between 5% and 10%
    };
}

export function calculateVendorScore(metrics: InstagramMetrics): number {
    // Simple ranking algorithm
    // 60% Engagement Rate
    // 30% Follower Count (capped relevance)
    // 10% Posting Consistency (posts count)

    const engagementScore = Math.min(metrics.engagementRate * 1000, 100); // Normalize to 0-100
    const followerScore = Math.min(metrics.followers / 100, 100); // Cap at 10k followers for max score
    const consistencyScore = Math.min(metrics.postsCount / 2, 100); // Cap at 200 posts

    return (engagementScore * 0.6) + (followerScore * 0.3) + (consistencyScore * 0.1);
}
