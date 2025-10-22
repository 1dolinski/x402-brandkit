# Deployment Guide

## Quick Deploy to Vercel

1. **Push to GitHub** (already done if you're reading this from the repo)

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select this repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables** (Optional)
   - If x402 API is available, set:
     - `NEXT_PUBLIC_USE_MOCK=false`
     - `NEXT_PUBLIC_X402_API_BASE=https://your-x402-api.com/api`
   - If using mock mode (recommended for initial deployment):
     - `NEXT_PUBLIC_USE_MOCK=true`

4. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

## Testing After Deployment

1. Visit your deployed URL
2. Enter a brand name (e.g., "TechStart")
3. Add an optional description
4. Select a style (Modern, Classic, Minimal, or Playful)
5. Click "Generate Brand Assets"
6. Verify all three sections appear:
   - Favicons (16x16, 32x32, Apple Touch)
   - Logo (SVG and PNG)
   - Descriptions (Short, Medium, Long, Keywords)

## Switching from Mock to Real x402 API

When the x402 API becomes available:

1. In Vercel dashboard, go to Settings → Environment Variables
2. Update `NEXT_PUBLIC_USE_MOCK` to `false`
3. Add `NEXT_PUBLIC_X402_API_BASE` with your x402 API endpoint
4. Redeploy the application

## Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

## Troubleshooting

### Build fails on Vercel
- Check that Node.js version is 18+ in Vercel settings
- Verify all environment variables are set correctly

### API returns errors
- If using mock mode, verify `NEXT_PUBLIC_USE_MOCK=true`
- If using real API, verify `NEXT_PUBLIC_X402_API_BASE` is correct and API is accessible

### TypeScript errors
- Run `npm run type-check` locally to verify types
- Check that all dependencies are installed with `npm install`

## Support

For issues or questions:
1. Check the README.md for documentation
2. Review API endpoint examples
3. Verify environment variables are set correctly
