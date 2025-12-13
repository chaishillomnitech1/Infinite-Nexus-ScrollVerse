/**
 * Property Digital Twin System Tests
 * Comprehensive tests for Property Digital Twin Model
 * Property: 658 Sixth Rd, Newtonville, NJ 08346
 */

const { PropertyDigitalTwinModel } = require('../src/property/index.js');

describe('Property Digital Twin Model', () => {
  let propertyTwin;

  beforeEach(() => {
    propertyTwin = new PropertyDigitalTwinModel();
  });

  describe('Initialization', () => {
    test('should initialize with correct frequencies', () => {
      expect(propertyTwin.config.frequency528Hz).toBe(528);
      expect(propertyTwin.config.frequency963Hz).toBe(963);
    });

    test('should initialize property information', () => {
      expect(propertyTwin.propertyInfo.address).toBe('658 Sixth Rd, Newtonville, New Jersey 08346');
      expect(propertyTwin.propertyInfo.gpsCoordinates.latitude).toBe(39.5596);
      expect(propertyTwin.propertyInfo.gpsCoordinates.longitude).toBe(-74.9136);
      expect(propertyTwin.propertyInfo.chainId).toBe(534352);
    });

    test('should have QR signature for property', () => {
      expect(propertyTwin.propertyInfo.qrSignature).toBeDefined();
      expect(typeof propertyTwin.propertyInfo.qrSignature).toBe('string');
    });

    test('should initialize with max NFT supply of 528', () => {
      expect(propertyTwin.config.maxNFTSupply).toBe(528);
    });
  });

  describe('Beneficiary Structure', () => {
    test('should have three beneficiaries', () => {
      const beneficiaryKeys = Object.keys(propertyTwin.beneficiaries);
      expect(beneficiaryKeys.length).toBe(3);
      expect(beneficiaryKeys).toContain('keleenJoySimpson');
      expect(beneficiaryKeys).toContain('jadaJoyHill');
      expect(beneficiaryKeys).toContain('nyasiaChaisHill');
    });

    test('Keleen Joy Simpson should have 50% ownership', () => {
      const keleen = propertyTwin.beneficiaries.keleenJoySimpson;
      expect(keleen.name).toBe('Keleen Joy Simpson');
      expect(keleen.birthDate).toBe('April 19, 1981');
      expect(keleen.ownershipPercentage).toBe(50);
      expect(keleen.role).toBe('Mother/Primary Owner');
    });

    test('Jada Joy Hill should have 25% ownership', () => {
      const jada = propertyTwin.beneficiaries.jadaJoyHill;
      expect(jada.name).toBe('Jada Joy Hill');
      expect(jada.birthDate).toBe('October 4, 2004');
      expect(jada.ownershipPercentage).toBe(25);
      expect(jada.role).toBe('Daughter/Co-Owner');
    });

    test('Nyasia Chais Hill should have 25% ownership', () => {
      const nyasia = propertyTwin.beneficiaries.nyasiaChaisHill;
      expect(nyasia.name).toBe('Nyasia Chais Hill');
      expect(nyasia.birthDate).toBe('March 13, 2006');
      expect(nyasia.ownershipPercentage).toBe(25);
      expect(nyasia.role).toBe('Daughter/Co-Owner');
    });

    test('total ownership should equal 100%', () => {
      const total = 
        propertyTwin.beneficiaries.keleenJoySimpson.ownershipPercentage +
        propertyTwin.beneficiaries.jadaJoyHill.ownershipPercentage +
        propertyTwin.beneficiaries.nyasiaChaisHill.ownershipPercentage;
      expect(total).toBe(100);
    });

    test('all beneficiaries should be active', () => {
      expect(propertyTwin.beneficiaries.keleenJoySimpson.active).toBe(true);
      expect(propertyTwin.beneficiaries.jadaJoyHill.active).toBe(true);
      expect(propertyTwin.beneficiaries.nyasiaChaisHill.active).toBe(true);
    });
  });

  describe('NFT Creation', () => {
    test('should create historical NFT', () => {
      const nft = propertyTwin.createNFT({
        type: 'historical',
        title: 'Property Acquisition',
        story: 'The day our family acquired this beautiful home',
        milestone: 'Home Purchase',
        beneficiary: 'keleenJoySimpson'
      });

      expect(nft).toBeDefined();
      expect(nft.tokenId).toBe(1);
      expect(nft.type).toBe('historical');
      expect(nft.title).toBe('Property Acquisition');
      expect(nft.frequency).toBe(528);
    });

    test('should create milestone NFT', () => {
      const nft = propertyTwin.createNFT({
        type: 'milestones',
        title: 'First Family Gathering',
        story: 'Our first holiday celebration in the home',
        milestone: 'Family Milestone',
        beneficiary: 'jadaJoyHill'
      });

      expect(nft.type).toBe('milestones');
      expect(nft.beneficiary).toBe('jadaJoyHill');
    });

    test('should generate QR signature for each NFT', () => {
      const nft = propertyTwin.createNFT({
        title: 'Test NFT',
        story: 'Test story',
        milestone: 'Test milestone'
      });

      expect(nft.qrSignature).toBeDefined();
      expect(typeof nft.qrSignature).toBe('string');
    });

    test('should increment token IDs', () => {
      const nft1 = propertyTwin.createNFT({ title: 'NFT 1', story: 'Story 1', milestone: 'M1' });
      const nft2 = propertyTwin.createNFT({ title: 'NFT 2', story: 'Story 2', milestone: 'M2' });
      const nft3 = propertyTwin.createNFT({ title: 'NFT 3', story: 'Story 3', milestone: 'M3' });

      expect(nft1.tokenId).toBe(1);
      expect(nft2.tokenId).toBe(2);
      expect(nft3.tokenId).toBe(3);
    });

    test('should include property address in NFT metadata', () => {
      const nft = propertyTwin.createNFT({
        title: 'Test',
        story: 'Test',
        milestone: 'Test'
      });

      expect(nft.metadata.propertyAddress).toBe('658 Sixth Rd, Newtonville, New Jersey 08346');
    });

    test('should track total NFTs minted', () => {
      expect(propertyTwin.statistics.totalNFTsMinted).toBe(0);
      
      propertyTwin.createNFT({ title: 'NFT 1', story: 'S1', milestone: 'M1' });
      expect(propertyTwin.statistics.totalNFTsMinted).toBe(1);
      
      propertyTwin.createNFT({ title: 'NFT 2', story: 'S2', milestone: 'M2' });
      expect(propertyTwin.statistics.totalNFTsMinted).toBe(2);
    });
  });

  describe('Digital Art Creation', () => {
    test('should create digital artwork', () => {
      const artwork = propertyTwin.createDigitalArt({
        title: 'Home Portrait',
        description: 'Beautiful digital rendering of the property',
        style: 'Contemporary',
        price: 1000
      });

      expect(artwork).toBeDefined();
      expect(artwork.title).toBe('Home Portrait');
      expect(artwork.frequency).toBe(963);
      expect(artwork.property).toBe('658 Sixth Rd, Newtonville, New Jersey 08346');
    });

    test('should assign beneficiary rights to artwork', () => {
      const artwork = propertyTwin.createDigitalArt({
        title: 'Test Art',
        description: 'Test',
        price: 500
      });

      expect(artwork.beneficiaryRights.keleenJoySimpson).toBe(50);
      expect(artwork.beneficiaryRights.jadaJoyHill).toBe(25);
      expect(artwork.beneficiaryRights.nyasiaChaisHill).toBe(25);
    });

    test('should generate QR signature for artwork', () => {
      const artwork = propertyTwin.createDigitalArt({
        title: 'Test Art',
        description: 'Test',
        price: 500
      });

      expect(artwork.qrSignature).toBeDefined();
    });
  });

  describe('Revenue Streams', () => {
    test('should have four revenue streams initialized', () => {
      expect(propertyTwin.revenueStreams.nftSales).toBeDefined();
      expect(propertyTwin.revenueStreams.digitalArt).toBeDefined();
      expect(propertyTwin.revenueStreams.propertyCoin).toBeDefined();
      expect(propertyTwin.revenueStreams.rentalIncome).toBeDefined();
    });

    test('should record revenue correctly', () => {
      const result = propertyTwin.recordRevenue('nftSales', 5000);
      
      expect(result.stream).toBe('nftSales');
      expect(result.amount).toBe(5000);
      expect(result.newTotal).toBe(5000);
      expect(propertyTwin.revenueStreams.nftSales.total).toBe(5000);
    });

    test('should accumulate revenue in streams', () => {
      propertyTwin.recordRevenue('nftSales', 1000);
      propertyTwin.recordRevenue('nftSales', 2000);
      propertyTwin.recordRevenue('nftSales', 3000);

      expect(propertyTwin.revenueStreams.nftSales.total).toBe(6000);
    });

    test('should track total revenue across all streams', () => {
      propertyTwin.recordRevenue('nftSales', 1000);
      propertyTwin.recordRevenue('digitalArt', 2000);
      propertyTwin.recordRevenue('propertyCoin', 3000);

      expect(propertyTwin.statistics.totalRevenueGenerated).toBe(6000);
    });

    test('should throw error for invalid revenue stream', () => {
      expect(() => {
        propertyTwin.recordRevenue('invalidStream', 1000);
      }).toThrow('Invalid revenue stream');
    });
  });

  describe('Revenue Distribution', () => {
    test('should calculate revenue distribution correctly', () => {
      propertyTwin.recordRevenue('nftSales', 10000);
      
      const distribution = propertyTwin.calculateRevenueDistribution('nftSales');
      
      expect(distribution.keleenJoySimpson).toBe(5000); // 50%
      expect(distribution.jadaJoyHill).toBe(2500); // 25%
      expect(distribution.nyasiaChaisHill).toBe(2500); // 25%
      expect(distribution.total).toBe(10000);
    });

    test('should return null if no revenue to distribute', () => {
      const distribution = propertyTwin.calculateRevenueDistribution('nftSales');
      expect(distribution).toBeNull();
    });

    test('should distribute revenue and mark as distributed', () => {
      propertyTwin.recordRevenue('digitalArt', 1000);
      
      const result = propertyTwin.distributeRevenue('digitalArt');
      
      expect(result.success).toBe(true);
      expect(result.distribution.total).toBe(1000);
      expect(propertyTwin.revenueStreams.digitalArt.distributed).toBe(1000);
    });

    test('should only distribute undistributed revenue', () => {
      propertyTwin.recordRevenue('propertyCoin', 5000);
      propertyTwin.distributeRevenue('propertyCoin');
      
      // Try to distribute again
      const result = propertyTwin.distributeRevenue('propertyCoin');
      expect(result.success).toBe(false);
      expect(result.message).toBe('No revenue to distribute');
    });
  });

  describe('QR Signature System', () => {
    test('should generate property QR signature', () => {
      const signature = propertyTwin.propertyInfo.qrSignature;
      expect(signature).toBeDefined();
      expect(typeof signature).toBe('string');
    });

    test('should store QR signature data', () => {
      const qrData = propertyTwin.qrSignatures.get('property-main');
      expect(qrData).toBeDefined();
      expect(qrData.signature).toBe(propertyTwin.propertyInfo.qrSignature);
    });

    test('should verify QR signature', () => {
      const result = propertyTwin.verifyQRSignature('property-main');
      
      expect(result.valid).toBe(true);
      expect(result.signature).toBeDefined();
      expect(result.verified).toBeDefined();
    });

    test('should return invalid for non-existent signature', () => {
      const result = propertyTwin.verifyQRSignature('non-existent');
      
      expect(result.valid).toBe(false);
      expect(result.message).toBe('Signature not found');
    });

    test('should track QR verifications', () => {
      expect(propertyTwin.statistics.qrVerifications).toBe(0);
      
      propertyTwin.verifyQRSignature('property-main');
      expect(propertyTwin.statistics.qrVerifications).toBe(1);
      
      propertyTwin.verifyQRSignature('property-main');
      expect(propertyTwin.statistics.qrVerifications).toBe(2);
    });
  });

  describe('Security Protocols', () => {
    test('should have QR verification enabled', () => {
      expect(propertyTwin.securityProtocols.qrVerification.enabled).toBe(true);
      expect(propertyTwin.securityProtocols.qrVerification.algorithm).toBe('SHA-256');
    });

    test('should require multi-signature', () => {
      expect(propertyTwin.securityProtocols.blockchainSecurity.multiSigRequired).toBe(true);
      expect(propertyTwin.securityProtocols.blockchainSecurity.requiredSignatures).toBe(2);
    });

    test('should have audit trail enabled', () => {
      expect(propertyTwin.securityProtocols.auditTrail.enabled).toBe(true);
      expect(propertyTwin.securityProtocols.auditTrail.immutable).toBe(true);
      expect(propertyTwin.securityProtocols.auditTrail.blockchain).toBe(true);
    });
  });

  describe('Property Status', () => {
    test('should return comprehensive property status', () => {
      const status = propertyTwin.getPropertyStatus();
      
      expect(status.property).toBeDefined();
      expect(status.beneficiaries).toBeDefined();
      expect(status.nftCollections).toBeDefined();
      expect(status.revenue).toBeDefined();
      expect(status.security).toBeDefined();
      expect(status.frequencies).toBeDefined();
    });

    test('should include beneficiary information in status', () => {
      const status = propertyTwin.getPropertyStatus();
      
      expect(status.beneficiaries.length).toBe(3);
      expect(status.beneficiaries[0].name).toBe('Keleen Joy Simpson');
      expect(status.beneficiaries[0].ownership).toBe(50);
    });

    test('should include NFT collection counts', () => {
      propertyTwin.createNFT({ type: 'historical', title: 'T1', story: 'S1', milestone: 'M1' });
      propertyTwin.createNFT({ type: 'milestones', title: 'T2', story: 'S2', milestone: 'M2' });
      propertyTwin.createDigitalArt({ title: 'Art1', description: 'D1', price: 100 });
      
      const status = propertyTwin.getPropertyStatus();
      
      expect(status.nftCollections.historical).toBe(1);
      expect(status.nftCollections.milestones).toBe(1);
      expect(status.nftCollections.artworks).toBe(1);
      expect(status.nftCollections.total).toBe(2);
    });
  });

  describe('Report Generation', () => {
    test('should generate comprehensive report', () => {
      const report = propertyTwin.generateReport();
      
      expect(report.title).toBe('Property Digital Twin Status Report');
      expect(report.generatedAt).toBeDefined();
      expect(report.property).toBeDefined();
      expect(report.ownership).toBeDefined();
      expect(report.assets).toBeDefined();
      expect(report.financials).toBeDefined();
      expect(report.security).toBeDefined();
      expect(report.blockchain).toBeDefined();
    });

    test('should include blockchain information in report', () => {
      const report = propertyTwin.generateReport();
      
      expect(report.blockchain.network).toBe('Scroll zkEVM');
      expect(report.blockchain.chainId).toBe(534352);
    });
  });

  describe('Integration Test', () => {
    test('complete property digital twin workflow', () => {
      // Create NFTs
      const nft1 = propertyTwin.createNFT({
        type: 'historical',
        title: 'Home Purchase',
        story: 'The beginning of our family legacy',
        milestone: 'Acquisition',
        beneficiary: 'keleenJoySimpson'
      });

      const nft2 = propertyTwin.createNFT({
        type: 'milestones',
        title: 'First Anniversary',
        story: 'One year in our beloved home',
        milestone: '1 Year',
        beneficiary: 'jadaJoyHill'
      });

      // Create artwork
      const artwork = propertyTwin.createDigitalArt({
        title: 'Home Sweet Home',
        description: 'Digital portrait of our property',
        style: 'Contemporary',
        price: 2000
      });

      // Record revenue
      propertyTwin.recordRevenue('nftSales', 5000);
      propertyTwin.recordRevenue('digitalArt', 2000);
      propertyTwin.recordRevenue('propertyCoin', 10000);

      // Verify QR
      const qrResult = propertyTwin.verifyQRSignature('property-main');

      // Generate status
      const status = propertyTwin.getPropertyStatus();

      // Assertions
      expect(propertyTwin.statistics.totalNFTsMinted).toBe(2);
      expect(propertyTwin.nftCollections.artworks.length).toBe(1);
      expect(propertyTwin.statistics.totalRevenueGenerated).toBe(17000);
      expect(qrResult.valid).toBe(true);
      expect(status.nftCollections.total).toBe(2);
      expect(status.revenue.total).toBe(17000);
    });
  });
});
