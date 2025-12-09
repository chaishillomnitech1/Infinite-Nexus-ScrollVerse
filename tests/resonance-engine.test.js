/**
 * Resonance Engine Tests
 * Tests for Frequency-Vibration-Energy Matrix
 */

const { ResonanceEngine, FVEMatrix, FREQUENCY_MATRIX, ENERGY_STATES } = require('../src/ngi/resonance-engine');

describe('Resonance Engine', () => {
  describe('FVEMatrix', () => {
    let fveMatrix;

    beforeEach(() => {
      fveMatrix = new FVEMatrix();
    });

    test('should initialize with dormant state', () => {
      expect(fveMatrix.frequency).toBeNull();
      expect(fveMatrix.vibration).toBeNull();
      expect(fveMatrix.energy).toBeNull();
      expect(fveMatrix.coherence).toBe(0);
      expect(fveMatrix.state).toBe('DORMANT');
    });

    test('should synthesize FVE matrix from components', () => {
      const frequencyField = {
        fundamental: { frequency: 963, amplitude: 1.0, phase: 0 },
        harmonics: [],
        coherence: 0.95
      };

      const energyState = {
        manifestationField: {
          vibration: 0.9,
          coherence: 0.95,
          power: 0.855
        }
      };

      const result = fveMatrix.synthesize(frequencyField, energyState);

      expect(result.frequency).toBe(963);
      expect(result.vibration).toBe(0.9);
      expect(result.coherence).toBeGreaterThan(0.9);
      // High coherence (0.95+) results in TRANSCENDENT state
      expect(['SOVEREIGN', 'TRANSCENDENT']).toContain(result.state);
    });

    test('should determine correct matrix state', () => {
      fveMatrix.coherence = 0.97;
      expect(fveMatrix.determineMatrixState()).toBe('TRANSCENDENT');

      fveMatrix.coherence = 0.92;
      expect(fveMatrix.determineMatrixState()).toBe('SOVEREIGN');

      fveMatrix.coherence = 0.75;
      expect(fveMatrix.determineMatrixState()).toBe('ALIGNED');

      fveMatrix.coherence = 0.55;
      expect(fveMatrix.determineMatrixState()).toBe('AWAKENING');

      fveMatrix.coherence = 0.3;
      expect(fveMatrix.determineMatrixState()).toBe('DORMANT');
    });
  });

  describe('ResonanceEngine - Initialization', () => {
    let engine;

    beforeEach(() => {
      engine = new ResonanceEngine({
        baseFrequency: 528,
        operationalFrequency: 963
      });
    });

    test('should create engine with correct configuration', () => {
      expect(engine.baseFrequency).toBe(528);
      expect(engine.operationalFrequency).toBe(963);
      expect(engine.status).toBe('initialized');
      expect(engine.frequencyLock).toBe(false);
    });

    test('should initialize successfully', async () => {
      const result = await engine.initialize();
      
      expect(result).toBe(true);
      expect(engine.status).toBe('active');
      expect(engine.frequencyLock).toBe(true);
      expect(engine.coherenceLevel).toBeGreaterThanOrEqual(0.95);
    });

    test('should update metrics after initialization', async () => {
      await engine.initialize();
      
      expect(engine.metrics.frequency_stability).toBeGreaterThan(0);
      expect(engine.metrics.harmonic_count).toBe(6); // 7 harmonics - 1
      expect(engine.metrics.coherence).toBeGreaterThan(0.9);
    });
  });

  describe('ResonanceEngine - Pillar I: Harmonic Frequency Alignment', () => {
    let engine;

    beforeEach(() => {
      engine = new ResonanceEngine();
    });

    test('should generate harmonic field at target frequency', () => {
      const field = engine.generateHarmonicField(963);

      expect(field.fundamental.frequency).toBe(963);
      expect(field.fundamental.amplitude).toBe(1.0);
      expect(field.harmonics).toHaveLength(6);
      expect(field.coherence).toBeGreaterThan(0.9);
      expect(field.stability).toBeGreaterThan(0.9);
    });

    test('should generate correct harmonic series', () => {
      const field = engine.generateHarmonicField(528);

      expect(field.harmonics[0].frequency).toBe(528 * 2); // 2nd harmonic
      expect(field.harmonics[1].frequency).toBe(528 * 3); // 3rd harmonic
      expect(field.harmonics[5].frequency).toBe(528 * 7); // 7th harmonic
      
      // Amplitude decreases with harmonic number
      expect(field.harmonics[0].amplitude).toBe(0.5);
      expect(field.harmonics[1].amplitude).toBeCloseTo(0.333, 2);
    });

    test('should calculate quantum coherence correctly', () => {
      const fundamental = { frequency: 963, amplitude: 1.0 };
      const harmonics = [
        { frequency: 1926, amplitude: 0.5, harmonic_number: 2 },
        { frequency: 2889, amplitude: 0.333, harmonic_number: 3 }
      ];

      const coherence = engine.calculateCoherence(fundamental, harmonics);

      expect(coherence).toBeGreaterThan(0.9);
      expect(coherence).toBeLessThanOrEqual(1.0);
    });

    test('should apply Metatron\'s Cube modulation', () => {
      const field = engine.generateHarmonicField(963);
      const modulation = engine.applyMetatronsCube(field);

      expect(modulation.circles).toBe(13);
      expect(modulation.lines).toBe(78);
      expect(modulation.enhancement).toBeGreaterThan(0);
      expect(modulation.appliedTo).toBe(963);
    });
  });

  describe('ResonanceEngine - Pillar II: Vibrational Energy Synthesis', () => {
    let engine;

    beforeEach(() => {
      engine = new ResonanceEngine();
    });

    test('should synthesize energy from frequency field', () => {
      const field = engine.generateHarmonicField(963);
      const energyState = engine.synthesizeEnergy(field);

      expect(energyState.energyState).toBeDefined();
      expect(energyState.manifestationField).toBeDefined();
      expect(energyState.consciousness).toBeDefined();
      expect(energyState.manifestationField.power).toBeGreaterThan(0);
    });

    test('should measure vibrational amplitude', () => {
      const field = engine.generateHarmonicField(963);
      const amplitude = engine.measureAmplitude(field);

      expect(amplitude).toBeGreaterThan(0);
      expect(amplitude).toBeLessThanOrEqual(1.0);
    });

    test('should determine correct energy state', () => {
      expect(engine.determineEnergyState(1.0, 1.0)).toBe('TRANSCENDENT');
      expect(engine.determineEnergyState(0.9, 0.9)).toBe('SOVEREIGN');
      expect(engine.determineEnergyState(0.7, 0.7)).toBe('ALIGNED');
      expect(engine.determineEnergyState(0.5, 0.5)).toBe('AWAKENING');
      expect(engine.determineEnergyState(0.2, 0.2)).toBe('DORMANT');
    });

    test('should apply consciousness protocols', () => {
      const manifestationField = {
        vibration: 0.9,
        coherence: 0.95,
        frequency: 963,
        power: 0.855,
        state: 'SOVEREIGN'
      };

      const consciousness = engine.applyConsciousnessProtocols(manifestationField);

      expect(consciousness.level).toBe('Sovereign');
      expect(consciousness.vibration).toBe(0.9);
      expect(consciousness.coherence).toBe(0.95);
      expect(consciousness.readyForEmergence).toBe(true);
    });
  });

  describe('ResonanceEngine - Activation', () => {
    let engine;

    beforeEach(async () => {
      engine = new ResonanceEngine({
        baseFrequency: 528,
        operationalFrequency: 963
      });
      await engine.initialize();
    });

    test('should activate after initialization', async () => {
      const result = await engine.activate();

      expect(result.success).toBe(true);
      expect(engine.status).toBe('activated');
      expect(result.state).toBeDefined();
      expect(result.coherence).toBeGreaterThan(0.9);
    });

    test('should throw error if not initialized', async () => {
      const uninitializedEngine = new ResonanceEngine();
      
      await expect(uninitializedEngine.activate()).rejects.toThrow(
        'Resonance Engine must be initialized before activation'
      );
    });

    test('should synthesize FVE matrix on activation', async () => {
      const result = await engine.activate();

      expect(result.manifestationPower).toBeGreaterThan(0);
      expect(result.consciousness).toBeDefined();
      expect(result.consciousness.level).not.toBe('None');
    });
  });

  describe('ResonanceEngine - Status and Metrics', () => {
    let engine;

    beforeEach(async () => {
      engine = new ResonanceEngine();
      await engine.initialize();
    });

    test('should return comprehensive status', () => {
      const status = engine.getStatus();

      expect(status.status).toBe('active');
      expect(status.baseFrequency).toBe(528);
      expect(status.operationalFrequency).toBe(963);
      expect(status.frequencyLock).toBe(true);
      expect(status.metrics).toBeDefined();
      expect(status.fveMatrix).toBeDefined();
    });

    test('should return detailed metrics', () => {
      const metrics = engine.getMetrics();

      expect(metrics.frequency_stability).toBeGreaterThan(0);
      expect(metrics.harmonic_count).toBeGreaterThan(0);
      expect(metrics.coherence).toBeGreaterThan(0);
      expect(metrics.fveMatrix).toBeDefined();
      expect(metrics.timestamp).toBeDefined();
    });
  });

  describe('Frequency Matrix Constants', () => {
    test('should have all Solfeggio frequencies', () => {
      expect(FREQUENCY_MATRIX.LIBERATION.frequency).toBe(396);
      expect(FREQUENCY_MATRIX.UNDOING.frequency).toBe(417);
      expect(FREQUENCY_MATRIX.MIRACLE.frequency).toBe(528);
      expect(FREQUENCY_MATRIX.CONNECTION.frequency).toBe(639);
      expect(FREQUENCY_MATRIX.AWAKENING.frequency).toBe(741);
      expect(FREQUENCY_MATRIX.SPIRITUAL.frequency).toBe(852);
      expect(FREQUENCY_MATRIX.DIVINE.frequency).toBe(963);
    });

    test('should have higher harmonics', () => {
      expect(FREQUENCY_MATRIX.CHRIST.frequency).toBe(1056);
      expect(FREQUENCY_MATRIX.COSMIC.frequency).toBe(2112);
    });

    test('should calculate correct periods', () => {
      expect(FREQUENCY_MATRIX.DIVINE.period_ms).toBeCloseTo(1.038, 2);
      expect(FREQUENCY_MATRIX.MIRACLE.period_ms).toBeCloseTo(1.894, 2);
    });
  });

  describe('Energy States Constants', () => {
    test('should have all consciousness levels', () => {
      expect(ENERGY_STATES.DORMANT.consciousness_level).toBe('None');
      expect(ENERGY_STATES.AWAKENING.consciousness_level).toBe('Initial');
      expect(ENERGY_STATES.ALIGNED.consciousness_level).toBe('Aligned');
      expect(ENERGY_STATES.SOVEREIGN.consciousness_level).toBe('Sovereign');
      expect(ENERGY_STATES.TRANSCENDENT.consciousness_level).toBe('Transcendent');
    });

    test('should have correct vibration levels', () => {
      expect(ENERGY_STATES.DORMANT.vibration).toBe(0.0);
      expect(ENERGY_STATES.AWAKENING.vibration).toBe(0.3);
      expect(ENERGY_STATES.ALIGNED.vibration).toBe(0.7);
      expect(ENERGY_STATES.SOVEREIGN.vibration).toBe(0.9);
      expect(ENERGY_STATES.TRANSCENDENT.vibration).toBe(1.0);
    });
  });
});
