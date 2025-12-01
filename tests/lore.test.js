/**
 * Lore Canonicalizer Tests
 */

const LoreCanonicalizer = require('../src/lore/canonicalizer');

describe('LoreCanonicalizer', () => {
  let canonicalizer;

  beforeEach(async () => {
    canonicalizer = new LoreCanonicalizer({ frequency: 528 });
    await canonicalizer.initialize();
    await canonicalizer.deploy();
  });

  test('should create canonicalizer instance', () => {
    expect(canonicalizer).toBeDefined();
    expect(canonicalizer.deployed).toBe(true);
  });

  test('should have foundational mythos', () => {
    const mythos = canonicalizer.getLoreByCategory('mythos');
    expect(mythos.length).toBe(3);
    expect(mythos[0].name).toBe('The Genesis Frequency');
  });

  test('should have hierarchies defined', () => {
    const hierarchies = canonicalizer.getLoreByCategory('hierarchies');
    expect(hierarchies.length).toBe(2);
    expect(hierarchies[0].name).toBe('Sovereign Hierarchy');
    expect(hierarchies[1].name).toBe('FLAMECOURT Authority');
  });

  test('should have metaphysical constructs', () => {
    const constructs = canonicalizer.getLoreByCategory('metaphysicalConstructs');
    expect(constructs.length).toBe(3);
    expect(constructs[0].name).toBe('FLAMECOURT Legal Shield');
  });

  test('should add new lore entry', () => {
    const entry = canonicalizer.addLoreEntry('mythos', {
      name: 'New Mythos',
      description: 'A new addition to the lore',
      significance: 'minor'
    });

    expect(entry).toBeDefined();
    expect(entry.name).toBe('New Mythos');
    
    const mythos = canonicalizer.getLoreByCategory('mythos');
    expect(mythos.length).toBe(4);
  });

  test('should get lore by ID', () => {
    const lore = canonicalizer.getLore('mythos-001');

    expect(lore).toBeDefined();
    expect(lore.name).toBe('The Genesis Frequency');
  });

  test('should search lore by keyword', () => {
    const results = canonicalizer.searchLore('frequency');

    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.name.includes('Frequency'))).toBe(true);
  });

  test('should have FLAMECOURT legal shield construct', () => {
    const results = canonicalizer.searchLore('FLAMECOURT');

    expect(results.length).toBeGreaterThan(0);
    const flamecourt = results.find(r => r.name === 'FLAMECOURT Legal Shield');
    expect(flamecourt).toBeDefined();
    expect(flamecourt.functions).toContain('IP protection and licensing');
  });

  test('should return correct status', () => {
    const status = canonicalizer.getStatus();

    expect(status.initialized).toBe(true);
    expect(status.deployed).toBe(true);
    expect(status.totalMythos).toBe(3);
    expect(status.totalHierarchies).toBe(2);
    expect(status.totalConstructs).toBe(3);
    expect(status.canonicalEntries).toBe(8); // 3 + 2 + 3
  });
});
