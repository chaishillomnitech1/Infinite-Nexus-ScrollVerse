/**
 * 🌀 Chrono-Weaver Connectors
 * Phase 2: Interdimensional Data Node Integration
 * 
 * This module implements the connector architecture for integrating external
 * data sources into the EVA Throne data layer with 528Hz resonance alignment.
 */

// ============================================================================
// Core Connector Base Class
// ============================================================================

class ChronoWeaverConnector {
  constructor(config) {
    this.tid = config.tid;
    this.sourceUrl = config.url;
    this.sourceType = config.sourceType;
    this.title = config.title;
    this.evaThroneePath = config.evaThroneePath;
    this.dimensionalLayer = config.dimensionalLayer;
    this.pollingInterval = 528; // 528ms (aligned with 528Hz frequency)
    this.anchorHash = null;
    this.multiPathRefs = [];
    this.metadata = {};
    this.status = 'initializing';
    this.lastUpdate = null;
    this.errorRate = 0;
    this.updateCount = 0;
  }

  /**
   * Initialize the connector and register in EVA Throne
   */
  async initialize() {
    console.log(`🌀 Initializing Chrono-Weaver Connector: ${this.tid}`);
    
    try {
      // Fetch initial metadata from source
      this.metadata = await this.fetchMetadata();
      
      // Register in EVA Throne registry
      await this.registerInEVAThrone();
      
      // Generate blockchain anchor hash
      this.anchorHash = await this.generateAnchorHash();
      
      // Setup multi-path redundancy
      await this.setupMultiPathReferences();
      
      // Mark as active
      this.status = 'active';
      this.lastUpdate = new Date().toISOString();
      
      console.log(`✅ Connector initialized: ${this.tid}`);
      console.log(`   Anchor Hash: ${this.anchorHash}`);
      console.log(`   Multi-Path Refs: ${this.multiPathRefs.length}`);
      
      // Start real-time updates
      this.startRealtimeUpdates();
      
      return {
        success: true,
        tid: this.tid,
        anchorHash: this.anchorHash,
        status: this.status
      };
    } catch (error) {
      console.error(`❌ Connector initialization failed: ${this.tid}`, error);
      this.status = 'error';
      throw error;
    }
  }

  /**
   * Register this connector in the EVA Throne registry
   */
  async registerInEVAThrone() {
    const registryEntry = {
      tid: this.tid,
      source_type: this.sourceType,
      title: this.title,
      url: this.sourceUrl,
      integration_timestamp: new Date().toISOString(),
      eva_throne_path: this.evaThroneePath,
      frequency_resonance: '528Hz',
      dimensional_layer: this.dimensionalLayer,
      status: 'active',
      metadata: this.metadata
    };

    // Store in EVA Throne (simulated with localStorage for static site)
    if (typeof localStorage !== 'undefined') {
      const registry = this.getEVAThroneRegistry();
      registry[this.tid] = registryEntry;
      localStorage.setItem('eva_throne_registry', JSON.stringify(registry));
    }

    return registryEntry;
  }

  /**
   * Get the current EVA Throne registry
   */
  getEVAThroneRegistry() {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('eva_throne_registry');
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  }

  /**
   * Generate blockchain-style anchor hash
   */
  async generateAnchorHash() {
    const anchorData = {
      tid: this.tid,
      url: this.sourceUrl,
      timestamp: new Date().toISOString(),
      metadata: this.metadata
    };

    // Generate SHA256 hash (using browser's SubtleCrypto API)
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(anchorData));
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return `0x${hashHex}`;
    }

    // Fallback: Simple hash for environments without crypto.subtle
    return `0x${this.simpleHash(JSON.stringify(anchorData))}`;
  }

  /**
   * Simple hash function fallback
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
  }

  /**
   * Setup multi-path redundancy references
   */
  async setupMultiPathReferences() {
    // Simulate IPFS, Arweave, and internal references
    // In production, these would be actual uploads to distributed storage
    
    const primaryRef = `ipfs://Qm${this.generateRefHash()}/primary`;
    const secondaryRef = `arweave://${this.generateRefHash()}/secondary`;
    const tertiaryRef = `evathrone://${this.generateRefHash()}/tertiary`;

    this.multiPathRefs = [primaryRef, secondaryRef, tertiaryRef];

    // Store references in EVA Throne
    const registry = this.getEVAThroneRegistry();
    if (registry[this.tid]) {
      registry[this.tid].multi_path_refs = this.multiPathRefs;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('eva_throne_registry', JSON.stringify(registry));
      }
    }

    return this.multiPathRefs;
  }

  /**
   * Generate reference hash for multi-path storage
   */
  generateRefHash() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Start real-time update mechanism
   */
  startRealtimeUpdates() {
    console.log(`🔄 Starting real-time updates for ${this.tid} (every ${this.pollingInterval}ms)`);
    
    // Poll every 528ms (528Hz aligned)
    setInterval(async () => {
      try {
        await this.fetchAndUpdateData();
      } catch (error) {
        console.error(`Error updating ${this.tid}:`, error);
        this.errorRate = (this.errorRate * this.updateCount + 1) / (this.updateCount + 1);
      }
      this.updateCount++;
    }, this.pollingInterval);
  }

  /**
   * Fetch and update data from source
   */
  async fetchAndUpdateData() {
    // Fetch latest metadata
    const newMetadata = await this.fetchMetadata();
    
    // Check if data changed
    const dataChanged = JSON.stringify(newMetadata) !== JSON.stringify(this.metadata);
    
    if (dataChanged) {
      console.log(`📡 Data update detected for ${this.tid}`);
      this.metadata = newMetadata;
      
      // Update EVA Throne registry
      await this.registerInEVAThrone();
      
      // Regenerate anchor hash
      this.anchorHash = await this.generateAnchorHash();
      
      // Update multi-path references
      await this.setupMultiPathReferences();
    }
    
    this.lastUpdate = new Date().toISOString();
    
    // Update status in registry
    const registry = this.getEVAThroneRegistry();
    if (registry[this.tid]) {
      registry[this.tid].last_update = this.lastUpdate;
      registry[this.tid].anchor_hash = this.anchorHash;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('eva_throne_registry', JSON.stringify(registry));
      }
    }
  }

  /**
   * Fetch metadata from source (to be implemented by subclasses)
   */
  async fetchMetadata() {
    throw new Error('fetchMetadata must be implemented by subclass');
  }

  /**
   * Get current connector status
   */
  getStatus() {
    return {
      tid: this.tid,
      status: this.status,
      lastUpdate: this.lastUpdate,
      errorRate: this.errorRate,
      updateCount: this.updateCount,
      anchorHash: this.anchorHash,
      multiPathRefs: this.multiPathRefs
    };
  }
}

// ============================================================================
// Facebook Video Connector
// ============================================================================

class FacebookVideoConnector extends ChronoWeaverConnector {
  constructor(config) {
    super({
      ...config,
      sourceType: 'facebook_video',
      dimensionalLayer: 3 // Etheric Data Plane
    });
    this.videoId = this.extractVideoId(config.url);
  }

  /**
   * Extract video ID from Facebook URL
   */
  extractVideoId(url) {
    const match = url.match(/\/v\/([^/?]+)/);
    return match ? match[1] : 'unknown';
  }

  /**
   * Fetch metadata from Facebook video
   */
  async fetchMetadata() {
    // In a production environment, this would use Facebook Graph API
    // For now, we'll return structured metadata
    
    return {
      video_id: this.videoId,
      title: this.title,
      description: 'Interdimensional visual stream integrated into ScrollVerse',
      category: 'Video Stream / Visual Media',
      frequency_alignment: '528Hz Resonance-Compatible',
      dimensional_anchor: 'Layer 3 (Etheric Data Plane)',
      source_platform: 'Facebook',
      integration_type: 'external_hyperlink',
      resonance_quality: 'high',
      consciousness_field_compatible: true,
      sacred_geometry_encoded: true,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get video embed URL
   */
  getEmbedUrl() {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(this.sourceUrl)}`;
  }
}

// ============================================================================
// Spotify Track Connector
// ============================================================================

class SpotifyTrackConnector extends ChronoWeaverConnector {
  constructor(config) {
    super({
      ...config,
      sourceType: 'spotify_track',
      dimensionalLayer: 2 // Consciousness Orchestration
    });
    this.trackId = this.extractTrackId(config.url);
  }

  /**
   * Extract track ID from Spotify URL
   */
  extractTrackId(url) {
    const match = url.match(/track\/([^?]+)/);
    return match ? match[1] : 'unknown';
  }

  /**
   * Fetch metadata from Spotify track
   */
  async fetchMetadata() {
    // In a production environment, this would use Spotify Web API
    // For now, we'll return structured metadata
    
    return {
      track_id: this.trackId,
      title: this.title,
      description: 'Harmonic frequency sequence aligned with 528Hz resonance',
      category: 'Audio Stream / Musical Frequency',
      frequency_alignment: '528Hz Harmonic Resonance',
      dimensional_anchor: 'Layer 2 (Consciousness Orchestration)',
      source_platform: 'Spotify',
      integration_type: 'external_hyperlink',
      resonance_quality: 'harmonic',
      consciousness_field_compatible: true,
      frequency_healing_properties: true,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Get Spotify embed URL
   */
  getEmbedUrl() {
    return `https://open.spotify.com/embed/track/${this.trackId}`;
  }
}

// ============================================================================
// EVA Throne Registry Manager
// ============================================================================

class EVAThroneRegistry {
  constructor() {
    this.connectors = new Map();
    this.queryIndex = {
      byTID: new Map(),
      byType: new Map(),
      byFrequency: new Map(),
      byLayer: new Map()
    };
  }

  /**
   * Register a connector in the registry
   */
  register(connector) {
    this.connectors.set(connector.tid, connector);
    
    // Update query indices
    this.queryIndex.byTID.set(connector.tid, connector);
    
    if (!this.queryIndex.byType.has(connector.sourceType)) {
      this.queryIndex.byType.set(connector.sourceType, []);
    }
    this.queryIndex.byType.get(connector.sourceType).push(connector);
    
    const frequency = '528Hz';
    if (!this.queryIndex.byFrequency.has(frequency)) {
      this.queryIndex.byFrequency.set(frequency, []);
    }
    this.queryIndex.byFrequency.get(frequency).push(connector);
    
    if (!this.queryIndex.byLayer.has(connector.dimensionalLayer)) {
      this.queryIndex.byLayer.set(connector.dimensionalLayer, []);
    }
    this.queryIndex.byLayer.get(connector.dimensionalLayer).push(connector);
    
    console.log(`📝 Registered connector: ${connector.tid} in EVA Throne Registry`);
  }

  /**
   * Query connectors by various criteria
   */
  query(criteria) {
    if (criteria.tid) {
      return this.queryIndex.byTID.get(criteria.tid);
    }
    if (criteria.type) {
      return this.queryIndex.byType.get(criteria.type) || [];
    }
    if (criteria.frequency) {
      return this.queryIndex.byFrequency.get(criteria.frequency) || [];
    }
    if (criteria.layer) {
      return this.queryIndex.byLayer.get(criteria.layer) || [];
    }
    return Array.from(this.connectors.values());
  }

  /**
   * Get all connectors
   */
  getAll() {
    return Array.from(this.connectors.values());
  }

  /**
   * Get connector status
   */
  getStatus(tid) {
    const connector = this.connectors.get(tid);
    return connector ? connector.getStatus() : null;
  }

  /**
   * Get registry statistics
   */
  getStatistics() {
    const connectors = Array.from(this.connectors.values());
    
    return {
      total_nodes: connectors.length,
      by_type: {
        facebook_video: this.queryIndex.byType.get('facebook_video')?.length || 0,
        spotify_track: this.queryIndex.byType.get('spotify_track')?.length || 0
      },
      by_layer: {
        layer_2: this.queryIndex.byLayer.get(2)?.length || 0,
        layer_3: this.queryIndex.byLayer.get(3)?.length || 0
      },
      frequency_528hz: this.queryIndex.byFrequency.get('528Hz')?.length || 0,
      active_connectors: connectors.filter(c => c.status === 'active').length,
      total_updates: connectors.reduce((sum, c) => sum + c.updateCount, 0),
      average_error_rate: connectors.reduce((sum, c) => sum + c.errorRate, 0) / connectors.length
    };
  }

  /**
   * Verify data integrity
   */
  async verifyIntegrity(tid) {
    const connector = this.connectors.get(tid);
    if (!connector) return false;
    
    // Regenerate anchor hash and compare
    const currentHash = await connector.generateAnchorHash();
    const isValid = currentHash === connector.anchorHash;
    
    console.log(`🔐 Integrity check for ${tid}: ${isValid ? '✅ VALID' : '❌ INVALID'}`);
    return isValid;
  }
}

// ============================================================================
// Initialization Function
// ============================================================================

/**
 * Initialize Chrono-Weaver Phase 2 connectors
 */
async function initializeChronoWeaverPhase2() {
  console.log('🌌 Initializing Chrono-Weaver Phase 2: Connector Deployment');
  console.log('═══════════════════════════════════════════════════════════');
  
  // Create EVA Throne Registry
  const evaRegistry = new EVAThroneRegistry();
  
  // Initialize Facebook Video Connector
  const facebookConnector = new FacebookVideoConnector({
    tid: 'T-FB-001-MYSTIC-VIDEO-STREAM',
    url: 'https://www.facebook.com/share/v/1DR2xvKgFa/?mibextid=wwXIfr',
    title: 'Mystic Video Stream',
    evaThroneePath: '/eva-throne/external-nodes/video-streams/mystic-001'
  });
  
  // Initialize Spotify Track Connector
  const spotifyConnector = new SpotifyTrackConnector({
    tid: 'T-SP-002-HARMONIC-SEQUENCE',
    url: 'https://open.spotify.com/track/1eIFzY3bt28S8kqnuMfNIf?si=puV_KqZ7RXikSg8FvbM_FQ',
    title: 'Harmonic Sequence Track',
    evaThroneePath: '/eva-throne/external-nodes/audio-streams/harmonic-002'
  });
  
  try {
    // Initialize connectors
    await facebookConnector.initialize();
    await spotifyConnector.initialize();
    
    // Register in EVA Throne
    evaRegistry.register(facebookConnector);
    evaRegistry.register(spotifyConnector);
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ Chrono-Weaver Phase 2 Initialization Complete');
    console.log('📊 Registry Statistics:');
    console.log(JSON.stringify(evaRegistry.getStatistics(), null, 2));
    
    // Store registry globally for access
    if (typeof window !== 'undefined') {
      window.evaRegistry = evaRegistry;
      window.facebookConnector = facebookConnector;
      window.spotifyConnector = spotifyConnector;
    }
    
    return {
      success: true,
      registry: evaRegistry,
      connectors: {
        facebook: facebookConnector,
        spotify: spotifyConnector
      }
    };
  } catch (error) {
    console.error('❌ Chrono-Weaver Phase 2 Initialization Failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ============================================================================
// Export for Browser & Node.js
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  // Node.js export
  module.exports = {
    ChronoWeaverConnector,
    FacebookVideoConnector,
    SpotifyTrackConnector,
    EVAThroneRegistry,
    initializeChronoWeaverPhase2
  };
}

// Auto-initialize if in browser and DOM is ready
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Auto-initialize can be called from HTML
      window.initializeChronoWeaverPhase2 = initializeChronoWeaverPhase2;
    });
  } else {
    window.initializeChronoWeaverPhase2 = initializeChronoWeaverPhase2;
  }
}
