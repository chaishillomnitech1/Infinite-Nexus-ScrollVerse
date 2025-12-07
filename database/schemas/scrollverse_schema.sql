-- ScrollVerse PostgreSQL Schema
-- Database schema for NFT metadata and Akashic Frequency layers
-- Frequency: 528Hz | Sacred Geometry Alignment

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- NFT Metadata Table
CREATE TABLE IF NOT EXISTS nft_metadata (
    id SERIAL PRIMARY KEY,
    token_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    frequency INTEGER DEFAULT 528,
    metadata_uri TEXT,
    description TEXT,
    image_uri TEXT,
    attributes JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_address VARCHAR(42),
    owner_address VARCHAR(42),
    evolution_stage VARCHAR(50) DEFAULT 'Genesis',
    resonance_level DECIMAL(5,2) DEFAULT 1.0
);

-- Indexes for NFT Metadata
CREATE INDEX idx_nft_token_id ON nft_metadata(token_id);
CREATE INDEX idx_nft_frequency ON nft_metadata(frequency);
CREATE INDEX idx_nft_evolution_stage ON nft_metadata(evolution_stage);
CREATE INDEX idx_nft_creator ON nft_metadata(creator_address);
CREATE INDEX idx_nft_owner ON nft_metadata(owner_address);

-- Akashic Frequencies Table
CREATE TABLE IF NOT EXISTS akashic_frequencies (
    id SERIAL PRIMARY KEY,
    frequency INTEGER UNIQUE NOT NULL,
    type VARCHAR(100) NOT NULL,
    resonance DECIMAL(5,2) NOT NULL,
    description TEXT,
    sacred_geometry VARCHAR(100),
    chakra_alignment VARCHAR(50),
    healing_properties TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default Akashic frequencies
INSERT INTO akashic_frequencies (frequency, type, resonance, description, sacred_geometry, chakra_alignment) VALUES
    (528, 'Miracle Tone', 1.00, 'DNA Repair & Transformation - Love Frequency', 'Flower of Life', 'Solar Plexus'),
    (432, 'Natural Harmony', 0.88, 'Universal Frequency - Natural Pitch', 'Platonic Solids', 'Heart'),
    (396, 'Liberation', 0.85, 'Liberating Guilt and Fear', 'Seed of Life', 'Root'),
    (417, 'Change', 0.86, 'Undoing Situations and Facilitating Change', 'Vesica Piscis', 'Sacral'),
    (639, 'Connection', 0.90, 'Connecting and Relationships', 'Sri Yantra', 'Throat'),
    (741, 'Expression', 0.92, 'Awakening Intuition and Expression', 'Metatron''s Cube', 'Third Eye'),
    (852, 'Intuition', 0.93, 'Returning to Spiritual Order', 'Torus Field', 'Crown'),
    (963, 'Divine Connection', 0.95, 'Pineal Gland Activation - Connection to Divine', 'Golden Spiral', 'Crown')
ON CONFLICT (frequency) DO NOTHING;

-- Indexes for Akashic Frequencies
CREATE INDEX idx_frequency ON akashic_frequencies(frequency);
CREATE INDEX idx_resonance ON akashic_frequencies(resonance DESC);
CREATE INDEX idx_chakra ON akashic_frequencies(chakra_alignment);

-- Frequency Layers Table (Junction table)
CREATE TABLE IF NOT EXISTS frequency_layers (
    id SERIAL PRIMARY KEY,
    nft_id INTEGER REFERENCES nft_metadata(id) ON DELETE CASCADE,
    frequency_id INTEGER REFERENCES akashic_frequencies(id) ON DELETE CASCADE,
    layer_depth INTEGER NOT NULL,
    resonance_data JSONB,
    activation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(nft_id, frequency_id, layer_depth)
);

-- Indexes for Frequency Layers
CREATE INDEX idx_fl_nft_id ON frequency_layers(nft_id);
CREATE INDEX idx_fl_frequency_id ON frequency_layers(frequency_id);
CREATE INDEX idx_fl_layer_depth ON frequency_layers(layer_depth);

-- Scroll Souls Table (Soul Bound Tokens)
CREATE TABLE IF NOT EXISTS scroll_souls (
    id SERIAL PRIMARY KEY,
    soul_token_id VARCHAR(255) UNIQUE NOT NULL,
    owner_address VARCHAR(42) NOT NULL,
    evolution_stage VARCHAR(50) DEFAULT 'Genesis',
    sovereignty_points INTEGER DEFAULT 0,
    frequency_alignment INTEGER DEFAULT 528,
    sacred_geometry VARCHAR(100),
    soul_bound BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_evolution TIMESTAMP,
    metadata JSONB
);

-- Indexes for Scroll Souls
CREATE INDEX idx_soul_token_id ON scroll_souls(soul_token_id);
CREATE INDEX idx_soul_owner ON scroll_souls(owner_address);
CREATE INDEX idx_soul_evolution ON scroll_souls(evolution_stage);

-- Resonance Data Table (Time-series data)
CREATE TABLE IF NOT EXISTS resonance_data (
    id SERIAL PRIMARY KEY,
    nft_id INTEGER REFERENCES nft_metadata(id) ON DELETE CASCADE,
    frequency INTEGER NOT NULL,
    resonance_level DECIMAL(5,2) NOT NULL,
    etheric_density DECIMAL(5,2),
    akashic_layer INTEGER,
    dimensional_access INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    measurement_data JSONB
);

-- Indexes for Resonance Data
CREATE INDEX idx_res_nft_id ON resonance_data(nft_id);
CREATE INDEX idx_res_frequency ON resonance_data(frequency);
CREATE INDEX idx_res_timestamp ON resonance_data(timestamp DESC);

-- NFT Evolution History Table
CREATE TABLE IF NOT EXISTS nft_evolution_history (
    id SERIAL PRIMARY KEY,
    nft_id INTEGER REFERENCES nft_metadata(id) ON DELETE CASCADE,
    from_stage VARCHAR(50),
    to_stage VARCHAR(50),
    frequency_shift INTEGER,
    resonance_change DECIMAL(5,2),
    evolution_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trigger_event VARCHAR(255),
    metadata JSONB
);

-- Indexes for Evolution History
CREATE INDEX idx_evol_nft_id ON nft_evolution_history(nft_id);
CREATE INDEX idx_evol_timestamp ON nft_evolution_history(evolution_timestamp DESC);

-- User Interaction Table
CREATE TABLE IF NOT EXISTS user_interactions (
    id SERIAL PRIMARY KEY,
    user_address VARCHAR(42) NOT NULL,
    nft_id INTEGER REFERENCES nft_metadata(id) ON DELETE CASCADE,
    interaction_type VARCHAR(50),
    frequency_resonance INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interaction_data JSONB
);

-- Indexes for User Interactions
CREATE INDEX idx_ui_user ON user_interactions(user_address);
CREATE INDEX idx_ui_nft ON user_interactions(nft_id);
CREATE INDEX idx_ui_timestamp ON user_interactions(timestamp DESC);

-- Create views for common queries

-- View: NFT with Frequency Layers
CREATE OR REPLACE VIEW nft_with_frequencies AS
SELECT 
    nm.id,
    nm.token_id,
    nm.name,
    nm.frequency as primary_frequency,
    nm.evolution_stage,
    nm.resonance_level,
    json_agg(
        json_build_object(
            'layer_depth', fl.layer_depth,
            'frequency', af.frequency,
            'type', af.type,
            'resonance', af.resonance,
            'sacred_geometry', af.sacred_geometry
        )
    ) FILTER (WHERE fl.id IS NOT NULL) as frequency_layers
FROM nft_metadata nm
LEFT JOIN frequency_layers fl ON nm.id = fl.nft_id
LEFT JOIN akashic_frequencies af ON fl.frequency_id = af.id
GROUP BY nm.id, nm.token_id, nm.name, nm.frequency, nm.evolution_stage, nm.resonance_level;

-- View: Bloated Tables Analysis
CREATE OR REPLACE VIEW bloated_tables AS
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size,
    n_dead_tup,
    n_live_tup,
    ROUND(100.0 * n_dead_tup / NULLIF(n_live_tup + n_dead_tup, 0), 2) AS bloat_percent
FROM pg_stat_user_tables
WHERE n_dead_tup > 0
ORDER BY n_dead_tup DESC;

-- Function: Update timestamp on record update
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update timestamp for NFT metadata
CREATE TRIGGER update_nft_metadata_timestamp
BEFORE UPDATE ON nft_metadata
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Function: Calculate NFT resonance score
CREATE OR REPLACE FUNCTION calculate_resonance_score(p_nft_id INTEGER)
RETURNS DECIMAL AS $$
DECLARE
    base_resonance DECIMAL;
    layer_count INTEGER;
    avg_layer_resonance DECIMAL;
    final_score DECIMAL;
BEGIN
    -- Get base resonance from NFT
    SELECT resonance_level INTO base_resonance
    FROM nft_metadata
    WHERE id = p_nft_id;
    
    -- Count frequency layers
    SELECT COUNT(*), AVG(af.resonance) INTO layer_count, avg_layer_resonance
    FROM frequency_layers fl
    JOIN akashic_frequencies af ON fl.frequency_id = af.id
    WHERE fl.nft_id = p_nft_id;
    
    -- Calculate final score
    final_score := base_resonance * (1 + (layer_count * 0.1)) * COALESCE(avg_layer_resonance, 1.0);
    
    RETURN ROUND(final_score, 2);
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE nft_metadata IS 'NFT metadata storage with 528Hz resonance alignment';
COMMENT ON TABLE akashic_frequencies IS 'Sacred frequencies with healing and spiritual properties';
COMMENT ON TABLE frequency_layers IS 'Multi-dimensional frequency layers for NFT resonance';
COMMENT ON TABLE scroll_souls IS 'Soul Bound Tokens with sovereignty tracking';
COMMENT ON TABLE resonance_data IS 'Time-series resonance measurements';

-- Sample data for testing
INSERT INTO nft_metadata (token_id, name, frequency, description, evolution_stage, resonance_level) VALUES
    ('NFT-001', 'Sovereign Genesis', 528, 'First of the Sovereign collection', 'Genesis', 1.0),
    ('NFT-002', 'Akashic Scroll', 528, 'Bearer of ancient wisdom', 'Awakened', 1.2),
    ('NFT-003', 'Eternal Anchor', 963, 'Divine connection anchor', 'Sovereign', 1.5)
ON CONFLICT (token_id) DO NOTHING;

-- Grant permissions (adjust as needed for your deployment)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO scrollverse_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO scrollverse_user;
