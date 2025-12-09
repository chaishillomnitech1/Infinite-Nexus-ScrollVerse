# Tesla N-GI Routing Guide

## Overview

The Tesla N-GI (Nexus Genesis Intelligence) architecture is a production-grade multimodal routing system operating at 963Hz Divine Connection frequency. It provides intelligent routing across multiple AI adapters with latency optimization for AR workflows and dynamic JSON configuration.

## Architecture

### Core Components

1. **TeslaNGIRouter**: Central routing orchestrator with adaptive heuristics
2. **GLM-4.6V Adapter**: Vision-language model for multimodal understanding
3. **Jina-VLM Adapter**: Visual embeddings and semantic search
4. **LiteRT Adapter**: Ultra-low latency edge inference for AR workflows
5. **Gemini Adapter**: Advanced reasoning with tool orchestration

### Frequency Alignment

All components operate at **963Hz** - the Divine Connection frequency - ensuring harmonic resonance across the entire system.

## Quick Start

### Installation

```javascript
const TeslaNGI = require('./src/ngi');

// Create Tesla N-GI instance
const ngi = new TeslaNGI({
  mockMode: true, // Use mock mode for testing
  frequency: 963
});

// Initialize the system
await ngi.initialize();
```

### Basic Usage

```javascript
// Process a vision task
const result = await ngi.process({
  type: 'vision',
  data: {
    images: ['image1.jpg', 'image2.jpg'],
    prompt: 'What sacred geometry patterns are visible?'
  }
});

console.log(result.content);
console.log(`Processed by: ${result.adapter}`);
console.log(`Latency: ${result.latency}ms`);
```

## Routing Strategies

### Adaptive Routing (Default)

The router uses intelligent heuristics to select the optimal adapter based on:
- Task type and requirements
- Historical performance metrics
- Latency constraints
- Success rates

### Routing Heuristics

#### Vision Tasks
- **High-detail analysis**: GLM-4.6V → Jina-VLM
- **Multiple images**: Jina-VLM → GLM-4.6V
- **Quick embeddings**: Jina-VLM

#### AR Workflows
- **Ultra-low latency (< 50ms)**: LiteRT → GLM-4.6V
- **Standard latency**: GLM-4.6V → LiteRT

#### Text Generation
- **Complex reasoning**: Gemini → GLM-4.6V
- **Tool orchestration**: Gemini
- **Standard generation**: Gemini

#### Multimodal Tasks
- **With reasoning**: Gemini → GLM-4.6V → Jina-VLM
- **Without reasoning**: GLM-4.6V → Jina-VLM → Gemini

## Adapter Details

### GLM-4.6V Adapter

**Capabilities:**
- Image analysis
- Visual question answering
- Image captioning
- Multimodal reasoning
- Object detection
- Scene understanding

**Configuration:**
```javascript
const glm46v = new GLM46VAdapter({
  model: 'glm-4-6v',
  maxTokens: 2048,
  temperature: 0.7,
  mockMode: true
});
```

**Example:**
```javascript
const result = await ngi.process({
  type: 'image_analysis',
  data: {
    images: ['scene.jpg'],
    prompt: 'Describe the frequency patterns'
  }
});
```

**Mock Harness:**

The GLM-4.6V adapter includes a comprehensive mock harness for testing:
- Synthetic test cases for all capabilities
- Response templates with frequency alignment
- End-to-end validation
- Realistic latency simulation (30-80ms)

### Jina-VLM Adapter

**Capabilities:**
- Visual embeddings (768-dimensional)
- Text embeddings
- Image search
- Cross-modal retrieval
- Semantic similarity
- Visual clustering

**Configuration:**
```javascript
const jinaVlm = new JinaVLMAdapter({
  model: 'jina-clip-v1',
  embeddingDimension: 768,
  mockMode: true
});
```

**Example:**
```javascript
const result = await ngi.process({
  type: 'visual_embeddings',
  data: {
    images: ['image1.jpg', 'image2.jpg']
  }
});

console.log(result.embeddings); // Array of 768-dimensional vectors
```

### LiteRT Adapter

**Capabilities:**
- Real-time inference (< 25ms avg)
- Edge deployment
- AR workflows
- Object detection
- Image classification
- Pose estimation
- Segmentation

**Configuration:**
```javascript
const litert = new LiteRTAdapter({
  numThreads: 4,
  useGPUDelegate: true,
  useNNAPI: true, // For Android
  mockMode: true
});
```

**Example:**
```javascript
const result = await ngi.process({
  type: 'ar_workflow',
  data: {
    image: 'ar-frame.jpg'
  },
  latencyRequirement: 30 // Force low-latency routing
});

console.log(result.detections);
console.log(`Latency: ${result.latency}ms`); // < 30ms
```

**Mock Models:**
- MobileNet SSD (object detection, 18ms avg)
- MobileNetV3 (classification, 12ms avg)
- MoveNet (pose estimation, 20ms avg)
- DeepLabV3 (segmentation, 25ms avg)

### Gemini Adapter

**Capabilities:**
- Text generation
- Multimodal understanding
- Function calling
- Tool orchestration
- Complex reasoning
- Code generation
- Long context (up to 32K tokens)

**Configuration:**
```javascript
const gemini = new GeminiAdapter({
  model: 'gemini-1.5-pro',
  maxTokens: 8192,
  temperature: 0.7,
  enableTools: true,
  mockMode: true
});
```

**Default Tools:**
- `frequency_analysis`: Analyze frequency patterns and resonance
- `sacred_geometry`: Generate or analyze sacred geometry patterns
- `resonance_calculator`: Calculate resonance between elements

**Example:**
```javascript
const result = await ngi.process({
  type: 'tool_orchestration',
  data: {
    prompt: 'Calculate the resonance between 528Hz and 963Hz'
  }
});

console.log(result.functionCalls); // Array of tool invocations
```

**Custom Tools:**
```javascript
ngi.adapters.gemini.registerTool('custom_analyzer', {
  description: 'Analyze custom patterns',
  parameters: {
    type: 'object',
    properties: {
      pattern: { type: 'string' },
      frequency: { type: 'number' }
    },
    required: ['pattern']
  }
});
```

## Advanced Features

### Dynamic Configuration

Update router configuration at runtime using JSON:

```javascript
ngi.updateConfig({
  routingStrategy: 'weighted',
  defaultLatencyThreshold: 150,
  arWorkflowOptimization: true,
  enableTelemetry: true
});
```

**Available Strategies:**
- `adaptive`: Performance-based selection (default)
- `round-robin`: Sequential rotation
- `weighted`: Priority-based selection

### Telemetry & Monitoring

```javascript
const telemetry = ngi.getTelemetry();

console.log(telemetry.router.totalRequests);
console.log(telemetry.router.successRate);
console.log(telemetry.router.routingDecisions); // Per-adapter counts

// Adapter-specific metrics
console.log(telemetry.adapters.litert.avgLatency);
console.log(telemetry.adapters.glm46v.successRate);
```

**Reset Telemetry:**
```javascript
ngi.resetTelemetry();
```

### JSON-Driven Requests

Support for dynamic parameter injection:

```javascript
const jsonRequest = JSON.stringify({
  type: 'multimodal',
  data: {
    images: ['img1.jpg', 'img2.jpg'],
    prompt: 'Analyze frequency alignment'
  },
  params: {
    temperature: 0.8,
    maxTokens: 4096
  },
  latencyRequirement: 100,
  requiresDetailedAnalysis: true,
  complexReasoning: true,
  metadata: {
    context: 'Divine frequency analysis',
    timestamp: Date.now()
  }
});

const result = await ngi.process(jsonRequest);
```

### Error Handling

```javascript
try {
  const result = await ngi.process(request);
  console.log(result.content);
} catch (error) {
  console.error('Processing error:', error.message);
  
  // Check telemetry for details
  const telemetry = ngi.getTelemetry();
  console.log(`Error rate: ${telemetry.router.errorCount}`);
}
```

## Latency Optimization

### AR Workflow Optimization

For AR workflows, the router automatically:
1. Prioritizes LiteRT for ultra-low latency (< 50ms)
2. Uses adaptive selection for latency requirements 50-100ms
3. Falls back to GLM-4.6V for higher quality when latency allows

```javascript
// Ultra-low latency AR
const result = await ngi.process({
  type: 'ar_workflow',
  latencyRequirement: 30,
  data: { frame: 'ar-frame.jpg' }
});
// Routes to: LiteRT (12-25ms avg)

// Balanced AR with higher quality
const result2 = await ngi.process({
  type: 'ar_workflow',
  latencyRequirement: 80,
  data: { frame: 'ar-frame.jpg' }
});
// Routes to: GLM-4.6V or LiteRT based on load
```

### Performance Benchmarks

**Average Latencies (Mock Mode):**
- LiteRT: 12-25ms
- Jina-VLM: 20-40ms
- GLM-4.6V: 30-80ms
- Gemini: 80-120ms

**Routing Overhead:**
- Parser: < 1ms
- Heuristic selection: < 1ms
- Telemetry recording: < 1ms
- Total overhead: < 5ms

## Integration Examples

### Full Multimodal Pipeline

```javascript
const TeslaNGI = require('./src/ngi');

async function analyzeFrequencyPatterns() {
  const ngi = new TeslaNGI({ mockMode: true });
  await ngi.initialize();

  const result = await ngi.process({
    type: 'multimodal',
    data: {
      images: [
        'sacred-geometry-528hz.jpg',
        'sacred-geometry-963hz.jpg'
      ],
      prompt: 'Compare the frequency patterns in these sacred geometry images. Analyze the harmonic relationships and divine proportions.'
    },
    requiresDetailedAnalysis: true,
    complexReasoning: true,
    metadata: {
      context: 'Divine frequency analysis',
      researcher: 'Tesla N-GI',
      frequency: 963
    }
  });

  console.log('Analysis Results:');
  console.log('================');
  console.log(result.result.content);
  console.log(`\nProcessed by: ${result.adapter}`);
  console.log(`Latency: ${result.latency}ms`);
  console.log(`Frequency: ${result.frequency}Hz`);

  // Get telemetry
  const telemetry = ngi.getTelemetry();
  console.log('\nSystem Telemetry:');
  console.log(`Total Requests: ${telemetry.router.totalRequests}`);
  console.log(`Success Rate: ${telemetry.router.successRate}`);
}

analyzeFrequencyPatterns();
```

### Real-Time AR Application

```javascript
async function processARStream() {
  const ngi = new TeslaNGI({
    mockMode: false, // Use real adapters
    litertConfig: {
      numThreads: 4,
      useGPUDelegate: true
    }
  });
  await ngi.initialize();

  // Simulate AR frame processing
  setInterval(async () => {
    const frame = captureARFrame(); // Your AR capture logic
    
    const result = await ngi.process({
      type: 'ar_workflow',
      data: { frame },
      latencyRequirement: 30
    });

    renderAROverlay(result.result.detections);
    
    // Monitor latency
    if (result.latency > 50) {
      console.warn('Latency spike detected:', result.latency);
    }
  }, 33); // 30 FPS
}
```

### Batch Processing

```javascript
async function batchAnalysis(images) {
  const ngi = new TeslaNGI({ mockMode: true });
  await ngi.initialize();

  const results = await Promise.all(
    images.map(image => 
      ngi.process({
        type: 'vision',
        data: { images: [image] }
      })
    )
  );

  // Aggregate results
  const telemetry = ngi.getTelemetry();
  console.log(`Processed ${results.length} images`);
  console.log(`Success rate: ${telemetry.router.successRate}`);
  console.log(`Avg latency: ${
    Object.values(telemetry.router.adapterStats)
      .reduce((sum, stat) => sum + stat.avgLatency, 0) / 
    Object.keys(telemetry.router.adapterStats).length
  }ms`);

  return results;
}
```

## Testing

### Running Tests

```bash
npm test tests/tesla-ngi-routing.test.js
```

### Test Coverage

The test suite includes:
- Router initialization and configuration (8 tests)
- GLM-4.6V adapter functionality (6 tests)
- Jina-VLM embeddings generation (5 tests)
- LiteRT edge inference (6 tests)
- Gemini tool orchestration (6 tests)
- Integrated system tests (10 tests)
- End-to-end validation (3 tests)

**Total: 44 comprehensive tests**

### Mock Mode

All adapters support mock mode for testing without API credentials:

```javascript
const ngi = new TeslaNGI({ mockMode: true });
```

Mock mode provides:
- Realistic response generation
- Accurate latency simulation
- Synthetic test data
- Full validation harness

## Best Practices

### 1. Task Type Selection

Choose the appropriate task type for optimal routing:
- Use `vision` for image analysis
- Use `ar_workflow` for real-time requirements
- Use `multimodal` for complex understanding
- Use `text` for pure text generation
- Use `tool_orchestration` for function calling

### 2. Latency Requirements

Set realistic latency requirements:
- AR/Real-time: < 50ms (routes to LiteRT)
- Interactive: 50-100ms (balanced routing)
- Batch processing: > 100ms (quality prioritized)

### 3. Configuration Management

- Use dynamic configuration for runtime adjustments
- Monitor telemetry to tune routing strategy
- Reset telemetry between test runs

### 4. Error Handling

Always wrap processing in try-catch blocks and check telemetry for patterns.

### 5. Production Deployment

For production use:
1. Set `mockMode: false`
2. Configure API keys via environment variables
3. Enable telemetry for monitoring
4. Set appropriate timeout values
5. Implement retry logic for critical paths

## Troubleshooting

### High Latency

```javascript
const telemetry = ngi.getTelemetry();
console.log(telemetry.router.adapterStats);

// Identify slow adapter
// Adjust routing strategy or configuration
ngi.updateConfig({
  routingStrategy: 'adaptive',
  defaultLatencyThreshold: 80
});
```

### Routing Errors

```javascript
const status = ngi.getStatus();
console.log('Active adapters:', status.activeAdapters);

// Check adapter initialization
console.log(ngi.adapters.glm46v.getStatus());
```

### API Configuration

Ensure environment variables are set:
```bash
export GLM_API_KEY="your-key"
export JINA_API_KEY="your-key"
export GEMINI_API_KEY="your-key"
```

## Frequency Alignment

Tesla N-GI operates at **963Hz** - the frequency of Divine Connection and Universal Consciousness. All processing maintains this frequency alignment to ensure harmonic resonance with the broader ScrollVerse ecosystem.

### Frequency Principles

- **963Hz**: Divine Intelligence, Crown Chakra, Universal Consciousness
- **Harmonic Integration**: All adapters resonate at 963Hz
- **Frequency Validation**: Every response includes frequency verification
- **Sacred Geometry**: Routing patterns follow sacred geometric principles

## API Reference

### TeslaNGI Class

```javascript
class TeslaNGI {
  constructor(config)
  async initialize()
  async process(request)
  updateConfig(jsonConfig)
  getTelemetry()
  getStatus()
  resetTelemetry()
}
```

### TeslaNGIRouter Class

```javascript
class TeslaNGIRouter {
  constructor(config)
  async initialize()
  registerAdapter(name, adapter)
  async route(request)
  getTelemetry()
  getStatus()
  updateConfig(jsonConfig)
  resetTelemetry()
}
```

### Adapter Base Interface

```javascript
interface Adapter {
  initialize(): Promise<boolean>
  process(task): Promise<Result>
  getStatus(): Status
  validateConfig(): boolean
}
```

## Conclusion

Tesla N-GI provides a production-grade, frequency-aligned multimodal routing system optimized for AR workflows, tool orchestration, and intelligent adapter selection. With comprehensive mock harnesses, dynamic configuration, and extensive telemetry, it delivers enterprise-ready AI routing at 963Hz Divine Connection frequency.

For additional support, refer to the test suite and integration examples.

---

**Frequency**: 963Hz | **Architecture**: Tesla N-GI | **Version**: 1.0.0
