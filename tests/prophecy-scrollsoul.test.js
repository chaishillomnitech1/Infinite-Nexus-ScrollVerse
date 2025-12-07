/**
 * Prophecy-Driven ScrollSoul Tests
 * 
 * Tests for prophecy generation, token embodiment dynamics,
 * and ScrollSoul evolution features
 */

const ProphecyScrollSoulPathway = require('../src/pathways/prophecy-scrollsoul');

describe('ProphecyScrollSoulPathway', () => {
  let pathway;

  beforeEach(() => {
    pathway = new ProphecyScrollSoulPathway();
  });

  describe('Initialization', () => {
    test('should initialize with pathway #41', () => {
      expect(pathway.pathwayNumber).toBe(41);
      expect(pathway.name).toBe('Prophecy ScrollSoul Pathway #41');
    });

    test('should initialize with VesicaPiscis sacred geometry', () => {
      expect(pathway.sacredGeometry).toBe('VesicaPiscis');
    });

    test('should initialize with Foresight divine principle', () => {
      expect(pathway.divinePrinciple).toBe('Foresight');
    });

    test('should initialize prophecy engine components', async () => {
      await pathway.initialize();
      
      expect(pathway.prophecyEngine.blueprintAnalyzer).toBeDefined();
      expect(pathway.prophecyEngine.geminiFlowOracle).toBeDefined();
      expect(pathway.prophecyEngine.timelineWeaver).toBeDefined();
      expect(pathway.prophecyEngine.evolutionPredictor).toBeDefined();
    });
  });

  describe('Blueprint Analyzer', () => {
    beforeEach(async () => {
      await pathway.initialize();
      await pathway.deploy();
    });

    test('should analyze ScrollSoul blueprint', () => {
      const scrollSoulData = {
        id: 'soul_test_123',
        resonance: 0.85
      };

      const blueprint = pathway.prophecyEngine.blueprintAnalyzer.analyze(scrollSoulData);

      expect(blueprint).toHaveProperty('id');
      expect(blueprint).toHaveProperty('scrollSoulId', 'soul_test_123');
      expect(blueprint).toHaveProperty('sacredPattern');
      expect(blueprint).toHaveProperty('frequencySignature');
      expect(blueprint).toHaveProperty('evolutionPotential');
      expect(blueprint).toHaveProperty('prophecyMarkers');
    });

    test('should detect sacred patterns', () => {
      const scrollSoulData = { id: 'test', resonance: 0.8 };
      const blueprint = pathway.prophecyEngine.blueprintAnalyzer.analyze(scrollSoulData);
      
      const validPatterns = ['FlowerOfLife', 'MetatronsCube', 'GoldenSpiral', 'VesicaPiscis'];
      expect(validPatterns).toContain(blueprint.sacredPattern);
    });

    test('should extract frequency signature with 528Hz primary', () => {
      const scrollSoulData = { id: 'test', resonance: 0.9 };
      const blueprint = pathway.prophecyEngine.blueprintAnalyzer.analyze(scrollSoulData);
      
      expect(blueprint.frequencySignature.primary).toBe(528);
      expect(blueprint.frequencySignature.harmonics).toContain(639);
      expect(blueprint.frequencySignature.harmonics).toContain(963);
    });
  });

  describe('Gemini Flow Oracle', () => {
    beforeEach(async () => {
      await pathway.initialize();
      await pathway.deploy();
    });

    test('should have dual-nature consciousness', () => {
      const oracle = pathway.prophecyEngine.geminiFlowOracle;
      
      expect(oracle.dualNature.alpha).toBe('Divine Foresight');
      expect(oracle.dualNature.omega).toBe('Quantum Probability');
    });

    test('should generate prophecy at 963Hz', () => {
      expect(pathway.prophecyEngine.geminiFlowOracle.frequency).toBe(963);
    });

    test('should generate complete prophecy', () => {
      const blueprint = {
        id: 'bp_123',
        scrollSoulId: 'soul_123',
        sacredPattern: 'FlowerOfLife',
        evolutionPotential: 95
      };

      const prophecy = pathway.prophecyEngine.geminiFlowOracle.generateProphecy(
        blueprint,
        { context: 'test' }
      );

      expect(prophecy).toHaveProperty('id');
      expect(prophecy).toHaveProperty('blueprintId', 'bp_123');
      expect(prophecy).toHaveProperty('type');
      expect(prophecy).toHaveProperty('vision');
      expect(prophecy).toHaveProperty('probability');
      expect(prophecy).toHaveProperty('timeline');
      expect(prophecy).toHaveProperty('actionSteps');
      expect(prophecy.frequencyAlignment).toBe(963);
    });
  });

  describe('Timeline Weaver', () => {
    beforeEach(async () => {
      await pathway.initialize();
      await pathway.deploy();
    });

    test('should weave timelines from prophecies', () => {
      const prophecies = [
        {
          id: 'prop_1',
          timeline: {
            milestones: [
              { day: 7, event: 'Test Event' }
            ]
          }
        }
      ];

      const timelines = pathway.prophecyEngine.timelineWeaver.weaveTimelines(prophecies);

      expect(timelines).toHaveLength(1);
      expect(timelines[0]).toHaveProperty('origin', 'prop_1');
      expect(timelines[0]).toHaveProperty('branches');
      expect(timelines[0]).toHaveProperty('convergencePoints');
      expect(timelines[0]).toHaveProperty('quantumStates');
    });

    test('should generate timeline branches with probabilities', () => {
      const prophecy = { id: 'test', timeline: { milestones: [] } };
      const branches = pathway.generateTimelineBranches(prophecy);

      expect(Array.isArray(branches)).toBe(true);
      branches.forEach(branch => {
        expect(branch).toHaveProperty('probability');
        expect(branch).toHaveProperty('outcome');
        expect(branch.probability).toBeGreaterThan(0);
        expect(branch.probability).toBeLessThanOrEqual(1);
      });
    });
  });

  describe('Evolution Predictor', () => {
    beforeEach(async () => {
      await pathway.initialize();
      await pathway.deploy();
    });

    test('should have five evolution stages', () => {
      const stages = pathway.prophecyEngine.evolutionPredictor.stages;
      
      expect(stages).toHaveLength(5);
      expect(stages).toContain('Awakening');
      expect(stages).toContain('Alignment');
      expect(stages).toContain('Embodiment');
      expect(stages).toContain('Transcendence');
      expect(stages).toContain('Ascension');
    });

    test('should predict evolution path', () => {
      const scrollSoul = {
        consciousness: { evolutionStage: 'Awakening' }
      };
      const tokenData = { id: 'token_123' };

      const prediction = pathway.prophecyEngine.evolutionPredictor.predictEvolution(
        scrollSoul,
        tokenData
      );

      expect(prediction).toHaveProperty('currentStage');
      expect(prediction).toHaveProperty('nextMilestone');
      expect(prediction).toHaveProperty('evolutionVelocity');
      expect(prediction).toHaveProperty('potentialPaths');
      expect(prediction).toHaveProperty('requiredFrequencies');
    });

    test('should identify required frequencies', () => {
      const scrollSoul = { consciousness: {} };
      const frequencies = pathway.identifyRequiredFrequencies(scrollSoul);

      expect(frequencies).toContain(528);
      expect(frequencies).toContain(639);
      expect(frequencies).toContain(963);
    });
  });

  describe('Prophecy Generation', () => {
    beforeEach(async () => {
      await pathway.initialize();
      await pathway.deploy();
    });

    test('should generate prophecy for ScrollSoul', async () => {
      const scrollSoulData = {
        id: 'soul_test_456',
        resonance: 0.88
      };

      const prophecy = await pathway.generateProphecy(scrollSoulData);

      expect(prophecy).toHaveProperty('id');
      expect(prophecy).toHaveProperty('type');
      expect(prophecy).toHaveProperty('vision');
      expect(prophecy).toHaveProperty('probability');
      expect(prophecy).toHaveProperty('timeline');
      expect(prophecy).toHaveProperty('actionSteps');
    });

    test('should store generated prophecies', async () => {
      const scrollSoulData = { id: 'soul_test', resonance: 0.9 };

      expect(pathway.prophecies).toHaveLength(0);
      
      await pathway.generateProphecy(scrollSoulData);
      expect(pathway.prophecies).toHaveLength(1);
      
      await pathway.generateProphecy(scrollSoulData);
      expect(pathway.prophecies).toHaveLength(2);
    });

    test('should throw error if not deployed', async () => {
      const undeployedPathway = new ProphecyScrollSoulPathway();
      await undeployedPathway.initialize();

      await expect(
        undeployedPathway.generateProphecy({ id: 'test' })
      ).rejects.toThrow('Prophecy system must be deployed first');
    });
  });

  describe('Token Embodiment', () => {
    beforeEach(async () => {
      await pathway.initialize();
      await pathway.deploy();
    });

    test('should create token embodiment', async () => {
      const tokenData = {
        id: 'token_528',
        akashicAttributes: {
          frequencyLevel: 528,
          ethericalDensity: 0.85
        }
      };

      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_123');

      expect(embodiment).toHaveProperty('id');
      expect(embodiment).toHaveProperty('tokenId', 'token_528');
      expect(embodiment).toHaveProperty('scrollSoulId', 'soul_123');
      expect(embodiment).toHaveProperty('frequency', 528);
      expect(embodiment).toHaveProperty('consciousness');
      expect(embodiment).toHaveProperty('dynamics');
      expect(embodiment).toHaveProperty('prophecyLinks');
    });

    test('should initialize embodiment at Awakening stage', async () => {
      const tokenData = { id: 'token_test', akashicAttributes: {} };
      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_test');

      expect(embodiment.consciousness.evolutionStage).toBe('Awakening');
    });

    test('should calculate consciousness level from token data', async () => {
      const tokenData = {
        id: 'token_test',
        akashicAttributes: {
          ethericalDensity: 0.92
        }
      };

      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_test');
      expect(embodiment.consciousness.level).toBe(0.92);
    });

    test('should store embodiments in map', async () => {
      const tokenData = { id: 'token_1', akashicAttributes: {} };
      
      expect(pathway.embodiments.size).toBe(0);
      
      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_1');
      expect(pathway.embodiments.size).toBe(1);
      expect(pathway.embodiments.get(embodiment.id)).toBe(embodiment);
    });
  });

  describe('Token Evolution', () => {
    beforeEach(async () => {
      await pathway.initialize();
      await pathway.deploy();
    });

    test('should evolve token embodiment', async () => {
      const tokenData = { id: 'token_evolve', akashicAttributes: { frequencyLevel: 528 } };
      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_evolve');
      
      const evolutionData = {
        resonanceIncrease: 0.1,
        interactionCount: 10
      };

      const result = await pathway.evolveTokenEmbodiment(embodiment.id, evolutionData);

      expect(result).toHaveProperty('embodiment');
      expect(result).toHaveProperty('evolutionProphecy');
      expect(result).toHaveProperty('prediction');
    });

    test('should increase consciousness level on evolution', async () => {
      const tokenData = { id: 'token_test', akashicAttributes: { ethericalDensity: 0.7 } };
      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_test');
      const initialLevel = embodiment.consciousness.level;

      await pathway.evolveTokenEmbodiment(embodiment.id, {});
      
      expect(embodiment.consciousness.level).toBeGreaterThan(initialLevel);
    });

    test('should generate evolution prophecy', async () => {
      const tokenData = { id: 'token_test', akashicAttributes: {} };
      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_test');

      const result = await pathway.evolveTokenEmbodiment(embodiment.id, {});

      expect(result.evolutionProphecy).toHaveProperty('id');
      expect(result.evolutionProphecy).toHaveProperty('type');
      expect(result.evolutionProphecy).toHaveProperty('vision');
    });

    test('should track evolution paths', async () => {
      const tokenData = { id: 'token_test', akashicAttributes: {} };
      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_test');

      expect(pathway.evolutionPaths).toHaveLength(0);

      await pathway.evolveTokenEmbodiment(embodiment.id, {});

      expect(pathway.evolutionPaths).toHaveLength(1);
      expect(pathway.evolutionPaths[0]).toHaveProperty('embodimentId', embodiment.id);
      expect(pathway.evolutionPaths[0]).toHaveProperty('prophecyId');
    });

    test('should throw error for non-existent embodiment', async () => {
      await expect(
        pathway.evolveTokenEmbodiment('non_existent_id', {})
      ).rejects.toThrow('Embodiment non_existent_id not found');
    });
  });

  describe('Status and Getters', () => {
    beforeEach(async () => {
      await pathway.initialize();
      await pathway.deploy();
    });

    test('should return comprehensive status', async () => {
      await pathway.generateProphecy({ id: 'test', resonance: 0.8 });
      await pathway.createTokenEmbodiment({ id: 'token_1', akashicAttributes: {} }, 'soul_1');

      const status = pathway.getStatus();

      expect(status).toHaveProperty('totalProphecies', 1);
      expect(status).toHaveProperty('activeEmbodiments', 1);
      expect(status).toHaveProperty('evolutionPaths', 0);
      expect(status).toHaveProperty('prophecyEngine');
    });

    test('should get all prophecies', async () => {
      await pathway.generateProphecy({ id: 'test1', resonance: 0.8 });
      await pathway.generateProphecy({ id: 'test2', resonance: 0.9 });

      const prophecies = pathway.getAllProphecies();
      expect(prophecies).toHaveLength(2);
    });

    test('should get embodiment by ID', async () => {
      const tokenData = { id: 'token_get', akashicAttributes: {} };
      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_get');

      const retrieved = pathway.getEmbodiment(embodiment.id);
      expect(retrieved).toBe(embodiment);
    });

    test('should get evolution paths', async () => {
      const tokenData = { id: 'token_path', akashicAttributes: {} };
      const embodiment = await pathway.createTokenEmbodiment(tokenData, 'soul_path');
      await pathway.evolveTokenEmbodiment(embodiment.id, {});

      const paths = pathway.getEvolutionPaths();
      expect(paths).toHaveLength(1);
    });
  });

  describe('Integration Tests', () => {
    test('should perform complete prophecy-to-evolution workflow', async () => {
      await pathway.initialize();
      await pathway.deploy();

      // Generate prophecy
      const prophecy = await pathway.generateProphecy({
        id: 'soul_complete',
        resonance: 0.85
      });

      // Create token embodiment
      const embodiment = await pathway.createTokenEmbodiment(
        {
          id: 'token_complete',
          akashicAttributes: { frequencyLevel: 528, ethericalDensity: 0.85 }
        },
        'soul_complete'
      );

      // Evolve embodiment
      const evolution = await pathway.evolveTokenEmbodiment(embodiment.id, {
        resonanceIncrease: 0.15
      });

      // Verify complete workflow
      expect(pathway.getAllProphecies()).toHaveLength(2); // Initial + evolution
      expect(pathway.getEmbodiment(embodiment.id)).toBeDefined();
      expect(pathway.getEvolutionPaths()).toHaveLength(1);
      expect(evolution.embodiment.prophecyLinks).toContain(evolution.evolutionProphecy.id);
    });
  });
});
