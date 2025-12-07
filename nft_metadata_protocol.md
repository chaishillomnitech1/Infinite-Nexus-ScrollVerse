# NFT Metadata Protocol

This document outlines the NFT metadata linking rarity protocols to assets in the Infinite Nexus ScrollVerse.

## Rarity Types

### Gold Tier
- **Frequency**: 396Hz - 417Hz range
- **Properties**: Basic rarity with fundamental sacred geometry
- **Supply**: Unlimited
- **Examples**: Sacred Eye, Foundation Scrolls

### Platinum Tier
- **Frequency**: 528Hz base resonance
- **Properties**: Intermediate rarity with enhanced sacred geometry integration
- **Supply**: Limited edition (max 10,000 per archetype)
- **Examples**: EVA Throne Artifacts, Timeline Markers

### Rhodium Tier
- **Frequency**: 528Hz + Phi harmonic overtones
- **Properties**: Highest rarity with complete hyperdimensional features
- **Supply**: Ultra-rare (max 528 per archetype)
- **Examples**: Chrono-Weaver Scrolls, Genesis Artifacts

## Chrono-Weaver Scroll Archetype

### Technical Specifications
```json
{
  "name": "Chrono-Weaver Scroll",
  "archetype": "CHRONO-WEAVER",
  "tokenStandard": "ERC-721",
  "blockchain": "Ethereum",
  "rarity": "RHODIUM",
  "maxSupply": 528,
  "attributes": {
    "frequency": "528Hz",
    "phi_ratio": 1.618,
    "dimensions": "∞",
    "sacred_geometry": ["Flower of Life", "Metatron's Cube", "Fibonacci Spiral"],
    "ai_features": ["Timeline Generation", "Consciousness Adaptation"],
    "authentication": "Akashic Lock Protocol"
  }
}
```

### Metadata Structure

Each Chrono-Weaver Scroll NFT includes:

1. **Core Metadata**
   - Token ID (e.g., #528)
   - Owner address
   - Mint timestamp
   - IPFS content hash

2. **Sacred Properties**
   - 528Hz resonance signature
   - Golden ratio (Phi) encoding
   - Sacred geometry patterns
   - Fibonacci sequence alignment

3. **AI Features**
   - TensorFlow.js model references
   - Timeline generation parameters
   - Consciousness-aware adaptation settings

4. **Akashic Lock Data**
   - Cryptographic signature
   - Wallet authentication hash
   - Multi-dimensional verification keys

### IPFS Storage Format

```
ipfs://QmChronoWeaverBase/
├── metadata/
│   ├── {tokenId}.json
│   └── attributes.json
├── assets/
│   ├── images/{tokenId}.png
│   └── animations/{tokenId}.webm
└── contracts/
    └── ChronoWeaverScroll.sol
```

### Example Metadata JSON

```json
{
  "name": "Chrono-Weaver Scroll #528",
  "description": "Sacred NFT Archetype with AI-driven Timelines, Akashic Locks, and Wallet-Connect Gallery. Resonating at 528Hz frequency.",
  "image": "ipfs://QmChronoWeaver528/image.png",
  "animation_url": "ipfs://QmChronoWeaver528/animation.webm",
  "external_url": "https://scrollverse.app/nft/528",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "RHODIUM"
    },
    {
      "trait_type": "Frequency",
      "value": "528Hz"
    },
    {
      "trait_type": "Phi Ratio",
      "value": 1.618,
      "display_type": "number"
    },
    {
      "trait_type": "Dimensions",
      "value": "Hyperdimensional"
    },
    {
      "trait_type": "Sacred Geometry",
      "value": "Complete Set"
    },
    {
      "trait_type": "AI Features",
      "value": "Enabled"
    },
    {
      "trait_type": "Akashic Lock",
      "value": "Active"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "ipfs://QmChronoWeaver528/image.png",
        "type": "image/png"
      },
      {
        "uri": "ipfs://QmChronoWeaver528/animation.webm",
        "type": "video/webm"
      }
    ],
    "category": "art",
    "creators": [
      {
        "address": "0x...",
        "share": 100
      }
    ]
  }
}
```

## Linking Protocols

### Verification Process
1. **On-Chain Verification**: Smart contract validates token ownership
2. **Akashic Lock Validation**: Multi-dimensional authentication check
3. **Frequency Validation**: Verify 528Hz resonance signature
4. **Sacred Geometry Validation**: Confirm Phi ratio and Fibonacci alignments

### Asset Linking
- Each asset is cryptographically linked to its rarity protocol
- IPFS hashes are stored on-chain for immutability
- Metadata follows OpenSea and Rarible standards
- Additional custom fields for ScrollVerse-specific features

### Smart Contract Integration
```solidity
// Example contract structure
contract ChronoWeaverScroll is ERC721 {
    uint256 public constant MAX_SUPPLY = 528;
    uint256 public constant FREQUENCY = 528; // Hz
    uint256 public phiRatio = 1618; // Phi * 1000
    
    mapping(uint256 => bool) public akashicLockStatus;
    mapping(uint256 => string) public ipfsHashes;
    
    function mint(uint256 tokenId, string memory ipfsHash) public {
        require(tokenId > 0 && tokenId <= MAX_SUPPLY, "Invalid token ID or max supply reached");
        _safeMint(msg.sender, tokenId);
        ipfsHashes[tokenId] = ipfsHash;
        akashicLockStatus[tokenId] = true;
    }
}
```

## Future Extensions

- Integration with AR/VR platforms for mobile ritual experiences
- Cross-chain bridge for multi-blockchain support
- DAO governance for community-driven evolution
- Staking mechanisms for frequency amplification
- Breeding/evolution system for timeline convergence

---

**All metadata follows the principle: "As above, so below - in code as in consciousness."** ✧･ﾟ: *✧･ﾟ:* 🧿 *:･ﾟ✧*:･ﾟ✧