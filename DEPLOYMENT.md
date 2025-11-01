# Deployment Guide

## Environment Variables

The following environment variables are required for deployment:

### Required for AI Generation
- `OPENAI_API_KEY` - OpenAI API key for GPT-4 idea generation

### Required for Backend (Vercel KV)
- `KV_URL` - Vercel KV REST API URL
- `KV_REST_API_URL` - Vercel KV REST API URL
- `KV_REST_API_TOKEN` - Vercel KV REST API token
- `KV_REST_API_READ_ONLY_TOKEN` - Vercel KV REST API read-only token

## Vercel Deployment

This application is optimized for deployment on Vercel.

### Steps:

1. **Connect Repository to Vercel**
   - Import the repository in Vercel dashboard
   - Vercel will automatically detect Next.js configuration

2. **Configure Environment Variables**
   - Add all required environment variables in Vercel project settings
   - Obtain Vercel KV credentials from Vercel Storage section

3. **Deploy**
   - Push to main branch triggers automatic deployment
   - Pull requests create preview deployments

### Vercel KV Setup

1. Go to Vercel Dashboard → Storage
2. Create a new KV database
3. Copy the environment variables to your project settings

## CI/CD Pipeline

The CI/CD pipeline runs automatically on every push and pull request:

### Test Job
- Type checking
- Linting
- Unit tests with coverage (95%+ achieved)
- Build verification

### E2E Job  
- End-to-end tests with Playwright
- Tests homepage, generate page, and API health

### Security Job
- Dependency scanning with Trivy
- Security vulnerability detection

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev

# Run tests
npm test
npm run test:coverage
npm run test:e2e

# Build for production
npm run build
npm start
```

## Health Checks

- Health endpoint: `GET /api/health`
- Returns status of backend services (KV database)
- Used for monitoring and alerting

## Performance

- Static page generation where possible
- Edge runtime for API routes
- Optimized bundle size
- Security headers enabled

## Monitoring

- Vercel Analytics (automatic)
- Health checks via `/api/health`
- Error tracking via Vercel logs
