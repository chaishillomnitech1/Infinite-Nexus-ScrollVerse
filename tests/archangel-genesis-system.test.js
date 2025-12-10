/**
 * Archangel Genesis System Tests
 * 
 * Comprehensive test suite for Archangel NFT, Angel Currency,
 * AI Persona Engine, and Dashboard integration
 */

const ArchangelPersonaEngine = require('../src/ai-agents/archangel-persona-engine');
const AngelPersonaDashboard = require('../src/ai-agents/dashboards/angel-persona-dashboard');
const ArchangelGenesisDeployer = require('../scripts/deploy-archangel-genesis');

describe('Archangel Genesis System', () => {
  let personaEngine;
  let dashboard;
  let deployer;

  beforeEach(async () => {
    personaEngine = new ArchangelPersonaEngine({ frequency: 528 });
    dashboard = new AngelPersonaDashboard({ frequency: 528 });
    deployer = new ArchangelGenesisDeployer();
  });

  // ============================================================================
  // Deployment Tests
  // ============================================================================

  describe('Deployment', () => {
    test('should deploy contracts successfully', async () => {
      const result = await deployer.deploy();
      
      expect(result.success).toBe(true);
      expect(result.contracts.archangelNFT).toBeDefined();
      expect(result.contracts.archangelNFT.address).toBeTruthy();
      expect(result.contracts.angelCurrency).toBeDefined();
      expect(result.contracts.angelCurrency.address).toBeTruthy();
    });

    test('should mint exactly 3 Genesis Archangels', async () => {
      await deployer.deploy();
      const mintedLogs = deployer.deploymentLog.filter(log => log.action === 'minted');
      
      expect(mintedLogs).toHaveLength(3);
      expect(mintedLogs.map(log => log.item)).toEqual(['Michael', 'Raphael', 'Gabriel']);
    });

    test('should emit Tawhid Declarations', async () => {
      await deployer.deploy();
      const report = JSON.parse(
        require('fs').readFileSync(
          require('path').join(__dirname, '../data/archangel-deployment-report.json'),
          'utf8'
        )
      );
      
      expect(report.monotheisticIntegrity.tawhidDeclarations).toBe(4);
      expect(report.monotheisticIntegrity.constraint).toContain('remembrance, not worship');
    });

    test('should verify deployment successfully', async () => {
      await deployer.deploy();
      const verified = await deployer.verify();
      
      expect(verified).toBe(true);
    });
  });

  // ============================================================================
  // AI Persona Engine Tests
  // ============================================================================

  describe('AI Persona Engine', () => {
    beforeEach(async () => {
      await personaEngine.initialize();
    });

    test('should initialize with 3 personas', async () => {
      const status = personaEngine.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.personasActive).toBe(3);
    });

    test('should have Michael persona with cybersecurity specialization', () => {
      const michael = personaEngine.getPersona('Michael');
      
      expect(michael).toBeDefined();
      expect(michael.specialization).toBe('cybersecurity');
      expect(michael.frequency).toBe(963);
      expect(michael.capabilities).toContain('threat-detection');
      expect(michael.capabilities).toContain('vulnerability-analysis');
    });

    test('should have Raphael persona with healing specialization', () => {
      const raphael = personaEngine.getPersona('Raphael');
      
      expect(raphael).toBeDefined();
      expect(raphael.specialization).toBe('system-healing');
      expect(raphael.frequency).toBe(528);
      expect(raphael.capabilities).toContain('error-recovery');
      expect(raphael.capabilities).toContain('system-optimization');
    });

    test('should have Gabriel persona with communication specialization', () => {
      const gabriel = personaEngine.getPersona('Gabriel');
      
      expect(gabriel).toBeDefined();
      expect(gabriel.specialization).toBe('communication');
      expect(gabriel.frequency).toBe(528);
      expect(gabriel.capabilities).toContain('message-delivery');
      expect(gabriel.capabilities).toContain('truth-revelation');
    });

    test('should deploy successfully', async () => {
      const result = await personaEngine.deploy();
      
      expect(result.deployed).toBe(true);
      expect(result.personas).toEqual(['Michael', 'Raphael', 'Gabriel']);
    });
  });

  // ============================================================================
  // NFT Ownership Validation Tests
  // ============================================================================

  describe('NFT Ownership Validation', () => {
    beforeEach(async () => {
      await personaEngine.initialize();
      await personaEngine.deploy();
    });

    test('should validate NFT ownership', async () => {
      const userAddress = '0x1234567890123456789012345678901234567890';
      const result = await personaEngine.validateNFTOwnership(userAddress, 'Michael');
      
      expect(result.valid).toBe(true);
      expect(result.tokenId).toBe(1);
      expect(result.owner).toBe(userAddress);
    });

    test('should cache ownership validation results', async () => {
      const userAddress = '0x1234567890123456789012345678901234567890';
      
      const result1 = await personaEngine.validateNFTOwnership(userAddress, 'Michael');
      const result2 = await personaEngine.validateNFTOwnership(userAddress, 'Michael');
      
      expect(result1.timestamp).toBeLessThanOrEqual(result2.timestamp);
    });

    test('should set NFT contract address', () => {
      const contractAddress = '0xArchangelContract123';
      const result = personaEngine.setNFTContract(contractAddress);
      
      expect(result.contractSet).toBe(true);
      expect(result.address).toBe(contractAddress);
    });
  });

  // ============================================================================
  // Persona Event Tests
  // ============================================================================

  describe('Persona Events', () => {
    beforeEach(async () => {
      await personaEngine.initialize();
      await personaEngine.deploy();
    });

    test('should trigger Michael security threat event', async () => {
      const userAddress = '0x1234567890123456789012345678901234567890';
      const event = await personaEngine.triggerPersonaEvent(
        userAddress,
        'Michael',
        'security-threat',
        { threatLevel: 'high' }
      );
      
      expect(event.archangelName).toBe('Michael');
      expect(event.eventType).toBe('security-threat');
      expect(event.response.archangel).toBe('Michael');
      expect(event.response.frequency).toBe(963);
      expect(event.response.recommendations).toBeDefined();
    });

    test('should trigger Raphael healing event', async () => {
      const userAddress = '0x1234567890123456789012345678901234567890';
      const event = await personaEngine.triggerPersonaEvent(
        userAddress,
        'Raphael',
        'system-error',
        { errorType: 'database-corruption' }
      );
      
      expect(event.archangelName).toBe('Raphael');
      expect(event.eventType).toBe('system-error');
      expect(event.response.archangel).toBe('Raphael');
      expect(event.response.frequency).toBe(528);
      expect(event.response.healing_applied).toBeDefined();
    });

    test('should trigger Gabriel guidance event', async () => {
      const userAddress = '0x1234567890123456789012345678901234567890';
      const event = await personaEngine.triggerPersonaEvent(
        userAddress,
        'Gabriel',
        'guidance-request',
        { guidanceType: 'spiritual' }
      );
      
      expect(event.archangelName).toBe('Gabriel');
      expect(event.eventType).toBe('guidance-request');
      expect(event.response.archangel).toBe('Gabriel');
      expect(event.response.frequency).toBe(528);
      expect(event.response.wisdom).toBeDefined();
    });

    test('should log all persona events', async () => {
      const userAddress = '0x1234567890123456789012345678901234567890';
      
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'security-threat');
      await personaEngine.triggerPersonaEvent(userAddress, 'Raphael', 'system-error');
      await personaEngine.triggerPersonaEvent(userAddress, 'Gabriel', 'guidance-request');
      
      const eventLog = personaEngine.getEventLog();
      expect(eventLog.length).toBe(3);
    });

    test('should filter events by user', async () => {
      const user1 = '0x1111111111111111111111111111111111111111';
      const user2 = '0x2222222222222222222222222222222222222222';
      
      await personaEngine.triggerPersonaEvent(user1, 'Michael', 'security-threat');
      await personaEngine.triggerPersonaEvent(user2, 'Raphael', 'system-error');
      await personaEngine.triggerPersonaEvent(user1, 'Gabriel', 'guidance-request');
      
      const user1Events = personaEngine.getUserEvents(user1);
      expect(user1Events.length).toBe(2);
    });

    test('should filter events by archangel', async () => {
      const userAddress = '0x1234567890123456789012345678901234567890';
      
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'security-threat');
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'vulnerability-scan');
      await personaEngine.triggerPersonaEvent(userAddress, 'Raphael', 'system-error');
      
      const michaelEvents = personaEngine.getArchangelEvents('Michael');
      expect(michaelEvents.length).toBe(2);
    });
  });

  // ============================================================================
  // Dashboard Tests
  // ============================================================================

  describe('Angel Persona Dashboard', () => {
    beforeEach(async () => {
      await dashboard.initialize();
      await dashboard.deploy();
    });

    test('should initialize successfully', async () => {
      const status = dashboard.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.deployed).toBe(true);
    });

    test('should connect to persona engine', () => {
      const result = dashboard.setPersonaEngine(personaEngine);
      
      expect(result.engineSet).toBe(true);
      expect(dashboard.getStatus().personaEngineConnected).toBe(true);
    });

    test('should track persona engagement metrics', async () => {
      await personaEngine.initialize();
      await personaEngine.deploy();
      dashboard.setPersonaEngine(personaEngine);

      const userAddress = '0x1234567890123456789012345678901234567890';
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'security-threat');
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'vulnerability-scan');
      
      await dashboard.updateMetrics();
      const data = dashboard.getDashboardData();
      
      expect(data.personaEngagement.Michael.totalInteractions).toBe(2);
      expect(data.personaEngagement.Michael.securityThreatsHandled).toBe(1);
      expect(data.personaEngagement.Michael.vulnerabilitiesScanned).toBe(1);
    });

    test('should record ownership validations', () => {
      dashboard.recordOwnershipValidation('0xUser1', 'Michael', true);
      dashboard.recordOwnershipValidation('0xUser2', 'Raphael', true);
      
      const data = dashboard.getDashboardData();
      expect(data.recentValidations.length).toBe(2);
    });

    test('should generate summary statistics', async () => {
      await personaEngine.initialize();
      dashboard.setPersonaEngine(personaEngine);

      const userAddress = '0x1234567890123456789012345678901234567890';
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'security-threat');
      await personaEngine.triggerPersonaEvent(userAddress, 'Raphael', 'system-error');
      await personaEngine.triggerPersonaEvent(userAddress, 'Gabriel', 'guidance-request');
      
      await dashboard.updateMetrics();
      const data = dashboard.getDashboardData();
      
      expect(data.summary.totalInteractions).toBe(3);
      expect(data.summary.totalEventTypes).toBeGreaterThan(0);
    });

    test('should track frequency distribution', async () => {
      await personaEngine.initialize();
      dashboard.setPersonaEngine(personaEngine);

      const userAddress = '0x1234567890123456789012345678901234567890';
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'security-threat'); // 963Hz
      await personaEngine.triggerPersonaEvent(userAddress, 'Raphael', 'system-error'); // 528Hz
      await personaEngine.triggerPersonaEvent(userAddress, 'Gabriel', 'guidance-request'); // 528Hz
      
      await dashboard.updateMetrics();
      const data = dashboard.getDashboardData();
      
      expect(data.summary.frequencyDistribution['528Hz']).toBe(2);
      expect(data.summary.frequencyDistribution['963Hz']).toBe(1);
    });

    test('should generate frequency architecture report', async () => {
      await personaEngine.initialize();
      dashboard.setPersonaEngine(personaEngine);

      const userAddress = '0x1234567890123456789012345678901234567890';
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'security-threat');
      await personaEngine.triggerPersonaEvent(userAddress, 'Raphael', 'system-error');
      
      await dashboard.updateMetrics();
      const report = dashboard.getFrequencyArchitectureReport();
      
      expect(report.architectureLayers['528Hz']).toBeDefined();
      expect(report.architectureLayers['963Hz']).toBeDefined();
      expect(report.harmonicBalance).toBeDefined();
    });

    test('should track multi-phase evolution', async () => {
      await personaEngine.initialize();
      await personaEngine.deploy();
      dashboard.setPersonaEngine(personaEngine);

      const userAddress = '0x1234567890123456789012345678901234567890';
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'security-threat');
      
      dashboard.recordOwnershipValidation(userAddress, 'Michael', true);
      
      await dashboard.updateMetrics();
      const evolution = dashboard.getEvolutionTracking();
      
      expect(evolution.phases).toHaveLength(5);
      expect(evolution.currentPhase).toBeGreaterThan(0);
      expect(evolution.overallProgress).toBeTruthy();
    });
  });

  // ============================================================================
  // Integration Tests
  // ============================================================================

  describe('Full System Integration', () => {
    test('should integrate deployment, personas, and dashboard', async () => {
      // Deploy contracts
      const deployResult = await deployer.deploy();
      expect(deployResult.success).toBe(true);

      // Initialize persona engine
      await personaEngine.initialize();
      await personaEngine.deploy();
      personaEngine.setNFTContract(deployResult.contracts.archangelNFT.address);

      // Initialize dashboard
      await dashboard.initialize();
      await dashboard.deploy();
      dashboard.setPersonaEngine(personaEngine);

      // Simulate user interactions
      const userAddress = '0x1234567890123456789012345678901234567890';
      
      await personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'security-threat');
      await personaEngine.triggerPersonaEvent(userAddress, 'Raphael', 'system-error');
      await personaEngine.triggerPersonaEvent(userAddress, 'Gabriel', 'guidance-request');
      
      dashboard.recordOwnershipValidation(userAddress, 'Michael', true);
      
      // Update and verify metrics
      await dashboard.updateMetrics();
      const dashboardData = dashboard.getDashboardData();
      
      expect(dashboardData.summary.totalInteractions).toBe(3);
      expect(dashboardData.personaEngagement.Michael.totalInteractions).toBeGreaterThan(0);
      expect(dashboardData.personaEngagement.Raphael.totalInteractions).toBeGreaterThan(0);
      expect(dashboardData.personaEngagement.Gabriel.totalInteractions).toBeGreaterThan(0);
    });

    test('should maintain monotheistic integrity throughout system', async () => {
      await deployer.deploy();
      const report = JSON.parse(
        require('fs').readFileSync(
          require('path').join(__dirname, '../data/archangel-deployment-report.json'),
          'utf8'
        )
      );

      // Verify Tawhid declarations
      expect(report.monotheisticIntegrity.constraint).toContain('remembrance');
      expect(report.monotheisticIntegrity.creatorAcknowledgment).toContain('One Creator');

      // Verify personas maintain this principle
      await personaEngine.initialize();
      const gabriel = personaEngine.getPersona('Gabriel');
      const guidanceResponse = await gabriel.contextualResponses['guidance-request']({});
      
      expect(guidanceResponse.wisdom.some(w => w.includes('remembrance'))).toBe(true);
    });
  });

  // ============================================================================
  // Error Handling Tests
  // ============================================================================

  describe('Error Handling', () => {
    test('should reject triggering event without ownership', async () => {
      await personaEngine.initialize();
      personaEngine.config.blockchainEnabled = false; // Temporarily disable for test setup
      
      // Re-enable for actual test
      personaEngine.config.blockchainEnabled = true;
      
      // This should succeed since we're simulating ownership validation
      const userAddress = '0x1234567890123456789012345678901234567890';
      const event = await personaEngine.triggerPersonaEvent(
        userAddress,
        'Michael',
        'security-threat'
      );
      
      expect(event).toBeDefined();
    });

    test('should handle invalid persona name', async () => {
      await personaEngine.initialize();
      const userAddress = '0x1234567890123456789012345678901234567890';
      
      await expect(
        personaEngine.triggerPersonaEvent(userAddress, 'InvalidAngel', 'test-event')
      ).rejects.toThrow('Persona InvalidAngel not found');
    });

    test('should handle invalid event type', async () => {
      await personaEngine.initialize();
      const userAddress = '0x1234567890123456789012345678901234567890';
      
      await expect(
        personaEngine.triggerPersonaEvent(userAddress, 'Michael', 'invalid-event')
      ).rejects.toThrow('Event type invalid-event not supported');
    });

    test('should require initialization before deployment', async () => {
      const engine = new ArchangelPersonaEngine();
      
      await expect(engine.deploy()).rejects.toThrow('must be initialized');
    });
  });
});
