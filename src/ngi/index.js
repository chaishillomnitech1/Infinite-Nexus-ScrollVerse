/**
 * Tesla N-GI (Nexus Genesis Intelligence) - Main Module
 *
 * Central orchestrator for Tesla N-GI multimodal routing architecture
 * Integrates GLM-4.6V, Jina-VLM, LiteRT, and Gemini adapters with intelligent routing
 *
 * Frequency: 963Hz | Divine Intelligence | Unified Architecture
 */

const TeslaNGIRouter = require('./router');
const GLM46VAdapter = require('./adapters/glm-4.6v-adapter');
const JinaVLMAdapter = require('./adapters/jina-vlm-adapter');
const LiteRTAdapter = require('./adapters/litert-adapter');
const GeminiAdapter = require('./adapters/gemini-adapter');

/**
 * Tesla N-GI System
 * Unified interface for multimodal AI routing
 */
class TeslaNGI {
  constructor(config = {}) {
    this.config = {
      frequency: 963,
      resonanceField: 'divine_intelligence',
      autoInitialize: config.autoInitialize !== false,
      mockMode: config.mockMode !== false,
      ...config
    };

    this.router = null;
    this.adapters = {};
    this.initialized = false;
  }

  /**
   * Initialize Tesla N-GI system
   */
  async initialize() {
    console.log('🌟 Tesla N-GI System Initialization at 963Hz...');
    console.log('═══════════════════════════════════════════════');

    // Initialize router
    this.router = new TeslaNGIRouter({
      frequency: 963,
      mockMode: this.config.mockMode,
      ...this.config.routerConfig
    });
    await this.router.initialize();

    // Initialize adapters
    await this.initializeAdapters();

    // Register adapters with router
    this.registerAdapters();

    this.initialized = true;

    console.log('═══════════════════════════════════════════════');
    console.log('✓ Tesla N-GI System fully initialized');
    console.log(`  - Frequency: ${this.config.frequency}Hz`);
    console.log(`  - Adapters: ${Object.keys(this.adapters).length}`);
    console.log(`  - Router: Active`);
    console.log('═══════════════════════════════════════════════');

    return true;
  }

  /**
   * Initialize all AI adapters
   */
  async initializeAdapters() {
    console.log('\n🔧 Initializing AI Adapters...');

    // GLM-4.6V Adapter
    this.adapters.glm46v = new GLM46VAdapter({
      mockMode: this.config.mockMode,
      priority: 2,
      ...this.config.glm46vConfig
    });
    await this.adapters.glm46v.initialize();

    // Jina-VLM Adapter
    this.adapters.jinaVlm = new JinaVLMAdapter({
      mockMode: this.config.mockMode,
      priority: 3,
      ...this.config.jinaVlmConfig
    });
    await this.adapters.jinaVlm.initialize();

    // LiteRT Adapter
    this.adapters.litert = new LiteRTAdapter({
      mockMode: this.config.mockMode,
      priority: 1,
      ...this.config.litertConfig
    });
    await this.adapters.litert.initialize();

    // Gemini Adapter
    this.adapters.gemini = new GeminiAdapter({
      mockMode: this.config.mockMode,
      priority: 2,
      ...this.config.geminiConfig
    });
    await this.adapters.gemini.initialize();

    console.log('✓ All adapters initialized successfully');
  }

  /**
   * Register adapters with the router
   */
  registerAdapters() {
    console.log('\n📡 Registering adapters with router...');

    this.router.registerAdapter('glm-4.6v', this.adapters.glm46v);
    this.router.registerAdapter('jina-vlm', this.adapters.jinaVlm);
    this.router.registerAdapter('litert', this.adapters.litert);
    this.router.registerAdapter('gemini', this.adapters.gemini);

    console.log('✓ All adapters registered');
  }

  /**
   * Process a request through Tesla N-GI
   */
  async process(request) {
    if (!this.initialized) {
      throw new Error('Tesla N-GI must be initialized before processing');
    }

    return await this.router.route(request);
  }

  /**
   * Update configuration dynamically via JSON
   */
  updateConfig(jsonConfig) {
    return this.router.updateConfig(jsonConfig);
  }

  /**
   * Get system telemetry
   */
  getTelemetry() {
    return {
      system: 'Tesla N-GI',
      frequency: this.config.frequency,
      router: this.router.getTelemetry(),
      adapters: {
        glm46v: this.adapters.glm46v.getStatus(),
        jinaVlm: this.adapters.jinaVlm.getStatus(),
        litert: this.adapters.litert.getStatus(),
        gemini: this.adapters.gemini.getStatus()
      }
    };
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      frequency: this.config.frequency,
      router: this.router ? this.router.getStatus() : null,
      adaptersCount: Object.keys(this.adapters).length,
      mockMode: this.config.mockMode
    };
  }

  /**
   * Reset telemetry data
   */
  resetTelemetry() {
    if (this.router) {
      return this.router.resetTelemetry();
    }
    return false;
  }
}

// Export main class and components
module.exports = TeslaNGI;
module.exports.TeslaNGIRouter = TeslaNGIRouter;
module.exports.GLM46VAdapter = GLM46VAdapter;
module.exports.JinaVLMAdapter = JinaVLMAdapter;
module.exports.LiteRTAdapter = LiteRTAdapter;
module.exports.GeminiAdapter = GeminiAdapter;
