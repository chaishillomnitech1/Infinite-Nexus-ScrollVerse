/**
 * Tests for Neo4j Lineage Structures
 * Testing graph-based sovereignty and lineage tracking
 */

const {
  Neo4jLineageManager,
  NODE_TYPES,
  RELATIONSHIP_TYPES
} = require('../src/neo4j-lineage');

describe('Neo4j Lineage Manager', () => {
  let manager;

  beforeEach(async () => {
    manager = new Neo4jLineageManager({
      host: 'localhost',
      port: 7687,
      username: 'neo4j',
      password: 'scrollverse',
      database: 'scrollverse'
    });
    await manager.initialize();
  });

  afterEach(async () => {
    await manager.clearAll();
  });

  describe('Initialization', () => {
    test('should initialize in-memory mode', () => {
      const status = manager.getStatus();
      
      expect(status.connected).toBe(true);
      expect(status.mode).toBe('in-memory');
      expect(status.database).toBe('scrollverse');
    });

    test('should create indexes', () => {
      const status = manager.getStatus();
      expect(status.nodes.total).toBe(0);
      expect(status.relationships).toBe(0);
    });
  });

  describe('Node Creation', () => {
    test('should create sovereign node', async () => {
      const sovereign = await manager.createSovereign({
        address: '0x1234567890abcdef',
        name: 'Test Sovereign',
        sovereigntyScore: 100,
        frequency: 528
      });
      
      expect(sovereign.type).toBe(NODE_TYPES.SOVEREIGN);
      expect(sovereign.properties.address).toBe('0x1234567890abcdef');
      expect(sovereign.properties.sovereignty_score).toBe(100);
    });

    test('should create scroll node', async () => {
      const scroll = await manager.createScroll({
        scrollId: 'SCROLL-001',
        title: 'Genesis Scroll',
        content: 'Sacred text',
        frequency: 528
      });
      
      expect(scroll.type).toBe(NODE_TYPES.SCROLL);
      expect(scroll.properties.scroll_id).toBe('SCROLL-001');
    });

    test('should create NFT node', async () => {
      const nft = await manager.createNFT({
        tokenId: '1',
        contractAddress: '0xabcdef',
        metadataUri: 'ipfs://...',
        tier: 'GOLD'
      });
      
      expect(nft.type).toBe(NODE_TYPES.NFT);
      expect(nft.properties.token_id).toBe('1');
      expect(nft.properties.tier).toBe('GOLD');
    });

    test('should create decree node', async () => {
      const decree = await manager.createDecree({
        decreeId: 'VD-001',
        type: 'affirmation',
        content: 'I am sovereign',
        frequency: 528,
        resonance: 0.95
      });
      
      expect(decree.type).toBe(NODE_TYPES.DECREE);
      expect(decree.properties.decree_id).toBe('VD-001');
    });

    test('should create anchor node', async () => {
      const anchor = await manager.createAnchor({
        anchorId: 'TSA-001',
        frequency: 528,
        grounded: true,
        stability: 1.0
      });
      
      expect(anchor.type).toBe(NODE_TYPES.ANCHOR);
      expect(anchor.properties.anchor_id).toBe('TSA-001');
    });

    test('should generate unique node IDs', async () => {
      const node1 = await manager.createNode(NODE_TYPES.SCROLL, { title: 'A' });
      const node2 = await manager.createNode(NODE_TYPES.SCROLL, { title: 'B' });
      
      expect(node1.id).not.toBe(node2.id);
    });

    test('should add timestamps to nodes', async () => {
      const node = await manager.createSovereign({
        address: '0x123',
        name: 'Test'
      });
      
      expect(node.properties.createdAt).toBeDefined();
      expect(node.properties.updatedAt).toBeDefined();
    });

    test('should update node creation metrics', async () => {
      await manager.createSovereign({ address: '0x1', name: 'S1' });
      await manager.createSovereign({ address: '0x2', name: 'S2' });
      
      const metrics = manager.getMetrics();
      expect(metrics.nodesCreated).toBe(2);
    });

    test('should throw error for invalid node type', async () => {
      await expect(
        manager.createNode('INVALID_TYPE', {})
      ).rejects.toThrow('Invalid node type');
    });
  });

  describe('Relationship Creation', () => {
    test('should create relationship between nodes', async () => {
      const sovereign = await manager.createSovereign({
        address: '0x123',
        name: 'Owner'
      });
      
      const nft = await manager.createNFT({
        tokenId: '1',
        contractAddress: '0xabc'
      });
      
      const rel = await manager.createRelationship(
        sovereign.id,
        nft.id,
        RELATIONSHIP_TYPES.OWNS
      );
      
      expect(rel.type).toBe(RELATIONSHIP_TYPES.OWNS);
      expect(rel.from).toBe(sovereign.id);
      expect(rel.to).toBe(nft.id);
    });

    test('should add properties to relationships', async () => {
      const node1 = await manager.createSovereign({ address: '0x1', name: 'S1' });
      const node2 = await manager.createSovereign({ address: '0x2', name: 'S2' });
      
      const rel = await manager.createRelationship(
        node1.id,
        node2.id,
        RELATIONSHIP_TYPES.LINKED_TO,
        { strength: 0.8 }
      );
      
      expect(rel.properties.strength).toBe(0.8);
      expect(rel.properties.createdAt).toBeDefined();
    });

    test('should create lineage chain', async () => {
      const node1 = await manager.createScroll({ scrollId: 'S1', title: 'V1' });
      const node2 = await manager.createScroll({ scrollId: 'S2', title: 'V2' });
      const node3 = await manager.createScroll({ scrollId: 'S3', title: 'V3' });
      
      const chain = await manager.createLineageChain(
        [node1.id, node2.id, node3.id],
        RELATIONSHIP_TYPES.EVOLVED_FROM
      );
      
      expect(chain.length).toBe(2);
      expect(chain[0].type).toBe(RELATIONSHIP_TYPES.EVOLVED_FROM);
    });

    test('should update relationship creation metrics', async () => {
      const node1 = await manager.createSovereign({ address: '0x1', name: 'S1' });
      const node2 = await manager.createSovereign({ address: '0x2', name: 'S2' });
      
      await manager.createRelationship(
        node1.id,
        node2.id,
        RELATIONSHIP_TYPES.LINKED_TO
      );
      
      const metrics = manager.getMetrics();
      expect(metrics.relationshipsCreated).toBe(1);
    });

    test('should throw error for invalid relationship type', async () => {
      const node1 = await manager.createSovereign({ address: '0x1', name: 'S1' });
      const node2 = await manager.createSovereign({ address: '0x2', name: 'S2' });
      
      await expect(
        manager.createRelationship(node1.id, node2.id, 'INVALID_TYPE')
      ).rejects.toThrow('Invalid relationship type');
    });

    test('should throw error when nodes not found', async () => {
      await expect(
        manager.createRelationship('non-existent-1', 'non-existent-2', RELATIONSHIP_TYPES.OWNS)
      ).rejects.toThrow('One or both nodes not found');
    });
  });

  describe('Querying', () => {
    test('should query nodes by type', async () => {
      await manager.createSovereign({ address: '0x1', name: 'S1' });
      await manager.createSovereign({ address: '0x2', name: 'S2' });
      await manager.createScroll({ scrollId: 'SC1', title: 'T1' });
      
      const sovereigns = await manager.queryNodesByType(NODE_TYPES.SOVEREIGN);
      expect(sovereigns.length).toBe(2);
    });

    test('should query node by ID', async () => {
      const sovereign = await manager.createSovereign({
        address: '0x123',
        name: 'Test'
      });
      
      const found = await manager.queryNodeById(sovereign.id);
      expect(found).toBeDefined();
      expect(found.id).toBe(sovereign.id);
    });

    test('should return null for non-existent node', async () => {
      const found = await manager.queryNodeById('non-existent');
      expect(found).toBeNull();
    });

    test('should query outgoing relationships', async () => {
      const sovereign = await manager.createSovereign({ address: '0x1', name: 'S1' });
      const nft1 = await manager.createNFT({ tokenId: '1', contractAddress: '0xa' });
      const nft2 = await manager.createNFT({ tokenId: '2', contractAddress: '0xb' });
      
      await manager.createRelationship(sovereign.id, nft1.id, RELATIONSHIP_TYPES.OWNS);
      await manager.createRelationship(sovereign.id, nft2.id, RELATIONSHIP_TYPES.OWNS);
      
      const rels = await manager.queryRelationships(sovereign.id, 'outgoing');
      expect(rels.length).toBe(2);
    });

    test('should query incoming relationships', async () => {
      const sovereign = await manager.createSovereign({ address: '0x1', name: 'S1' });
      const nft = await manager.createNFT({ tokenId: '1', contractAddress: '0xa' });
      
      await manager.createRelationship(sovereign.id, nft.id, RELATIONSHIP_TYPES.OWNS);
      
      const rels = await manager.queryRelationships(nft.id, 'incoming');
      expect(rels.length).toBe(1);
    });

    test('should query all relationships', async () => {
      const node1 = await manager.createSovereign({ address: '0x1', name: 'S1' });
      const node2 = await manager.createSovereign({ address: '0x2', name: 'S2' });
      const node3 = await manager.createSovereign({ address: '0x3', name: 'S3' });
      
      await manager.createRelationship(node1.id, node2.id, RELATIONSHIP_TYPES.LINKED_TO);
      await manager.createRelationship(node3.id, node2.id, RELATIONSHIP_TYPES.LINKED_TO);
      
      const rels = await manager.queryRelationships(node2.id, 'both');
      expect(rels.length).toBe(2);
    });

    test('should update query metrics', async () => {
      const node = await manager.createSovereign({ address: '0x1', name: 'S1' });
      await manager.queryNodeById(node.id);
      await manager.queryNodesByType(NODE_TYPES.SOVEREIGN);
      
      const metrics = manager.getMetrics();
      expect(metrics.queriesExecuted).toBe(2);
    });
  });

  describe('Lineage Traversal', () => {
    test('should traverse lineage graph', async () => {
      const node1 = await manager.createSovereign({ address: '0x1', name: 'S1' });
      const node2 = await manager.createScroll({ scrollId: 'SC1', title: 'T1' });
      const node3 = await manager.createNFT({ tokenId: '1', contractAddress: '0xa' });
      
      await manager.createRelationship(node1.id, node2.id, RELATIONSHIP_TYPES.CREATED);
      await manager.createRelationship(node2.id, node3.id, RELATIONSHIP_TYPES.LINKED_TO);
      
      const lineage = await manager.traverseLineage(node1.id, 5);
      
      expect(lineage.length).toBeGreaterThan(0);
      expect(lineage[0].node.id).toBe(node1.id);
      expect(lineage[0].depth).toBe(0);
    });

    test('should respect depth limit', async () => {
      const nodes = [];
      for (let i = 0; i < 5; i++) {
        nodes.push(await manager.createSovereign({ address: `0x${i}`, name: `S${i}` }));
      }
      
      for (let i = 0; i < nodes.length - 1; i++) {
        await manager.createRelationship(
          nodes[i].id,
          nodes[i + 1].id,
          RELATIONSHIP_TYPES.LINKED_TO
        );
      }
      
      const lineage = await manager.traverseLineage(nodes[0].id, 2);
      const maxDepth = Math.max(...lineage.map(l => l.depth));
      
      expect(maxDepth).toBeLessThanOrEqual(2);
    });

    test('should avoid cycles in traversal', async () => {
      const node1 = await manager.createSovereign({ address: '0x1', name: 'S1' });
      const node2 = await manager.createSovereign({ address: '0x2', name: 'S2' });
      
      await manager.createRelationship(node1.id, node2.id, RELATIONSHIP_TYPES.LINKED_TO);
      await manager.createRelationship(node2.id, node1.id, RELATIONSHIP_TYPES.LINKED_TO);
      
      const lineage = await manager.traverseLineage(node1.id, 10);
      
      // Should not infinite loop, should visit each node once
      expect(lineage.length).toBeLessThanOrEqual(2);
    });

    test('should update traversal metrics', async () => {
      const node = await manager.createSovereign({ address: '0x1', name: 'S1' });
      await manager.traverseLineage(node.id, 5);
      
      const metrics = manager.getMetrics();
      expect(metrics.traversalsCompleted).toBe(1);
    });
  });

  describe('Sovereignty Chain', () => {
    test('should find sovereignty chain for address', async () => {
      const sovereign = await manager.createSovereign({
        address: '0x123',
        name: 'Test Sovereign',
        sovereigntyScore: 100
      });
      
      const scroll = await manager.createScroll({
        scrollId: 'SC1',
        title: 'Genesis'
      });
      
      await manager.createRelationship(
        sovereign.id,
        scroll.id,
        RELATIONSHIP_TYPES.CREATED
      );
      
      const chain = await manager.findSovereigntyChain('0x123');
      
      expect(chain).toBeDefined();
      expect(chain.sovereign.properties.address).toBe('0x123');
      expect(chain.totalNodes).toBeGreaterThan(0);
    });

    test('should return null for non-existent sovereign', async () => {
      const chain = await manager.findSovereigntyChain('0xNONEXISTENT');
      expect(chain).toBeNull();
    });

    test('should count node types in chain', async () => {
      const sovereign = await manager.createSovereign({
        address: '0x123',
        name: 'Test'
      });
      
      const scroll = await manager.createScroll({ scrollId: 'SC1', title: 'S1' });
      const nft = await manager.createNFT({ tokenId: '1', contractAddress: '0xa' });
      
      await manager.createRelationship(sovereign.id, scroll.id, RELATIONSHIP_TYPES.CREATED);
      await manager.createRelationship(sovereign.id, nft.id, RELATIONSHIP_TYPES.OWNS);
      
      const chain = await manager.findSovereigntyChain('0x123');
      
      expect(chain.types[NODE_TYPES.SOVEREIGN]).toBe(1);
      expect(chain.types[NODE_TYPES.SCROLL]).toBe(1);
      expect(chain.types[NODE_TYPES.NFT]).toBe(1);
    });
  });

  describe('Scalability Metrics', () => {
    test('should calculate sovereign scalability metrics', async () => {
      const sovereign = await manager.createSovereign({
        address: '0x123',
        name: 'Test',
        sovereigntyScore: 85
      });
      
      const scroll = await manager.createScroll({ scrollId: 'SC1', title: 'S1' });
      await manager.createRelationship(sovereign.id, scroll.id, RELATIONSHIP_TYPES.CREATED);
      
      const metrics = await manager.getSovereignScalabilityMetrics('0x123');
      
      expect(metrics).toBeDefined();
      expect(metrics.address).toBe('0x123');
      expect(metrics.totalLineageNodes).toBeGreaterThan(0);
      expect(metrics.sovereigntyScore).toBe(85);
      expect(metrics.scalabilityFactor).toBeGreaterThanOrEqual(0);
    });

    test('should calculate scalability factor', async () => {
      const sovereign = await manager.createSovereign({
        address: '0x123',
        name: 'Test'
      });
      
      // Create a network
      for (let i = 0; i < 5; i++) {
        const node = await manager.createScroll({
          scrollId: `SC${i}`,
          title: `S${i}`
        });
        await manager.createRelationship(
          sovereign.id,
          node.id,
          RELATIONSHIP_TYPES.CREATED
        );
      }
      
      const metrics = await manager.getSovereignScalabilityMetrics('0x123');
      expect(metrics.scalabilityFactor).toBeGreaterThan(0);
    });

    test('should calculate network centrality', async () => {
      const sovereign = await manager.createSovereign({
        address: '0x123',
        name: 'Test'
      });
      
      const metrics = await manager.getSovereignScalabilityMetrics('0x123');
      expect(metrics.networkCentrality).toBeGreaterThanOrEqual(0);
      expect(metrics.networkCentrality).toBeLessThanOrEqual(1);
    });
  });

  describe('Cypher Export', () => {
    test('should export graph as Cypher queries', async () => {
      const sovereign = await manager.createSovereign({
        address: '0x123',
        name: 'Test'
      });
      
      const scroll = await manager.createScroll({
        scrollId: 'SC1',
        title: 'Genesis'
      });
      
      await manager.createRelationship(
        sovereign.id,
        scroll.id,
        RELATIONSHIP_TYPES.CREATED
      );
      
      const cypher = manager.exportAsCypher();
      
      expect(cypher).toContain('CREATE');
      expect(cypher).toContain('MATCH');
      expect(cypher).toContain(NODE_TYPES.SOVEREIGN);
      expect(cypher).toContain(NODE_TYPES.SCROLL);
    });

    test('should include node properties in export', async () => {
      await manager.createSovereign({
        address: '0x123',
        name: 'Test Sovereign'
      });
      
      const cypher = manager.exportAsCypher();
      expect(cypher).toContain('0x123');
      expect(cypher).toContain('Test Sovereign');
    });
  });

  describe('Status and Metrics', () => {
    test('should get comprehensive status', async () => {
      await manager.createSovereign({ address: '0x1', name: 'S1' });
      await manager.createScroll({ scrollId: 'SC1', title: 'T1' });
      
      const status = manager.getStatus();
      
      expect(status.connected).toBe(true);
      expect(status.nodes.total).toBe(2);
      expect(status.nodes.byType[NODE_TYPES.SOVEREIGN]).toBe(1);
      expect(status.nodes.byType[NODE_TYPES.SCROLL]).toBe(1);
    });

    test('should track all metrics', async () => {
      const node1 = await manager.createSovereign({ address: '0x1', name: 'S1' });
      const node2 = await manager.createScroll({ scrollId: 'SC1', title: 'T1' });
      
      await manager.createRelationship(node1.id, node2.id, RELATIONSHIP_TYPES.CREATED);
      await manager.queryNodeById(node1.id);
      await manager.traverseLineage(node1.id, 5);
      
      const metrics = manager.getMetrics();
      expect(metrics.nodesCreated).toBe(2);
      expect(metrics.relationshipsCreated).toBe(1);
      expect(metrics.queriesExecuted).toBeGreaterThan(0);
      expect(metrics.traversalsCompleted).toBe(1);
    });

    test('should get all nodes', () => {
      const allNodes = manager.getAllNodes();
      expect(Array.isArray(allNodes)).toBe(true);
    });

    test('should get all relationships', () => {
      const allRels = manager.getAllRelationships();
      expect(Array.isArray(allRels)).toBe(true);
    });
  });

  describe('Data Management', () => {
    test('should clear all data', async () => {
      await manager.createSovereign({ address: '0x1', name: 'S1' });
      await manager.createScroll({ scrollId: 'SC1', title: 'T1' });
      
      await manager.clearAll();
      
      const status = manager.getStatus();
      expect(status.nodes.total).toBe(0);
      expect(status.relationships).toBe(0);
    });
  });

  describe('Constants', () => {
    test('should have all node types defined', () => {
      expect(NODE_TYPES.SOVEREIGN).toBe('Sovereign');
      expect(NODE_TYPES.SCROLL).toBe('Scroll');
      expect(NODE_TYPES.NFT).toBe('NFT');
      expect(NODE_TYPES.DECREE).toBe('Decree');
      expect(NODE_TYPES.ANCHOR).toBe('Anchor');
    });

    test('should have all relationship types defined', () => {
      expect(RELATIONSHIP_TYPES.OWNS).toBe('OWNS');
      expect(RELATIONSHIP_TYPES.CREATED).toBe('CREATED');
      expect(RELATIONSHIP_TYPES.EVOLVED_FROM).toBe('EVOLVED_FROM');
    });
  });
});
