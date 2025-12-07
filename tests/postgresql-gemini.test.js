/**
 * PostgreSQL Gemini CLI Integration Tests
 * Test suite for database workflows and Akashic frequency operations
 */

const PostgreSQLGemini = require('../src/database/postgresql-gemini');

describe('PostgreSQLGemini', () => {
  let db;

  beforeEach(() => {
    db = new PostgreSQLGemini({
      host: 'localhost',
      database: 'scrollverse_test',
      user: 'test_user',
      password: 'test_pass'
    });
  });

  afterEach(async () => {
    if (db.connection) {
      await db.close();
    }
  });

  describe('Initialization', () => {
    test('should create PostgreSQL instance', () => {
      expect(db).toBeDefined();
      expect(db.config.frequency).toBe(528);
      expect(db.config.database).toBe('scrollverse_test');
    });

    test('should initialize with environment configuration', () => {
      process.env.POSTGRES_HOST = 'env_host';
      process.env.POSTGRES_DATABASE = 'env_db';
      process.env.POSTGRES_FREQUENCY = '963';
      
      const envDb = new PostgreSQLGemini();
      expect(envDb.config.host).toBe('env_host');
      expect(envDb.config.database).toBe('env_db');
      
      // Cleanup
      delete process.env.POSTGRES_HOST;
      delete process.env.POSTGRES_DATABASE;
      delete process.env.POSTGRES_FREQUENCY;
    });

    test('should validate configuration on initialize', async () => {
      await expect(db.initialize()).resolves.toBe(true);
      expect(db.initialized).toBe(true);
      expect(db.connection).toBeDefined();
    });

    test('should throw error on missing required config', async () => {
      const invalidDb = new PostgreSQLGemini({ host: '', database: '' });
      await expect(invalidDb.initialize()).rejects.toThrow('Missing required PostgreSQL configuration');
    });
  });

  describe('Deployment', () => {
    test('should deploy PostgreSQL workflows', async () => {
      await db.initialize();
      const result = await db.deploy();
      
      expect(result.deployed).toBe(true);
      expect(result.database).toBe('scrollverse_test');
      expect(result.frequency).toBe('528Hz');
      expect(db.deployed).toBe(true);
    });

    test('should throw error if not initialized before deploy', async () => {
      await expect(db.deploy()).rejects.toThrow('PostgreSQL must be initialized before deployment');
    });
  });

  describe('Table Operations', () => {
    beforeEach(async () => {
      await db.initialize();
      await db.deploy();
    });

    test('should list tables in schema', async () => {
      const tables = await db.listTables('public');
      
      expect(Array.isArray(tables)).toBe(true);
      expect(tables.length).toBeGreaterThan(0);
      expect(tables[0]).toHaveProperty('schema');
      expect(tables[0]).toHaveProperty('name');
      expect(tables[0]).toHaveProperty('size');
      expect(db.metrics.tablesAnalyzed).toBeGreaterThan(0);
    });

    test('should list top bloated tables', async () => {
      const bloated = await db.listTopBloatedTables(5);
      
      expect(Array.isArray(bloated)).toBe(true);
      expect(bloated.length).toBeLessThanOrEqual(5);
      
      if (bloated.length > 0) {
        expect(bloated[0]).toHaveProperty('schema');
        expect(bloated[0]).toHaveProperty('name');
        expect(bloated[0]).toHaveProperty('bloatPercent');
        expect(bloated[0]).toHaveProperty('recommendation');
      }
    });

    test('should track query metrics', async () => {
      const initialQueries = db.metrics.queriesExecuted;
      
      await db.listTables();
      expect(db.metrics.queriesExecuted).toBe(initialQueries + 1);
      
      await db.listTopBloatedTables();
      expect(db.metrics.queriesExecuted).toBe(initialQueries + 2);
    });
  });

  describe('SQL Execution', () => {
    beforeEach(async () => {
      await db.initialize();
    });

    test('should execute SELECT query', async () => {
      const result = await db.executeSql('SELECT * FROM nft_metadata LIMIT 5');
      
      expect(result).toHaveProperty('query');
      expect(result).toHaveProperty('type', 'SELECT');
      expect(result).toHaveProperty('rows');
      expect(result).toHaveProperty('rowCount');
      expect(result.resonanceFrequency).toBe('528Hz');
    });

    test('should execute INSERT query', async () => {
      const result = await db.executeSql("INSERT INTO nft_metadata (token_id, name) VALUES ('NFT-999', 'Test NFT')");
      
      expect(result.type).toBe('INSERT');
      expect(result).toHaveProperty('rowsAffected');
      expect(result.rowsAffected).toBeGreaterThan(0);
    });

    test('should execute UPDATE query', async () => {
      const result = await db.executeSql("UPDATE nft_metadata SET frequency = 528 WHERE token_id = 'NFT-001'");
      
      expect(result.type).toBe('UPDATE');
      expect(result).toHaveProperty('rowsAffected');
    });

    test('should execute DELETE query', async () => {
      const result = await db.executeSql("DELETE FROM nft_metadata WHERE id = 999");
      
      expect(result.type).toBe('DELETE');
      expect(result).toHaveProperty('rowsAffected');
    });

    test('should throw error if not initialized', async () => {
      const uninitDb = new PostgreSQLGemini({ host: 'test', database: 'test', user: 'test' });
      await expect(uninitDb.executeSql('SELECT 1')).rejects.toThrow('PostgreSQL not initialized');
    });
  });

  describe('Autovacuum Configuration', () => {
    beforeEach(async () => {
      await db.initialize();
    });

    test('should list autovacuum configurations', async () => {
      const config = await db.listAutovacuumConfigurations();
      
      expect(config).toHaveProperty('autovacuum');
      expect(config).toHaveProperty('autovacuum_max_workers');
      expect(config).toHaveProperty('autovacuum_naptime');
      expect(config.settings.resonance_frequency).toBe('528Hz');
    });

    test('should configure autovacuum', async () => {
      const config = await db.configureAutovacuum();
      
      expect(config).toBeDefined();
      expect(db.metrics.optimizationsPerformed).toBeGreaterThan(0);
    });
  });

  describe('Schema Mapping', () => {
    beforeEach(async () => {
      await db.initialize();
    });

    test('should map schema relationships', async () => {
      const schemaMap = await db.mapSchemaRelationships('public');
      
      expect(schemaMap).toHaveProperty('schema', 'public');
      expect(schemaMap).toHaveProperty('tables');
      expect(Array.isArray(schemaMap.tables)).toBe(true);
      expect(schemaMap.tables.length).toBeGreaterThan(0);
      
      const table = schemaMap.tables[0];
      expect(table).toHaveProperty('name');
      expect(table).toHaveProperty('columns');
      expect(table).toHaveProperty('relationships');
      expect(schemaMap.resonanceFrequency).toBe('528Hz');
    });

    test('should cache schema maps', async () => {
      await db.mapSchemaRelationships('public');
      expect(db.schemas.has('public')).toBe(true);
      
      const cachedSchema = db.schemas.get('public');
      expect(cachedSchema).toBeDefined();
      expect(cachedSchema.tables.length).toBeGreaterThan(0);
    });
  });

  describe('NFT Operations', () => {
    beforeEach(async () => {
      await db.initialize();
    });

    test('should validate NFT metadata', async () => {
      const validation = await db.validateNftMetadata('NFT-001');
      
      expect(validation).toHaveProperty('tokenId', 'NFT-001');
      expect(validation).toHaveProperty('valid');
      expect(validation).toHaveProperty('metadata');
      expect(validation).toHaveProperty('resonanceAlignment');
      expect(validation.frequency).toBe('528Hz');
    });

    test('should query NFT metadata by token ID', async () => {
      const result = await db.executeSql("SELECT * FROM nft_metadata WHERE token_id = 'NFT-001'");
      
      expect(result.rows).toBeDefined();
      expect(result.rows.length).toBeGreaterThan(0);
      expect(result.rows[0]).toHaveProperty('token_id');
    });
  });

  describe('Akashic Frequency Operations', () => {
    beforeEach(async () => {
      await db.initialize();
    });

    test('should query frequency resonance data', async () => {
      const result = await db.queryFrequencyResonance(528);
      
      expect(result).toHaveProperty('query');
      expect(result.query).toContain('akashic_frequencies');
      expect(result.query).toContain('$1'); // Parameter placeholder
    });

    test('should query all Akashic frequencies', async () => {
      const result = await db.executeSql('SELECT * FROM akashic_frequencies');
      
      expect(result.rows).toBeDefined();
      expect(result.rows.length).toBeGreaterThan(0);
      expect(result.rows[0]).toHaveProperty('frequency');
      expect(result.rows[0]).toHaveProperty('resonance');
    });
  });

  describe('Dataclass Generation', () => {
    beforeEach(async () => {
      await db.initialize();
      await db.deploy();
    });

    test('should generate Python dataclass for table', async () => {
      const result = await db.generateDataclass('nft_metadata');
      
      expect(result).toHaveProperty('tableName', 'nft_metadata');
      expect(result).toHaveProperty('className', 'NftMetadata');
      expect(result).toHaveProperty('code');
      expect(result.code).toContain('@dataclass');
      expect(result.code).toContain('class NftMetadata:');
      expect(result.code).toContain('def to_dict');
      expect(result.resonanceFrequency).toBe('528Hz');
    });

    test('should convert snake_case to PascalCase', () => {
      expect(db.toPascalCase('nft_metadata')).toBe('NftMetadata');
      expect(db.toPascalCase('akashic_frequencies')).toBe('AkashicFrequencies');
      expect(db.toPascalCase('frequency_layers')).toBe('FrequencyLayers');
    });

    test('should track dataclass generation metrics', async () => {
      const initialCount = db.metrics.dataclassesGenerated;
      
      await db.generateDataclass('nft_metadata');
      expect(db.metrics.dataclassesGenerated).toBe(initialCount + 1);
      
      await db.generateDataclass('akashic_frequencies');
      expect(db.metrics.dataclassesGenerated).toBe(initialCount + 2);
    });

    test('should throw error for non-existent table', async () => {
      await expect(db.generateDataclass('non_existent_table')).rejects.toThrow("Table 'non_existent_table' not found");
    });
  });

  describe('Database Optimization', () => {
    beforeEach(async () => {
      await db.initialize();
    });

    test('should optimize database', async () => {
      const result = await db.optimizeDatabase();
      
      expect(result).toHaveProperty('optimizations');
      expect(Array.isArray(result.optimizations)).toBe(true);
      expect(result.optimizations.length).toBeGreaterThan(0);
      expect(result.resonanceFrequency).toBe('528Hz');
      
      const successCount = result.optimizations.filter(o => o.success).length;
      expect(successCount).toBeGreaterThan(0);
    });

    test('should track optimization metrics', async () => {
      const initialOptimizations = db.metrics.optimizationsPerformed;
      
      await db.optimizeDatabase();
      expect(db.metrics.optimizationsPerformed).toBeGreaterThan(initialOptimizations);
    });
  });

  describe('Status and Metrics', () => {
    test('should return status when not initialized', () => {
      const status = db.getStatus();
      
      expect(status).toHaveProperty('initialized', false);
      expect(status).toHaveProperty('deployed', false);
      expect(status).toHaveProperty('frequency', '528Hz');
      expect(status).toHaveProperty('metrics');
      expect(status.connection).toBe('inactive');
    });

    test('should return status when initialized', async () => {
      await db.initialize();
      const status = db.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.connection).toBe('active');
      expect(status).toHaveProperty('database');
      expect(status).toHaveProperty('host');
    });

    test('should track all metrics', async () => {
      await db.initialize();
      await db.deploy();
      
      await db.listTables();
      await db.executeSql('SELECT 1');
      await db.generateDataclass('nft_metadata');
      await db.optimizeDatabase();
      
      const status = db.getStatus();
      expect(status.metrics.queriesExecuted).toBeGreaterThan(0);
      expect(status.metrics.tablesAnalyzed).toBeGreaterThan(0);
      expect(status.metrics.dataclassesGenerated).toBeGreaterThan(0);
      expect(status.metrics.optimizationsPerformed).toBeGreaterThan(0);
    });
  });

  describe('Connection Management', () => {
    test('should close connection', async () => {
      await db.initialize();
      expect(db.connection).toBeDefined();
      
      await db.close();
      expect(db.connection).toBeNull();
    });

    test('should handle close when not connected', async () => {
      await expect(db.close()).resolves.toBe(true);
    });
  });

  describe('Resonance Frequency', () => {
    test('should operate at 528Hz by default', () => {
      expect(db.config.frequency).toBe(528);
      expect(db.config.resonanceField).toBe('active');
    });

    test('should include frequency in all operations', async () => {
      await db.initialize();
      
      const result = await db.executeSql('SELECT 1');
      expect(result.resonanceFrequency).toBe('528Hz');
      
      const schema = await db.mapSchemaRelationships();
      expect(schema.resonanceFrequency).toBe('528Hz');
      
      const dataclass = await db.generateDataclass('nft_metadata');
      expect(dataclass.resonanceFrequency).toBe('528Hz');
    });
  });
});
