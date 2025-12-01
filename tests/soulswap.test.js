/**
 * SOULSWAP Tests
 */

const SoulSwap = require('../src/soulswap/soulswap');

describe('SoulSwap', () => {
  let soulswap;

  beforeEach(async () => {
    soulswap = new SoulSwap({ frequency: 528 });
    await soulswap.initialize();
    await soulswap.deploy();
  });

  test('should create soulswap instance', () => {
    expect(soulswap).toBeDefined();
    expect(soulswap.deployed).toBe(true);
  });

  test('should mint soul bound token', async () => {
    const token = await soulswap.mintSoulBoundToken('owner-123', { name: 'Test Token' });
    
    expect(token).toBeDefined();
    expect(token.owner).toBe('owner-123');
    expect(token.bound).toBe(true);
    expect(token.stage).toBe(0);
    expect(token.stageName).toBe('Genesis');
  });

  test('should fail to mint without deployment', async () => {
    const newSoulswap = new SoulSwap({ frequency: 528 });
    await newSoulswap.initialize();
    
    await expect(newSoulswap.mintSoulBoundToken('owner', {})).rejects.toThrow('SOULSWAP must be deployed before minting');
  });

  test('should generate proof of sovereignty', async () => {
    const token = await soulswap.mintSoulBoundToken('owner-123', {});
    const proof = await soulswap.generateProofOfSovereignty(token.id, {
      consciousnessLevel: 3,
      alignmentScore: 50
    });

    expect(proof).toBeDefined();
    expect(proof.tokenId).toBe(token.id);
    expect(proof.consciousnessLevel).toBe(3);
  });

  test('should evolve token when threshold reached', async () => {
    const token = await soulswap.mintSoulBoundToken('owner-123', {});
    
    // Add enough points to evolve
    await soulswap.generateProofOfSovereignty(token.id, {
      alignmentScore: 150
    });

    const updatedToken = soulswap.getToken(token.id);
    expect(updatedToken.stage).toBe(1);
    expect(updatedToken.stageName).toBe('Awakened');
  });

  test('should get tokens by owner', async () => {
    await soulswap.mintSoulBoundToken('owner-123', { name: 'Token 1' });
    await soulswap.mintSoulBoundToken('owner-123', { name: 'Token 2' });
    await soulswap.mintSoulBoundToken('owner-456', { name: 'Token 3' });

    const tokens = soulswap.getTokensByOwner('owner-123');
    expect(tokens.length).toBe(2);
  });

  test('should return correct status', () => {
    const status = soulswap.getStatus();
    
    expect(status.initialized).toBe(true);
    expect(status.deployed).toBe(true);
    expect(status.config.stages.length).toBe(5);
  });
});
