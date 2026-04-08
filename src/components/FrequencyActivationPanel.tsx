/**
 * Live Frequency Activation Panel Component
 * Real-time visualization and control of frequency detection
 */

import React, { useState, useEffect, useRef } from 'react';
import LiveFrequencyActivation, {
  FrequencyActivationEvent,
  frequencyFeatures,
} from '../frequency-activation';

interface FrequencyStatus {
  frequency: number;
  detected: boolean;
  amplitude: number;
  confidence: number;
  lastDetection: number;
}

export const FrequencyActivationPanel: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [frequencyStatus, setFrequencyStatus] = useState<FrequencyStatus[]>([
    { frequency: 528, detected: false, amplitude: 0, confidence: 0, lastDetection: 0 },
    { frequency: 963, detected: false, amplitude: 0, confidence: 0, lastDetection: 0 },
    { frequency: 432, detected: false, amplitude: 0, confidence: 0, lastDetection: 0 },
  ]);
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([]);
  const [stats, setStats] = useState<any>({});
  const activationRef = useRef<LiveFrequencyActivation | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize frequency activation
  const handleInitialize = async () => {
    try {
      if (!activationRef.current) {
        activationRef.current = new LiveFrequencyActivation({
          fftSize: 2048,
          smoothingTimeConstant: 0.8,
          frequencyThreshold: 0.1,
          confidenceThreshold: 0.7,
        });

        // Register callbacks for each frequency
        [528, 963, 432].forEach((freq) => {
          activationRef.current!.onFrequencyDetected(freq, (event: FrequencyActivationEvent) => {
            handleFrequencyDetected(event);
          });
        });
      }

      await activationRef.current.initialize();
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize frequency activation:', error);
      alert('Failed to initialize frequency detection. Please check microphone permissions.');
    }
  };

  // Start frequency detection
  const handleStart = () => {
    if (activationRef.current) {
      activationRef.current.start();
      setIsRunning(true);

      // Update stats every 2 seconds
      statsIntervalRef.current = setInterval(() => {
        const newStats = activationRef.current?.getFrequencyStats();
        setStats(newStats);
      }, 2000);
    }
  };

  // Stop frequency detection
  const handleStop = () => {
    if (activationRef.current) {
      activationRef.current.stop();
      setIsRunning(false);

      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
      }
    }
  };

  // Handle frequency detection
  const handleFrequencyDetected = (event: FrequencyActivationEvent) => {
    // Update frequency status
    setFrequencyStatus((prev) =>
      prev.map((status) =>
        status.frequency === event.frequency
          ? {
              ...status,
              detected: true,
              amplitude: event.amplitude,
              confidence: event.confidence,
              lastDetection: event.timestamp,
            }
          : status
      )
    );

    // Add to unlocked features
    if (!unlockedFeatures.includes(event.featureUnlocked)) {
      setUnlockedFeatures((prev) => [...prev, event.featureUnlocked]);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (activationRef.current) {
        activationRef.current.cleanup();
      }
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="frequency-activation-panel">
      <style>{`
        .frequency-activation-panel {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border: 2px solid #0f3460;
          border-radius: 12px;
          padding: 24px;
          color: #eaeaea;
          font-family: 'Courier New', monospace;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 2px solid #0f3460;
          padding-bottom: 16px;
        }

        .panel-title {
          font-size: 24px;
          font-weight: bold;
          background: linear-gradient(90deg, #ff6b9d 0%, #9d4edd 50%, #3a86ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .control-buttons {
          display: flex;
          gap: 12px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Courier New', monospace;
        }

        .btn-primary {
          background: linear-gradient(90deg, #3a86ff 0%, #8338ec 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(51, 56, 236, 0.3);
        }

        .btn-secondary {
          background: #0f3460;
          color: #eaeaea;
          border: 2px solid #3a86ff;
        }

        .btn-secondary:hover {
          background: #1a4d7a;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .frequency-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .frequency-card {
          background: rgba(15, 52, 96, 0.5);
          border: 2px solid #0f3460;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.3s ease;
        }

        .frequency-card.detected {
          border-color: #ff6b9d;
          background: rgba(255, 107, 157, 0.1);
          box-shadow: 0 0 20px rgba(255, 107, 157, 0.3);
        }

        .frequency-label {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #3a86ff;
        }

        .frequency-value {
          font-size: 14px;
          margin-bottom: 8px;
          color: #aaa;
        }

        .amplitude-bar {
          background: #0f3460;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .amplitude-fill {
          height: 100%;
          background: linear-gradient(90deg, #3a86ff 0%, #ff6b9d 100%);
          transition: width 0.1s ease;
        }

        .confidence-badge {
          display: inline-block;
          background: #0f3460;
          border: 1px solid #3a86ff;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
          color: #3a86ff;
        }

        .unlocked-features {
          background: rgba(15, 52, 96, 0.5);
          border: 2px solid #0f3460;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .unlocked-features-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 12px;
          color: #3a86ff;
        }

        .features-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .feature-badge {
          background: linear-gradient(135deg, #ff6b9d 0%, #9d4edd 100%);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: bold;
        }

        .stats-section {
          background: rgba(15, 52, 96, 0.5);
          border: 2px solid #0f3460;
          border-radius: 8px;
          padding: 16px;
        }

        .stats-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 12px;
          color: #3a86ff;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }

        .stat-item {
          background: rgba(0, 0, 0, 0.3);
          padding: 12px;
          border-radius: 6px;
          text-align: center;
        }

        .stat-label {
          font-size: 12px;
          color: #aaa;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 16px;
          font-weight: bold;
          color: #3a86ff;
        }

        .status-indicator {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .status-indicator.active {
          background: #00ff00;
        }

        .status-indicator.inactive {
          background: #ff0000;
          animation: none;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      <div className="panel-header">
        <div className="panel-title">
          <span className="status-indicator" style={{
            background: isRunning ? '#00ff00' : '#ff0000',
            animation: isRunning ? 'pulse 1.5s ease-in-out infinite' : 'none'
          }}></span>
          Live Frequency Activation
        </div>
        <div className="control-buttons">
          <button
            className="btn btn-primary"
            onClick={handleInitialize}
            disabled={isInitialized}
          >
            {isInitialized ? '✓ Initialized' : 'Initialize'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={isRunning ? handleStop : handleStart}
            disabled={!isInitialized}
          >
            {isRunning ? 'Stop Detection' : 'Start Detection'}
          </button>
        </div>
      </div>

      <div className="frequency-grid">
        {frequencyStatus.map((status) => (
          <div
            key={status.frequency}
            className={`frequency-card ${status.detected ? 'detected' : ''}`}
          >
            <div className="frequency-label">{status.frequency} Hz</div>
            <div className="frequency-value">
              {frequencyFeatures[
                status.frequency === 528
                  ? 'DNA_HEALING_UNLOCK'
                  : status.frequency === 963
                  ? 'ENLIGHTENMENT_MODE_UNLOCK'
                  : 'UNIVERSAL_HARMONY_UNLOCK'
              ].name}
            </div>
            <div className="amplitude-bar">
              <div
                className="amplitude-fill"
                style={{ width: `${status.amplitude * 100}%` }}
              ></div>
            </div>
            <div className="frequency-value">
              Amplitude: {(status.amplitude * 100).toFixed(1)}%
            </div>
            <span className="confidence-badge">
              Confidence: {(status.confidence * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      {unlockedFeatures.length > 0 && (
        <div className="unlocked-features">
          <div className="unlocked-features-title">✨ Unlocked Features</div>
          <div className="features-list">
            {unlockedFeatures.map((feature) => (
              <div key={feature} className="feature-badge">
                {frequencyFeatures[feature as keyof typeof frequencyFeatures]?.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(stats).length > 0 && (
        <div className="stats-section">
          <div className="stats-title">Detection Statistics</div>
          <div className="stats-grid">
            {Object.entries(stats).map(([freq, data]: [string, any]) => (
              <div key={freq} className="stat-item">
                <div className="stat-label">{freq} Hz</div>
                <div className="stat-value">{data.detections}</div>
                <div className="stat-label">detections</div>
                <div className="stat-value" style={{ fontSize: '12px', marginTop: '4px' }}>
                  Avg: {(data.averageConfidence * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FrequencyActivationPanel;
