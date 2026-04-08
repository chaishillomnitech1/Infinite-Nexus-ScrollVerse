/**
 * Live Frequency Activation Module
 * Real-time audio analysis and frequency detection (528Hz, 963Hz, 432Hz)
 * Unlocks ecosystem features based on detected frequencies
 */

export interface FrequencyDetectionResult {
  frequency: number;
  amplitude: number;
  confidence: number;
  detected: boolean;
  timestamp: number;
}

export interface FrequencyActivationEvent {
  frequency: number;
  amplitude: number;
  confidence: number;
  featureUnlocked: string;
  timestamp: number;
}

export interface AudioAnalysisConfig {
  fftSize?: number;
  smoothingTimeConstant?: number;
  frequencyThreshold?: number;
  confidenceThreshold?: number;
  sampleRate?: number;
}

/**
 * Live Frequency Activation System
 * Detects sacred frequencies and activates corresponding features
 */
export class LiveFrequencyActivation {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private mediaStream: MediaStream | null = null;
  private sourceNode: MediaStreamAudioSourceNode | null = null;
  private isActive: boolean = false;
  private detectionCallbacks: Map<number, (event: FrequencyActivationEvent) => void>;
  private config: Required<AudioAnalysisConfig>;
  private frequencyMap: Map<number, string>;
  private detectionHistory: FrequencyDetectionResult[];

  constructor(config: AudioAnalysisConfig = {}) {
    this.config = {
      fftSize: config.fftSize || 2048,
      smoothingTimeConstant: config.smoothingTimeConstant || 0.8,
      frequencyThreshold: config.frequencyThreshold || 0.1,
      confidenceThreshold: config.confidenceThreshold || 0.7,
      sampleRate: config.sampleRate || 44100,
    };

    this.detectionCallbacks = new Map();
    this.detectionHistory = [];

    // Map frequencies to features
    this.frequencyMap = new Map([
      [528, 'DNA_HEALING_UNLOCK'],
      [963, 'ENLIGHTENMENT_MODE_UNLOCK'],
      [432, 'UNIVERSAL_HARMONY_UNLOCK'],
    ]);
  }

  /**
   * Initialize audio context and start frequency detection
   */
  async initialize(): Promise<void> {
    try {
      // Get user's audio input
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      // Create audio context
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create analyser node
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.config.fftSize;
      this.analyser.smoothingTimeConstant = this.config.smoothingTimeConstant;

      // Create source node
      this.sourceNode = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.sourceNode.connect(this.analyser);

      console.log('✓ Live Frequency Activation initialized');
      console.log(`  Sample Rate: ${this.audioContext.sampleRate} Hz`);
      console.log(`  FFT Size: ${this.config.fftSize}`);
    } catch (error) {
      console.error('Failed to initialize Live Frequency Activation:', error);
      throw error;
    }
  }

  /**
   * Start real-time frequency detection
   */
  start(): void {
    if (!this.analyser) {
      throw new Error('Frequency activation not initialized');
    }

    this.isActive = true;
    this.detectFrequencies();
    console.log('✓ Frequency detection started');
  }

  /**
   * Stop frequency detection
   */
  stop(): void {
    this.isActive = false;
    console.log('✓ Frequency detection stopped');
  }

  /**
   * Real-time frequency detection loop
   */
  private detectFrequencies(): void {
    if (!this.isActive || !this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    // Analyze for target frequencies
    const targetFrequencies = [528, 963, 432];
    const sampleRate = this.audioContext?.sampleRate || this.config.sampleRate;
    const nyquistFrequency = sampleRate / 2;
    const binWidth = nyquistFrequency / dataArray.length;

    targetFrequencies.forEach((targetFreq) => {
      const binIndex = Math.round(targetFreq / binWidth);

      if (binIndex < dataArray.length) {
        const amplitude = dataArray[binIndex] / 255;
        const confidence = this.calculateConfidence(dataArray, binIndex);

        const result: FrequencyDetectionResult = {
          frequency: targetFreq,
          amplitude,
          confidence,
          detected: confidence > this.config.confidenceThreshold,
          timestamp: Date.now(),
        };

        this.detectionHistory.push(result);

        // Trigger callback if frequency detected
        if (result.detected) {
          this.triggerFrequencyActivation(result);
        }
      }
    });

    // Continue detection loop
    requestAnimationFrame(() => this.detectFrequencies());
  }

  /**
   * Calculate confidence score for frequency detection
   */
  private calculateConfidence(
    dataArray: Uint8Array,
    binIndex: number,
    windowSize: number = 5
  ): number {
    const centerValue = dataArray[binIndex] / 255;
    let sum = centerValue;
    let count = 1;

    // Check neighboring bins
    for (let i = 1; i <= windowSize; i++) {
      if (binIndex - i >= 0) {
        sum += dataArray[binIndex - i] / 255;
        count++;
      }
      if (binIndex + i < dataArray.length) {
        sum += dataArray[binIndex + i] / 255;
        count++;
      }
    }

    const average = sum / count;
    const variance = Math.abs(centerValue - average);

    // Higher confidence if center is significantly higher than neighbors
    return Math.min(1, centerValue * (1 + variance));
  }

  /**
   * Trigger activation when frequency is detected
   */
  private triggerFrequencyActivation(result: FrequencyDetectionResult): void {
    const featureUnlocked = this.frequencyMap.get(result.frequency);

    if (featureUnlocked) {
      const event: FrequencyActivationEvent = {
        frequency: result.frequency,
        amplitude: result.amplitude,
        confidence: result.confidence,
        featureUnlocked,
        timestamp: result.timestamp,
      };

      console.log(`✓ Frequency Detected: ${result.frequency}Hz`);
      console.log(`  Feature Unlocked: ${featureUnlocked}`);
      console.log(`  Confidence: ${(result.confidence * 100).toFixed(1)}%`);

      // Call registered callbacks
      const callback = this.detectionCallbacks.get(result.frequency);
      if (callback) {
        callback(event);
      }
    }
  }

  /**
   * Register callback for frequency detection
   */
  onFrequencyDetected(frequency: number, callback: (event: FrequencyActivationEvent) => void): void {
    this.detectionCallbacks.set(frequency, callback);
  }

  /**
   * Get detection history
   */
  getDetectionHistory(limit: number = 100): FrequencyDetectionResult[] {
    return this.detectionHistory.slice(-limit);
  }

  /**
   * Get frequency statistics
   */
  getFrequencyStats(): {
    [frequency: number]: {
      detections: number;
      averageAmplitude: number;
      averageConfidence: number;
    };
  } {
    const stats: any = {};

    [528, 963, 432].forEach((freq) => {
      const detections = this.detectionHistory.filter((d) => d.frequency === freq);
      stats[freq] = {
        detections: detections.length,
        averageAmplitude:
          detections.length > 0
            ? detections.reduce((sum, d) => sum + d.amplitude, 0) / detections.length
            : 0,
        averageConfidence:
          detections.length > 0
            ? detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length
            : 0,
      };
    });

    return stats;
  }

  /**
   * Cleanup and release resources
   */
  async cleanup(): Promise<void> {
    this.stop();

    if (this.sourceNode) {
      this.sourceNode.disconnect();
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }

    if (this.audioContext) {
      await this.audioContext.close();
    }

    this.detectionCallbacks.clear();
    this.detectionHistory = [];

    console.log('✓ Live Frequency Activation cleaned up');
  }

  /**
   * Check if frequency detection is active
   */
  isRunning(): boolean {
    return this.isActive;
  }

  /**
   * Get current configuration
   */
  getConfiguration(): Required<AudioAnalysisConfig> {
    return { ...this.config };
  }
}

/**
 * Feature unlock handlers
 */
export const frequencyFeatures = {
  DNA_HEALING_UNLOCK: {
    name: '528 Hz - DNA Healing',
    description: 'Unlocks cellular regeneration and healing features',
    color: '#FF6B9D',
  },
  ENLIGHTENMENT_MODE_UNLOCK: {
    name: '963 Hz - Enlightenment',
    description: 'Activates higher consciousness and spiritual features',
    color: '#9D4EDD',
  },
  UNIVERSAL_HARMONY_UNLOCK: {
    name: '432 Hz - Universal Harmony',
    description: 'Enables universal synchronization and balance',
    color: '#3A86FF',
  },
};

/**
 * Factory function to create Live Frequency Activation instance
 */
export function createLiveFrequencyActivation(
  config?: AudioAnalysisConfig
): LiveFrequencyActivation {
  return new LiveFrequencyActivation(config);
}

export default LiveFrequencyActivation;
