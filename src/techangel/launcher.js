/**
 * TECHANGEL Pilot NFT Event Launcher
 * 
 * Anchors narrative storytelling to the TECHANGEL pilot while
 * simultaneously launching NFT sales, staking mechanisms, and
 * Star Dust currency economics.
 */

const StarDustEconomics = require('./stardust-economics');
const NarrativeEngine = require('./narrative-engine');
const NFTSales = require('./nft-sales');
const StakingMechanism = require('./staking-mechanism');

class TechAngelLauncher {
  constructor(config) {
    this.config = config;
    this.initialized = false;
    this.deployed = false;
    
    this.starDust = new StarDustEconomics(config);
    this.narrative = new NarrativeEngine(config);
    this.nftSales = new NFTSales(config);
    this.staking = new StakingMechanism(config);

    this.pilotStatus = {
      teasers: 'pending',
      guardianWhitelist: 'pending',
      pilotMint: 'pending',
      scrollChainRegistration: 'pending'
    };
  }

  async initialize() {
    await this.starDust.initialize();
    await this.narrative.initialize();
    await this.nftSales.initialize();
    await this.staking.initialize();
    this.initialized = true;
    return true;
  }

  async deploy() {
    if (!this.initialized) {
      throw new Error('TECHANGEL must be initialized before deployment');
    }

    // Deploy narrative storytelling anchor
    await this.narrative.anchorToTechAngel();
    
    // Launch NFT sales simultaneously
    await this.nftSales.launchSales();
    
    // Activate staking mechanisms
    await this.staking.activate();
    
    // Initialize Star Dust economics
    await this.starDust.launchCurrency();

    this.deployed = true;
    return true;
  }

  /**
   * Execute launch sequence for TECHANGEL
   * Teasers → Guardian whitelist → Simultaneous pilot & mint/drop
   */
  async executeLaunchSequence() {
    // Phase 1: Teasers
    this.pilotStatus.teasers = 'active';
    await this.narrative.releaseTeasers();

    // Phase 2: Guardian Whitelist
    this.pilotStatus.guardianWhitelist = 'active';
    await this.nftSales.openGuardianWhitelist();

    // Phase 3: Simultaneous Pilot & Mint/Drop
    this.pilotStatus.pilotMint = 'active';
    await Promise.all([
      this.narrative.launchPilot(),
      this.nftSales.executeMintDrop()
    ]);

    // Phase 4: ScrollChain Registration
    this.pilotStatus.scrollChainRegistration = 'active';
    await this.registerOnScrollChain();

    return this.pilotStatus;
  }

  async registerOnScrollChain() {
    // Register all assets on ScrollChain for event access
    return {
      assets: await this.nftSales.getRegisteredAssets(),
      eventAccess: true,
      timestamp: Date.now()
    };
  }

  getStatus() {
    return {
      initialized: this.initialized,
      deployed: this.deployed,
      pilotStatus: this.pilotStatus,
      starDust: this.starDust.getStatus(),
      nftSales: this.nftSales.getStatus(),
      staking: this.staking.getStatus()
    };
  }
}

module.exports = TechAngelLauncher;
