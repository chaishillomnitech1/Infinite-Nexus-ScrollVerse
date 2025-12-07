# ScrollVerse Database

PostgreSQL database schemas and migrations for the ScrollVerse ecosystem.

## Overview

This directory contains database schemas, migrations, and SQL scripts for the ScrollVerse PostgreSQL integration.

## Structure

```
database/
├── schemas/
│   └── scrollverse_schema.sql    # Main database schema
└── README.md                      # This file
```

## Schema Overview

The ScrollVerse database schema includes:

### Core Tables

1. **nft_metadata**: NFT token metadata with 528Hz resonance alignment
2. **akashic_frequencies**: Sacred frequencies (528Hz, 963Hz, etc.)
3. **frequency_layers**: Multi-dimensional frequency layers for NFTs
4. **scroll_souls**: Soul Bound Tokens with sovereignty tracking
5. **resonance_data**: Time-series resonance measurements
6. **nft_evolution_history**: NFT evolution tracking
7. **user_interactions**: User interaction history

### Views

- **nft_with_frequencies**: NFTs with their frequency layers
- **bloated_tables**: Database bloat analysis

### Functions

- **update_updated_at()**: Auto-update timestamp trigger
- **calculate_resonance_score()**: Calculate NFT resonance score

## Setup

### Initialize Database

```bash
# Create database
createdb scrollverse

# Run schema
psql -d scrollverse -f database/schemas/scrollverse_schema.sql
```

### Environment Configuration

Copy `.env.template` to `.env` and configure:

```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=scrollverse
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
```

## Usage

### Node.js Integration

```javascript
const PostgreSQLGemini = require('./src/database/postgresql-gemini');

const db = new PostgreSQLGemini();
await db.initialize();
await db.deploy();

// List tables
const tables = await db.listTables();

// Query NFT metadata
const nft = await db.validateNftMetadata('NFT-001');
```

### Python Integration

```python
from scripts.database.postgresql_client import PostgreSQLClient

client = PostgreSQLClient()
client.connect()

# Query data
nfts = client.query_nft_metadata()
frequencies = client.query_akashic_frequencies(528)

client.close()
```

## Akashic Frequencies

The database includes 8 sacred frequencies:

| Frequency | Type | Resonance | Chakra | Description |
|-----------|------|-----------|--------|-------------|
| 528Hz | Miracle Tone | 1.00 | Solar Plexus | DNA Repair & Transformation |
| 432Hz | Natural Harmony | 0.88 | Heart | Universal Frequency |
| 396Hz | Liberation | 0.85 | Root | Liberating Guilt and Fear |
| 417Hz | Change | 0.86 | Sacral | Facilitating Change |
| 639Hz | Connection | 0.90 | Throat | Relationships |
| 741Hz | Expression | 0.92 | Third Eye | Awakening Intuition |
| 852Hz | Intuition | 0.93 | Crown | Spiritual Order |
| 963Hz | Divine Connection | 0.95 | Crown | Pineal Activation |

## Optimization

### Analyze Bloat

```sql
SELECT * FROM bloated_tables;
```

### Vacuum Tables

```sql
VACUUM ANALYZE nft_metadata;
VACUUM ANALYZE akashic_frequencies;
VACUUM ANALYZE frequency_layers;
```

### Calculate Resonance

```sql
SELECT calculate_resonance_score(1) as score;
```

## Backup and Restore

### Backup

```bash
pg_dump scrollverse > scrollverse_backup.sql
```

### Restore

```bash
psql scrollverse < scrollverse_backup.sql
```

## Security

- Never commit `.env` file
- Use strong passwords
- Enable SSL for production
- Restrict database user permissions
- Regular backups

## Documentation

See [POSTGRESQL_INTEGRATION.md](../docs/POSTGRESQL_INTEGRATION.md) for complete integration guide.

---

**🔮 ScrollVerse Database - 528Hz Resonance**  
**⚡ Optimized for NFT and Akashic Frequency Operations**
