/**
 * NFT Sales System
 *
 * Manages NFT sales, Guardian whitelist, mint/drop operations,
 * and ScrollChain asset registration.
 */

class NFTSales {
  constructor(config) {
    this.config = config;
    this.initialized = false;
    this.salesActive = false;

    this.collections = [];
    this.whitelist = new Set();
    this.mintedAssets = [];
    this.registeredAssets = [];

    this.salesConfig = {
      mintPrice: 0.1,
      maxSupply: 10000,
      reservedForWhitelist: 2000,
      maxPerWallet: 5
    };
  }

  async initialize() {
    this.collections = [
      {
        id: 'techangel-genesis',
        name: 'TECHANGEL Genesis Collection',
        description: 'The first guardians of the ScrollVerse',
        totalSupply: 10000,
        minted: 0,
        traits: ['Frequency', 'Sovereignty', 'Consciousness', 'Element']
      },
      {
        id: 'scroll-fragments',
        name: 'Scroll Fragments',
        description: 'Pieces of the eternal scroll, each holding unique power',
        totalSupply: 5000,
        minted: 0,
        traits: ['Lore', 'Power', 'Rarity', 'Alignment']
      }
    ];

    this.initialized = true;
    return true;
  }

  async launchSales() {
    if (!this.initialized) {
      throw new Error('NFT Sales must be initialized before launch');
    }

    this.salesActive = true;
    return {
      salesActive: true,
      collections: this.collections.length,
      timestamp: Date.now()
    };
  }

  async openGuardianWhitelist() {
    return {
      whitelistOpen: true,
      spots: this.salesConfig.reservedForWhitelist,
      timestamp: Date.now()
    };
  }

  addToWhitelist(address) {
    this.whitelist.add(address);
    return true;
  }

  isWhitelisted(address) {
    return this.whitelist.has(address);
  }

  async executeMintDrop() {
    if (!this.salesActive) {
      throw new Error('Sales must be active for mint/drop');
    }

    const drop = {
      id: `drop-${Date.now()}`,
      collection: 'techangel-genesis',
      quantity: 100,
      timestamp: Date.now()
    };

    return drop;
  }

  async mint(collectionId, quantity, buyer) {
    const collection = this.collections.find(c => c.id === collectionId);
    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.minted + quantity > collection.totalSupply) {
      throw new Error('Would exceed max supply');
    }

    const assets = [];
    for (let i = 0; i < quantity; i++) {
      const asset = {
        id: `${collectionId}-${collection.minted + i + 1}`,
        collection: collectionId,
        owner: buyer,
        mintedAt: Date.now()
      };
      assets.push(asset);
      this.mintedAssets.push(asset);
    }

    collection.minted += quantity;
    return assets;
  }

  async registerOnScrollChain(assetId) {
    const asset = this.mintedAssets.find(a => a.id === assetId);
    if (!asset) {
      throw new Error('Asset not found');
    }

    const registration = {
      ...asset,
      scrollChainId: `SC-${assetId}`,
      registeredAt: Date.now()
    };

    this.registeredAssets.push(registration);
    return registration;
  }

  getRegisteredAssets() {
    return this.registeredAssets;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      salesActive: this.salesActive,
      collections: this.collections,
      whitelistCount: this.whitelist.size,
      mintedCount: this.mintedAssets.length,
      registeredCount: this.registeredAssets.length
    };
  }
}

module.exports = NFTSales;
