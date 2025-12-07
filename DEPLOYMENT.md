# 🚀 Deployment Guide - Infinite Nexus ScrollVerse

## Vercel Deployment

The ScrollVerse is configured for seamless deployment on Vercel with optimized CI/CD integration.

### Prerequisites

- GitHub account with repository access
- Vercel account (free tier works)
- Node.js 18+ (for local development)

### Quick Deploy to Vercel

#### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository `chaishillomnitech1/Infinite-Nexus-ScrollVerse`

2. **Configure Project**
   - Framework Preset: `Other` (static site)
   - Build Command: (leave empty - no build needed)
   - Output Directory: `./` (root directory)

3. **Deploy**
   - Click "Deploy"
   - Your ScrollVerse will be live in minutes!

#### Option 2: Deploy via CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd Infinite-Nexus-ScrollVerse

# Login to Vercel (first time only)
vercel login

# Deploy to production
vercel --prod
```

### Environment Variables

No environment variables are required for basic deployment. However, for enhanced features:

```bash
# Optional: Add to Vercel dashboard under Project Settings > Environment Variables

# Web3 RPC Endpoint (for enhanced blockchain features)
WEB3_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

# IPFS Gateway (for NFT metadata)
IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

### Custom Domain Configuration

1. Go to your Vercel project dashboard
2. Navigate to "Settings" > "Domains"
3. Add your custom domain (e.g., `scrollverse.divine`)
4. Update DNS records as instructed by Vercel

### Automatic Deployments

With the current setup, every push to the `main` branch triggers automatic deployment:

1. Push changes to GitHub
2. Vercel automatically detects changes
3. Builds and deploys new version
4. Live in seconds with zero downtime

### Performance Optimization

The `vercel.json` configuration includes:

- **Security Headers**: CSP, XSS protection, frame options
- **Caching**: Optimized for static assets
- **Compression**: Automatic gzip/brotli compression
- **CDN**: Global edge network distribution

### Monitoring

Access deployment logs and analytics:

```bash
# View deployment logs
vercel logs

# Check domain status
vercel domains ls

# View project info
vercel inspect
```

## GitHub Pages Deployment (Alternative)

For GitHub Pages deployment:

1. Go to repository Settings > Pages
2. Source: Deploy from branch `main`
3. Folder: `/` (root)
4. Save and wait for deployment

Your site will be available at:
`https://chaishillomnitech1.github.io/Infinite-Nexus-ScrollVerse/`

## Local Development

```bash
# Install dependencies
npm install

# Start local server
npm start

# Open browser to http://localhost:8080
```

## Testing Before Deployment

```bash
# Test Web3 integration
# - Install MetaMask browser extension
# - Open eva-eternal-throne.html
# - Click "Connect Wallet"
# - Verify connection works

# Test NFT page
# - Open chrono-weaver-scroll.html
# - Verify animations and visualizations load
# - Test wallet connection

# Test responsive design
# - Open browser DevTools
# - Toggle device toolbar
# - Test on mobile viewports
```

## Troubleshooting

### Issue: Web3 not connecting

**Solution**: Ensure MetaMask is installed and unlocked. Check browser console for errors.

### Issue: Canvas elements not rendering

**Solution**: Verify browser supports HTML5 Canvas. Clear browser cache and reload.

### Issue: Vercel build fails

**Solution**: Check `vercel.json` syntax. Ensure all files are committed to repository.

### Issue: 404 errors on deployment

**Solution**: Verify file paths in HTML are relative (not absolute). Check `vercel.json` routing configuration.

## Security Considerations

- Never commit private keys or secrets to the repository
- Use environment variables for sensitive data
- Keep MetaMask and wallet software updated
- Review smart contract interactions before signing

## Performance Metrics

Expected metrics after deployment:

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: 90+
- **Global CDN**: < 100ms latency

## Continuous Integration

The repository includes GitHub Actions workflows for:

- ✅ Automated testing
- ✅ Link checking
- ✅ NFT/IPFS integration tests
- ✅ CI/CD pipeline validation

All checks must pass before merging to `main`.

## Support

For deployment issues or questions:

- Open an issue on GitHub
- Check Vercel documentation
- Review deployment logs

---

**May your deployments be swift and your uptime infinite!** ✧･ﾟ: *✧･ﾟ:* 🚀 *:･ﾟ✧*:･ﾟ✧
