/**
 * Tests for FVE Resonance Engine
 * Testing Frequency-Vibration-Energy matrix and 9D blockchain harmonics
 */

const {
  FVEResonanceEngine,
  FVE_DIMENSIONS,
  BLOCKCHAIN_HARMONICS
} = require('../src/fve-resonance-engine');

describe('FVE Resonance Engine', () => {
  let engine;

  beforeEach(async () => {
    engine = new FVEResonanceEngine({
      frequency: 528,
      dimensions: 9,
      enableTranscription: true,
      enableBlockchainHarmonics: true
    });
    await engine.initialize();
  });

  describe('Initialization', () => {
    test('should initialize with correct configuration', () => {
      const status = engine.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.frequency).toBe(528);
      expect(status.dimensions).toBe(9);
      expect(status.enableTranscription).toBe(true);
      expect(status.enableBlockchainHarmonics).toBe(true);
    });

    test('should initialize FVE matrix for all dimensions', () => {
      const matrix = engine.getFVEMatrix();
      
      expect(matrix.length).toBe(9);
      expect(matrix[0].dimension).toBe(1);
      expect(matrix[8].dimension).toBe(9);
    });

    test('should setup harmonic layers', () => {
      const layers = engine.getHarmonicLayers();
      
      expect(layers.length).toBe(9);
      expect(layers[0].layer).toBe(1);
      expect(layers[0].frequency).toBe(528);
    });

    test('should initialize resonance field', () => {
      const status = engine.getStatus();
      
      expect(status.resonanceField).toBeDefined();
      expect(status.resonanceField.baseFrequency).toBe(528);
      expect(status.resonanceField.active).toBe(true);
    });

    test('should initialize transcription system when enabled', () => {
      const status = engine.getStatus();
      
      expect(status.transcriptionSystem).toBeDefined();
      expect(status.transcriptionSystem.enabled).toBe(true);
      expect(status.transcriptionSystem.sampleRate).toBe(44100);
    });

    test('should initialize blockchain harmonics when enabled', () => {
      const status = engine.getStatus();
      
      expect(status.blockchainState).toBeDefined();
      expect(status.blockchainState.currentBlock).toBe(0);
      expect(status.blockchainState.consensusFrequency).toBe(BLOCKCHAIN_HARMONICS.CONSENSUS);
    });
  });

  describe('FVE Matrix Operations', () => {
    test('should activate dimension in matrix', async () => {
      const dimState = await engine.activateDimension(1);
      
      expect(dimState.energyState).toBe('active');
      expect(dimState.vibrationLevel).toBe(1.0);
      expect(dimState.resonanceScore).toBe(1.0);
      expect(dimState.quantumEntanglement).toBe(true);
    });

    test('should track quantum entanglements', async () => {
      await engine.activateDimension(1);
      await engine.activateDimension(2);
      await engine.activateDimension(3);
      
      const metrics = engine.getMetrics();
      expect(metrics.quantumEntanglements).toBe(3);
    });

    test('should get all dimensions from matrix', () => {
      const matrix = engine.getFVEMatrix();
      
      expect(matrix.every(d => d.frequency > 0)).toBe(true);
      expect(matrix.every(d => d.name)).toBe(true);
    });

    test('should handle invalid dimension activation', async () => {
      await expect(engine.activateDimension(99)).rejects.toThrow();
    });
  });

  describe('Harmonic Layer Synchronization', () => {
    test('should synchronize all harmonic layers', async () => {
      const layers = await engine.synchronizeHarmonics();
      
      expect(layers.length).toBe(9);
      expect(layers.every(l => l.synchronized)).toBe(true);
      expect(layers.every(l => l.resonanceLevel === 1.0)).toBe(true);
    });

    test('should generate harmonics for each layer', async () => {
      await engine.synchronizeHarmonics();
      const layers = engine.getHarmonicLayers();
      
      // Each layer should have harmonics equal to its layer number
      expect(layers[0].harmonics.length).toBe(1);
      expect(layers[1].harmonics.length).toBe(2);
      expect(layers[2].harmonics.length).toBe(3);
    });

    test('should calculate layer frequencies using Fibonacci ratios', () => {
      const layers = engine.getHarmonicLayers();
      
      expect(layers[0].frequency).toBe(528);   // 528 * 1
      expect(layers[1].frequency).toBe(528);   // 528 * 1
      expect(layers[2].frequency).toBe(1056);  // 528 * 2
      expect(layers[3].frequency).toBe(1584);  // 528 * 3
    });
  });

  describe('Transcription System', () => {
    test('should process transcription input', async () => {
      const audioData = [0.5, 0.6, 0.7, 0.5, 0.4];
      const transcription = await engine.processTranscription(audioData, {
        language: 'en'
      });
      
      expect(transcription.id).toMatch(/^TRANS-/);
      expect(transcription.language).toBe('en');
      expect(transcription.frequency).toBeGreaterThan(0);
      expect(transcription.dimension).toBeGreaterThanOrEqual(1);
      expect(transcription.dimension).toBeLessThanOrEqual(9);
    });

    test('should analyze frequency from audio data', async () => {
      const audioData = [0.8, 0.9, 0.7];
      const transcription = await engine.processTranscription(audioData);
      
      // Frequency should be near base frequency
      expect(transcription.frequency).toBeGreaterThan(500);
      expect(transcription.frequency).toBeLessThan(600);
    });

    test('should calculate resonance score', async () => {
      const audioData = [0.5, 0.5, 0.5];
      const transcription = await engine.processTranscription(audioData);
      
      expect(transcription.resonanceScore).toBeGreaterThanOrEqual(0);
      expect(transcription.resonanceScore).toBeLessThanOrEqual(1);
    });

    test('should check harmonic alignment', async () => {
      const audioData = [0.5, 0.5, 0.5];
      const transcription = await engine.processTranscription(audioData);
      
      expect(transcription.harmonicAlignment).toBeDefined();
      expect(transcription.harmonicAlignment.aligned).toBeDefined();
      expect(transcription.harmonicAlignment.frequency).toBeGreaterThan(0);
    });

    test('should store transcription in buffer', async () => {
      const audioData = [0.5, 0.5, 0.5];
      await engine.processTranscription(audioData);
      await engine.processTranscription(audioData);
      
      const history = engine.getTranscriptionHistory();
      expect(history.length).toBe(2);
    });

    test('should limit transcription history', async () => {
      for (let i = 0; i < 15; i++) {
        await engine.processTranscription([0.5]);
      }
      
      const history = engine.getTranscriptionHistory(10);
      expect(history.length).toBe(10);
    });

    test('should throw error when transcription disabled', async () => {
      const noTransEngine = new FVEResonanceEngine({
        enableTranscription: false
      });
      await noTransEngine.initialize();
      
      await expect(
        noTransEngine.processTranscription([0.5])
      ).rejects.toThrow('Transcription system not enabled');
    });
  });

  describe('Blockchain Harmonics', () => {
    test('should generate blockchain harmonic', async () => {
      const harmonic = await engine.generateBlockchainHarmonic();
      
      expect(harmonic.blockNumber).toBe(0);
      expect(harmonic.frequency).toBe(BLOCKCHAIN_HARMONICS.CONSENSUS);
      expect(harmonic.dimensions).toBe(9);
      expect(harmonic.hash).toMatch(/^0x/);
    });

    test('should create harmonic chain', async () => {
      await engine.generateBlockchainHarmonic();
      await engine.generateBlockchainHarmonic();
      await engine.generateBlockchainHarmonic();
      
      const chain = engine.getBlockchainHarmonicChain();
      expect(chain.length).toBe(3);
      expect(chain[0].blockNumber).toBe(0);
      expect(chain[1].blockNumber).toBe(1);
      expect(chain[2].blockNumber).toBe(2);
    });

    test('should link harmonics with previous hash', async () => {
      const harmonic1 = await engine.generateBlockchainHarmonic();
      const harmonic2 = await engine.generateBlockchainHarmonic();
      
      expect(harmonic2.previousHash).toBe(harmonic1.hash);
    });

    test('should increment validation count', async () => {
      await engine.generateBlockchainHarmonic();
      await engine.generateBlockchainHarmonic();
      
      const status = engine.getStatus();
      expect(status.blockchainState.chainLength).toBe(2);
    });

    test('should track harmonic alignments in metrics', async () => {
      await engine.generateBlockchainHarmonic();
      await engine.generateBlockchainHarmonic();
      
      const metrics = engine.getMetrics();
      expect(metrics.harmonicAlignments).toBe(2);
    });

    test('should throw error when blockchain harmonics disabled', async () => {
      const noBlockchainEngine = new FVEResonanceEngine({
        enableBlockchainHarmonics: false
      });
      await noBlockchainEngine.initialize();
      
      await expect(
        noBlockchainEngine.generateBlockchainHarmonic()
      ).rejects.toThrow('Blockchain harmonics not enabled');
    });
  });

  describe('Status and Metrics', () => {
    test('should get comprehensive status', () => {
      const status = engine.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.fveMatrix).toBeDefined();
      expect(status.harmonicLayers).toBeDefined();
      expect(status.resonanceField).toBeDefined();
      expect(status.metrics).toBeDefined();
    });

    test('should track total resonances', async () => {
      await engine.processTranscription([0.5]);
      await engine.processTranscription([0.5]);
      
      const metrics = engine.getMetrics();
      expect(metrics.transcriptionCount).toBe(2);
    });

    test('should count active dimensions', async () => {
      await engine.activateDimension(1);
      await engine.activateDimension(5);
      await engine.activateDimension(9);
      
      const status = engine.getStatus();
      expect(status.fveMatrix.activeDimensions).toBe(3);
    });
  });

  describe('FVE Dimension Constants', () => {
    test('should have 9 dimensions defined', () => {
      const dimensions = Object.values(FVE_DIMENSIONS);
      expect(dimensions.length).toBe(9);
    });

    test('should have correct dimension frequencies', () => {
      expect(FVE_DIMENSIONS.D1_PHYSICAL.frequency).toBe(432);
      expect(FVE_DIMENSIONS.D2_EMOTIONAL.frequency).toBe(528);
      expect(FVE_DIMENSIONS.D9_UNIFIED.frequency).toBe(1296);
    });

    test('should have unique dimension numbers', () => {
      const dimensions = Object.values(FVE_DIMENSIONS);
      const dimensionNumbers = dimensions.map(d => d.dimension);
      const uniqueNumbers = [...new Set(dimensionNumbers)];
      
      expect(uniqueNumbers.length).toBe(9);
    });
  });

  describe('Blockchain Harmonic Constants', () => {
    test('should have required harmonic frequencies', () => {
      expect(BLOCKCHAIN_HARMONICS.CONSENSUS).toBe(528);
      expect(BLOCKCHAIN_HARMONICS.VALIDATION).toBe(639);
      expect(BLOCKCHAIN_HARMONICS.TRANSCENDENCE).toBe(963);
    });
  });
});
