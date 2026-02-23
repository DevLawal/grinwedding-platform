const https = require('https');
const fs = require('fs');

// Manually parse .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim().replace(/"/g, '').replace(/'/g, '');
    }
});

const apiKey = env.RAPIDAPI_KEY;
const apiHost = env.RAPIDAPI_HOST || 'instagram-looter2.p.rapidapi.com';

async function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`Parse error for ${url}`));
                }
            });
        }).on('error', reject);
    });
}

async function testRobustDP(handle) {
    console.log(`\n--- Testing Robust DP for: ${handle} ---`);
    try {
        // Step 1: Profile
        console.log(`Step 1: Fetching profile for ${handle}...`);
        const profileData = await fetchJson(`https://${apiHost}/profile?username=${handle}`);
        const user = profileData.user || profileData;
        
        let profilePicUrl = user.profile_pic_url_hd || user.profile_pic_url;
        console.log(`Initial DP: ${profilePicUrl ? 'FOUND' : 'MISSING'}`);

        const latestMediaId = user.edge_owner_to_timeline_media?.edges?.[0]?.node?.id;
        console.log(`Latest Media ID: ${latestMediaId || 'NONE'}`);

        if (latestMediaId) {
            console.log(`Step 2: Fetching post ${latestMediaId} to get robust DP...`);
            const postData = await fetchJson(`https://${apiHost}/post?id=${latestMediaId}`);
            const post = postData.node || postData;
            const postPic = post.owner?.profile_pic_url;
            console.log(`Robust DP from Post: ${postPic ? 'FOUND' : 'MISSING'}`);
            if (postPic) {
                console.log(`URL: ${postPic.substring(0, 100)}...`);
            }
        }
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

async function run() {
    await testRobustDP('javan');
    await testRobustDP('weddingsng');
}

run();
