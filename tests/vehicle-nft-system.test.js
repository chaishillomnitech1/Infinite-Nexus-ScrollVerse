/**
 * Vehicle NFT System Tests
 * Comprehensive tests for Vehicle NFT Model, Tech Partnerships, and Incentives System
 */

const {
  VehicleNFTModel,
  TechPartnerships,
  IncentivesSystem,
  VehicleOrchestrator
} = require('../src/vehicles/index.js');

describe('Vehicle NFT Model', () => {
  let vehicleNFT;

  beforeEach(async () => {
    vehicleNFT = new VehicleNFTModel();
    await vehicleNFT.initialize();
  });

  describe('Initialization', () => {
    test('should initialize with correct frequency', () => {
      expect(vehicleNFT.config.frequency).toBe(963);
    });

    test('should initialize 5 luxury SUV collections', () => {
      const collections = vehicleNFT.getAllVehicleCollections();
      expect(Object.keys(collections).length).toBe(5);
    });

    test('should have all required vehicle collections', () => {
      const collections = vehicleNFT.getAllVehicleCollections();
      expect(collections).toHaveProperty('ZEEKR_9X');
      expect(collections).toHaveProperty('HONGQI_EHS9');
      expect(collections).toHaveProperty('IM_LS6');
      expect(collections).toHaveProperty('LYNK_CO_900');
      expect(collections).toHaveProperty('AVATR_11');
    });

    test('should initialize blockchain verifier', () => {
      expect(vehicleNFT.blockchainVerifier).toBeDefined();
      expect(vehicleNFT.blockchainVerifier.name).toBe('Akashic Blockchain Verifier');
    });
  });

  describe('Vehicle Collections', () => {
    test('Zeekr 9X should have correct specifications', () => {
      const zeekr = vehicleNFT.getVehicleCollection('ZEEKR_9X');
      expect(zeekr.name).toBe('Zeekr 9X');
      expect(zeekr.manufacturer).toBe('Zeekr (Geely)');
      expect(zeekr.rank).toBe(1);
      expect(zeekr.nftAttributes.frequencyLevel).toBe(963);
    });

    test('Hongqi E-HS9 should have correct tech partners', () => {
      const hongqi = vehicleNFT.getVehicleCollection('HONGQI_EHS9');
      expect(hongqi.techPartners).toContain('Huawei');
      expect(hongqi.techPartners).toContain('Baidu');
    });

    test('IM Motors LS6 should have correct cosmic materials', () => {
      const im = vehicleNFT.getVehicleCollection('IM_LS6');
      expect(im.nftAttributes.cosmicMaterials).toContain('Titanium');
      expect(im.nftAttributes.cosmicMaterials).toContain('Emerald');
      expect(im.nftAttributes.cosmicMaterials).toContain('Stardust');
    });

    test('Avatr 11 should have Huawei MDC in smart tech', () => {
      const avatr = vehicleNFT.getVehicleCollection('AVATR_11');
      expect(avatr.specs.smartTech).toContain('Huawei MDC');
    });
  });

  describe('Premium Materials', () => {
    test('should have precious metals with correct properties', () => {
      const platinum = vehicleNFT.getMaterialMetadata('Platinum');
      expect(platinum).toBeDefined();
      expect(platinum.rarity).toBe(0.98);
      expect(platinum.frequency).toBe(963);
    });

    test('should have diamonds with clarity ratings', () => {
      const diamond = vehicleNFT.getMaterialMetadata('Diamond');
      expect(diamond).toBeDefined();
      expect(diamond.clarity).toBe('IF');
      expect(diamond.color).toBe('D');
    });

    test('should have cosmic rare materials with origin', () => {
      const neutronDust = vehicleNFT.getMaterialMetadata('Neutron Star Dust');
      expect(neutronDust).toBeDefined();
      expect(neutronDust.origin).toBe('Supernova Remnant');
      expect(neutronDust.omniLevel).toBe(11);
    });
  });

  describe('NFT Metadata Generation', () => {
    test('should generate NFT metadata for all vehicles', () => {
      const allMetadata = vehicleNFT.getAllNFTMetadata();
      expect(allMetadata.length).toBe(5);
    });

    test('should generate correct token ID', () => {
      const metadata = vehicleNFT.getNFTMetadata('ZEEKR_9X');
      expect(metadata.tokenId).toBeDefined();
      expect(typeof metadata.tokenId).toBe('number');
    });

    test('should include Akashic attributes in metadata', () => {
      const metadata = vehicleNFT.getNFTMetadata('ZEEKR_9X');
      expect(metadata.akashicAttributes).toBeDefined();
      expect(metadata.akashicAttributes.frequencyLevel).toBe(963);
      expect(metadata.akashicAttributes.auricAlignment).toBe('Divine');
    });

    test('should include premium data backend', () => {
      const metadata = vehicleNFT.getNFTMetadata('ZEEKR_9X');
      expect(metadata.premiumData).toBeDefined();
      expect(metadata.premiumData.cosmicMaterials).toBeDefined();
      expect(metadata.premiumData.provenance).toBeDefined();
      expect(metadata.premiumData.qrMirror).toBeDefined();
    });

    test('should include blockchain verification', () => {
      const metadata = vehicleNFT.getNFTMetadata('ZEEKR_9X');
      expect(metadata.blockchain).toBeDefined();
      expect(metadata.blockchain.signature).toBeDefined();
      expect(metadata.blockchain.verified).toBe(true);
    });

    test('should include market data', () => {
      const metadata = vehicleNFT.getNFTMetadata('ZEEKR_9X');
      expect(metadata.marketData).toBeDefined();
      expect(metadata.marketData.baseValue).toBeGreaterThan(0);
      expect(metadata.marketData.lifetimeProfitPotential).toBeGreaterThan(0);
    });
  });

  describe('Minting', () => {
    test('should mint vehicle NFT successfully', async () => {
      const result = await vehicleNFT.mintVehicleNFT('ZEEKR_9X', '0xTestAddress');
      expect(result.success).toBe(true);
      expect(result.tokenId).toBeDefined();
      expect(result.metadata.owner).toBe('0xTestAddress');
    });

    test('should update statistics after minting', async () => {
      const beforeStats = vehicleNFT.getStatistics();
      await vehicleNFT.mintVehicleNFT('ZEEKR_9X', '0xTestAddress');
      const afterStats = vehicleNFT.getStatistics();
      
      expect(afterStats.activeTokens).toBe(beforeStats.activeTokens + 1);
      expect(afterStats.verifiedOwners).toBe(beforeStats.verifiedOwners + 1);
    });

    test('should fail to mint non-existent vehicle', async () => {
      await expect(
        vehicleNFT.mintVehicleNFT('INVALID_VEHICLE', '0xTestAddress')
      ).rejects.toThrow();
    });
  });

  describe('Deployment', () => {
    test('should deploy successfully', async () => {
      const result = await vehicleNFT.deploy();
      expect(result.success).toBe(true);
      expect(result.frequency).toBe('963Hz');
      expect(result.collections).toBe(5);
    });
  });
});

describe('Technology Partnerships', () => {
  let techPartnerships;

  beforeEach(async () => {
    techPartnerships = new TechPartnerships();
    await techPartnerships.initialize();
  });

  describe('Initialization', () => {
    test('should initialize with correct frequency', () => {
      expect(techPartnerships.config.frequency).toBe(963);
    });

    test('should have 6 technology partners', () => {
      const stats = techPartnerships.getStatistics();
      expect(stats.totalPartners).toBe(6);
    });

    test('should initialize pricing pipeline', () => {
      const tiers = techPartnerships.pricingPipeline.get('tiers');
      expect(tiers).toBeDefined();
      expect(Object.keys(tiers).length).toBe(5);
    });
  });

  describe('Partners', () => {
    test('should have Nvidia as ADAS partner', () => {
      const nvidia = techPartnerships.getPartner('NVIDIA');
      expect(nvidia).toBeDefined();
      expect(nvidia.technology).toBe('ADAS (Advanced Driver Assistance Systems)');
      expect(nvidia.products).toContain('DRIVE Orin');
    });

    test('should have Huawei as INFOTAINMENT partner', () => {
      const huawei = techPartnerships.getPartner('HUAWEI');
      expect(huawei).toBeDefined();
      expect(huawei.technology).toBe('INFOTAINMENT & Smart Cockpit');
      expect(huawei.products).toContain('HarmonyOS');
    });

    test('should have correct vehicle compatibility', () => {
      const nvidia = techPartnerships.getPartner('NVIDIA');
      expect(nvidia.vehicleCompatibility).toContain('ZEEKR_9X');
      expect(nvidia.vehicleCompatibility).toContain('IM_LS6');
    });

    test('should have NFT support enabled', () => {
      const nvidia = techPartnerships.getPartner('NVIDIA');
      expect(nvidia.integration.nftSupport).toBe(true);
    });
  });

  describe('Partner Synchronization', () => {
    test('should sync with partner successfully', async () => {
      const mockNFTData = {
        tokenId: 123,
        vehicleKey: 'ZEEKR_9X',
        akashicAttributes: { frequencyLevel: 963 }
      };
      
      const result = await techPartnerships.syncWithPartner('NVIDIA', mockNFTData);
      expect(result.success).toBe(true);
      expect(result.partner).toBe('Nvidia Corporation');
    });

    test('should update sync status', async () => {
      const mockNFTData = {
        tokenId: 123,
        vehicleKey: 'ZEEKR_9X',
        akashicAttributes: { frequencyLevel: 963 }
      };
      
      await techPartnerships.syncWithPartner('NVIDIA', mockNFTData);
      const status = techPartnerships.getSyncStatus('NVIDIA');
      
      expect(status.status).toBe('connected');
      expect(status.syncCount).toBeGreaterThan(0);
    });

    test('should fail to sync with non-existent partner', async () => {
      const mockNFTData = { tokenId: 123, vehicleKey: 'ZEEKR_9X' };
      await expect(
        techPartnerships.syncWithPartner('INVALID_PARTNER', mockNFTData)
      ).rejects.toThrow();
    });
  });

  describe('Pricing Pipeline', () => {
    test('should calculate lifetime profit correctly', () => {
      const mockVehicle = {
        rank: 1,
        techPartners: ['Nvidia', 'Qualcomm', 'Mobileye'],
        nftAttributes: {
          cosmicMaterials: ['Platinum', 'Diamond', 'Neutron Star Dust'],
          frequencyLevel: 963
        }
      };
      
      const pricing = techPartnerships.calculateLifetimeProfit(mockVehicle, 'PREMIUM');
      expect(pricing.totalPrice).toBeGreaterThan(0);
      expect(pricing.lifetimeProfit).toBeGreaterThan(0);
      expect(pricing.lifetimeProfitShare).toBe(0.15);
    });

    test('should apply correct pricing tier', () => {
      const mockVehicle = { rank: 1, techPartners: [], nftAttributes: { cosmicMaterials: [], frequencyLevel: 963 } };
      const pricing = techPartnerships.getPricingForVehicle(mockVehicle);
      expect(pricing.tier).toBe('PREMIUM');
    });
  });

  describe('Matching Sets', () => {
    test('should create matching set successfully', async () => {
      const vehicleKeys = ['ZEEKR_9X', 'HONGQI_EHS9', 'IM_LS6'];
      const result = await techPartnerships.createMatchingSet(vehicleKeys, '0xDealerAddress');
      
      expect(result.setId).toBeDefined();
      expect(result.vehicleKeys.length).toBe(3);
      expect(result.dealer).toBe('0xDealerAddress');
      expect(result.totalValue).toBeGreaterThan(0);
    });

    test('should apply set bonus for 3+ vehicles', async () => {
      const vehicleKeys = ['ZEEKR_9X', 'HONGQI_EHS9', 'IM_LS6'];
      const result = await techPartnerships.createMatchingSet(vehicleKeys, '0xDealerAddress');
      
      // With 3 vehicles, should get 1.2x bonus
      const expectedMinValue = 50000 * 3 * 1.2;
      expect(result.totalValue).toBeGreaterThanOrEqual(expectedMinValue);
    });
  });

  describe('Deployment', () => {
    test('should deploy successfully', async () => {
      const result = await techPartnerships.deploy();
      expect(result.success).toBe(true);
      expect(result.frequency).toBe('963Hz');
      expect(result.partners).toBe(6);
    });
  });
});

describe('Incentives System', () => {
  let incentives;

  beforeEach(async () => {
    incentives = new IncentivesSystem();
    await incentives.initialize();
  });

  describe('Initialization', () => {
    test('should initialize with correct frequency', () => {
      expect(incentives.config.frequency).toBe(963);
    });

    test('should have 5 incentive tiers', () => {
      expect(Object.keys(incentives.incentiveTiers).length).toBe(5);
    });

    test('should initialize 5 market experiments', () => {
      const stats = incentives.getStatistics();
      expect(stats.experimentsRunning).toBe(5);
    });

    test('should setup sustainability tracking', () => {
      expect(incentives.sustainabilityMetrics.size).toBe(5);
    });
  });

  describe('Incentive Tiers', () => {
    test('should determine correct tier for diamond user', () => {
      const userData = {
        vehicleCount: 5,
        totalValue: 300000,
        sustainabilityScore: 0.95
      };
      const tier = incentives.determineUserTier(userData);
      expect(tier).toBe('DIAMOND');
    });

    test('should determine correct tier for bronze user', () => {
      const userData = {
        vehicleCount: 1,
        totalValue: 10000,
        sustainabilityScore: 0.5
      };
      const tier = incentives.determineUserTier(userData);
      expect(tier).toBe('BRONZE');
    });

    test('should calculate incentives correctly', () => {
      const userData = {
        vehicleCount: 3,
        totalValue: 150000,
        sustainabilityScore: 0.8,
        hasTwin: true
      };
      const vehicleData = { totalValue: 50000 };
      
      const result = incentives.calculateIncentives(userData, vehicleData);
      expect(result.tier).toBe('PLATINUM');
      expect(result.totalRewards).toBeGreaterThan(0);
      expect(result.rewards.twinBonus).toBeGreaterThan(0);
    });
  });

  describe('Pricing Boost', () => {
    test('should apply pricing boost correctly', () => {
      const userData = {
        vehicleCount: 3,
        totalValue: 150000,
        sustainabilityScore: 0.8
      };
      
      const result = incentives.applyPricingBoost(50000, userData);
      expect(result.basePrice).toBe(50000);
      expect(result.finalPrice).toBeLessThan(50000);
      expect(result.savings).toBeGreaterThan(0);
    });

    test('should calculate savings percentage', () => {
      const userData = {
        vehicleCount: 5,
        totalValue: 300000,
        sustainabilityScore: 0.95
      };
      
      const result = incentives.applyPricingBoost(100000, userData);
      expect(result.savingsPercentage).toBeGreaterThan(0);
    });
  });

  describe('Market Experiments', () => {
    test('should have dynamic pricing experiment', () => {
      const experiment = incentives.getExperiment('DYNAMIC_PRICING');
      expect(experiment).toBeDefined();
      expect(experiment.status).toBe('active');
      expect(experiment.frequency).toBe(963);
    });

    test('should participate in dynamic pricing experiment', () => {
      const data = {
        basePrice: 50000,
        demand: 0.7,
        sustainabilityScore: 0.8
      };
      
      const result = incentives.participateInExperiment('DYNAMIC_PRICING', data);
      expect(result.adjustedPrice).toBeDefined();
      expect(result.basePrice).toBe(50000);
    });

    test('should participate in lifetime profits experiment', () => {
      const data = {
        vehicleValue: 50000,
        userTier: 'PLATINUM'
      };
      
      const result = incentives.participateInExperiment('LIFETIME_PROFITS', data);
      expect(result.annualProfit).toBeGreaterThan(0);
      expect(result.vestingPeriod).toBe(365);
    });

    test('should participate in twin adoption experiment', () => {
      const data = {
        hasTwin: true,
        vehicleValue: 50000
      };
      
      const result = incentives.participateInExperiment('TWIN_ADOPTION', data);
      expect(result.bonus).toBeGreaterThan(0);
      expect(result.hasTwin).toBe(true);
    });

    test('should participate in sustainability market experiment', () => {
      const data = {
        carbonOffset: 10,
        renewableEnergy: 0.8,
        ecoScore: 0.85,
        vehicleValue: 50000
      };
      
      const result = incentives.participateInExperiment('SUSTAINABILITY_MARKET', data);
      expect(result.totalReward).toBeGreaterThan(0);
      expect(result.carbonReward).toBeGreaterThan(0);
    });

    test('should participate in NFT staking experiment', () => {
      const data = {
        stakedValue: 50000,
        stakingDays: 90
      };
      
      const result = incentives.participateInExperiment('NFT_STAKING', data);
      expect(result.rewards).toBeGreaterThan(0);
      expect(result.currency).toBe('ScrollCoin');
    });
  });

  describe('Twin Adoption Tracking', () => {
    test('should track twin adoption by region', () => {
      const result = incentives.trackTwinAdoption('North America', 'twin', 'ZEEKR_9X');
      expect(result.twins).toBe(1);
    });

    test('should update conversion rate', () => {
      incentives.trackTwinAdoption('Europe', 'physical', 'ZEEKR_9X');
      incentives.trackTwinAdoption('Europe', 'digital', 'ZEEKR_9X');
      const result = incentives.trackTwinAdoption('Europe', 'twin', 'ZEEKR_9X');
      
      expect(result.conversionRate).toBeGreaterThan(0);
    });

    test('should get twin adoption data for region', () => {
      incentives.trackTwinAdoption('Asia-Pacific', 'twin', 'ZEEKR_9X');
      const data = incentives.getTwinAdoptionData('Asia-Pacific');
      
      expect(data).toBeDefined();
      expect(data.twins).toBe(1);
    });
  });

  describe('Sustainability Score', () => {
    test('should calculate sustainability score', () => {
      const userData = {
        carbon_footprint: 20,
        renewable_energy: 0.8,
        battery_lifecycle: 0.9,
        material_sourcing: 0.7,
        circular_economy: 0.6
      };
      
      const score = incentives.calculateSustainabilityScore(userData);
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThanOrEqual(1);
    });
  });

  describe('Deployment', () => {
    test('should deploy successfully', async () => {
      const result = await incentives.deploy();
      expect(result.success).toBe(true);
      expect(result.frequency).toBe('963Hz');
      expect(result.experiments).toBe(5);
    });
  });
});

describe('Vehicle Orchestrator', () => {
  let orchestrator;

  beforeEach(async () => {
    orchestrator = new VehicleOrchestrator();
    await orchestrator.initialize();
  });

  describe('Initialization', () => {
    test('should initialize all subsystems', () => {
      expect(orchestrator.vehicleNFT).toBeDefined();
      expect(orchestrator.techPartnerships).toBeDefined();
      expect(orchestrator.incentives).toBeDefined();
      expect(orchestrator.status).toBe('active');
    });

    test('should have correct frequency', () => {
      expect(orchestrator.config.frequency).toBe(963);
    });
  });

  describe('Integrated Minting', () => {
    test('should mint vehicle NFT with full integration', async () => {
      const userData = {
        vehicleCount: 1,
        totalValue: 50000,
        sustainabilityScore: 0.75
      };
      
      const result = await orchestrator.mintVehicleNFT('ZEEKR_9X', '0xTestAddress', userData);
      
      expect(result.success).toBe(true);
      expect(result.mint).toBeDefined();
      expect(result.sync).toBeDefined();
      expect(result.incentives).toBeDefined();
      expect(result.pricing).toBeDefined();
    });
  });

  describe('Integrated Matching Sets', () => {
    test('should create matching set with full incentives', async () => {
      const userData = {
        vehicleCount: 3,
        totalValue: 150000,
        sustainabilityScore: 0.8
      };
      
      const vehicleKeys = ['ZEEKR_9X', 'HONGQI_EHS9', 'IM_LS6'];
      const result = await orchestrator.createMatchingSet(vehicleKeys, '0xDealerAddress', userData);
      
      expect(result.success).toBe(true);
      expect(result.matchingSet).toBeDefined();
      expect(result.incentives).toBeDefined();
      expect(result.pricing).toBeDefined();
    });
  });

  describe('Statistics', () => {
    test('should get comprehensive statistics', () => {
      const stats = orchestrator.getStatistics();
      
      expect(stats.frequency).toBe('963Hz');
      expect(stats.vehicleNFT).toBeDefined();
      expect(stats.techPartnerships).toBeDefined();
      expect(stats.incentives).toBeDefined();
    });

    test('should get orchestrator status', () => {
      const status = orchestrator.getStatus();
      
      expect(status.status).toBe('active');
      expect(status.frequency).toBe('963Hz');
      expect(status.subsystems.vehicleNFT).toBe('active');
    });
  });

  describe('Deployment', () => {
    test('should deploy all subsystems', async () => {
      const result = await orchestrator.deploy();
      
      expect(result.success).toBe(true);
      expect(result.frequency).toBe('963Hz');
      expect(result.subsystems.vehicleNFT).toBeDefined();
      expect(result.subsystems.techPartnerships).toBeDefined();
      expect(result.subsystems.incentives).toBeDefined();
      expect(orchestrator.status).toBe('deployed');
    });

    test('should fail to deploy before initialization', async () => {
      const newOrchestrator = new VehicleOrchestrator();
      await expect(newOrchestrator.deploy()).rejects.toThrow();
    });
  });
});
