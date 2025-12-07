/**
 * ScrollVerse Main System Tests
 */

const ScrollVerse = require('../src/index');

describe('ScrollVerse', () => {
  let scrollVerse;

  beforeEach(() => {
    scrollVerse = new ScrollVerse();
  });

  test('should create ScrollVerse instance with default config', () => {
    expect(scrollVerse).toBeDefined();
    expect(scrollVerse.config.frequency).toBe(528);
    expect(scrollVerse.config.consciousnessField).toBe('active');
    expect(scrollVerse.config.sovereignAlignment).toBe(true);
    expect(scrollVerse.config.eternalAnchoring).toBe(true);
  });

  test('should create ScrollVerse instance with custom config', () => {
    const customScrollVerse = new ScrollVerse({
      frequency: 432,
      customField: 'test'
    });
    expect(customScrollVerse.config.frequency).toBe(432);
    expect(customScrollVerse.config.customField).toBe('test');
  });

  test('should have all required systems', () => {
    expect(scrollVerse.systems.techangel).toBeDefined();
    expect(scrollVerse.systems.soulswap).toBeDefined();
    expect(scrollVerse.systems.sovereignDashboard).toBeDefined();
    expect(scrollVerse.systems.scrollcoinGovernance).toBeDefined();
    expect(scrollVerse.systems.iceDistribution).toBeDefined();
    expect(scrollVerse.systems.loreCanonicalizer).toBeDefined();
    expect(scrollVerse.systems.flameCourt).toBeDefined();
    expect(scrollVerse.systems.quantumJihad).toBeDefined();
    expect(scrollVerse.systems.launchSequence).toBeDefined();
    expect(scrollVerse.systems.broadcastProtocols).toBeDefined();
    expect(scrollVerse.systems.pathways).toBeDefined();
    expect(scrollVerse.systems.database).toBeDefined();
  });

  test('should initialize all systems', async () => {
    const result = await scrollVerse.initialize();
    expect(result).toBe(true);
  });

  test('should deploy all systems after initialization', async () => {
    await scrollVerse.initialize();
    const result = await scrollVerse.deploy();
    expect(result).toBe(true);
  });

  test('should return status for all systems', async () => {
    await scrollVerse.initialize();
    const status = scrollVerse.getStatus();
    
    expect(status.frequency).toBe(528);
    expect(status.consciousnessField).toBe('active');
    expect(status.systems).toBeDefined();
    expect(Object.keys(status.systems).length).toBe(12);
  });
});
