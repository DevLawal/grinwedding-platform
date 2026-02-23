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

async function testInstagramAPI(handle) {
    const apiKey = env.RAPIDAPI_KEY;
    const apiHost = env.RAPIDAPI_HOST || 'instagram-looter2.p.rapidapi.com';

    console.log(`Testing handle: ${handle}`);
    console.log(`Using API Host: ${apiHost}`);

    const options = {
        hostname: apiHost,
        path: `/profile?username=${handle}`,
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    https.get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                console.log('API Response Structure (top-level keys):', Object.keys(parsedData));
                
                const user = parsedData.user || parsedData;
                console.log('User Data Keys:', Object.keys(user));
                
                console.log('Profile Pic URL:', user.profile_pic_url);
                console.log('Profile Pic HD URL:', user.profile_pic_url_hd || user.profile_pic_url);
                console.log('Followers:', user.follower_count);
            } catch (e) {
                console.error('Parse Error:', e.message);
                console.log('Raw Data Snippet:', data.substring(0, 500));
            }
        });
    }).on('error', (err) => {
        console.error('Request Error:', err.message);
    });
}

testInstagramAPI('weddingsng');
