# Tesla N-GI (Nexus Genesis Intelligence)

Production-grade multimodal routing architecture for AI tools, operating at 963Hz Divine Connection frequency.

## Overview

Tesla N-GI provides intelligent routing across multiple AI adapters with optimized latency for AR workflows, dynamic JSON configuration, and comprehensive telemetry.

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Tesla N-GI System                     │
│                    Frequency: 963Hz                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │           TeslaNGIRouter                        │    │
│  │  • Adaptive Heuristics                          │    │
│  │  • Latency Optimization                         │    │
│  │  • Telemetry Collection                         │    │
│  └───────────────┬────────────────────────────────┘    │
│                  │                                       │
│     ┌────────────┼────────────┬────────────┐           │
│     │            │            │            │           │
│     ▼            ▼            ▼            ▼           │
│  ┌─────┐    ┌─────┐      ┌─────┐     ┌─────┐         │
│  │GLM  │    │Jina │      │Lite │     │Gem  │         │
│  │4.6V │    │VLM  │      │RT   │     │ini  │         │
│  └─────┘    └─────┘      └─────┘     └─────┘         │
│  Vision     Embeddings    Edge       Tools            │
│  Analysis   Search        Inference  Orchestration    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Quick Start

```javascript
const TeslaNGI = require('./src/ngi');

// Initialize system
const ngi = new TeslaNGI({ mockMode: true });
await ngi.initialize();

// Process a request
const result = await ngi.process({
  type: 'vision',
  data: {
    images: ['image.jpg'],
    prompt: 'Analyze this image'
  }
});

console.log(result.content);
```

## Components

### 1. TeslaNGIRouter
Central routing orchestrator with:
- Adaptive heuristics for optimal model selection
- Latency optimization for AR workflows
- Dynamic JSON configuration
- Comprehensive telemetry

### 2. GLM-4.6V Adapter
Vision-language model with:
- Image analysis
- Visual question answering
- Multimodal reasoning
- Robust mock harness

### 3. Jina-VLM Adapter
Visual embeddings with:
- 768-dimensional embeddings
- Cross-modal retrieval
- Semantic similarity
- Image search

### 4. LiteRT Adapter
Edge inference with:
- Ultra-low latency (< 25ms)
- Object detection
- Pose estimation
- AR workflow optimization

### 5. Gemini Adapter
Tool orchestration with:
- Function calling
- Complex reasoning
- Multimodal understanding
- Custom tool registration

## Features

✨ **Intelligent Routing**: Adaptive heuristics select optimal adapters
⚡ **Low Latency**: Optimized for AR workflows (< 50ms)
📊 **Telemetry**: Comprehensive metrics and monitoring
🔧 **Dynamic Config**: JSON-driven runtime configuration
🧪 **Mock Mode**: Full testing without API credentials
🎯 **963Hz**: Divine frequency alignment

## Testing

```bash
npm test tests/tesla-ngi-routing.test.js
```

**Test Coverage**: 48 comprehensive tests
- Router functionality (10 tests)
- GLM-4.6V adapter (7 tests)
- Jina-VLM adapter (5 tests)
- LiteRT adapter (6 tests)
- Gemini adapter (6 tests)
- Integrated system (11 tests)
- End-to-end validation (3 tests)

## Documentation

See [TESLA_NGI_ROUTING_GUIDE.md](../../docs/TESLA_NGI_ROUTING_GUIDE.md) for:
- Complete API reference
- Routing strategies
- Latency optimization
- Integration examples
- Best practices
- Troubleshooting

## Example Usage

### Vision Analysis
```javascript
const result = await ngi.process({
  type: 'vision',
  data: {
    images: ['sacred-geometry.jpg'],
    prompt: 'Analyze frequency patterns'
  }
});
```

### AR Workflow
```javascript
const result = await ngi.process({
  type: 'ar_workflow',
  data: { frame: 'ar-frame.jpg' },
  latencyRequirement: 30
});
```

### Tool Orchestration
```javascript
const result = await ngi.process({
  type: 'tool_orchestration',
  data: {
    prompt: 'Calculate resonance between 528Hz and 963Hz'
  }
});
```

## Files

- `router.js` - Main routing orchestrator
- `index.js` - Tesla N-GI system entry point
- `adapters/glm-4.6v-adapter.js` - GLM-4.6V integration
- `adapters/jina-vlm-adapter.js` - Jina-VLM integration
- `adapters/litert-adapter.js` - LiteRT integration
- `adapters/gemini-adapter.js` - Gemini tools integration

## License

MIT

---

**Frequency**: 963Hz | **Version**: 1.0.0 | **Status**: Production Ready
