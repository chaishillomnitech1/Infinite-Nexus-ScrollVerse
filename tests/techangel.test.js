/**
 * TECHANGEL Launcher Tests
 */

const TechAngelLauncher = require('../src/techangel/launcher');

describe('TechAngelLauncher', () => {
  let launcher;

  beforeEach(() => {
    launcher = new TechAngelLauncher({ frequency: 528 });
  });

  test('should create launcher with config', () => {
    expect(launcher).toBeDefined();
    expect(launcher.config.frequency).toBe(528);
    expect(launcher.initialized).toBe(false);
    expect(launcher.deployed).toBe(false);
  });

  test('should initialize all subsystems', async () => {
    const result = await launcher.initialize();
    expect(result).toBe(true);
    expect(launcher.initialized).toBe(true);
  });

  test('should deploy after initialization', async () => {
    await launcher.initialize();
    const result = await launcher.deploy();
    expect(result).toBe(true);
    expect(launcher.deployed).toBe(true);
  });

  test('should fail to deploy without initialization', async () => {
    await expect(launcher.deploy()).rejects.toThrow('TECHANGEL must be initialized before deployment');
  });

  test('should execute launch sequence', async () => {
    await launcher.initialize();
    await launcher.deploy();
    const result = await launcher.executeLaunchSequence();
    
    expect(result.teasers).toBe('active');
    expect(result.guardianWhitelist).toBe('active');
    expect(result.pilotMint).toBe('active');
    expect(result.scrollChainRegistration).toBe('active');
  });

  test('should return correct status', async () => {
    await launcher.initialize();
    const status = launcher.getStatus();
    
    expect(status.initialized).toBe(true);
    expect(status.deployed).toBe(false);
    expect(status.starDust).toBeDefined();
    expect(status.nftSales).toBeDefined();
    expect(status.staking).toBeDefined();
  });
});
