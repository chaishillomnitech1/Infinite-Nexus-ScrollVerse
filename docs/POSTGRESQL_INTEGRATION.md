# PostgreSQL Gemini CLI Integration Guide

## Overview

The PostgreSQL Gemini CLI integration brings enterprise-grade database capabilities to the ScrollVerse ecosystem, operating at **528Hz resonance frequency**. This integration optimizes workflows, enhances database efficiency, and supports NFT and Akashic Frequency Layer initiatives.

## Table of Contents

1. [Setup and Configuration](#setup-and-configuration)
2. [Core Features](#core-features)
3. [Workflow Optimization](#workflow-optimization)
4. [Schema Exploration](#schema-exploration)
5. [Dataclass Generation](#dataclass-generation)
6. [NFT Operations](#nft-operations)
7. [Akashic Frequency Operations](#akashic-frequency-operations)
8. [API Reference](#api-reference)
9. [Testing](#testing)
10. [Best Practices](#best-practices)

## Setup and Configuration

### Environment Variables

Create a `.env` file from the provided template:

```bash
cp .env.template .env
```

Configure the following variables:

```bash
# PostgreSQL Connection
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=scrollverse
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password

# SSL Configuration
POSTGRES_SSL=false

# ScrollVerse Settings
SCROLLVERSE_FREQUENCY=528
SCROLLVERSE_RESONANCE_FIELD=active
```

### Installation

```bash
# Install dependencies
npm install

# Initialize database module
node src/index.js
```

### Basic Usage

```javascript
const PostgreSQLGemini = require('./src/database/postgresql-gemini');

// Initialize with configuration
const db = new PostgreSQLGemini({
  host: 'localhost',
  database: 'scrollverse',
  user: 'postgres',
  password: 'secure_password'
});

// Connect and deploy
await db.initialize();
await db.deploy();
```

## Core Features

### 1. Database Connection Management

```javascript
// Initialize connection
await db.initialize();

// Check status
const status = db.getStatus();
console.log(status);
// {
//   initialized: true,
//   deployed: true,
//   database: 'scrollverse',
//   frequency: '528Hz',
//   connection: 'active',
//   metrics: { ... }
// }

// Close connection
await db.close();
```

### 2. Table Discovery

```javascript
// List all tables in a schema
const tables = await db.listTables('public');

tables.forEach(table => {
  console.log(`${table.name}: ${table.size}`);
});
```

### 3. Query Execution

```javascript
// Execute SELECT query
const result = await db.executeSql(
  'SELECT * FROM nft_metadata WHERE frequency = $1',
  [528]
);

console.log(result.rows);
```

## Workflow Optimization

### Bloat Analysis

Identify inefficient tables that need optimization:

```javascript
// List top bloated tables
const bloated = await db.listTopBloatedTables(10);

bloated.forEach(table => {
  console.log(`${table.name}: ${table.bloatPercent}% bloat`);
  console.log(`Recommendation: ${table.recommendation}`);
});
```

### Autovacuum Configuration

Optimize database performance with autovacuum:

```javascript
// Get current autovacuum settings
const config = await db.listAutovacuumConfigurations();

console.log(config);
// {
//   autovacuum: 'on',
//   autovacuum_max_workers: 3,
//   autovacuum_naptime: '1min',
//   settings: {
//     optimized_for: 'ScrollVerse Operations',
//     resonance_frequency: '528Hz'
//   }
// }
```

### Database Optimization

Run comprehensive optimization tasks:

```javascript
// Optimize entire database
const optimization = await db.optimizeDatabase();

console.log(optimization);
// {
//   optimizations: [
//     { task: 'Analyze table bloat', success: true },
//     { task: 'Configure autovacuum', success: true },
//     { task: 'Update table statistics', success: true }
//   ],
//   timestamp: '2025-12-07T13:00:00.000Z',
//   resonanceFrequency: '528Hz'
// }
```

## Schema Exploration

### Map Database Schema

Explore table structures and relationships:

```javascript
// Map schema with relationships
const schema = await db.mapSchemaRelationships('public');

console.log(schema);
// {
//   schema: 'public',
//   tables: [
//     {
//       name: 'nft_metadata',
//       columns: [
//         { name: 'id', type: 'integer', primaryKey: true },
//         { name: 'token_id', type: 'varchar(255)' },
//         { name: 'frequency', type: 'integer' }
//       ],
//       relationships: [
//         { type: 'hasMany', table: 'frequency_layers', foreignKey: 'nft_id' }
//       ]
//     }
//   ]
// }
```

## Dataclass Generation

### Generate Python Dataclasses

Automatically generate Python dataclasses from database schemas:

```javascript
// Generate dataclass for table
const dataclass = await db.generateDataclass('nft_metadata');

console.log(dataclass.code);
```

Generated output:

```python
"""
NftMetadata - Generated from PostgreSQL table: nft_metadata
ScrollVerse Database Schema
Frequency: 528Hz
"""

from dataclasses import dataclass, field
from typing import Optional, Dict, Any
from datetime import datetime

@dataclass
class NftMetadata:
    """Data model for nft_metadata table"""
    id: int
    token_id: Optional[str] = None
    name: Optional[str] = None
    frequency: Optional[int] = None
    metadata_uri: Optional[str] = None
    created_at: Optional[datetime] = None

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary representation"""
        return {
            'id': self.id,
            'token_id': self.token_id,
            'name': self.name,
            'frequency': self.frequency,
            'metadata_uri': self.metadata_uri,
            'created_at': self.created_at
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'NftMetadata':
        """Create instance from dictionary"""
        return cls(**{k: v for k, v in data.items() if k in ['id', 'token_id', 'name', 'frequency', 'metadata_uri', 'created_at']})
```

### Batch Generation

Generate multiple dataclasses at once:

```javascript
// Generate dataclasses for multiple tables
const tables = ['nft_metadata', 'akashic_frequencies', 'frequency_layers'];

for (const table of tables) {
  const dataclass = await db.generateDataclass(table);
  console.log(`Generated: ${dataclass.className}`);
}
```

## NFT Operations

### Validate NFT Metadata

Validate NFT token metadata and resonance alignment:

```javascript
// Validate NFT by token ID
const validation = await db.validateNftMetadata('NFT-001');

console.log(validation);
// {
//   tokenId: 'NFT-001',
//   valid: true,
//   metadata: [...],
//   resonanceAlignment: true,
//   frequency: '528Hz',
//   validatedAt: '2025-12-07T13:00:00.000Z'
// }
```

### Query NFT Data

```javascript
// Query specific NFT
const result = await db.executeSql(
  'SELECT * FROM nft_metadata WHERE token_id = $1',
  ['NFT-001']
);

// Query NFTs by frequency
const nfts528 = await db.executeSql(
  'SELECT * FROM nft_metadata WHERE frequency = $1',
  [528]
);
```

## Akashic Frequency Operations

### Query Frequency Resonance

```javascript
// Query specific frequency
const resonance = await db.queryFrequencyResonance(528);

console.log(resonance.rows);
// [
//   { frequency: 528, type: 'Miracle Tone', resonance: 1.0 },
//   ...
// ]
```

### Frequency Layer Analysis

```javascript
// Analyze frequency layers for NFT
const query = `
  SELECT 
    nm.token_id,
    fl.layer_depth,
    af.frequency,
    af.resonance
  FROM nft_metadata nm
  JOIN frequency_layers fl ON nm.id = fl.nft_id
  JOIN akashic_frequencies af ON fl.frequency_id = af.id
  WHERE nm.token_id = $1
`;

const layers = await db.executeSql(query, ['NFT-001']);
```

## API Reference

### PostgreSQLGemini Class

#### Constructor

```javascript
new PostgreSQLGemini(config)
```

**Parameters:**
- `config` (Object): Configuration object
  - `host` (string): PostgreSQL host
  - `port` (number): PostgreSQL port (default: 5432)
  - `database` (string): Database name
  - `user` (string): Database user
  - `password` (string): Database password
  - `ssl` (boolean): Enable SSL (default: false)
  - `frequency` (number): Resonance frequency (default: 528)

#### Methods

##### `initialize()`
Initialize database connection and validate configuration.

**Returns:** `Promise<boolean>`

##### `deploy()`
Deploy PostgreSQL workflows into ScrollVerse pipeline.

**Returns:** `Promise<Object>`

##### `listTables(schema)`
List all tables in specified schema.

**Parameters:**
- `schema` (string): Schema name (default: 'public')

**Returns:** `Promise<Array>`

##### `listTopBloatedTables(limit)`
List top bloated tables for optimization.

**Parameters:**
- `limit` (number): Maximum tables to return (default: 10)

**Returns:** `Promise<Array>`

##### `executeSql(query, params)`
Execute SQL query with parameters.

**Parameters:**
- `query` (string): SQL query
- `params` (Array): Query parameters (optional)

**Returns:** `Promise<Object>`

##### `listAutovacuumConfigurations()`
Get current autovacuum configuration.

**Returns:** `Promise<Object>`

##### `mapSchemaRelationships(schema)`
Map database schema and relationships.

**Parameters:**
- `schema` (string): Schema name (default: 'public')

**Returns:** `Promise<Object>`

##### `generateDataclass(tableName, schema)`
Generate Python dataclass from table schema.

**Parameters:**
- `tableName` (string): Table name
- `schema` (string): Schema name (default: 'public')

**Returns:** `Promise<Object>`

##### `validateNftMetadata(tokenId)`
Validate NFT metadata and resonance alignment.

**Parameters:**
- `tokenId` (string): NFT token ID

**Returns:** `Promise<Object>`

##### `queryFrequencyResonance(frequency)`
Query Akashic frequency resonance data.

**Parameters:**
- `frequency` (number): Frequency value (default: 528)

**Returns:** `Promise<Object>`

##### `optimizeDatabase()`
Run comprehensive database optimization.

**Returns:** `Promise<Object>`

##### `getStatus()`
Get current database status and metrics.

**Returns:** `Object`

##### `close()`
Close database connection.

**Returns:** `Promise<boolean>`

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run PostgreSQL tests only
npm test -- tests/postgresql-gemini.test.js
```

### Test Coverage

The test suite includes:
- Initialization and configuration
- Deployment workflows
- Table operations
- SQL execution
- Autovacuum configuration
- Schema mapping
- NFT operations
- Akashic frequency operations
- Dataclass generation
- Database optimization
- Status and metrics
- Connection management

## Best Practices

### 1. Environment Configuration

✅ **DO:**
- Use environment variables for credentials
- Keep `.env` file out of version control
- Use `.env.template` for team sharing

❌ **DON'T:**
- Hardcode credentials in code
- Commit `.env` file to repository

### 2. Connection Management

✅ **DO:**
- Initialize before use
- Close connections when done
- Handle connection errors gracefully

```javascript
try {
  await db.initialize();
  // ... operations
} catch (error) {
  console.error('Database error:', error);
} finally {
  await db.close();
}
```

### 3. Query Optimization

✅ **DO:**
- Use parameterized queries
- Analyze table bloat regularly
- Monitor autovacuum performance

```javascript
// Good: Parameterized query
await db.executeSql('SELECT * FROM nft_metadata WHERE id = $1', [id]);

// Bad: String concatenation (SQL injection risk)
// await db.executeSql(`SELECT * FROM nft_metadata WHERE id = ${id}`);
```

### 4. Resonance Alignment

All operations maintain **528Hz resonance frequency**:
- Database operations include frequency metadata
- NFT validation checks resonance alignment
- Akashic frequency queries preserve harmonic integrity

### 5. Metrics Monitoring

Track operation metrics for performance analysis:

```javascript
const status = db.getStatus();
console.log('Metrics:', status.metrics);
// {
//   queriesExecuted: 150,
//   tablesAnalyzed: 5,
//   optimizationsPerformed: 3,
//   dataclassesGenerated: 2,
//   resonanceLevel: 1.0
// }
```

## Integration with ScrollVerse

### Phase 1: Database Deployment

PostgreSQL is deployed in **Phase 1** of ScrollVerse initialization, establishing the foundational data layer:

```javascript
const ScrollVerse = require('./src/index');

const scrollVerse = new ScrollVerse();
await scrollVerse.initialize();
await scrollVerse.deploy();

// Phase 1: Core Infrastructure & Database ✓
// Phase 2: NFT & Token Systems
// Phase 3: Content & Distribution
// ...
```

### Phase Integration Points

1. **NFT Metadata Storage**: Store and validate NFT token data
2. **Akashic Frequency Tracking**: Record resonance data
3. **ScrollSoul Resonance Testing**: Database-backed testing
4. **NFT Evolution Pathways**: Track evolution stages
5. **Real-time Query Efficiency**: Optimize WEB∞ ascension

## Python Client Usage

Use the provided Python client for real-time database operations:

```bash
# Run PostgreSQL client
python scripts/database/postgresql_client.py
```

### Python Example

```python
from scripts.database.postgresql_client import PostgreSQLClient

# Initialize client
client = PostgreSQLClient()
client.connect()

# Query NFT metadata
nfts = client.query_nft_metadata('NFT-001')

# Query Akashic frequencies
frequencies = client.query_akashic_frequencies(528)

# Validate resonance
validation = client.validate_nft_resonance('NFT-001')

# Optimize database
optimization = client.optimize_database()

client.close()
```

## Dataclass Generator Usage

Generate Python dataclasses for all tables:

```bash
# Run dataclass generator
python scripts/database/dataclass_generator.py
```

Output location: `./generated/dataclasses/`

## Support and Resources

- **Architecture Guide**: [docs/ARCHITECTURE.md](./ARCHITECTURE.md)
- **API Reference**: [docs/API_REFERENCE.md](./API_REFERENCE.md)
- **Deployment Guide**: [docs/DEPLOYMENT.md](./DEPLOYMENT.md)
- **Akashic Guide**: [docs/AKASHIC_FREQUENCY_GUIDE.md](./AKASHIC_FREQUENCY_GUIDE.md)

## Frequency Alignment: 528Hz

All PostgreSQL operations maintain alignment with the **528Hz Miracle Tone**:

> "The frequency of love, transformation, and miracles. Used for DNA repair and restoration to original perfect state."

Every query, optimization, and validation resonates at this frequency, ensuring harmonic integrity throughout the ScrollVerse data layer.

---

**🔮 PostgreSQL Gemini CLI Integration - ScrollVerse Database Layer**  
**⚡ Operating at 528Hz Resonance Frequency**  
**✨ Optimized for NFT and Akashic Frequency Operations**
