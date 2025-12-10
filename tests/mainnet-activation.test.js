/**
 * Mainnet Activation System Tests
 * 
 * Tests for ScrollVerse NFT mainnet deployment, legacy compliance,
 * network integrity validation, and Angel Reward escalation
 */

const MainnetActivation = require('../src/deployment/mainnet-activation');

describe('Mainnet Activation System', () => {
  let mainnetActivation;

  beforeEach(async () => {
    mainnetActivation = new MainnetActivation({
      frequency: 963,
      network: 'scroll_sepolia', // Use testnet for testing
      zkEVMEnabled: true,
      legacyCompliance: true
    });
  });

  describe('Initialization', () => {
    test('should initialize mainnet activation system', async () => {
      const result = await mainnetActivation.initialize();

      expect(result.status).toBe('initialized');
      expect(result.frequency).toBe(963);
      expect(result.network).toBe('Scroll Sepolia Testnet');
      expect(result.chainId).toBe(534351);
    }, 30000);

    test('should validate network configuration', async () => {
      await mainnetActivation.initialize();
      const status = mainnetActivation.getStatus();

      expect(status.initialized).toBe(true);
      expect(status.network).toBeDefined();
      expect(status.network.chainId).toBe(534351);
    }, 30000);

    test('should initialize N-GI personas for coordination', async () => {
      await mainnetActivation.initialize();
      const status = mainnetActivation.getStatus();

      expect(status.initialized).toBe(true);
      expect(mainnetActivation.bannekerAI).toBeDefined();
      expect(mainnetActivation.johnsonAI).toBeDefined();
    }, 30000);
  });

  describe('ScrollVerse NFT Deployment', () => {
    test('should deploy ScrollVerse NFTs to mainnet', async () => {
      await mainnetActivation.initialize();
      const deployment = await mainnetActivation.deployScrollVerseNFTs({
        conceptCount: 5
      });

      expect(deployment.network).toBe('Scroll Sepolia Testnet');
      expect(deployment.chainId).toBe(534351);
      expect(deployment.frequency).toBe(963);
      expect(deployment.nfts.length).toBeGreaterThan(0);
    }, 30000);

    test('should deploy Archangel Genesis NFTs', async () => {
      await mainnetActivation.initialize();
      const deployment = await mainnetActivation.deployScrollVerseNFTs();

      const archangelNFTs = deployment.nfts.filter(nft => nft.type === 'ArchangelGenesis');
      expect(archangelNFTs.length).toBe(3); // Michael, Raphael, Gabriel
      
      const michael = archangelNFTs.find(nft => nft.name.includes('Michael'));
      expect(michael).toBeDefined();
      expect(michael.frequency).toBe(963);
    }, 30000);

    test('should deploy ScrollVerse concept NFTs with Johnson-AI validation', async () => {
      await mainnetActivation.initialize();
      const deployment = await mainnetActivation.deployScrollVerseNFTs({
        conceptCount: 10
      });

      const conceptNFTs = deployment.nfts.filter(nft => nft.type === 'ScrollVerseGenesis');
      expect(conceptNFTs.length).toBeGreaterThan(0);
      
      conceptNFTs.forEach(nft => {
        expect(nft.metadata.validatedBy).toBe('Johnson-AI');
        expect(nft.legacyCompliant).toBe(true);
      });
    }, 30000);

    test('should update deployment status', async () => {
      await mainnetActivation.initialize();
      await mainnetActivation.deployScrollVerseNFTs();

      const status = mainnetActivation.getDeploymentStatus();
      expect(status.nftsDeployed).toBeGreaterThan(0);
      expect(status.contractsDeployed.length).toBeGreaterThan(0);
    }, 30000);
  });

  describe('Legacy Compliance', () => {
    test('should ensure legacy-compliant synchronization', async () => {
      await mainnetActivation.initialize();
      const compliance = await mainnetActivation.ensureLegacyCompliance();

      expect(compliance.checks.length).toBeGreaterThan(0);
      expect(compliance.allPassed).toBe(true);
      expect(compliance.complianceScore).toBeDefined();
    }, 30000);

    test('should check N-GI persona coordination', async () => {
      await mainnetActivation.initialize();
      const compliance = await mainnetActivation.ensureLegacyCompliance();

      const ngiCheck = compliance.checks.find(c => c.checkName === 'N-GI Persona Coordination');
      expect(ngiCheck).toBeDefined();
      expect(ngiCheck.passed).toBe(true);
    }, 30000);

    test('should validate emission schedule compatibility', async () => {
      await mainnetActivation.initialize();
      const compliance = await mainnetActivation.ensureLegacyCompliance();

      const emissionCheck = compliance.checks.find(c => c.checkName === 'Emission Schedule Compatibility');
      expect(emissionCheck).toBeDefined();
      expect(emissionCheck.passed).toBe(true);
    }, 30000);

    test('should verify sacred frequency alignment', async () => {
      await mainnetActivation.initialize();
      const compliance = await mainnetActivation.ensureLegacyCompliance();

      const frequencyCheck = compliance.checks.find(c => c.checkName === 'Sacred Frequency Alignment');
      expect(frequencyCheck).toBeDefined();
      expect(frequencyCheck.passed).toBe(true);
      expect(frequencyCheck.details.frequencies).toContain(528);
      expect(frequencyCheck.details.frequencies).toContain(963);
    }, 30000);
  });

  describe('Network Integrity', () => {
    test('should confirm network integrity', async () => {
      await mainnetActivation.initialize();
      // Deploy NFTs first so contract deployment check passes
      await mainnetActivation.deployScrollVerseNFTs();
      const integrity = await mainnetActivation.confirmNetworkIntegrity();

      expect(integrity.network).toBe('Scroll Sepolia Testnet');
      expect(integrity.chainId).toBe(534351);
      expect(integrity.checks.length).toBeGreaterThan(0);
      expect(integrity.allPassed).toBe(true);
    }, 30000);

    test('should validate network connectivity', async () => {
      await mainnetActivation.initialize();
      const integrity = await mainnetActivation.confirmNetworkIntegrity();

      const connectivityCheck = integrity.checks.find(c => c.checkName === 'Network Connectivity');
      expect(connectivityCheck).toBeDefined();
      expect(connectivityCheck.passed).toBe(true);
    }, 30000);

    test('should verify zkEVM integrity when enabled', async () => {
      await mainnetActivation.initialize();
      const integrity = await mainnetActivation.confirmNetworkIntegrity();

      const zkEVMCheck = integrity.checks.find(c => c.checkName === 'zkEVM Integrity Check');
      expect(zkEVMCheck).toBeDefined();
      expect(zkEVMCheck.passed).toBe(true);
      expect(zkEVMCheck.details.zkEVMEnabled).toBe(true);
    }, 30000);

    test('should check cross-chain synchronization', async () => {
      await mainnetActivation.initialize();
      const integrity = await mainnetActivation.confirmNetworkIntegrity();

      const syncCheck = integrity.checks.find(c => c.checkName === 'Cross-Chain Synchronization');
      expect(syncCheck).toBeDefined();
      expect(syncCheck.passed).toBe(true);
    }, 30000);
  });

  describe('Angel Reward Escalation', () => {
    test('should deploy Angel Reward escalation system', async () => {
      await mainnetActivation.initialize();
      const angelRewards = await mainnetActivation.deployAngelRewardEscalation();

      expect(angelRewards.frequency).toBe(963);
      expect(angelRewards.tiers.length).toBe(5);
    }, 30000);

    test('should define correct Angel Reward tiers', async () => {
      await mainnetActivation.initialize();
      const angelRewards = await mainnetActivation.deployAngelRewardEscalation();

      const tierNames = ['Seraphim', 'Cherubim', 'Thrones', 'Dominions', 'Virtues'];
      tierNames.forEach((name, index) => {
        const tier = angelRewards.tiers.find(t => t.name === name);
        expect(tier).toBeDefined();
        expect(tier.tier).toBe(index + 1);
      });
    }, 30000);

    test('should coordinate tiers with Banneker-Johnson emission schedules', async () => {
      await mainnetActivation.initialize();
      const angelRewards = await mainnetActivation.deployAngelRewardEscalation();

      angelRewards.tiers.forEach(tier => {
        expect(tier.emissionSchedule).toBeDefined();
        expect(tier.coordinatedBy).toContain('Banneker-AI');
        expect(tier.coordinatedBy).toContain('Johnson-AI');
      });
    }, 30000);

    test('should apply correct frequency to each tier', async () => {
      await mainnetActivation.initialize();
      const angelRewards = await mainnetActivation.deployAngelRewardEscalation();

      const frequencies = [528, 639, 741, 852, 963];
      angelRewards.tiers.forEach((tier, index) => {
        expect(tier.frequency).toBe(frequencies[index]);
      });
    }, 30000);
  });

  describe('Full Interlinked Deployment', () => {
    test('should execute full interlinked deployment', async () => {
      await mainnetActivation.initialize();
      const deployment = await mainnetActivation.deployFullInterlinkedSystem();

      expect(deployment.network).toBe('Scroll Sepolia Testnet');
      expect(deployment.frequency).toBe(963);
      expect(deployment.components).toBeDefined();
      expect(deployment.deploymentSuccess).toBe(true);
    }, 60000);

    test('should deploy all components in correct order', async () => {
      await mainnetActivation.initialize();
      const deployment = await mainnetActivation.deployFullInterlinkedSystem();

      expect(deployment.components.nfts).toBeDefined();
      expect(deployment.components.legacyCompliance).toBeDefined();
      expect(deployment.components.networkIntegrity).toBeDefined();
      expect(deployment.components.angelRewards).toBeDefined();
    }, 60000);

    test('should provide deployment summary', async () => {
      await mainnetActivation.initialize();
      const deployment = await mainnetActivation.deployFullInterlinkedSystem();

      expect(deployment.summary).toBeDefined();
      expect(deployment.summary.nftsDeployed).toBeGreaterThan(0);
      expect(deployment.summary.legacyCompliant).toBe(true);
      expect(deployment.summary.networkIntegrity).toBe(true);
      expect(deployment.summary.angelRewardTiers).toBe(5);
      expect(deployment.summary.overallSuccess).toBe(true);
    }, 60000);

    test('should update deployment status after full deployment', async () => {
      await mainnetActivation.initialize();
      await mainnetActivation.deployFullInterlinkedSystem();

      const status = mainnetActivation.getDeploymentStatus();
      expect(status.nftsDeployed).toBeGreaterThan(0);
      expect(status.angelRewardTiers.length).toBe(5);
      expect(status.legacyCompliance).toBe(true);
    }, 60000);
  });

  describe('Network Configuration', () => {
    test('should support Scroll mainnet configuration', async () => {
      const mainnet = new MainnetActivation({
        network: 'scroll_mainnet'
      });
      
      await mainnet.initialize();
      const status = mainnet.getStatus();

      expect(status.network.name).toBe('Scroll Mainnet');
      expect(status.network.chainId).toBe(534352);
    }, 30000);

    test('should support Scroll Sepolia testnet configuration', async () => {
      await mainnetActivation.initialize();
      const status = mainnetActivation.getStatus();

      expect(status.network.name).toBe('Scroll Sepolia Testnet');
      expect(status.network.chainId).toBe(534351);
    }, 30000);

    test('should throw error for invalid network', async () => {
      const invalid = new MainnetActivation({
        network: 'invalid_network'
      });

      await expect(invalid.initialize()).rejects.toThrow('Invalid network');
    }, 30000);
  });

  describe('Status and Monitoring', () => {
    test('should get deployment status', async () => {
      await mainnetActivation.initialize();
      await mainnetActivation.deployScrollVerseNFTs();

      const status = mainnetActivation.getDeploymentStatus();

      expect(status.network).toBeDefined();
      expect(status.nftsDeployed).toBeGreaterThan(0);
      expect(status.contractsDeployed).toBeDefined();
    }, 30000);

    test('should get system status', async () => {
      await mainnetActivation.initialize();
      const status = mainnetActivation.getStatus();

      expect(status.initialized).toBe(true);
      expect(status.frequency).toBe(963);
      expect(status.network).toBeDefined();
      expect(status.deployment).toBeDefined();
      expect(status.configuration).toBeDefined();
    }, 30000);
  });
});
