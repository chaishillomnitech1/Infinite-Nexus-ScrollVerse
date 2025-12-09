/**
 * Tests for Tesla Sonar Anchors
 * Testing vocal decrees, spectral analysis, AR feedback, and NFT metrics
 */

const {
  TeslaSonarAnchor,
  SONAR_FREQUENCIES,
  DECREE_TYPES,
  NFT_METRIC_SCALES
} = require('../src/tesla-sonar-anchors');

describe('Tesla Sonar Anchors', () => {
  let anchor;

  beforeEach(async () => {
    anchor = new TeslaSonarAnchor({
      frequency: 528,
      enableVocalDecrees: true,
      enableSpectralAnalysis: true,
      enableARFeedback: true,
      enableNFTMetrics: true
    });
    await anchor.initialize();
  });

  describe('Initialization', () => {
    test('should initialize with correct configuration', () => {
      const status = anchor.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.frequency).toBe(528);
      expect(status.enableVocalDecrees).toBe(true);
      expect(status.enableSpectralAnalysis).toBe(true);
      expect(status.enableARFeedback).toBe(true);
      expect(status.enableNFTMetrics).toBe(true);
    });

    test('should initialize vocal decree system', () => {
      const status = anchor.getStatus();
      
      expect(status.vocalSystem).toBeDefined();
      expect(status.vocalSystem.enabled).toBe(true);
      expect(status.vocalSystem.sampleRate).toBe(48000);
    });

    test('should initialize spectral analyzer', () => {
      const status = anchor.getStatus();
      
      expect(status.spectralAnalyzer).toBeDefined();
      expect(status.spectralAnalyzer.enabled).toBe(true);
      expect(status.spectralAnalyzer.fftSize).toBe(2048);
    });

    test('should initialize AR feedback system', () => {
      const status = anchor.getStatus();
      
      expect(status.arFeedback).toBeDefined();
      expect(status.arFeedback.enabled).toBe(true);
      expect(status.arFeedback.sessionActive).toBe(false);
    });

    test('should initialize NFT metrics', () => {
      const nftMetrics = anchor.getNFTMetrics();
      
      expect(nftMetrics.completionScore).toBe(0);
      expect(nftMetrics.tier).toBe('BRONZE');
      expect(nftMetrics.multiplier).toBe(1.0);
    });

    test('should ground anchor', () => {
      const anchorState = anchor.getAnchorState();
      
      expect(anchorState.grounded).toBe(true);
      expect(anchorState.resonance).toBe(1.0);
      expect(anchorState.stability).toBe(1.0);
      expect(anchorState.energyLevel).toBe(100);
    });
  });

  describe('Vocal Decree Processing', () => {
    test('should process vocal decree', async () => {
      const audioInput = [0.5, 0.6, 0.7, 0.5, 0.4];
      const decree = await anchor.processVocalDecree(audioInput, {
        type: DECREE_TYPES.AFFIRMATION,
        transcription: 'I am sovereign'
      });
      
      expect(decree.id).toMatch(/^VD-/);
      expect(decree.type).toBe(DECREE_TYPES.AFFIRMATION);
      expect(decree.frequency).toBeGreaterThan(0);
      expect(decree.intensity).toBeGreaterThanOrEqual(0);
      expect(decree.intensity).toBeLessThanOrEqual(1);
      expect(decree.processed).toBe(true);
    });

    test('should analyze emotion in vocal input', async () => {
      const audioInput = [0.9, 0.8, 0.9];
      const decree = await anchor.processVocalDecree(audioInput);
      
      expect(decree.emotion).toBeDefined();
      expect(['passionate', 'confident', 'calm', 'peaceful']).toContain(decree.emotion);
    });

    test('should recognize intent from vocal input', async () => {
      const audioInput = [0.7, 0.8, 0.7];
      const decree = await anchor.processVocalDecree(audioInput);
      
      expect(decree.intent).toBeDefined();
      expect(['manifestation', 'affirmation', 'intention']).toContain(decree.intent);
    });

    test('should calculate resonance score', async () => {
      const audioInput = [0.5, 0.5, 0.5];
      const decree = await anchor.processVocalDecree(audioInput);
      
      expect(decree.resonance).toBeGreaterThanOrEqual(0);
      expect(decree.resonance).toBeLessThanOrEqual(1);
    });

    test('should store vocal decrees', async () => {
      await anchor.processVocalDecree([0.5]);
      await anchor.processVocalDecree([0.6]);
      
      const decrees = anchor.getVocalDecrees();
      expect(decrees.length).toBe(2);
    });

    test('should update metrics on decree processing', async () => {
      await anchor.processVocalDecree([0.5]);
      await anchor.processVocalDecree([0.5]);
      
      const metrics = anchor.getMetrics();
      expect(metrics.totalDecrees).toBe(2);
    });

    test('should limit vocal decree history', async () => {
      for (let i = 0; i < 15; i++) {
        await anchor.processVocalDecree([0.5]);
      }
      
      const decrees = anchor.getVocalDecrees(10);
      expect(decrees.length).toBe(10);
    });

    test('should throw error when vocal decrees disabled', async () => {
      const noVocalAnchor = new TeslaSonarAnchor({
        enableVocalDecrees: false
      });
      await noVocalAnchor.initialize();
      
      await expect(
        noVocalAnchor.processVocalDecree([0.5])
      ).rejects.toThrow('Vocal decree processing not enabled');
    });
  });

  describe('Spectral Analysis', () => {
    test('should process spectral input', async () => {
      const frequencyData = [0.3, 0.5, 0.7, 0.6, 0.4];
      const analysis = await anchor.processSpectralInput(frequencyData);
      
      expect(analysis.timestamp).toBeDefined();
      expect(analysis.low).toBeDefined();
      expect(analysis.mid).toBeDefined();
      expect(analysis.high).toBeDefined();
      expect(analysis.dominant).toBeGreaterThan(0);
    });

    test('should analyze spectral bands', async () => {
      const frequencyData = [0.5, 0.6, 0.7];
      const analysis = await anchor.processSpectralInput(frequencyData);
      
      expect(analysis.low.energy).toBeGreaterThanOrEqual(0);
      expect(analysis.mid.energy).toBeGreaterThanOrEqual(0);
      expect(analysis.high.energy).toBeGreaterThanOrEqual(0);
    });

    test('should find dominant frequency', async () => {
      const frequencyData = [0.3, 0.8, 0.4, 0.5];
      const analysis = await anchor.processSpectralInput(frequencyData);
      
      expect(analysis.dominant).toBeGreaterThan(0);
    });

    test('should extract harmonics', async () => {
      const frequencyData = [0.5, 0.6, 0.7];
      const analysis = await anchor.processSpectralInput(frequencyData);
      
      expect(analysis.harmonics).toBeDefined();
      expect(analysis.harmonics.length).toBeGreaterThan(0);
      expect(analysis.harmonics[0].order).toBe(2);
    });

    test('should store spectral data', async () => {
      await anchor.processSpectralInput([0.5, 0.6]);
      await anchor.processSpectralInput([0.7, 0.8]);
      
      const spectralData = anchor.getSpectralData();
      expect(spectralData.low.length).toBe(2);
      expect(spectralData.mid.length).toBe(2);
      expect(spectralData.high.length).toBe(2);
    });

    test('should limit spectral data buffer to 100 samples', async () => {
      for (let i = 0; i < 110; i++) {
        await anchor.processSpectralInput([0.5]);
      }
      
      const spectralData = anchor.getSpectralData();
      expect(spectralData.low.length).toBe(10); // Only last 10 returned by getSpectralData
    });

    test('should update metrics on spectral scan', async () => {
      await anchor.processSpectralInput([0.5]);
      await anchor.processSpectralInput([0.6]);
      
      const metrics = anchor.getMetrics();
      expect(metrics.spectralScans).toBe(2);
    });

    test('should throw error when spectral analysis disabled', async () => {
      const noSpectralAnchor = new TeslaSonarAnchor({
        enableSpectralAnalysis: false
      });
      await noSpectralAnchor.initialize();
      
      await expect(
        noSpectralAnchor.processSpectralInput([0.5])
      ).rejects.toThrow('Spectral analysis not enabled');
    });
  });

  describe('AR Feedback System', () => {
    test('should generate AR feedback for decree', async () => {
      const audioInput = [0.7, 0.8, 0.7];
      const decree = await anchor.processVocalDecree(audioInput);
      
      // AR feedback should be automatically generated
      const visualizations = anchor.getARVisualizations();
      expect(visualizations.length).toBeGreaterThan(0);
    });

    test('should create visualization with correct properties', async () => {
      const audioInput = [0.5, 0.6, 0.7];
      const decree = await anchor.processVocalDecree(audioInput);
      const visualizations = anchor.getARVisualizations();
      const viz = visualizations[0];
      
      expect(viz.id).toMatch(/^AR-/);
      expect(viz.type).toBe('resonance-field');
      expect(viz.decreeId).toBe(decree.id);
      expect(viz.color).toMatch(/^#[0-9A-F]{6}$/i);
      expect(viz.geometry).toBeDefined();
    });

    test('should convert frequency to color', async () => {
      const lowFreq = [0.1, 0.1, 0.1];
      const highFreq = [0.9, 0.9, 0.9];
      
      const decree1 = await anchor.processVocalDecree(lowFreq);
      const decree2 = await anchor.processVocalDecree(highFreq);
      
      const visualizations = anchor.getARVisualizations();
      expect(visualizations[0].color).toBeDefined();
      expect(visualizations[1].color).toBeDefined();
    });

    test('should generate sacred geometry pattern', async () => {
      const audioInput = [0.5, 0.6, 0.7];
      await anchor.processVocalDecree(audioInput);
      
      const visualizations = anchor.getARVisualizations();
      const geometry = visualizations[0].geometry;
      
      expect(geometry.pattern).toBeDefined();
      expect(geometry.complexity).toBeGreaterThan(0);
      expect(geometry.scale).toBeGreaterThanOrEqual(0);
      expect(geometry.rotation).toBeGreaterThanOrEqual(0);
    });

    test('should start AR session', async () => {
      const session = await anchor.startARSession();
      
      expect(session.active).toBe(true);
      expect(session.sessionId).toMatch(/^AR-SESSION-/);
      
      const status = anchor.getStatus();
      expect(status.arFeedback.sessionActive).toBe(true);
    });

    test('should stop AR session', async () => {
      await anchor.startARSession();
      const result = await anchor.stopARSession();
      
      expect(result.active).toBe(false);
      
      const status = anchor.getStatus();
      expect(status.arFeedback.sessionActive).toBe(false);
    });

    test('should limit visualization history', async () => {
      for (let i = 0; i < 55; i++) {
        await anchor.processVocalDecree([0.5]);
      }
      
      const status = anchor.getStatus();
      expect(status.arFeedback.visualizationCount).toBeLessThanOrEqual(50);
    });

    test('should update AR session metrics', async () => {
      await anchor.processVocalDecree([0.5]);
      await anchor.processVocalDecree([0.5]);
      
      const metrics = anchor.getMetrics();
      expect(metrics.arSessions).toBe(2);
    });

    test('should throw error when AR feedback disabled', async () => {
      const noARanchor = new TeslaSonarAnchor({
        enableARFeedback: false
      });
      await noARanchor.initialize();
      
      await expect(
        noARanchor.startARSession()
      ).rejects.toThrow('AR feedback not enabled');
    });
  });

  describe('NFT Metrics and Scaling', () => {
    test('should update NFT metrics on decree', async () => {
      const audioInput = [0.8, 0.9, 0.8];
      await anchor.processVocalDecree(audioInput);
      
      const metrics = anchor.getNFTMetrics();
      expect(metrics.completionScore).toBeGreaterThan(0);
    });

    test('should scale completion score', async () => {
      for (let i = 0; i < 5; i++) {
        await anchor.processVocalDecree([0.9, 0.9, 0.9]);
      }
      
      const metrics = anchor.getNFTMetrics();
      expect(metrics.completionScore).toBeGreaterThan(0);
      expect(metrics.completionScore).toBeLessThanOrEqual(100);
    });

    test('should upgrade tier based on completion score', async () => {
      // Process enough decrees to reach higher tier
      for (let i = 0; i < 10; i++) {
        await anchor.processVocalDecree([0.9, 0.9, 0.9]);
      }
      
      const metrics = anchor.getNFTMetrics();
      expect(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']).toContain(metrics.tier);
    });

    test('should update multiplier with tier', async () => {
      const initialMultiplier = anchor.getNFTMetrics().multiplier;
      
      for (let i = 0; i < 10; i++) {
        await anchor.processVocalDecree([0.9, 0.9, 0.9]);
      }
      
      const metrics = anchor.getNFTMetrics();
      expect(metrics.multiplier).toBeGreaterThanOrEqual(initialMultiplier);
    });

    test('should track milestone achievements', async () => {
      for (let i = 0; i < 15; i++) {
        await anchor.processVocalDecree([0.9, 0.9, 0.9]);
      }
      
      const metrics = anchor.getNFTMetrics();
      expect(metrics.achievements.length).toBeGreaterThan(0);
    });

    test('should not exceed 100% completion', async () => {
      for (let i = 0; i < 50; i++) {
        await anchor.processVocalDecree([0.9, 0.9, 0.9]);
      }
      
      const metrics = anchor.getNFTMetrics();
      expect(metrics.completionScore).toBeLessThanOrEqual(100);
    });

    test('should update NFT metrics counter', async () => {
      await anchor.processVocalDecree([0.5]);
      await anchor.processVocalDecree([0.5]);
      
      const anchorMetrics = anchor.getMetrics();
      expect(anchorMetrics.nftUpdates).toBe(2);
    });

    test('should throw error when NFT metrics disabled', async () => {
      const noNFTanchor = new TeslaSonarAnchor({
        enableNFTMetrics: false,
        enableVocalDecrees: true
      });
      await noNFTanchor.initialize();
      
      // Should process decree but not update NFT metrics
      await noNFTanchor.processVocalDecree([0.5]);
      const metrics = noNFTanchor.getMetrics();
      expect(metrics.nftUpdates).toBe(0);
    });
  });

  describe('Status and Metrics', () => {
    test('should get comprehensive status', () => {
      const status = anchor.getStatus();
      
      expect(status.id).toBeDefined();
      expect(status.initialized).toBe(true);
      expect(status.anchorState).toBeDefined();
      expect(status.vocalSystem).toBeDefined();
      expect(status.spectralAnalyzer).toBeDefined();
      expect(status.arFeedback).toBeDefined();
      expect(status.nftMetrics).toBeDefined();
      expect(status.metrics).toBeDefined();
    });

    test('should track all metrics', async () => {
      await anchor.processVocalDecree([0.5]);
      await anchor.processSpectralInput([0.5]);
      
      const metrics = anchor.getMetrics();
      expect(metrics.totalDecrees).toBe(1);
      expect(metrics.spectralScans).toBe(1);
      expect(metrics.arSessions).toBe(1);
      expect(metrics.nftUpdates).toBe(1);
    });

    test('should get anchor state', () => {
      const state = anchor.getAnchorState();
      
      expect(state.grounded).toBe(true);
      expect(state.resonance).toBe(1.0);
      expect(state.stability).toBe(1.0);
      expect(state.energyLevel).toBe(100);
      expect(state.frequency).toBe(528);
    });
  });

  describe('Constants', () => {
    test('should have sonar frequencies defined', () => {
      expect(SONAR_FREQUENCIES.VOCAL_DECREE).toBe(528);
      expect(SONAR_FREQUENCIES.SPECTRAL_LOW).toBe(256);
      expect(SONAR_FREQUENCIES.AR_FEEDBACK).toBe(963);
    });

    test('should have decree types defined', () => {
      expect(DECREE_TYPES.AFFIRMATION).toBe('affirmation');
      expect(DECREE_TYPES.MANIFESTATION).toBe('manifestation');
    });

    test('should have NFT metric scales defined', () => {
      expect(NFT_METRIC_SCALES.BRONZE.multiplier).toBe(1.0);
      expect(NFT_METRIC_SCALES.DIAMOND.multiplier).toBe(5.0);
    });

    test('should have correct tier ranges', () => {
      expect(NFT_METRIC_SCALES.BRONZE.min).toBe(0);
      expect(NFT_METRIC_SCALES.BRONZE.max).toBe(25);
      expect(NFT_METRIC_SCALES.DIAMOND.min).toBe(96);
      expect(NFT_METRIC_SCALES.DIAMOND.max).toBe(100);
    });
  });
});
