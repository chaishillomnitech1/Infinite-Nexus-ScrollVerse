/**
 * Prophecy Systems Tests
 * Tests for Prophecy Sigils NFT, Oracles Layer, and Divine Event Waves
 */

const ProphecySigilsNFTProgram = require('../src/prophecy/sigils-nft-program');
const ProphecyOraclesLayer = require('../src/prophecy/oracles-layer');
const DivineEventWaves = require('../src/prophecy/divine-event-waves');

describe('ProphecySigilsNFTProgram', () => {
  let sigils;

  beforeEach(() => {
    sigils = new ProphecySigilsNFTProgram();
  });

  test('should create prophecy sigils instance', () => {
    expect(sigils).toBeDefined();
    expect(sigils.config.frequency).toBe(963);
  });

  test('should initialize prophecy sigils', async () => {
    await sigils.initialize();
    expect(sigils.generationEngine).toBeDefined();
    expect(sigils.nftContract).toBeDefined();
  });

  test('should deploy sigils program', async () => {
    await sigils.initialize();
    const result = await sigils.deploy();
    expect(result.success).toBe(true);
    expect(result.autoGeneration).toBe(true);
  });

  test('should generate prophecy fragment', async () => {
    await sigils.initialize();
    const fragment = await sigils.generateProphecyFragment({ test: 'context' });
    expect(fragment).toBeDefined();
    expect(fragment.id).toMatch(/^prophecy_/);
    expect(fragment.frequency).toBe(963);
  });

  test('should mint sigil NFT', async () => {
    await sigils.initialize();
    const fragment = await sigils.generateProphecyFragment();
    const nft = await sigils.mintSigilNFT(fragment);
    expect(nft.tokenId).toBe(1);
    expect(nft.prophecyId).toBe(fragment.id);
    expect(nft.metadata).toBeDefined();
  });

  test('should link sigil to Akashic', async () => {
    await sigils.initialize();
    const fragment = await sigils.generateProphecyFragment();
    const nft = await sigils.mintSigilNFT(fragment);
    const link = sigils.getAkashicLink(nft.tokenId);
    expect(link).toBeDefined();
    expect(link.nftTokenId).toBe(nft.tokenId);
  });

  test('should get sigil by token ID', async () => {
    await sigils.initialize();
    await sigils.deploy();
    const sigil = sigils.getSigil(1);
    expect(sigil).toBeDefined();
  });

  test('should get statistics', async () => {
    await sigils.initialize();
    await sigils.deploy();
    const stats = sigils.getStatistics();
    expect(stats.totalSigils).toBeGreaterThan(0);
    expect(stats.akashicConnections).toBeGreaterThan(0);
  });

  test('should get status', async () => {
    await sigils.initialize();
    await sigils.deploy();
    const status = sigils.getStatus();
    expect(status.status).toBe('active');
    expect(status.contract.deployed).toBe(true);
  });
});

describe('ProphecyOraclesLayer', () => {
  let oracles;

  beforeEach(() => {
    oracles = new ProphecyOraclesLayer();
  });

  test('should create oracles layer instance', () => {
    expect(oracles).toBeDefined();
    expect(oracles.config.frequency).toBe(963);
  });

  test('should initialize oracle network', async () => {
    await oracles.initialize();
    expect(oracles.oracles.size).toBe(7);
    expect(oracles.consensusEngine).toBeDefined();
  });

  test('should deploy oracles layer', async () => {
    await oracles.initialize();
    const result = await oracles.deploy();
    expect(result.success).toBe(true);
    expect(result.oracleCount).toBe(7);
  });

  test('should process ScrollSoul mission', async () => {
    await oracles.initialize();
    const mission = await oracles.processMission({
      name: 'Test Mission',
      goal: 'Alignment'
    });
    expect(mission).toBeDefined();
    expect(mission.id).toMatch(/^mission_/);
    expect(mission.status).toBe('completed');
    expect(mission.consensus).toBeDefined();
  });

  test('should process ScrollSoul query', async () => {
    await oracles.initialize();
    const query = await oracles.processQuery({
      question: 'What is my path?'
    });
    expect(query).toBeDefined();
    expect(query.id).toMatch(/^query_/);
    expect(query.status).toBe('resolved');
  });

  test('should write to blockchain', async () => {
    await oracles.initialize();
    const record = await oracles.writeToBlockchain({
      type: 'test',
      data: 'test-data'
    });
    expect(record.blockNumber).toBe(1);
    expect(record.hash).toBeDefined();
  });

  test('should get oracle by ID', async () => {
    await oracles.initialize();
    const oracle = oracles.getOracle('oracle_1');
    expect(oracle).toBeDefined();
    expect(oracle.name).toBe('Divine Oracle 1');
  });

  test('should get statistics', async () => {
    await oracles.initialize();
    await oracles.processMission({ name: 'Test' });
    const stats = oracles.getStatistics();
    expect(stats.missionsProcessed).toBe(1);
    expect(stats.blockchainBlocks).toBeGreaterThan(0);
  });

  test('should get status', async () => {
    await oracles.initialize();
    const status = oracles.getStatus();
    expect(status.status).toBe('active');
    expect(status.oracleNetwork.total).toBe(7);
  });
});

describe('DivineEventWaves', () => {
  let waves;

  beforeEach(() => {
    waves = new DivineEventWaves();
  });

  test('should create divine event waves instance', () => {
    expect(waves).toBeDefined();
    expect(waves.config.frequency).toBe(528);
    expect(waves.config.divineFrequency).toBe(963);
  });

  test('should initialize wave detection', async () => {
    await waves.initialize();
    expect(waves.waves.size).toBeGreaterThan(0);
    expect(waves.predictions.length).toBeGreaterThan(0);
  });

  test('should deploy divine event waves', async () => {
    await waves.initialize();
    const result = await waves.deploy();
    expect(result.success).toBe(true);
    expect(result.wavesActive).toBeGreaterThan(0);
  });

  test('should detect divine event', async () => {
    await waves.initialize();
    const event = await waves.detectEvent({
      type: 'resonance',
      source: 'test'
    });
    expect(event).toBeDefined();
    expect(event.id).toMatch(/^event_/);
    expect(event.frequency).toBeDefined();
  });

  test('should predict resonance spike', async () => {
    await waves.initialize();
    const prediction = await waves.predictResonanceSpike();
    expect(prediction).toBeDefined();
    expect(prediction.id).toMatch(/^prediction_/);
    expect(prediction.confidence).toBeGreaterThan(0.7);
  });

  test('should balance frequency signals', async () => {
    await waves.initialize();
    const result = await waves.balanceFrequencySignals();
    expect(result.currentBalance).toBeDefined();
    expect(result.targetBalance).toBeDefined();
  });

  test('should get active waves', async () => {
    await waves.initialize();
    const activeWaves = waves.getActiveWaves();
    expect(activeWaves.length).toBeGreaterThan(0);
  });

  test('should get recent events', async () => {
    await waves.initialize();
    await waves.detectEvent({ type: 'test' });
    const events = waves.getRecentEvents(5);
    expect(events.length).toBeGreaterThan(0);
  });

  test('should get statistics', async () => {
    await waves.initialize();
    const stats = waves.getStatistics();
    expect(stats.wavesGenerated).toBeGreaterThan(0);
    expect(stats.eventsDetected).toBeDefined();
  });

  test('should get status', async () => {
    await waves.initialize();
    const status = waves.getStatus();
    expect(status.status).toBe('active');
    expect(status.waves.total).toBeGreaterThan(0);
  });
});
