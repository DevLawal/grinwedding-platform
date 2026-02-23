export interface InstagramMetrics {
    followers: number;
    avgLikes: number;
    avgComments: number;
    postsCount: number;
    engagementRate: number;
    profilePicUrl?: string; // Added for real images
}

export async function getVendorInstagramMetrics(handle: string): Promise<InstagramMetrics | null> {
    const cleanHandle = handle.replace('@', '');
    const apiKey = process.env.RAPIDAPI_KEY;
    const apiHost = process.env.RAPIDAPI_HOST || 'instagram-looter2.p.rapidapi.com';

    if (!apiKey) {
        console.warn('RAPIDAPI_KEY is missing, falling back to mock data');
        return getMockMetrics(cleanHandle);
    }

    try {
        // Step 1: Attempt to fetch basic profile info
        const profileResponse = await fetch(`https://${apiHost}/profile?username=${cleanHandle}`, {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });

        if (!profileResponse.ok) throw new Error(`Profile HTTP error! status: ${profileResponse.status}`);
        const profileData = await profileResponse.json();
        
        // Handle common looter2/GraphQL patterns
        const user = profileData.user || profileData;
        
        const followers = user.edge_followed_by?.count || user.follower_count || 0;
        const postsCount = user.edge_owner_to_timeline_media?.count || user.media_count || 0;
        let profilePicUrl = user.profile_pic_url_hd || user.profile_pic_url;

        // Step 2: Fallback Flow - If DP is missing or to get a fresh one from a post
        // The user suggested getting DP from a media post owner if profile fetch is insufficient
        const latestMediaId = user.edge_owner_to_timeline_media?.edges?.[0]?.node?.id;
        
        if (latestMediaId && (!profilePicUrl || profilePicUrl.includes('placeholder'))) {
            console.log(`[DEBUG] Attempting robust DP fetch from latest media: ${latestMediaId}`);
            const postPic = await fetchDPFromLatestPost(latestMediaId, apiKey, apiHost);
            if (postPic) profilePicUrl = postPic;
        }

        return {
            followers,
            avgLikes: 0,
            avgComments: 0,
            postsCount,
            engagementRate: 0,
            profilePicUrl
        };
    } catch (error) {
        console.error('Error fetching real Instagram metrics:', error);
        return getMockMetrics(cleanHandle);
    }
}

/**
 * Robust fallback to fetch DP from a specific post's owner metadata
 */
async function fetchDPFromLatestPost(mediaId: string, apiKey: string, apiHost: string): Promise<string | null> {
    try {
        const response = await fetch(`https://${apiHost}/post?id=${mediaId}`, {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });

        if (!response.ok) return null;
        const data = await response.json();
        const post = data.node || data;
        
        // Extract DP from owner
        return post.owner?.profile_pic_url || null;
    } catch (err) {
        console.error('Error in secondary DP fetch:', err);
        return null;
    }
}

function getMockMetrics(handle: string): InstagramMetrics {
    const seed = handle.length;
    return {
        followers: 1000 * seed + 500,
        avgLikes: 50 * seed + 20,
        avgComments: 5 * seed + 2,
        postsCount: 10 * seed + 100,
        engagementRate: 0.05 + (0.01 * (seed % 5)),
        profilePicUrl: `https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400&h=400&seed=${handle}`
    };
}

export function calculateVendorScore(metrics: InstagramMetrics): number {
    // Simple ranking algorithm
    // 60% Engagement Rate
    // 30% Follower Count (capped relevance)
    // 10% Posting Consistency (posts count)

    // Ensure we have some values even if real API returned 0 for some
    const engagementRate = metrics.engagementRate || 0.05; 
    const engagementScore = Math.min(engagementRate * 1000, 100); // Normalize to 0-100
    const followerScore = Math.min(metrics.followers / 100, 100); // Cap at 10k followers for max score
    const consistencyScore = Math.min(metrics.postsCount / 2, 100); // Cap at 200 posts

    return (engagementScore * 0.6) + (followerScore * 0.3) + (consistencyScore * 0.1);
}
