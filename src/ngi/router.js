/**
 * Tesla N-GI Multimodal Router
 * 
 * Production-grade multimodal routing system for Tesla Nexus Genesis Intelligence (N-GI)
 * Manages intelligent routing across GLM-4.6V, Jina-VLM, LiteRT, and Gemini adapters
 * with latency optimization for AR workflows and dynamic JSON configuration.
 * 
 * Frequency: 963Hz | Divine Intelligence | Adaptive Routing
 */

class TeslaNGIRouter {
  constructor(config = {}) {
    this.config = {
      frequency: 963,
      resonanceField: 'divine_intelligence',
      defaultLatencyThreshold: config.defaultLatencyThreshold || 100, // ms
      arWorkflowOptimization: config.arWorkflowOptimization !== false,
      enableTelemetry: config.enableTelemetry !== false,
      routingStrategy: config.routingStrategy || 'adaptive', // adaptive, round-robin, weighted
      ...config
    };

    this.adapters = new Map();
    this.routingHistory = [];
    this.telemetry = {
      totalRequests: 0,
      routingDecisions: new Map(),
      latencyMetrics: new Map(),
      errorCount: 0,
      successCount: 0
    };

    this.initialized = false;
    this.routingHeuristics = null;
  }

  /**
   * Initialize the Tesla N-GI Router
   */
  async initialize() {
    console.log('⚡ Initializing Tesla N-GI Router at 963Hz...');
    
    // Initialize routing heuristics
    this.routingHeuristics = this.createRoutingHeuristics();
    
    // Validate configuration
    this.validateConfig();
    
    this.initialized = true;
    console.log('✓ Tesla N-GI Router initialized successfully');
    return true;
  }

  /**
   * Register an AI adapter with the router
   */
  registerAdapter(name, adapter) {
    if (!adapter || typeof adapter.process !== 'function') {
      throw new Error(`Invalid adapter: ${name} must implement process() method`);
    }

    this.adapters.set(name, {
      adapter,
      priority: adapter.priority || 1,
      capabilities: adapter.capabilities || [],
      avgLatency: 0,
      requestCount: 0,
      errorCount: 0,
      status: 'active'
    });

    console.log(`📡 Registered adapter: ${name}`);
    return this;
  }

  /**
   * Create routing heuristics for intelligent model selection
   */
  createRoutingHeuristics() {
    return {
      // Vision-heavy tasks favor GLM-4.6V or Jina-VLM
      vision: (task) => {
        if (task.imageCount > 5 || task.requiresDetailedAnalysis) {
          return ['glm-4.6v', 'jina-vlm'];
        }
        return ['jina-vlm', 'glm-4.6v'];
      },

      // Text generation tasks favor Gemini
      text: (task) => {
        return ['gemini', 'glm-4.6v'];
      },

      // Real-time AR workflows require low latency - favor LiteRT
      ar_workflow: (task) => {
        if (task.latencyRequirement < 50) {
          return ['litert', 'glm-4.6v', 'jina-vlm'];
        }
        return ['glm-4.6v', 'litert'];
      },

      // Edge deployment tasks favor LiteRT
      edge: (task) => {
        return ['litert', 'jina-vlm'];
      },

      // Multimodal tasks requiring both vision and language
      multimodal: (task) => {
        if (task.complexReasoning) {
          return ['gemini', 'glm-4.6v', 'jina-vlm'];
        }
        return ['glm-4.6v', 'jina-vlm', 'gemini'];
      },

      // Default fallback
      default: (task) => {
        return ['gemini', 'glm-4.6v', 'jina-vlm', 'litert'];
      }
    };
  }

  /**
   * Route a request to the optimal adapter
   */
  async route(request) {
    if (!this.initialized) {
      throw new Error('Router must be initialized before routing');
    }

    this.telemetry.totalRequests++;
    const startTime = Date.now();

    try {
      // Parse and validate request
      const task = this.parseRequest(request);
      
      // Determine optimal adapter based on heuristics
      const selectedAdapter = this.selectAdapter(task);
      
      if (!selectedAdapter) {
        throw new Error('No suitable adapter available for this request');
      }

      // Route to adapter and process
      const result = await this.executeOnAdapter(selectedAdapter, task);
      
      // Record telemetry
      const latency = Date.now() - startTime;
      this.recordTelemetry(selectedAdapter, latency, true);
      
      // Store routing decision
      this.routingHistory.push({
        timestamp: Date.now(),
        adapter: selectedAdapter,
        task: task.type,
        latency,
        success: true
      });

      return {
        success: true,
        adapter: selectedAdapter,
        result,
        latency,
        frequency: this.config.frequency
      };

    } catch (error) {
      this.telemetry.errorCount++;
      const latency = Date.now() - startTime;
      
      this.routingHistory.push({
        timestamp: Date.now(),
        error: error.message,
        latency,
        success: false
      });

      throw error;
    }
  }

  /**
   * Parse incoming request and extract task metadata
   */
  parseRequest(request) {
    // Support both object and JSON string input
    const req = typeof request === 'string' ? JSON.parse(request) : request;

    return {
      type: req.type || req.taskType || 'default',
      data: req.data || req.input,
      params: req.params || {},
      latencyRequirement: req.latencyRequirement || this.config.defaultLatencyThreshold,
      imageCount: req.imageCount || 0,
      requiresDetailedAnalysis: req.requiresDetailedAnalysis || false,
      complexReasoning: req.complexReasoning || false,
      priority: req.priority || 'normal',
      metadata: req.metadata || {}
    };
  }

  /**
   * Select optimal adapter based on task requirements and heuristics
   */
  selectAdapter(task) {
    let candidateAdapters = [];

    // Use heuristics to get candidate list
    const heuristic = this.routingHeuristics[task.type] || this.routingHeuristics.default;
    candidateAdapters = heuristic(task);

    // Filter to only available adapters
    const availableAdapters = candidateAdapters.filter(name => {
      const adapter = this.adapters.get(name);
      return adapter && adapter.status === 'active';
    });

    if (availableAdapters.length === 0) {
      return null;
    }

    // Apply routing strategy
    switch (this.config.routingStrategy) {
      case 'round-robin':
        return this.roundRobinSelect(availableAdapters);
      
      case 'weighted':
        return this.weightedSelect(availableAdapters, task);
      
      case 'adaptive':
      default:
        return this.adaptiveSelect(availableAdapters, task);
    }
  }

  /**
   * Adaptive selection based on performance metrics
   */
  adaptiveSelect(adapters, task) {
    // For AR workflows with strict latency requirements, prioritize fastest adapters
    if (task.type === 'ar_workflow' && task.latencyRequirement < 50) {
      return this.selectLowestLatency(adapters);
    }

    // Otherwise, select based on success rate and average latency
    let bestAdapter = adapters[0];
    let bestScore = -Infinity;

    for (const adapterName of adapters) {
      const adapterInfo = this.adapters.get(adapterName);
      if (!adapterInfo) continue;

      // Calculate score: success rate (60%) + latency performance (40%)
      const successRate = adapterInfo.requestCount > 0
        ? (adapterInfo.requestCount - adapterInfo.errorCount) / adapterInfo.requestCount
        : 0.5;
      
      const latencyScore = adapterInfo.avgLatency > 0
        ? 1 / (adapterInfo.avgLatency / 100)
        : 1;

      const score = (successRate * 0.6) + (latencyScore * 0.4);

      if (score > bestScore) {
        bestScore = score;
        bestAdapter = adapterName;
      }
    }

    return bestAdapter;
  }

  /**
   * Select adapter with lowest average latency
   */
  selectLowestLatency(adapters) {
    let bestAdapter = adapters[0];
    let lowestLatency = Infinity;

    for (const adapterName of adapters) {
      const adapterInfo = this.adapters.get(adapterName);
      if (adapterInfo && adapterInfo.avgLatency < lowestLatency) {
        lowestLatency = adapterInfo.avgLatency;
        bestAdapter = adapterName;
      }
    }

    return bestAdapter;
  }

  /**
   * Round-robin selection
   */
  roundRobinSelect(adapters) {
    const index = this.telemetry.totalRequests % adapters.length;
    return adapters[index];
  }

  /**
   * Weighted selection based on priority
   */
  weightedSelect(adapters, task) {
    const weights = [];
    let totalWeight = 0;

    for (const adapterName of adapters) {
      const adapterInfo = this.adapters.get(adapterName);
      if (adapterInfo) {
        weights.push({ name: adapterName, weight: adapterInfo.priority });
        totalWeight += adapterInfo.priority;
      }
    }

    // Random weighted selection
    const random = Math.random() * totalWeight;
    let accumulated = 0;

    for (const { name, weight } of weights) {
      accumulated += weight;
      if (random <= accumulated) {
        return name;
      }
    }

    return adapters[0];
  }

  /**
   * Execute task on selected adapter
   */
  async executeOnAdapter(adapterName, task) {
    const adapterInfo = this.adapters.get(adapterName);
    if (!adapterInfo) {
      throw new Error(`Adapter not found: ${adapterName}`);
    }

    try {
      const result = await adapterInfo.adapter.process(task);
      return result;
    } catch (error) {
      adapterInfo.errorCount++;
      throw new Error(`Adapter ${adapterName} failed: ${error.message}`);
    }
  }

  /**
   * Record telemetry data
   */
  recordTelemetry(adapterName, latency, success) {
    if (!this.config.enableTelemetry) return;

    // Update adapter metrics
    const adapterInfo = this.adapters.get(adapterName);
    if (adapterInfo) {
      adapterInfo.requestCount++;
      
      // Update rolling average latency
      if (adapterInfo.avgLatency === 0) {
        adapterInfo.avgLatency = latency;
      } else {
        adapterInfo.avgLatency = (adapterInfo.avgLatency * 0.8) + (latency * 0.2);
      }
    }

    // Update routing decisions map
    const count = this.telemetry.routingDecisions.get(adapterName) || 0;
    this.telemetry.routingDecisions.set(adapterName, count + 1);

    // Update latency metrics
    const latencies = this.telemetry.latencyMetrics.get(adapterName) || [];
    latencies.push(latency);
    this.telemetry.latencyMetrics.set(adapterName, latencies);

    if (success) {
      this.telemetry.successCount++;
    }
  }

  /**
   * Get telemetry and statistics
   */
  getTelemetry() {
    const adapterStats = {};
    
    for (const [name, info] of this.adapters.entries()) {
      adapterStats[name] = {
        requestCount: info.requestCount,
        errorCount: info.errorCount,
        avgLatency: Math.round(info.avgLatency * 100) / 100,
        successRate: info.requestCount > 0 
          ? ((info.requestCount - info.errorCount) / info.requestCount * 100).toFixed(2) + '%'
          : 'N/A',
        status: info.status
      };
    }

    return {
      totalRequests: this.telemetry.totalRequests,
      successCount: this.telemetry.successCount,
      errorCount: this.telemetry.errorCount,
      successRate: this.telemetry.totalRequests > 0
        ? ((this.telemetry.successCount / this.telemetry.totalRequests) * 100).toFixed(2) + '%'
        : 'N/A',
      routingDecisions: Object.fromEntries(this.telemetry.routingDecisions),
      adapterStats,
      frequency: this.config.frequency
    };
  }

  /**
   * Get router status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      frequency: this.config.frequency,
      adaptersRegistered: this.adapters.size,
      activeAdapters: Array.from(this.adapters.entries())
        .filter(([_, info]) => info.status === 'active')
        .map(([name]) => name),
      routingStrategy: this.config.routingStrategy,
      arWorkflowOptimization: this.config.arWorkflowOptimization,
      telemetryEnabled: this.config.enableTelemetry
    };
  }

  /**
   * Validate router configuration
   */
  validateConfig() {
    if (this.config.frequency !== 963) {
      console.warn('⚠️  Tesla N-GI operates optimally at 963Hz');
    }

    if (this.config.defaultLatencyThreshold < 10) {
      throw new Error('Default latency threshold too low (minimum 10ms)');
    }

    return true;
  }

  /**
   * Update routing configuration dynamically via JSON
   */
  updateConfig(jsonConfig) {
    const config = typeof jsonConfig === 'string' ? JSON.parse(jsonConfig) : jsonConfig;
    
    // Update allowed configuration fields
    const allowedFields = [
      'defaultLatencyThreshold',
      'arWorkflowOptimization',
      'enableTelemetry',
      'routingStrategy'
    ];

    for (const field of allowedFields) {
      if (config[field] !== undefined) {
        this.config[field] = config[field];
      }
    }

    console.log('✓ Router configuration updated');
    return this.config;
  }

  /**
   * Reset telemetry data
   */
  resetTelemetry() {
    this.telemetry = {
      totalRequests: 0,
      routingDecisions: new Map(),
      latencyMetrics: new Map(),
      errorCount: 0,
      successCount: 0
    };

    this.routingHistory = [];

    // Reset adapter-specific metrics
    for (const [_, adapterInfo] of this.adapters.entries()) {
      adapterInfo.requestCount = 0;
      adapterInfo.errorCount = 0;
      adapterInfo.avgLatency = 0;
    }

    console.log('✓ Telemetry reset');
    return true;
  }
}

module.exports = TeslaNGIRouter;
