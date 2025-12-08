/**
 * Vehicle NFT System - Main Export Module
 * Integrates all vehicle-related systems
 * 
 * Frequency: 963Hz | Divine Connection
 */

const VehicleNFTModel = require('./vehicle-nft-model.js');
const TechPartnerships = require('./tech-partnerships.js');
const IncentivesSystem = require('./incentives-system.js');

/**
 * Vehicle Orchestrator
 * Coordinates all vehicle NFT systems
 */
class VehicleOrchestrator {
  constructor(config = {}) {
    this.config = {
      frequency: 963,
      autoInitialize: true,
      ...config
    };

    // Initialize subsystems
    this.vehicleNFT = new VehicleNFTModel(config);
    this.techPartnerships = new TechPartnerships(config);
    this.incentives = new IncentivesSystem(config);
    
    this.status = 'initialized';
  }

  /**
   * Initialize all vehicle systems
   */
  async initialize() {
    console.log('🚗 Initializing Vehicle NFT System Orchestra at 963Hz...');
    
    // Initialize in sequence
    await this.vehicleNFT.initialize();
    await this.techPartnerships.initialize();
    await this.incentives.initialize();
    
    this.status = 'active';
    
    console.log('✓ Vehicle NFT System Orchestra fully initialized');
    return true;
  }

  /**
   * Deploy all vehicle systems
   */
  async deploy() {
    if (this.status !== 'active') {
      throw new Error('Vehicle systems must be initialized before deployment');
    }
    
    console.log('🚀 Deploying Vehicle NFT System Orchestra...');
    
    // Deploy subsystems
    const vehicleNFTResult = await this.vehicleNFT.deploy();
    const techPartnershipsResult = await this.techPartnerships.deploy();
    const incentivesResult = await this.incentives.deploy();
    
    this.status = 'deployed';
    
    console.log('✅ Vehicle NFT System Orchestra fully deployed');
    
    return {
      success: true,
      frequency: `${this.config.frequency}Hz`,
      subsystems: {
        vehicleNFT: vehicleNFTResult,
        techPartnerships: techPartnershipsResult,
        incentives: incentivesResult
      }
    };
  }

  /**
   * Mint vehicle NFT with full integration
   */
  async mintVehicleNFT(vehicleKey, ownerAddress, userData = {}) {
    console.log(`🎨 Minting integrated Vehicle NFT: ${vehicleKey}...`);
    
    // Mint NFT
    const mintResult = await this.vehicleNFT.mintVehicleNFT(vehicleKey, ownerAddress);
    
    // Sync with tech partners
    const vehicleData = this.vehicleNFT.getVehicleCollection(vehicleKey);
    const syncResults = await this.techPartnerships.syncAllPartnersForVehicle(
      vehicleKey,
      mintResult.metadata
    );
    
    // Calculate incentives
    const incentives = this.incentives.calculateIncentives(userData, vehicleData);
    
    // Apply pricing
    const pricing = this.techPartnerships.getPricingForVehicle(vehicleData);
    
    console.log(`✓ Vehicle NFT minted with full integration`);
    
    return {
      success: true,
      mint: mintResult,
      sync: syncResults,
      incentives: incentives,
      pricing: pricing
    };
  }

  /**
   * Create matching set with full incentives
   */
  async createMatchingSet(vehicleKeys, dealerAddress, userData = {}) {
    console.log(`🎯 Creating integrated matching set...`);
    
    // Create matching set
    const matchingSet = await this.techPartnerships.createMatchingSet(vehicleKeys, dealerAddress);
    
    // Calculate incentives for the set
    const setIncentives = this.incentives.calculateIncentives(
      { ...userData, vehicleCount: vehicleKeys.length },
      { totalValue: matchingSet.totalValue }
    );
    
    // Apply pricing boost
    const pricingBoost = this.incentives.applyPricingBoost(
      matchingSet.totalValue,
      { ...userData, vehicleCount: vehicleKeys.length }
    );
    
    console.log(`✓ Matching set created with full incentives`);
    
    return {
      success: true,
      matchingSet: matchingSet,
      incentives: setIncentives,
      pricing: pricingBoost
    };
  }

  /**
   * Get comprehensive statistics
   */
  getStatistics() {
    return {
      frequency: `${this.config.frequency}Hz`,
      status: this.status,
      vehicleNFT: this.vehicleNFT.getStatistics(),
      techPartnerships: this.techPartnerships.getStatistics(),
      incentives: this.incentives.getStatistics()
    };
  }

  /**
   * Get vehicle orchestrator status
   */
  getStatus() {
    return {
      status: this.status,
      frequency: `${this.config.frequency}Hz`,
      subsystems: {
        vehicleNFT: 'active',
        techPartnerships: 'active',
        incentives: 'active'
      }
    };
  }
}

// Export all modules
module.exports = {
  VehicleNFTModel,
  TechPartnerships,
  IncentivesSystem,
  VehicleOrchestrator
};
