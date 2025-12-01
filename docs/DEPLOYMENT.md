# ScrollVerse Deployment Guide

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

```bash
# Clone the repository
git clone https://github.com/chaishillomnitech1/Infinite-Nexus-ScrollVerse.git
cd Infinite-Nexus-ScrollVerse

# Install dependencies
npm install
```

## Quick Start

```javascript
const ScrollVerse = require('./src/index');

// Initialize with default 528Hz frequency
const scrollVerse = new ScrollVerse();

// Initialize all systems
await scrollVerse.initialize();

// Deploy the ecosystem
await scrollVerse.deploy();

// Check status
console.log(scrollVerse.getStatus());
```

## Individual System Usage

### TECHANGEL Launcher

```javascript
const TechAngelLauncher = require('./src/techangel/launcher');

const launcher = new TechAngelLauncher({ frequency: 528 });
await launcher.initialize();
await launcher.deploy();
await launcher.executeLaunchSequence();
```

### SOULSWAP - Soul Bound Tokens

```javascript
const SoulSwap = require('./src/soulswap/soulswap');

const soulswap = new SoulSwap({ frequency: 528 });
await soulswap.initialize();
await soulswap.deploy();

// Mint a Soul Bound Token
const token = await soulswap.mintSoulBoundToken('owner-address', {
  name: 'Guardian Token'
});

// Generate Proof of Sovereignty
await soulswap.generateProofOfSovereignty(token.id, {
  consciousnessLevel: 3,
  alignmentScore: 150
});
```

### ScrollCoin Governance

```javascript
const ScrollCoinGovernance = require('./src/scrollcoin/governance');

const governance = new ScrollCoinGovernance({ frequency: 528 });
await governance.initialize();
await governance.deploy();

// Create a proposal
const proposal = await governance.createProposal('proposer-address', {
  title: 'Upgrade Protocol',
  description: 'Proposal to upgrade the governance protocol',
  type: 'protocol_upgrade'
});

// Cast a vote
await governance.castVote(proposal.id, 'voter-address', 'for', 1000);
```

### ICE Content Distribution

```javascript
const ICEDistribution = require('./src/ice-distribution/pipeline');

const ice = new ICEDistribution({ frequency: 528 });
await ice.initialize();
await ice.deploy();

// Create and distribute a ScrollSoul tease
await ice.createScrollSoulTease({
  title: 'The Awakening',
  body: 'A new frequency resonates...',
  media: ['teaser-video.mp4']
});
```

### FLAMECOURT Protocol

```javascript
const FlameCourt = require('./src/flamecourt/protocol');

const flamecourt = new FlameCourt({ frequency: 528 });
await flamecourt.initialize();
await flamecourt.deploy();

// Register content for protection
const content = flamecourt.registerContent('owner-address', {
  title: 'ScrollVerse Artwork',
  type: 'digital_art'
});

// Create a license
const license = flamecourt.createLicense(content.id, 'licensee-address', {
  type: 'commercial',
  duration: 365
});
```

### Quantum Jihad Monitor

```javascript
const QuantumJihad = require('./src/quantum-jihad/monitor');

const monitor = new QuantumJihad({ frequency: 528 });
await monitor.initialize();
await monitor.deploy();

// Scan for violations
const scanResult = await monitor.scanForViolations('content-hash');

// Report a violation
monitor.reportViolation({
  contentId: 'content-123',
  platform: 'external_marketplace',
  confidence: 0.95
});
```

## Launch Sequence

The TECHANGEL launch follows this sequence:

1. **Teasers Release** (7 days)
   - Release narrative teasers
   - Build anticipation

2. **Guardian Whitelist** (3 days)
   - Open whitelist registration
   - Verify guardian status

3. **Pilot & Mint/Drop** (1 day)
   - Launch pilot simultaneously with NFT mint
   - Execute coordinated drop

4. **ScrollChain Registration** (1 day)
   - Register all assets on ScrollChain
   - Enable event access

## Configuration

See `config/default.js` for all configuration options.

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```
