# Wedding Blog - Next.js + Headless WordPress

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Set your WordPress API URL:
   ```env
   NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
   ```
   *Note: Ensure your WordPress site has Permalinks set to "Post name" or similar, not "Plain".*

3. **WordPress Requirements**
   - **CORS**: Ensure your WordPress site allows CORS requests from your Next.js domain (or localhost). You might need a plugin like "WPGraphQL CORS" or "Application Passwords" if you use authenticated requests (currently unnecessary for public reads).
   - **Post Features**: Ensure posts have "Featured Image" enabled and assigned.
   - **Categories**: Create categories like "Real Weddings", "Planning", "Inspiration".

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Folder Structure
- `/app`: Next.js App Router pages
- `/components`: UI and feature components
- `/lib`: Utility functions and API fetchers (`wordpress.ts`)

## Features
- **ISR**: Pages revalidate every hour (3600s).
- **SEO**: Dynamic metadata for blog posts.
- **Styling**: Tailwind CSS with custom font configuration.
