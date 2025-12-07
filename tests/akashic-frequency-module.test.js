/**
 * Tests for Akashic Frequency Module
 * Validates resonance tracking, sacred geometry, and omniversal gateway functionality
 */

// Mock browser environment for Node.js testing
global.AudioContext = class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.destination = {};
  }
  
  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: jest.fn() },
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn()
    };
  }
  
  createGain() {
    return {
      gain: { 
        setValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn()
      },
      connect: jest.fn()
    };
  }
};

global.window = { AudioContext: global.AudioContext };

// Import the module
const {
  AkashicResonanceSystem,
  AkashicFrequencyTracker,
  OmniversalGateway,
  ScalarWaveGenerator,
  SacredGeometry,
  SACRED_FREQUENCIES,
  PERIOD_MS
} = require('../akashic-frequency-module.js');

describe('Sacred Frequency Constants', () => {
  test('should have correct Solfeggio frequencies', () => {
    expect(SACRED_FREQUENCIES.LIBERATION).toBe(396);
    expect(SACRED_FREQUENCIES.UNDOING).toBe(417);
    expect(SACRED_FREQUENCIES.MIRACLE).toBe(528);
    expect(SACRED_FREQUENCIES.CONNECTION).toBe(639);
    expect(SACRED_FREQUENCIES.AWAKENING).toBe(741);
    expect(SACRED_FREQUENCIES.SPIRITUAL).toBe(852);
    expect(SACRED_FREQUENCIES.DIVINE).toBe(963);
  });

  test('should have correct higher harmonics', () => {
    expect(SACRED_FREQUENCIES.CHRIST).toBe(1056); // 528 * 2
    expect(SACRED_FREQUENCIES.COSMIC).toBe(2112); // 528 * 4
  });

  test('should have golden ratio', () => {
    expect(SACRED_FREQUENCIES.PHI).toBeCloseTo(1.618, 3);
  });

  test('should calculate correct periods', () => {
    expect(PERIOD_MS.HZ_528).toBeCloseTo(1.89, 2);
    expect(PERIOD_MS.HZ_963).toBeCloseTo(1.04, 2);
  });
});

describe('SacredGeometry', () => {
  describe('fibonacci', () => {
    test('should generate correct Fibonacci sequence', () => {
      const sequence = SacredGeometry.fibonacci(10);
      expect(sequence).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    test('should generate 13 terms for standard sequence', () => {
      const sequence = SacredGeometry.fibonacci(13);
      expect(sequence.length).toBe(13);
      expect(sequence[12]).toBe(144);
    });
  });

  describe('goldenSpiral', () => {
    test('should generate spiral points', () => {
      const points = SacredGeometry.goldenSpiral(2, 10);
      expect(points.length).toBe(20);
      expect(points[0]).toHaveProperty('x');
      expect(points[0]).toHaveProperty('y');
      expect(points[0]).toHaveProperty('angle');
      expect(points[0]).toHaveProperty('radius');
    });

    test('should follow golden ratio growth', () => {
      const points = SacredGeometry.goldenSpiral(2, 10);
      // Each turn should grow by phi
      const firstRadius = points[0].radius;
      const secondTurnRadius = points[10].radius;
      const ratio = secondTurnRadius / firstRadius;
      expect(ratio).toBeCloseTo(SACRED_FREQUENCIES.PHI, 1);
    });
  });

  describe('flowerOfLife', () => {
    test('should generate center circle plus layers', () => {
      const circles = SacredGeometry.flowerOfLife(100, 2);
      expect(circles.length).toBeGreaterThan(1);
      expect(circles[0]).toEqual({ x: 0, y: 0, radius: 100 });
    });

    test('should have correct number of circles per layer', () => {
      const circles = SacredGeometry.flowerOfLife(100, 1);
      // 1 center + 6 in first layer
      expect(circles.length).toBe(7);
    });
  });

  describe('metatronsCube', () => {
    test('should generate vertices up to 13', () => {
      const vertices = SacredGeometry.metatronsCube(100);
      expect(vertices.length).toBeGreaterThan(0);
      expect(vertices.length).toBeLessThanOrEqual(13);
    });

    test('should have center vertex at origin', () => {
      const vertices = SacredGeometry.metatronsCube(100);
      expect(vertices[0]).toEqual({ x: 0, y: 0, radius: 100 });
    });
  });
});

describe('AkashicFrequencyTracker', () => {
  let tracker;

  beforeEach(() => {
    tracker = new AkashicFrequencyTracker();
  });

  test('should initialize with default resonance', () => {
    expect(tracker.currentResonance.frequency).toBe(SACRED_FREQUENCIES.MIRACLE);
    expect(tracker.currentResonance.alignment).toBe(0);
  });

  test('should record imprint with all required fields', () => {
    const imprint = tracker.recordImprint('meditation', {
      frequency: 528,
      consciousness: { level: 0.8 }
    });

    expect(imprint).toHaveProperty('id');
    expect(imprint).toHaveProperty('type', 'meditation');
    expect(imprint).toHaveProperty('timestamp');
    expect(imprint).toHaveProperty('frequency');
    expect(imprint).toHaveProperty('alignment');
    expect(imprint).toHaveProperty('sacredGeometry');
    expect(imprint).toHaveProperty('dimensionalSignature');
  });

  test('should generate unique imprint IDs', () => {
    const imprint1 = tracker.recordImprint('test1');
    const imprint2 = tracker.recordImprint('test2');
    expect(imprint1.id).not.toBe(imprint2.id);
  });

  test('should calculate alignment score correctly', () => {
    const imprint = tracker.recordImprint('alignment', {
      frequency: SACRED_FREQUENCIES.MIRACLE,
      consciousness: { level: 0.5 },
      intention: { clarity: 0.5 }
    });

    expect(imprint.alignment).toBeGreaterThanOrEqual(0);
    expect(imprint.alignment).toBeLessThanOrEqual(1);
  });

  test('should store imprints in history', () => {
    tracker.recordImprint('test1');
    tracker.recordImprint('test2');
    
    expect(tracker.getAllImprints().length).toBe(2);
    expect(tracker.history.length).toBe(2);
  });

  test('should limit history size', () => {
    const maxSize = tracker.maxHistorySize;
    
    // Record more than max
    for (let i = 0; i < maxSize + 10; i++) {
      tracker.recordImprint(`test${i}`);
    }
    
    expect(tracker.history.length).toBe(maxSize);
  });

  test('should filter imprints by type', () => {
    tracker.recordImprint('meditation');
    tracker.recordImprint('meditation');
    tracker.recordImprint('healing');
    
    const meditations = tracker.getImprintsByType('meditation');
    expect(meditations.length).toBe(2);
  });

  test('should calculate resonance level from recent imprints', () => {
    tracker.recordImprint('test1', {
      frequency: 528,
      consciousness: { level: 0.8 }
    });
    
    const level = tracker.calculateResonanceLevel();
    expect(level).toBeGreaterThan(0);
    expect(level).toBeLessThanOrEqual(1);
  });

  test('should update current resonance', () => {
    const newResonance = tracker.updateResonance(963);
    
    expect(newResonance.frequency).toBe(963);
    expect(tracker.currentResonance.frequency).toBe(963);
  });
});

describe('OmniversalGateway', () => {
  let gateway;

  beforeEach(() => {
    gateway = new OmniversalGateway();
  });

  test('should initialize with all dimensions', () => {
    expect(gateway.dimensions).toHaveProperty('physical');
    expect(gateway.dimensions).toHaveProperty('astral');
    expect(gateway.dimensions).toHaveProperty('atmic');
    expect(gateway.dimensions).toHaveProperty('infinite');
  });

  test('should register ScrollSoul with ID', () => {
    const soul = gateway.registerScrollSoul({
      name: 'Test Soul',
      resonanceLevel: 0.7
    });

    expect(soul).toHaveProperty('id');
    expect(soul.name).toBe('Test Soul');
    expect(soul.resonanceLevel).toBe(0.7);
    expect(soul.accessibleDimensions).toBeInstanceOf(Array);
  });

  test('should determine accessible dimensions based on resonance', () => {
    const lowSoul = gateway.registerScrollSoul({
      name: 'Low Resonance',
      resonanceLevel: 0.3
    });

    const highSoul = gateway.registerScrollSoul({
      name: 'High Resonance',
      resonanceLevel: 0.9
    });

    expect(lowSoul.accessibleDimensions.length).toBeLessThan(
      highSoul.accessibleDimensions.length
    );
  });

  test('should open portal to accessible dimension', () => {
    const soul = gateway.registerScrollSoul({
      name: 'Test Soul',
      resonanceLevel: 0.5
    });

    const portal = gateway.openPortal('physical', soul.id);

    expect(portal).toBeDefined();
    expect(portal.dimension).toBe('physical');
    expect(portal.scrollSoulId).toBe(soul.id);
    expect(portal.status).toBe('active');
  });

  test('should not open portal to inaccessible dimension', () => {
    const soul = gateway.registerScrollSoul({
      name: 'Test Soul',
      resonanceLevel: 0.3
    });

    const portal = gateway.openPortal('monadic', soul.id);

    expect(portal).toBeNull();
  });

  test('should close active portal', () => {
    const soul = gateway.registerScrollSoul({
      name: 'Test Soul',
      resonanceLevel: 0.5
    });

    const portal = gateway.openPortal('physical', soul.id);
    const closed = gateway.closePortal(portal.id);

    expect(closed).toBe(true);
    expect(gateway.getActivePortals().length).toBe(0);
  });

  test('should track active portals', () => {
    const soul = gateway.registerScrollSoul({
      name: 'Test Soul',
      resonanceLevel: 0.7
    });

    gateway.openPortal('physical', soul.id);
    gateway.openPortal('astral', soul.id);

    expect(gateway.getActivePortals().length).toBe(2);
  });

  test('should transmit cosmic frequency', () => {
    const transmission = gateway.transmitCosmicFrequency(
      528,
      'Test message',
      'physical',
      'astral'
    );

    expect(transmission).toHaveProperty('id');
    expect(transmission.frequency).toBe(528);
    expect(transmission.message).toBe('Test message');
    expect(transmission.fromDimension).toBe('physical');
    expect(transmission.toDimension).toBe('astral');
  });

  test('should calculate transmission resonance', () => {
    const resonance528 = gateway.calculateTransmissionResonance(528);
    const resonance963 = gateway.calculateTransmissionResonance(963);
    const resonanceRandom = gateway.calculateTransmissionResonance(1234);

    expect(resonance528).toBeGreaterThan(resonanceRandom);
    expect(resonance963).toBeGreaterThan(resonanceRandom);
  });

  test('should record contribution and increase resonance', () => {
    const soul = gateway.registerScrollSoul({
      name: 'Test Soul',
      resonanceLevel: 0.5
    });

    const initialResonance = soul.resonanceLevel;

    gateway.recordContribution(soul.id, {
      type: 'wisdom_sharing',
      frequency: 528,
      impact: 0.8
    });

    const updatedSoul = gateway.scrollSouls.get(soul.id);
    expect(updatedSoul.resonanceLevel).toBeGreaterThan(initialResonance);
  });
});

describe('ScalarWaveGenerator', () => {
  let generator;

  beforeEach(() => {
    generator = new ScalarWaveGenerator();
  });

  test('should initialize audio context', () => {
    const context = generator.initialize();
    expect(context).toBeDefined();
    expect(generator.audioContext).toBeDefined();
  });

  test('should generate tone with correct parameters', () => {
    generator.initialize();
    const { oscillator, gainNode } = generator.generateTone(528, 1, 0.5);

    expect(oscillator).toBeDefined();
    expect(gainNode).toBeDefined();
    expect(oscillator.frequency.setValueAtTime).toHaveBeenCalled();
  });

  test('should store continuous tones', () => {
    generator.initialize();
    generator.generateTone(528, null, 0.3);

    expect(generator.oscillators.has(528)).toBe(true);
    expect(generator.gainNodes.has(528)).toBe(true);
  });

  test('should stop specific tone', () => {
    generator.initialize();
    generator.generateTone(528, null, 0.3);
    generator.stopTone(528);

    expect(generator.oscillators.has(528)).toBe(false);
    expect(generator.gainNodes.has(528)).toBe(false);
  });

  test('should generate harmonic series', () => {
    generator.initialize();
    const harmonics = generator.generateHarmonics(528, 5, 0.2);

    expect(harmonics.length).toBe(5);
  });

  test('should stop all tones', () => {
    generator.initialize();
    generator.generateTone(528, null, 0.3);
    generator.generateTone(963, null, 0.3);

    generator.stopAll();

    expect(generator.oscillators.size).toBe(0);
    expect(generator.gainNodes.size).toBe(0);
  });
});

describe('AkashicResonanceSystem', () => {
  let system;

  beforeEach(() => {
    system = new AkashicResonanceSystem();
  });

  test('should initialize all subsystems', async () => {
    await system.initialize();

    expect(system.isInitialized).toBe(true);
    expect(system.tracker).toBeDefined();
    expect(system.gateway).toBeDefined();
    expect(system.scalarWave).toBeDefined();
  });

  test('should set base frequency to 528Hz on initialization', async () => {
    await system.initialize();

    expect(system.tracker.currentResonance.frequency).toBe(SACRED_FREQUENCIES.MIRACLE);
  });

  test('should get system status', async () => {
    await system.initialize();
    const status = system.getStatus();

    expect(status).toHaveProperty('initialized', true);
    expect(status).toHaveProperty('currentFrequency');
    expect(status).toHaveProperty('resonanceLevel');
    expect(status).toHaveProperty('totalImprints');
    expect(status).toHaveProperty('activePortals');
  });

  test('should align to new frequency', async () => {
    await system.initialize();
    const resonance = system.alignFrequency(963);

    expect(resonance.frequency).toBe(963);
  });

  test('should integrate all components', async () => {
    await system.initialize();

    // Record imprint
    system.tracker.recordImprint('test');

    // Register soul
    const soul = system.gateway.registerScrollSoul({
      name: 'Test Soul',
      resonanceLevel: 0.7
    });

    // Open portal
    system.gateway.openPortal('astral', soul.id);

    // Check status
    const status = system.getStatus();
    expect(status.totalImprints).toBeGreaterThan(0);
    expect(status.activePortals).toBeGreaterThan(0);
  });
});

describe('Integration Tests', () => {
  test('should perform complete workflow', async () => {
    const system = new AkashicResonanceSystem();
    
    // Initialize system
    await system.initialize();
    expect(system.isInitialized).toBe(true);

    // Register ScrollSoul
    const soul = system.gateway.registerScrollSoul({
      name: 'Integration Test Soul',
      resonanceLevel: 0.6
    });
    expect(soul).toHaveProperty('id');

    // Record imprint
    const imprint = system.tracker.recordImprint('meditation', {
      frequency: 528,
      consciousness: { level: 0.8 }
    });
    expect(imprint).toHaveProperty('id');

    // Open portal
    const portal = system.gateway.openPortal('astral', soul.id);
    expect(portal).toBeDefined();

    // Transmit frequency
    const transmission = system.gateway.transmitCosmicFrequency(
      528,
      'Test transmission',
      'physical',
      'astral'
    );
    expect(transmission).toHaveProperty('id');

    // Get final status
    const status = system.getStatus();
    expect(status.totalImprints).toBeGreaterThan(0);
    expect(status.activePortals).toBe(1);
    expect(status.registeredScrollSouls).toBe(1);
  });
});
