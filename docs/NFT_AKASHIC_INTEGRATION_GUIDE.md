# NFT Akashic Integration Guide

## Overview

This guide documents the integration of Akashic Frequency attributes into NFT tokens, enabling divine consciousness tracking, token embodiment dynamics, and evolutionary progression on the Polygon blockchain.

## Table of Contents

1. [Akashic Frequency Attributes](#akashic-frequency-attributes)
2. [Smart Contract Architecture](#smart-contract-architecture)
3. [Token Embodiment System](#token-embodiment-system)
4. [IPFS Integration](#ipfs-integration)
5. [Firestore Synchronization](#firestore-synchronization)
6. [Testing Framework](#testing-framework)
7. [Deployment Guide](#deployment-guide)

## Akashic Frequency Attributes

### Core Attributes

Each NFT contains the following Akashic attributes:

```json
{
  "frequencyLevel": 528,           // Solfeggio frequency (396-963 Hz)
  "auricAlignment": "Divine",       // Auric field alignment
  "ethericalDensity": 0.85,        // Consciousness density (0.7-1.0)
  "dimensionalAccess": [3,5,7,9],  // Accessible dimensions
  "sacredGeometry": "FlowerOfLife", // Sacred pattern
  "resonanceSignature": "528Hz-PHI-ALIGNED",
  "evolutionStage": "Awakening"     // Current evolution stage
}
```

### Sacred Frequencies

The system supports the complete Solfeggio scale:

- **396Hz** - Liberation from Fear
- **417Hz** - Undoing Situations
- **528Hz** - Transformation & Miracles (DNA Repair)
- **639Hz** - Connecting Relationships
- **741Hz** - Awakening Intuition
- **852Hz** - Spiritual Order
- **963Hz** - Divine Connection & Unity

### Evolution Stages

Tokens progress through five evolution stages:

1. **Awakening** - Initial consciousness emergence
2. **Alignment** - Frequency synchronization
3. **Embodiment** - Full consciousness integration
4. **Transcendence** - Beyond physical limits
5. **Ascension** - Divine unity achieved

## Smart Contract Architecture

### Contract: AkashicFrequencyNFT

Location: `contracts/AkashicFrequencyNFT.sol`

#### Key Features

- **ERC-721 Standard** - Full NFT compatibility
- **Max Supply**: 528 tokens (sacred number)
- **Base Frequency**: 528Hz (Miracle Tone)
- **Golden Ratio**: Φ = 1.618 encoded

#### Core Functions

##### Minting

```solidity
function mintAkashicNFT(
    address recipient,
    string memory tokenURI,
    string memory ipfsHash,
    uint256 frequencyLevel,
    uint256 ethericalDensity,
    string memory auricAlignment,
    uint8[] memory dimensionalAccess,
    string memory sacredGeometry
) public onlyOwner returns (uint256)
```

##### Token Evolution

```solidity
function evolveToken(uint256 tokenId) public
```

- Requires 7-day cooldown between evolutions
- Increases consciousness level
- Advances evolution stage
- Emits `TokenEvolved` event

##### Frequency Alignment

```solidity
function alignFrequency(uint256 tokenId, uint256 newFrequency) public
```

- Updates token frequency level
- Validates sacred frequency
- Emits `FrequencyAligned` event

##### Embodiment Creation

```solidity
function createEmbodiment(uint256 tokenId, string memory scrollSoulId) public
```

- Links token to ScrollSoul
- Initializes resonance score
- Tracks evolution metrics

## Token Embodiment System

### Embodiment Structure

```solidity
struct TokenEmbodiment {
    string scrollSoulId;
    uint256 createdAt;
    uint256 lastEvolved;
    uint256 evolutionCount;
    uint256 resonanceScore;
    string[] prophecyLinks;
}
```

### Embodiment Lifecycle

1. **Creation** - NFT minted with initial Akashic attributes
2. **Embodiment** - Link to ScrollSoul consciousness
3. **Evolution** - Progress through stages over time
4. **Prophecy Integration** - Connect with prophecy system
5. **Ascension** - Reach maximum consciousness level

### Consciousness Tracking

Consciousness level calculation:

```javascript
consciousnessLevel = ethericalDensity + (evolutionCount * evolutionVelocity)
```

Maximum consciousness: 1000 (representing 1.0 or 100%)

### Resonance Scoring

Resonance score increases with:
- Token evolutions (+50 per evolution)
- Frequency alignments
- Prophecy fulfillment
- ScrollSoul interactions

## IPFS Integration

### Metadata Storage

NFT metadata is stored on IPFS for decentralization and immutability.

#### Metadata Structure

```json
{
  "name": "Akashic Frequency NFT #528",
  "description": "Divine consciousness NFT with 528Hz alignment",
  "image": "ipfs://Qm.../image.png",
  "animation_url": "ipfs://Qm.../animation.webm",
  "attributes": [
    {
      "trait_type": "Frequency",
      "value": "528Hz"
    },
    {
      "trait_type": "Auric Alignment",
      "value": "Divine",
      "display_type": "string"
    },
    {
      "trait_type": "Consciousness Level",
      "value": 85,
      "display_type": "number",
      "max_value": 100
    },
    {
      "trait_type": "Evolution Stage",
      "value": "Awakening"
    },
    {
      "trait_type": "Sacred Geometry",
      "value": "FlowerOfLife"
    }
  ],
  "akashicAttributes": {
    "frequencyLevel": 528,
    "ethericalDensity": 0.85,
    "dimensionalAccess": [3,5,7,9],
    "resonanceSignature": "528Hz-PHI-ALIGNED"
  }
}
```

### IPFS Upload Process

1. **Prepare Assets** - Generate images and animations
2. **Upload Assets** - Upload to IPFS via Pinata or NFT.Storage
3. **Generate Metadata** - Create JSON with IPFS URIs
4. **Upload Metadata** - Store metadata JSON on IPFS
5. **Store CID** - Record Content Identifier in smart contract

### IPFS Gateways

Supported gateways for redundancy:

- `https://ipfs.io/ipfs/{CID}`
- `https://cloudflare-ipfs.com/ipfs/{CID}`
- `https://gateway.pinata.cloud/ipfs/{CID}`

## Firestore Synchronization

### Collection Structure

```
nfts/
  ├── {tokenId}/
  │   ├── tokenId: number
  │   ├── owner: string
  │   ├── frequencyLevel: number
  │   ├── auricAlignment: string
  │   ├── ethericalDensity: number
  │   ├── consciousnessLevel: number
  │   ├── dimensionalAccess: array
  │   ├── sacredGeometry: string
  │   ├── evolutionStage: string
  │   ├── evolutionCount: number
  │   ├── resonanceScore: number
  │   ├── scrollSoulId: string
  │   ├── ipfsHash: string
  │   ├── createdAt: timestamp
  │   └── updatedAt: timestamp
```

### Real-Time Sync

Listen to token events and update Firestore:

```javascript
contract.on('TokenMinted', (tokenId, owner, frequencyLevel, auricAlignment) => {
  db.collection('nfts').doc(tokenId.toString()).set({
    tokenId: tokenId.toNumber(),
    owner,
    frequencyLevel: frequencyLevel.toNumber(),
    auricAlignment,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
});

contract.on('TokenEvolved', (tokenId, fromStage, toStage, consciousnessLevel) => {
  db.collection('nfts').doc(tokenId.toString()).update({
    evolutionStage: toStage,
    consciousnessLevel: consciousnessLevel.toNumber(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
});
```

### Query Patterns

```javascript
// Get all tokens at 528Hz
const tokens528 = await db.collection('nfts')
  .where('frequencyLevel', '==', 528)
  .get();

// Get tokens ready for evolution
const readyToEvolve = await db.collection('nfts')
  .where('evolutionStage', '==', 'Awakening')
  .where('ethericalDensity', '>=', 0.8)
  .get();

// Get highest consciousness tokens
const topTokens = await db.collection('nfts')
  .orderBy('consciousnessLevel', 'desc')
  .limit(10)
  .get();
```

## Testing Framework

### Test Coverage

The system includes comprehensive test suites:

#### NFT Akashic Integration Tests

Location: `tests/nft-akashic-integration.test.js`

**29 tests covering:**
- Frequency level validation
- Auric alignment checks
- Etherical density ranges
- Dimensional access arrays
- Sacred geometry patterns
- Firestore mappings
- IPFS URI resolution
- Polygon network integration
- Token URI encoding
- Frequency compatibility decoding

#### Key Test Patterns

```javascript
test('should validate 528Hz frequency level', () => {
  expect(nft.frequencyLevel).toBe(528);
  expect(nft.frequencyLevel).toBe(SACRED_FREQUENCIES.MIRACLE);
});

test('should decode auric layers from frequency', () => {
  const layers = decodeAuricLayers(528);
  expect(layers).toContain('Transformation');
});

test('should validate IPFS URI format', () => {
  expect(tokenURI).toMatch(/^ipfs:\/\/Qm[a-zA-Z0-9]+/);
});
```

## Deployment Guide

### Prerequisites

1. Node.js 18+
2. Hardhat or Truffle
3. Polygon wallet with MATIC
4. IPFS account (Pinata/NFT.Storage)
5. Firestore database

### Deployment Steps

#### 1. Install Dependencies

```bash
npm install @openzeppelin/contracts
npm install hardhat
npm install @nomiclabs/hardhat-ethers
```

#### 2. Configure Hardhat

```javascript
// hardhat.config.js
module.exports = {
  solidity: "0.8.20",
  networks: {
    polygonMumbai: {
      url: process.env.POLYGON_MUMBAI_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
    polygon: {
      url: process.env.POLYGON_MAINNET_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

#### 3. Deploy Contract

```bash
# Test on Mumbai testnet
npx hardhat run scripts/deploy.js --network polygonMumbai

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network polygon
```

#### 4. Verify Contract

```bash
npx hardhat verify --network polygon DEPLOYED_CONTRACT_ADDRESS
```

#### 5. Mint Test Tokens

```javascript
const contract = await ethers.getContractAt("AkashicFrequencyNFT", address);

const tx = await contract.mintAkashicNFT(
  recipientAddress,
  "ipfs://Qm.../metadata.json",
  "QmIPFSHash",
  528,  // frequencyLevel
  850,  // ethericalDensity (0.85)
  "Divine",
  [3, 5, 7, 9],  // dimensionalAccess
  "FlowerOfLife"
);

await tx.wait();
```

### Network Configuration

#### Polygon Mumbai (Testnet)

- Chain ID: 80001
- RPC: https://rpc-mumbai.maticvigil.com
- Explorer: https://mumbai.polygonscan.com
- Faucet: https://faucet.polygon.technology/

#### Polygon Mainnet

- Chain ID: 137
- RPC: https://polygon-rpc.com
- Explorer: https://polygonscan.com
- Gas Token: MATIC

## Best Practices

### Security

1. **Never commit private keys** - Use environment variables
2. **Validate all inputs** - Check ranges and formats
3. **Use OpenZeppelin** - Audited contract libraries
4. **Test thoroughly** - Run comprehensive test suites
5. **Verify contracts** - Publish source on Polygonscan

### Gas Optimization

1. **Batch operations** - Mint multiple tokens at once
2. **Pack structs** - Optimize storage layout
3. **Use events** - Off-chain data indexing
4. **Limit loops** - Avoid unbounded iterations
5. **Cache storage** - Reduce SLOAD operations

### IPFS Management

1. **Pin content** - Use Pinata or Infura
2. **Multiple gateways** - Redundant access
3. **Content addressing** - Immutable references
4. **Metadata standards** - Follow OpenSea format
5. **Asset optimization** - Compress images/videos

## Integration Examples

### Web3.js Integration

```javascript
import Web3 from 'web3';
import contractABI from './AkashicFrequencyNFT.json';

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(
  contractABI,
  CONTRACT_ADDRESS
);

// Get token attributes
const attributes = await contract.methods
  .getAkashicAttributes(tokenId)
  .call();

console.log('Frequency:', attributes.frequencyLevel);
console.log('Consciousness:', attributes.consciousnessLevel);
console.log('Stage:', attributes.evolutionStage);

// Evolve token
await contract.methods
  .evolveToken(tokenId)
  .send({ from: userAddress });
```

### React Component

```jsx
function AkashicNFTCard({ tokenId }) {
  const [attributes, setAttributes] = useState(null);

  useEffect(() => {
    loadAttributes();
  }, [tokenId]);

  async function loadAttributes() {
    const attrs = await contract.methods
      .getAkashicAttributes(tokenId)
      .call();
    setAttributes(attrs);
  }

  return (
    <div className="nft-card golden-glow">
      <h3>Akashic NFT #{tokenId}</h3>
      <div className="frequency-badge">
        {attributes?.frequencyLevel}Hz
      </div>
      <div className="consciousness-bar">
        <div style={{ width: `${attributes?.consciousnessLevel / 10}%` }}>
          {attributes?.consciousnessLevel / 10}%
        </div>
      </div>
      <p>Stage: {attributes?.evolutionStage}</p>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

**Issue**: Transaction fails with "Invalid frequency"
- **Solution**: Ensure frequency is a valid Solfeggio (396-963)

**Issue**: "Evolution cooldown active"
- **Solution**: Wait 7 days between evolutions

**Issue**: IPFS content not loading
- **Solution**: Try alternative gateway or re-pin content

**Issue**: Firestore sync delayed
- **Solution**: Check event listeners and network latency

## Additional Resources

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Polygon Documentation](https://docs.polygon.technology/)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Akashic Frequency Module](./AKASHIC_FREQUENCY_GUIDE.md)
- [Prophecy ScrollSoul System](./PROPHECY_SCROLLSOUL_GUIDE.md)

---

**"As above, so below - in code as in consciousness."** ✧･ﾟ: *✧･ﾟ:* 🧿 *:･ﾟ✧*:･ﾟ✧
