/**
 * Hill Family Asset Prosperity System Tests
 * Comprehensive tests for real estate, vehicles, and family beneficiary systems
 */

const {
  HillFamilyAssetOrchestrator,
  RealEstateNFTModel,
  FamilyBeneficiarySystem,
  LuxuryVehicleExtension
} = require('../src/real-estate/index.js');

describe('Hill Family Asset Prosperity System', () => {
  let orchestrator;

  beforeEach(async () => {
    orchestrator = new HillFamilyAssetOrchestrator();
    await orchestrator.initialize();
  });

  describe('System Initialization', () => {
    test('should initialize with correct frequency', () => {
      expect(orchestrator.config.frequency).toBe(963);
    });

    test('should initialize all subsystems', () => {
      expect(orchestrator.status).toBe('active');
      expect(orchestrator.realEstate).toBeDefined();
      expect(orchestrator.vehicles).toBeDefined();
      expect(orchestrator.familyBeneficiaries).toBeDefined();
    });

    test('should calculate prosperity metrics correctly', () => {
      expect(orchestrator.prosperityMetrics.totalAssetValue).toBeGreaterThan(0);
      expect(orchestrator.prosperityMetrics.projectedAnnualRevenue).toBeGreaterThan(0);
      expect(orchestrator.prosperityMetrics.familyMembers).toBe(3);
      expect(orchestrator.prosperityMetrics.activeAssets).toBe(6); // 2 properties + 4 vehicles
    });
  });

  describe('Real Estate NFT Model', () => {
    let realEstate;

    beforeEach(async () => {
      realEstate = new RealEstateNFTModel();
      await realEstate.initialize();
    });

    test('should initialize 2 luxury properties', () => {
      const collections = realEstate.getAllPropertyCollections();
      expect(Object.keys(collections).length).toBe(2);
    });

    test('should have Vineland NJ property', () => {
      const property = realEstate.getPropertyCollection('VINELAND_NJ_LUXURY');
      expect(property).toBeDefined();
      expect(property.name).toBe('Vineland Luxury Estate');
      expect(property.location.city).toBe('Vineland');
      expect(property.location.state).toBe('New Jersey');
      expect(property.propertyDetails.squareFootage).toBe(5500);
    });

    test('should have New Brunswick NJ property', () => {
      const property = realEstate.getPropertyCollection('NEW_BRUNSWICK_NJ_LUXURY');
      expect(property).toBeDefined();
      expect(property.name).toBe('New Brunswick Luxury Residence');
      expect(property.location.city).toBe('New Brunswick');
      expect(property.propertyDetails.squareFootage).toBe(6200);
    });

    test('should initialize digital twins for properties', () => {
      const stats = realEstate.getStatistics();
      expect(stats.activeDigitalTwins).toBe(2);
    });

    test('should generate property NFT metadata', () => {
      const metadata = realEstate.generatePropertyMetadata('VINELAND_NJ_LUXURY');
      expect(metadata.name).toBe('Vineland Luxury Estate');
      expect(metadata.attributes).toBeInstanceOf(Array);
      expect(metadata.properties.digitalTwin).toBe(true);
    });

    test('should mint property NFT', async () => {
      const result = await realEstate.mintPropertyNFT(
        'VINELAND_NJ_LUXURY',
        '0xOwnerAddress',
        [{ name: 'Beneficiary 1', share: 0.5 }]
      );
      expect(result.success).toBe(true);
      expect(result.tokenId).toBeDefined();
      expect(result.beneficiaries).toHaveLength(1);
    });

    test('should calculate property revenue', () => {
      const revenue = realEstate.calculatePropertyRevenue('VINELAND_NJ_LUXURY', 1);
      expect(revenue.totalRevenue).toBeGreaterThan(0);
      expect(revenue.revenueStreams.appreciation).toBeGreaterThan(0);
      expect(revenue.revenueStreams.rental).toBeGreaterThan(0);
      expect(revenue.revenueStreams.nftRoyalty).toBeGreaterThan(0);
    });
  });

  describe('Luxury Vehicle Extension', () => {
    let vehicles;

    beforeEach(async () => {
      vehicles = new LuxuryVehicleExtension();
      await vehicles.initialize();
    });

    test('should initialize 4 luxury vehicles', () => {
      const collections = vehicles.getAllVehicleCollections();
      expect(Object.keys(collections).length).toBe(4);
    });

    test('should have 2 luxury sedans', () => {
      const sedans = vehicles.getVehiclesByCategory('Luxury Sedan');
      expect(Object.keys(sedans).length).toBe(2);
    });

    test('should have 2 luxury trucks/SUVs', () => {
      const trucks = vehicles.getVehiclesByCategory('Luxury Truck/SUV');
      expect(Object.keys(trucks).length).toBe(2);
    });

    test('should have Mercedes S-Class 2024', () => {
      const vehicle = vehicles.getVehicleCollection('MERCEDES_S_CLASS_2024');
      expect(vehicle).toBeDefined();
      expect(vehicle.name).toBe('Mercedes-Benz S-Class 2024');
      expect(vehicle.category).toBe('Luxury Sedan');
      expect(vehicle.specs.horsepower).toBe(496);
    });

    test('should have BMW 7 Series 2024', () => {
      const vehicle = vehicles.getVehicleCollection('BMW_7_SERIES_2024');
      expect(vehicle).toBeDefined();
      expect(vehicle.name).toBe('BMW 7 Series 2024');
      expect(vehicle.category).toBe('Luxury Sedan');
    });

    test('should have Mercedes G-Wagon 2024', () => {
      const vehicle = vehicles.getVehicleCollection('MERCEDES_G_WAGON_2024');
      expect(vehicle).toBeDefined();
      expect(vehicle.name).toBe('Mercedes-AMG G 63 2024');
      expect(vehicle.category).toBe('Luxury Truck/SUV');
      expect(vehicle.specs.horsepower).toBe(577);
    });

    test('should have Range Rover Autobiography 2024', () => {
      const vehicle = vehicles.getVehicleCollection('RANGE_ROVER_AUTOBIOGRAPHY_2024');
      expect(vehicle).toBeDefined();
      expect(vehicle.name).toBe('Range Rover Autobiography 2024');
      expect(vehicle.category).toBe('Luxury Truck/SUV');
    });

    test('should calculate total vehicle value', () => {
      const stats = vehicles.getStatistics();
      expect(stats.totalValue).toBeGreaterThan(500000); // Should be over $500k
    });

    test('should generate vehicle NFT metadata', () => {
      const metadata = vehicles.generateVehicleMetadata('MERCEDES_S_CLASS_2024');
      expect(metadata.name).toBe('Mercedes-Benz S-Class 2024');
      expect(metadata.attributes).toBeInstanceOf(Array);
      expect(metadata.properties.digitalTwin).toBe(true);
    });

    test('should mint vehicle NFT', async () => {
      const result = await vehicles.mintVehicleNFT(
        'MERCEDES_G_WAGON_2024',
        '0xOwnerAddress',
        [{ name: 'Beneficiary 1', share: 0.5 }]
      );
      expect(result.success).toBe(true);
      expect(result.tokenId).toBeDefined();
    });
  });

  describe('Family Beneficiary System', () => {
    let familySystem;

    beforeEach(async () => {
      familySystem = new FamilyBeneficiarySystem();
      await familySystem.initialize();
    });

    test('should initialize 3 family members', () => {
      const stats = familySystem.getStatistics();
      expect(stats.totalFamilyMembers).toBe(3);
    });

    test('should have Chais Khayree Hill as primary owner', () => {
      const chais = familySystem.getFamilyMember('CHAIS_KHAYREE_HILL');
      expect(chais).toBeDefined();
      expect(chais.name).toBe('Chais Khayree Hill');
      expect(chais.dateOfBirth).toBe('1997-02-14');
      expect(chais.role).toBe('Primary Owner');
      expect(chais.revenueShare).toBe(0.50);
    });

    test('should have Selena Hill as co-owner', () => {
      const selena = familySystem.getFamilyMember('SELENA_HILL');
      expect(selena).toBeDefined();
      expect(selena.name).toBe('Selena Hill');
      expect(selena.relationship).toBe('Wife');
      expect(selena.role).toBe('Co-Owner');
      expect(selena.revenueShare).toBe(0.30);
    });

    test('should have Londyn Avani Hill as heir', () => {
      const londyn = familySystem.getFamilyMember('LONDYN_AVANI_HILL');
      expect(londyn).toBeDefined();
      expect(londyn.name).toBe('Londyn Avani Hill');
      expect(londyn.relationship).toBe('Daughter');
      expect(londyn.role).toBe('Heir');
      expect(londyn.revenueShare).toBe(0.20);
      expect(londyn.trustSettings).toBeDefined();
    });

    test('should assign asset to family beneficiaries', async () => {
      const assignment = await familySystem.assignAsset(
        'TEST_ASSET_1',
        'Real Estate',
        1000000
      );
      expect(assignment.beneficiaries).toHaveLength(3);
      expect(assignment.totalShare).toBeCloseTo(1.0, 2);
    });

    test('should distribute revenue to beneficiaries', async () => {
      await familySystem.assignAsset('TEST_ASSET_1', 'Real Estate', 1000000);
      const distribution = await familySystem.distributeRevenue('TEST_ASSET_1', 100000);
      expect(distribution.distributions).toHaveLength(3);
      expect(distribution.totalAmount).toBe(100000);
    });

    test('should add future heir', async () => {
      const heir = await familySystem.addFutureHeir({
        name: 'Future Child',
        relationship: 'Son',
        revenueShare: 0.1
      });
      expect(heir.name).toBe('Future Child');
      expect(heir.role).toBe('Future Heir');
      expect(familySystem.getStatistics().totalFamilyMembers).toBe(4);
    });

    test('should execute succession', async () => {
      const result = await familySystem.executeSuccession(
        'CHAIS_KHAYREE_HILL',
        'LONDYN_AVANI_HILL'
      );
      expect(result.success).toBe(true);
      const londyn = familySystem.getFamilyMember('LONDYN_AVANI_HILL');
      expect(londyn.revenueShare).toBe(0.70); // 0.20 + 0.50 from Chais
    });
  });

  describe('Orchestrator Integration', () => {
    test('should deploy complete system', async () => {
      const result = await orchestrator.deploy();
      expect(result.success).toBe(true);
      expect(result.deployments.realEstate).toBeDefined();
      expect(result.deployments.vehicles).toBeDefined();
      expect(result.deployments.familyAssignments).toBeDefined();
    });

    test('should assign all assets to family', async () => {
      await orchestrator.deploy();
      const stats = orchestrator.familyBeneficiaries.getStatistics();
      expect(stats.totalAssignments).toBe(6); // 2 properties + 4 vehicles
    });

    test('should mint complete family portfolio', async () => {
      await orchestrator.deploy();
      const portfolio = await orchestrator.mintFamilyPortfolio();
      expect(portfolio.totalNFTs).toBe(6);
      expect(portfolio.properties).toHaveLength(2);
      expect(portfolio.vehicles).toHaveLength(4);
    });

    test('should calculate and distribute revenue', async () => {
      await orchestrator.deploy();
      const revenue = await orchestrator.calculateAndDistributeRevenue(1);
      expect(revenue.totalRevenue).toBeGreaterThan(0);
      expect(revenue.properties).toHaveLength(2);
      expect(revenue.distributions).toHaveLength(2);
    });

    test('should generate family asset report', async () => {
      await orchestrator.deploy();
      const report = orchestrator.getFamilyAssetReport();
      expect(report.family.name).toBe('Hill Family');
      expect(report.family.primaryOwner).toBe('Chais Khayree Hill');
      expect(report.realEstate.properties).toBeDefined();
      expect(report.vehicles.sedans).toBeDefined();
      expect(report.vehicles.trucks).toBeDefined();
      expect(report.prosperity).toBeDefined();
    });

    test('should have correct total asset value', () => {
      const metrics = orchestrator.prosperityMetrics;
      // 2 properties (~$3.3M) + 4 vehicles (~$610K) = ~$3.91M
      expect(metrics.totalAssetValue).toBeGreaterThan(3900000);
      expect(metrics.totalAssetValue).toBeLessThan(4000000);
    });

    test('should have projected annual revenue', () => {
      const metrics = orchestrator.prosperityMetrics;
      expect(metrics.projectedAnnualRevenue).toBeGreaterThan(400000); // Conservative estimate
    });
  });

  describe('Digital Twin Revenue', () => {
    test('should calculate property digital twin revenue', () => {
      const revenue = orchestrator.realEstate.calculatePropertyRevenue('VINELAND_NJ_LUXURY', 5);
      expect(revenue.years).toBe(5);
      expect(revenue.revenueStreams.appreciation).toBeGreaterThan(0);
      expect(revenue.revenueStreams.rental).toBeGreaterThan(0);
      expect(revenue.revenueStreams.nftRoyalty).toBeGreaterThan(0);
      expect(revenue.revenueStreams.digitalLicensing).toBeGreaterThan(0);
    });

    test('should have multiple revenue streams per property', () => {
      const property = orchestrator.realEstate.getPropertyCollection('VINELAND_NJ_LUXURY');
      expect(property.revenueStreams).toBeInstanceOf(Array);
      expect(property.revenueStreams.length).toBeGreaterThan(3);
    });
  });

  describe('Statistics and Reporting', () => {
    test('should get comprehensive statistics', () => {
      const stats = orchestrator.getStatistics();
      expect(stats.realEstate).toBeDefined();
      expect(stats.vehicles).toBeDefined();
      expect(stats.familyBeneficiaries).toBeDefined();
      expect(stats.prosperity).toBeDefined();
      expect(stats.frequency).toBe('963Hz');
    });

    test('should get system status', () => {
      const status = orchestrator.getStatus();
      expect(status.status).toBe('active');
      expect(status.frequency).toBe('963Hz');
      expect(status.subsystems.realEstate).toBe('active');
      expect(status.subsystems.vehicles).toBe('active');
      expect(status.subsystems.familyBeneficiaries).toBe('active');
    });
  });
});
