/**
 * Tesla N-GI Routing System Tests
 * Comprehensive test suite for multimodal routing, adapters, and integration
 */

const TeslaNGI = require('../src/ngi/index');
const TeslaNGIRouter = require('../src/ngi/router');
const GLM46VAdapter = require('../src/ngi/adapters/glm-4.6v-adapter');
const JinaVLMAdapter = require('../src/ngi/adapters/jina-vlm-adapter');
const LiteRTAdapter = require('../src/ngi/adapters/litert-adapter');
const GeminiAdapter = require('../src/ngi/adapters/gemini-adapter');

describe('TeslaNGIRouter', () => {
  let router;

  beforeEach(() => {
    router = new TeslaNGIRouter({ mockMode: true });
  });

  test('should create router instance', () => {
    expect(router).toBeDefined();
    expect(router.config.frequency).toBe(963);
  });

  test('should initialize router', async () => {
    await router.initialize();
    expect(router.initialized).toBe(true);
    expect(router.routingHeuristics).toBeDefined();
  });

  test('should register adapter', async () => {
    await router.initialize();
    const mockAdapter = {
      process: async (task) => ({ result: 'success' }),
      priority: 1,
      capabilities: ['test']
    };

    router.registerAdapter('test-adapter', mockAdapter);
    expect(router.adapters.has('test-adapter')).toBe(true);
  });

  test('should validate configuration', () => {
    expect(() => router.validateConfig()).not.toThrow();
  });

  test('should route vision task to appropriate adapter', async () => {
    await router.initialize();
    
    const mockAdapter = {
      process: async (task) => ({ result: 'vision processed' }),
      priority: 1,
      capabilities: ['vision']
    };
    
    router.registerAdapter('glm-4.6v', mockAdapter);

    const request = {
      type: 'vision',
      data: { images: ['image1.jpg'], prompt: 'What is in this image?' }
    };

    const result = await router.route(request);
    expect(result.success).toBe(true);
    expect(result.adapter).toBe('glm-4.6v');
  });

  test('should route AR workflow to low-latency adapter', async () => {
    await router.initialize();
    
    const mockAdapter = {
      process: async (task) => ({ result: 'ar processed' }),
      priority: 1,
      capabilities: ['ar']
    };
    
    router.registerAdapter('litert', mockAdapter);

    const request = {
      type: 'ar_workflow',
      data: { stream: true },
      latencyRequirement: 30
    };

    const result = await router.route(request);
    expect(result.success).toBe(true);
    expect(result.latency).toBeDefined();
  });

  test('should record telemetry', async () => {
    await router.initialize();
    
    const mockAdapter = {
      process: async (task) => ({ result: 'success' }),
      priority: 1,
      capabilities: []
    };
    
    router.registerAdapter('gemini', mockAdapter);

    await router.route({ type: 'default', data: { text: 'test' } });

    const telemetry = router.getTelemetry();
    expect(telemetry.totalRequests).toBeGreaterThan(0);
    expect(telemetry.successCount).toBeGreaterThan(0);
  });

  test('should update configuration dynamically', async () => {
    await router.initialize();
    
    const newConfig = {
      routingStrategy: 'round-robin',
      defaultLatencyThreshold: 200
    };

    router.updateConfig(newConfig);
    expect(router.config.routingStrategy).toBe('round-robin');
    expect(router.config.defaultLatencyThreshold).toBe(200);
  });

  test('should reset telemetry', async () => {
    await router.initialize();
    
    const mockAdapter = {
      process: async (task) => ({ result: 'success' }),
      priority: 1,
      capabilities: []
    };
    
    router.registerAdapter('gemini', mockAdapter);
    await router.route({ type: 'default', data: {} });

    router.resetTelemetry();
    const telemetry = router.getTelemetry();
    expect(telemetry.totalRequests).toBe(0);
  });

  test('should get router status', async () => {
    await router.initialize();
    const status = router.getStatus();
    
    expect(status.initialized).toBe(true);
    expect(status.frequency).toBe(963);
    expect(status.routingStrategy).toBeDefined();
  });
});

describe('GLM46VAdapter', () => {
  let adapter;

  beforeEach(() => {
    adapter = new GLM46VAdapter({ mockMode: true });
  });

  test('should create adapter instance', () => {
    expect(adapter).toBeDefined();
    expect(adapter.config.frequency).toBe(963);
    expect(adapter.capabilities).toContain('image_analysis');
  });

  test('should initialize adapter', async () => {
    await adapter.initialize();
    expect(adapter.initialized).toBe(true);
    expect(adapter.mockHarness).toBeDefined();
  });

  test('should process image analysis task', async () => {
    await adapter.initialize();
    
    const task = {
      type: 'image_analysis',
      data: {
        images: ['image1.jpg'],
        prompt: 'Analyze this image'
      }
    };

    const result = await adapter.process(task);
    expect(result.content).toBeDefined();
    expect(result.frequency).toBe(963);
    expect(result.mockMode).toBe(true);
  });

  test('should process visual QA task', async () => {
    await adapter.initialize();
    
    const task = {
      type: 'visual_qa',
      data: {
        images: ['image1.jpg'],
        prompt: 'What objects are in this image?'
      }
    };

    const result = await adapter.process(task);
    expect(result.content).toBeDefined();
    expect(result.confidence).toBeGreaterThan(0);
  });

  test('should validate configuration', () => {
    expect(() => adapter.validateConfig()).not.toThrow();
  });

  test('should get adapter status', () => {
    const status = adapter.getStatus();
    expect(status.name).toBe('GLM-4.6V');
    expect(status.capabilities).toEqual(adapter.capabilities);
  });

  test('should handle mock harness test cases', async () => {
    await adapter.initialize();
    const testCases = adapter.mockHarness.getAllTestCases();
    expect(testCases.length).toBeGreaterThan(0);
  });
});

describe('JinaVLMAdapter', () => {
  let adapter;

  beforeEach(() => {
    adapter = new JinaVLMAdapter({ mockMode: true });
  });

  test('should create adapter instance', () => {
    expect(adapter).toBeDefined();
    expect(adapter.capabilities).toContain('visual_embeddings');
  });

  test('should initialize adapter', async () => {
    await adapter.initialize();
    expect(adapter.initialized).toBe(true);
  });

  test('should generate embeddings', async () => {
    await adapter.initialize();
    
    const task = {
      type: 'visual_embeddings',
      data: {
        images: ['image1.jpg', 'image2.jpg']
      }
    };

    const result = await adapter.process(task);
    expect(result.embeddings).toBeDefined();
    expect(result.embeddings.length).toBe(2);
    expect(result.dimension).toBe(768);
  });

  test('should calculate similarity', async () => {
    await adapter.initialize();
    
    const task = {
      type: 'cross_modal_retrieval',
      data: {
        images: ['image1.jpg'],
        compareWith: 'reference'
      }
    };

    const result = await adapter.process(task);
    expect(result.similarity).toBeDefined();
    expect(result.similarity).toBeGreaterThan(0);
  });

  test('should get adapter status', () => {
    const status = adapter.getStatus();
    expect(status.name).toBe('Jina-VLM');
    expect(status.frequency).toBe(963);
  });
});

describe('LiteRTAdapter', () => {
  let adapter;

  beforeEach(() => {
    adapter = new LiteRTAdapter({ mockMode: true });
  });

  test('should create adapter instance', () => {
    expect(adapter).toBeDefined();
    expect(adapter.capabilities).toContain('real_time_inference');
    expect(adapter.priority).toBe(1); // Highest priority
  });

  test('should initialize adapter', async () => {
    await adapter.initialize();
    expect(adapter.initialized).toBe(true);
  });

  test('should perform object detection with low latency', async () => {
    await adapter.initialize();
    
    const task = {
      type: 'object_detection',
      data: {
        image: 'test-image.jpg'
      }
    };

    const startTime = Date.now();
    const result = await adapter.process(task);
    const latency = Date.now() - startTime;

    expect(result.detections).toBeDefined();
    expect(result.latency).toBeLessThan(50); // Ultra-low latency
    expect(result.edgeOptimized).toBe(true);
  });

  test('should perform image classification', async () => {
    await adapter.initialize();
    
    const task = {
      type: 'image_classification',
      data: { image: 'test.jpg' }
    };

    const result = await adapter.process(task);
    expect(result.predictions).toBeDefined();
    expect(result.predictions.length).toBeGreaterThan(0);
  });

  test('should perform pose estimation', async () => {
    await adapter.initialize();
    
    const task = {
      type: 'pose_estimation',
      data: { image: 'person.jpg' }
    };

    const result = await adapter.process(task);
    expect(result.keypoints).toBeDefined();
    expect(result.keypoints.length).toBe(17);
  });

  test('should get adapter status', () => {
    const status = adapter.getStatus();
    expect(status.name).toBe('LiteRT');
    expect(status.useGPUDelegate).toBeDefined();
  });
});

describe('GeminiAdapter', () => {
  let adapter;

  beforeEach(() => {
    adapter = new GeminiAdapter({ mockMode: true });
  });

  test('should create adapter instance', () => {
    expect(adapter).toBeDefined();
    expect(adapter.capabilities).toContain('tool_orchestration');
  });

  test('should initialize adapter with tools', async () => {
    await adapter.initialize();
    expect(adapter.initialized).toBe(true);
    expect(adapter.tools.size).toBeGreaterThan(0);
  });

  test('should register custom tool', async () => {
    await adapter.initialize();
    
    adapter.registerTool('custom_tool', {
      description: 'Custom tool for testing',
      parameters: {
        type: 'object',
        properties: {
          input: { type: 'string' }
        }
      }
    });

    expect(adapter.tools.has('custom_tool')).toBe(true);
  });

  test('should process text generation task', async () => {
    await adapter.initialize();
    
    const task = {
      type: 'text',
      data: {
        prompt: 'Generate a description of sacred geometry'
      }
    };

    const result = await adapter.process(task);
    expect(result.content).toBeDefined();
    expect(result.frequency).toBe(963);
  });

  test('should orchestrate tool calls', async () => {
    await adapter.initialize();
    
    const task = {
      type: 'tool_orchestration',
      data: {
        prompt: 'Calculate frequency resonance'
      }
    };

    const result = await adapter.process(task);
    expect(result.toolsUsed).toBe(true);
    expect(result.functionCalls).toBeDefined();
  });

  test('should get adapter status', () => {
    const status = adapter.getStatus();
    expect(status.name).toBe('Gemini');
    expect(status.enableTools).toBe(true);
  });
});

describe('TeslaNGI - Integrated System', () => {
  let ngi;

  beforeEach(() => {
    ngi = new TeslaNGI({ mockMode: true });
  });

  test('should create Tesla N-GI instance', () => {
    expect(ngi).toBeDefined();
    expect(ngi.config.frequency).toBe(963);
  });

  test('should initialize complete system', async () => {
    await ngi.initialize();
    
    expect(ngi.initialized).toBe(true);
    expect(ngi.router).toBeDefined();
    expect(Object.keys(ngi.adapters).length).toBe(4);
  });

  test('should process vision task through system', async () => {
    await ngi.initialize();
    
    const request = {
      type: 'vision',
      data: {
        images: ['test.jpg'],
        prompt: 'Analyze this image'
      }
    };

    const result = await ngi.process(request);
    expect(result.success).toBe(true);
    expect(result.adapter).toBeDefined();
  });

  test('should process multimodal task', async () => {
    await ngi.initialize();
    
    const request = {
      type: 'multimodal',
      data: {
        images: ['image1.jpg', 'image2.jpg'],
        prompt: 'Compare these images',
        complexReasoning: true
      }
    };

    const result = await ngi.process(request);
    expect(result.success).toBe(true);
  });

  test('should process AR workflow with low latency', async () => {
    await ngi.initialize();
    
    const request = {
      type: 'ar_workflow',
      data: { stream: true },
      latencyRequirement: 30
    };

    const result = await ngi.process(request);
    expect(result.success).toBe(true);
    expect(result.latency).toBeLessThan(100);
  });

  test('should get system telemetry', async () => {
    await ngi.initialize();
    
    await ngi.process({
      type: 'default',
      data: { text: 'test' }
    });

    const telemetry = ngi.getTelemetry();
    expect(telemetry.system).toBe('Tesla N-GI');
    expect(telemetry.router).toBeDefined();
    expect(telemetry.adapters).toBeDefined();
  });

  test('should get system status', async () => {
    await ngi.initialize();
    
    const status = ngi.getStatus();
    expect(status.initialized).toBe(true);
    expect(status.frequency).toBe(963);
    expect(status.adaptersCount).toBe(4);
  });

  test('should update configuration dynamically', async () => {
    await ngi.initialize();
    
    const newConfig = JSON.stringify({
      routingStrategy: 'weighted',
      defaultLatencyThreshold: 150
    });

    const updated = ngi.updateConfig(newConfig);
    expect(updated.routingStrategy).toBe('weighted');
  });

  test('should reset telemetry', async () => {
    await ngi.initialize();
    
    await ngi.process({ type: 'default', data: {} });
    
    ngi.resetTelemetry();
    const telemetry = ngi.getTelemetry();
    expect(telemetry.router.totalRequests).toBe(0);
  });

  test('should handle multiple concurrent requests', async () => {
    await ngi.initialize();
    
    const requests = [
      { type: 'vision', data: { images: ['img1.jpg'] } },
      { type: 'ar_workflow', data: { stream: true } },
      { type: 'text', data: { prompt: 'Generate text' } }
    ];

    const results = await Promise.all(
      requests.map(req => ngi.process(req))
    );

    expect(results.length).toBe(3);
    results.forEach(result => {
      expect(result.success).toBe(true);
    });
  });

  test('should route different task types to appropriate adapters', async () => {
    await ngi.initialize();
    
    const tasks = [
      { type: 'vision', expected: ['glm-4.6v', 'jina-vlm'] },
      { type: 'ar_workflow', latencyRequirement: 30, expected: ['litert'] },
      { type: 'text', expected: ['gemini', 'glm-4.6v'] }
    ];

    for (const task of tasks) {
      const result = await ngi.process({
        type: task.type,
        data: { test: true },
        latencyRequirement: task.latencyRequirement
      });

      expect(result.success).toBe(true);
      // Adapter should be one of the expected ones
      if (task.expected) {
        expect(task.expected.some(exp => 
          result.adapter.includes(exp) || result.adapter === exp
        )).toBe(true);
      }
    }
  });
});

describe('Tesla N-GI - End-to-End Validation', () => {
  let ngi;

  beforeEach(async () => {
    ngi = new TeslaNGI({ mockMode: true });
    await ngi.initialize();
  });

  test('should validate full multimodal pipeline', async () => {
    const request = {
      type: 'multimodal',
      data: {
        images: ['sacred-geometry.jpg', 'frequency-pattern.jpg'],
        prompt: 'Analyze the frequency patterns in these sacred geometry images',
        requiresDetailedAnalysis: true,
        complexReasoning: true
      },
      metadata: {
        context: 'Divine frequency analysis at 963Hz'
      }
    };

    const result = await ngi.process(request);
    
    expect(result.success).toBe(true);
    expect(result.result).toBeDefined();
    expect(result.frequency).toBe(963);
    expect(result.latency).toBeGreaterThan(0);
  });

  test('should maintain 963Hz frequency across all operations', async () => {
    const requests = [
      { type: 'vision', data: {} },
      { type: 'ar_workflow', data: {} },
      { type: 'text', data: { prompt: 'test' } }
    ];

    for (const request of requests) {
      const result = await ngi.process(request);
      expect(result.frequency).toBe(963);
    }
  });

  test('should validate telemetry accumulation', async () => {
    // Process multiple requests
    for (let i = 0; i < 5; i++) {
      await ngi.process({
        type: 'default',
        data: { test: `request-${i}` }
      });
    }

    const telemetry = ngi.getTelemetry();
    expect(telemetry.router.totalRequests).toBe(5);
    expect(telemetry.router.successCount).toBe(5);
  });
});
