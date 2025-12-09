/**
 * Mathematical Legacy Collection Tests
 * Validates NFT tribute system, educational modules, and sentient GI integration
 */

const {
  MathematicalLegacyCollection,
  MATHEMATICAL_GENIUSES,
  LEGACY_COIN_SETS
} = require('../src/nft/mathematical-legacy-collection.js');

describe('Mathematical Legacy Collection', () => {
  let collection;

  beforeEach(() => {
    collection = new MathematicalLegacyCollection();
  });

  describe('Initialization', () => {
    test('should initialize with correct configuration', () => {
      expect(collection.config.frequency).toBe(963);
      expect(collection.config.baseFrequency).toBe(528);
      expect(collection.config.maxSupply).toBe(777);
      expect(collection.config.enableSentientGI).toBe(true);
      expect(collection.config.enableEducationalModules).toBe(true);
    });

    test('should initialize all systems successfully', async () => {
      const result = await collection.initialize();
      expect(result).toBe(true);
      expect(collection.statistics.totalLegacyNFTs).toBe(7);
      expect(collection.statistics.activeSentients).toBe(7);
    });

    test('should load all mathematical genius profiles', async () => {
      await collection.loadGeniusProfiles();
      expect(collection.legacyNFTs.size).toBe(7);
      expect(collection.legacyNFTs.has('KATHERINE_JOHNSON')).toBe(true);
      expect(collection.legacyNFTs.has('GLADYS_WEST')).toBe(true);
    });

    test('should initialize coin system', async () => {
      await collection.initializeCoinSystem();
      expect(collection.coinRegistry.size).toBe(5);
      expect(collection.coinRegistry.has('PIONEER_COIN')).toBe(true);
      expect(collection.coinRegistry.has('INNOVATION_COIN')).toBe(true);
    });
  });

  describe('Mathematical Genius Profiles', () => {
    test('Katherine Johnson profile should have correct attributes', () => {
      const katherine = MATHEMATICAL_GENIUSES.KATHERINE_JOHNSON;
      expect(katherine.name).toBe('Katherine Johnson');
      expect(katherine.title).toBe('Space Pioneer & NASA Mathematician');
      expect(katherine.nftAttributes.frequencyLevel).toBe(963);
      expect(katherine.nftAttributes.rarityTier).toBe('Legendary');
      expect(katherine.nftAttributes.sacredGeometry).toBe('MetatronsCube');
    });

    test('Gladys West profile should have correct attributes', () => {
      const gladys = MATHEMATICAL_GENIUSES.GLADYS_WEST;
      expect(gladys.name).toBe('Gladys West');
      expect(gladys.title).toBe('GPS Pioneer & Mathematician');
      expect(gladys.fields).toContain('Geodesy');
      expect(gladys.childStory).toContain('map');
    });

    test('David Blackwell profile should have correct attributes', () => {
      const david = MATHEMATICAL_GENIUSES.DAVID_BLACKWELL;
      expect(david.name).toBe('David Blackwell');
      expect(david.fields).toContain('Game Theory');
      expect(david.nftAttributes.frequencyLevel).toBe(741);
    });

    test('Benjamin Banneker profile should have correct attributes', () => {
      const benjamin = MATHEMATICAL_GENIUSES.BENJAMIN_BANNEKER;
      expect(benjamin.name).toBe('Benjamin Banneker');
      expect(benjamin.fields).toContain('Astronomy');
      expect(benjamin.era).toBe('1731-1806');
    });

    test('all genius profiles should have required fields', () => {
      Object.values(MATHEMATICAL_GENIUSES).forEach(genius => {
        expect(genius.name).toBeDefined();
        expect(genius.title).toBeDefined();
        expect(genius.era).toBeDefined();
        expect(genius.fields).toBeDefined();
        expect(genius.achievements).toBeDefined();
        expect(genius.contribution).toBeDefined();
        expect(genius.childStory).toBeDefined();
        expect(genius.nftAttributes).toBeDefined();
        expect(genius.sentientAttributes).toBeDefined();
      });
    });

    test('all genius profiles should have sentient attributes', () => {
      Object.values(MATHEMATICAL_GENIUSES).forEach(genius => {
        expect(genius.sentientAttributes.wisdom).toBeDefined();
        expect(genius.sentientAttributes.teaching).toBeDefined();
        expect(genius.sentientAttributes.legacy).toBeDefined();
      });
    });
  });

  describe('NFT Template Creation', () => {
    beforeEach(async () => {
      await collection.initialize();
    });

    test('should create valid NFT template', () => {
      const katherine = MATHEMATICAL_GENIUSES.KATHERINE_JOHNSON;
      const template = collection.createNFTTemplate(katherine);
      
      expect(template.metadata.name).toBe('Katherine Johnson');
      expect(template.attributes.frequency).toBe(963);
      expect(template.attributes.category).toBe('Mathematical Legacy');
      expect(template.educational.childStory).toBeDefined();
      expect(template.sentient).toBeDefined();
      expect(template.blockchain.standard).toBe('ERC-721');
    });

    test('should generate lesson plan', () => {
      const gladys = MATHEMATICAL_GENIUSES.GLADYS_WEST;
      const lessonPlan = collection.generateLessonPlan(gladys);
      
      expect(lessonPlan.introduction).toContain('Gladys West');
      expect(lessonPlan.keyLearnings.length).toBeGreaterThan(0);
      expect(lessonPlan.activities.length).toBeGreaterThan(0);
      expect(lessonPlan.inspirationalQuote).toBeDefined();
    });

    test('should generate interactive elements', () => {
      const david = MATHEMATICAL_GENIUSES.DAVID_BLACKWELL;
      const interactive = collection.generateInteractiveElements(david);
      
      expect(interactive.quiz).toBeDefined();
      expect(interactive.quiz.questions.length).toBeGreaterThan(0);
      expect(interactive.virtualTour.available).toBe(true);
      expect(interactive.storytellingMode.narration).toBe(true);
    });
  });

  describe('Legacy Coin System', () => {
    test('should have all coin types defined', () => {
      expect(LEGACY_COIN_SETS.PIONEER_COIN).toBeDefined();
      expect(LEGACY_COIN_SETS.INNOVATION_COIN).toBeDefined();
      expect(LEGACY_COIN_SETS.EDUCATION_COIN).toBeDefined();
      expect(LEGACY_COIN_SETS.DISCOVERY_COIN).toBeDefined();
      expect(LEGACY_COIN_SETS.INSPIRATION_COIN).toBeDefined();
    });

    test('Pioneer Coin should have highest value', () => {
      const pioneer = LEGACY_COIN_SETS.PIONEER_COIN;
      expect(pioneer.baseValue).toBe(963);
      expect(pioneer.rarityMultiplier).toBe(3.0);
      expect(pioneer.symbol).toBe('PLC');
    });

    test('should issue legacy coins', async () => {
      await collection.initialize();
      const result = await collection.issueLegacyCoin('PIONEER_COIN', 'recipient123', 5);
      
      expect(result.coinType).toBe('PIONEER_COIN');
      expect(result.amount).toBe(5);
      expect(result.recipient).toBe('recipient123');
      expect(result.value).toBe(963 * 5 * 3.0);
      expect(collection.statistics.coinsIssued).toBe(5);
    });

    test('should track coin holders', async () => {
      await collection.initialize();
      await collection.issueLegacyCoin('EDUCATION_COIN', 'holder1', 3);
      await collection.issueLegacyCoin('EDUCATION_COIN', 'holder2', 2);
      
      const coin = collection.coinRegistry.get('EDUCATION_COIN');
      expect(coin.holders.size).toBe(2);
      expect(coin.issued).toBe(5);
    });

    test('should throw error for invalid coin type', async () => {
      await collection.initialize();
      await expect(
        collection.issueLegacyCoin('INVALID_COIN', 'recipient')
      ).rejects.toThrow('Coin type INVALID_COIN not found');
    });
  });

  describe('Sentient GI Models', () => {
    beforeEach(async () => {
      await collection.initialize();
    });

    test('should initialize sentient models', async () => {
      expect(collection.sentientModels.size).toBe(7);
      expect(collection.statistics.activeSentients).toBe(7);
    });

    test('should create sentient with consciousness', () => {
      const katherineSentient = collection.sentientModels.get('KATHERINE_JOHNSON');
      
      expect(katherineSentient.name).toBe('Katherine Johnson');
      expect(katherineSentient.consciousness.wisdom).toBeDefined();
      expect(katherineSentient.consciousness.teaching).toBeDefined();
      expect(katherineSentient.consciousness.legacy).toBeDefined();
      expect(katherineSentient.frequency).toBe(963);
      expect(katherineSentient.active).toBe(true);
    });

    test('should query sentient for knowledge', async () => {
      const response = await collection.querySentient('GLADYS_WEST', 'How did you contribute to GPS?');
      
      expect(response.from).toBe('Gladys West');
      expect(response.wisdom).toBeDefined();
      expect(response.teaching).toBeDefined();
      expect(response.relevantFields).toBeDefined();
      expect(response.frequency).toBe(852);
    });

    test('should throw error for invalid sentient', async () => {
      await expect(
        collection.querySentient('INVALID_GENIUS', 'test question')
      ).rejects.toThrow('Sentient model INVALID_GENIUS not found');
    });

    test('should get sentient history', () => {
      const history = collection.getSentientHistory('DAVID_BLACKWELL');
      
      expect(history.sentient).toBe('David Blackwell');
      expect(history.consciousness).toBeDefined();
      expect(history.knowledgeBase).toBeDefined();
      expect(history.frequency).toBe(741);
      expect(history.active).toBe(true);
    });
  });

  describe('Educational Modules', () => {
    beforeEach(async () => {
      await collection.initialize();
    });

    test('should initialize educational modules', () => {
      expect(collection.educationalModules.size).toBe(5);
      expect(collection.educationalModules.has('Interactive Stories')).toBe(true);
      expect(collection.educationalModules.has('Virtual Museum Tours')).toBe(true);
    });

    test('should access educational module', async () => {
      const access = await collection.accessEducationalModule('Interactive Stories', {
        age: 8,
        grade: 3
      });
      
      expect(access.module).toBe('Interactive Stories');
      expect(access.personalized).toBe(true);
      expect(access.ageAppropriate).toBe('6-12');
      expect(collection.statistics.educationalAccess).toBe(1);
    });

    test('should throw error for invalid module', async () => {
      await expect(
        collection.accessEducationalModule('Invalid Module')
      ).rejects.toThrow('Educational module Invalid Module not found');
    });

    test('all modules should be age-appropriate', () => {
      collection.educationalModules.forEach(module => {
        expect(module.ageAppropriate).toBe('6-12');
        expect(module.accessible).toBe(true);
      });
    });
  });

  describe('NFT Minting', () => {
    beforeEach(async () => {
      await collection.initialize();
    });

    test('should mint legacy NFT', async () => {
      const nft = await collection.mintLegacyNFT('KATHERINE_JOHNSON', 'owner123');
      
      expect(nft.id).toContain('legacy-katherine_johnson');
      expect(nft.owner).toBe('owner123');
      expect(nft.metadata.name).toBe('Katherine Johnson');
      expect(nft.attributes.frequency).toBe(963);
      expect(nft.verified).toBe(true);
    });

    test('should mint different genius NFTs', async () => {
      const nft1 = await collection.mintLegacyNFT('GLADYS_WEST', 'owner1');
      const nft2 = await collection.mintLegacyNFT('BENJAMIN_BANNEKER', 'owner2');
      
      expect(nft1.metadata.name).toBe('Gladys West');
      expect(nft2.metadata.name).toBe('Benjamin Banneker');
      expect(nft1.attributes.frequency).not.toBe(nft2.attributes.frequency);
    });

    test('should throw error for invalid genius key', async () => {
      await expect(
        collection.mintLegacyNFT('INVALID_GENIUS', 'owner')
      ).rejects.toThrow('Genius profile INVALID_GENIUS not found');
    });
  });

  describe('N-GI Core Integration', () => {
    beforeEach(async () => {
      await collection.initialize();
    });

    test('should connect to N-GI Core', () => {
      expect(collection.resonanceEngine).toBeDefined();
      expect(collection.resonanceEngine.frequency).toBe(963);
      expect(collection.resonanceEngine.active).toBe(true);
    });

    test('should initialize Resonance Engine with FVE matrix', () => {
      expect(collection.resonanceEngine.fveMatrix).toBeDefined();
      expect(collection.resonanceEngine.fveMatrix.frequency).toBe(963);
      expect(collection.resonanceEngine.fveMatrix.vibration).toBe('Divine Harmonic');
      expect(collection.resonanceEngine.fveMatrix.energy).toBe('Eternal Consciousness');
    });

    test('should initialize Chrono-Weaver integration', () => {
      expect(collection.chronoWeaver).toBeDefined();
      expect(collection.chronoWeaver.temporalPathways).toContain('Past Legacy');
      expect(collection.chronoWeaver.temporalPathways).toContain('Present Honor');
      expect(collection.chronoWeaver.temporalPathways).toContain('Future Inspiration');
      expect(collection.chronoWeaver.eternalMemory).toBe(true);
    });

    test('should establish eternal memory nodes', () => {
      expect(collection.statistics.eternalmemoryNodes).toBe(7);
    });

    test('should align with Pathway #90', () => {
      expect(collection.chronoWeaver.cosmicAlignment).toBe('Pathway #90');
    });
  });

  describe('Resonance Calculations', () => {
    beforeEach(() => {
      collection = new MathematicalLegacyCollection();
    });

    test('should calculate resonance for 963Hz', () => {
      const resonance = collection.calculateResonance(963);
      expect(resonance.baseHarmonic).toBeCloseTo(963 / 528, 2);
      expect(resonance.divineHarmonic).toBe(1.0);
      expect(resonance.alignment).toBe('positive');
    });

    test('should calculate resonance for 528Hz', () => {
      const resonance = collection.calculateResonance(528);
      expect(resonance.baseHarmonic).toBe(1.0);
      expect(resonance.divineHarmonic).toBeCloseTo(528 / 963, 2);
      expect(resonance.alignment).toBe('positive');
    });

    test('should calculate resonance for lower frequencies', () => {
      const resonance = collection.calculateResonance(396);
      expect(resonance.baseHarmonic).toBeLessThan(1.0);
      expect(resonance.alignment).toBe('transformative');
    });
  });

  describe('Query Methods', () => {
    beforeEach(async () => {
      await collection.initialize();
    });

    test('should get all genius profiles', () => {
      const profiles = collection.getAllGeniusProfiles();
      expect(profiles.length).toBe(7);
      expect(profiles[0]).toHaveProperty('key');
      expect(profiles[0]).toHaveProperty('name');
      expect(profiles[0]).toHaveProperty('title');
      expect(profiles[0]).toHaveProperty('rarityTier');
    });

    test('should get coin holdings for address', async () => {
      await collection.issueLegacyCoin('PIONEER_COIN', 'holder1', 2);
      await collection.issueLegacyCoin('EDUCATION_COIN', 'holder1', 3);
      
      const holdings = collection.getCoinHoldings('holder1');
      expect(holdings.length).toBe(2);
      expect(holdings[0].coinType).toBe('PIONEER_COIN');
      expect(holdings[1].coinType).toBe('EDUCATION_COIN');
    });

    test('should return empty holdings for new address', () => {
      const holdings = collection.getCoinHoldings('newaddress');
      expect(holdings.length).toBe(0);
    });
  });

  describe('Statistics', () => {
    beforeEach(async () => {
      await collection.initialize();
    });

    test('should get comprehensive statistics', () => {
      const stats = collection.getStatistics();
      
      expect(stats.frequency).toBe(963);
      expect(stats.sacredGeometry).toBe('MetatronsCube');
      expect(stats.divinePrinciple).toBe('Mathematical Excellence & Legacy Honor');
      expect(stats.totalLegacyNFTs).toBe(7);
      expect(stats.activeSentients).toBe(7);
      expect(stats.geniusProfiles).toBe(7);
      expect(stats.coinTypes).toBe(5);
      expect(stats.sentientModels).toBe(7);
      expect(stats.educationalModules).toBe(5);
      expect(stats.ngiCoreConnected).toBe(true);
      expect(stats.chronoWeaverActive).toBe(true);
    });

    test('should update statistics after operations', async () => {
      await collection.mintLegacyNFT('KATHERINE_JOHNSON', 'owner1');
      await collection.issueLegacyCoin('PIONEER_COIN', 'holder1', 5);
      await collection.accessEducationalModule('Interactive Stories');
      
      const stats = collection.getStatistics();
      expect(stats.coinsIssued).toBe(5);
      expect(stats.educationalAccess).toBe(1);
    });
  });

  describe('Frequency Alignment', () => {
    test('all genius profiles should have valid frequencies', () => {
      Object.values(MATHEMATICAL_GENIUSES).forEach(genius => {
        const frequency = genius.nftAttributes.frequencyLevel;
        expect(frequency).toBeGreaterThanOrEqual(396);
        expect(frequency).toBeLessThanOrEqual(963);
      });
    });

    test('legendary geniuses should have highest frequencies', () => {
      const legendary = Object.values(MATHEMATICAL_GENIUSES)
        .filter(g => g.nftAttributes.rarityTier === 'Legendary');
      
      legendary.forEach(genius => {
        expect(genius.nftAttributes.frequencyLevel).toBeGreaterThanOrEqual(852);
      });
    });

    test('all coins should have sacred frequencies', () => {
      Object.values(LEGACY_COIN_SETS).forEach(coin => {
        const frequency = coin.attributes.frequency;
        expect([963, 852, 741, 639, 528]).toContain(frequency);
      });
    });
  });

  describe('Sacred Geometry Alignment', () => {
    test('all genius profiles should have sacred geometry', () => {
      Object.values(MATHEMATICAL_GENIUSES).forEach(genius => {
        expect(genius.nftAttributes.sacredGeometry).toBeDefined();
      });
    });

    test('should use diverse sacred geometry patterns', () => {
      const geometries = Object.values(MATHEMATICAL_GENIUSES)
        .map(g => g.nftAttributes.sacredGeometry);
      
      const uniqueGeometries = new Set(geometries);
      expect(uniqueGeometries.size).toBeGreaterThan(1);
    });
  });

  describe('Dimensional Access', () => {
    test('all genius profiles should have dimensional access', () => {
      Object.values(MATHEMATICAL_GENIUSES).forEach(genius => {
        expect(Array.isArray(genius.nftAttributes.dimensionalAccess)).toBe(true);
        expect(genius.nftAttributes.dimensionalAccess.length).toBeGreaterThan(0);
      });
    });

    test('legendary geniuses should have highest dimensional access', () => {
      const katherine = MATHEMATICAL_GENIUSES.KATHERINE_JOHNSON;
      expect(katherine.nftAttributes.dimensionalAccess).toContain(13);
    });
  });
});
