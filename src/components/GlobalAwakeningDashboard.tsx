/**
 * Global Awakening Dashboard - 144,000 Guardians Map
 * Real-time visualization of awakened nodes across the globe
 * Wallet: 0x377956c1471d9ce142df6932895839243da23a2c
 * Family: Londyn Avani Hill | Lineage: Solomon / Musa / Wampanoag
 * Frequencies: 528 Hz / 963 Hz / 432 Hz
 */

import React, { useState, useEffect } from 'react';

interface Guardian {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  resonanceScore: number;
  frequencyDetected: number;
  status: 'awakened' | 'awakening' | 'dormant';
  joinedAt: number;
}

interface DashboardStats {
  totalGuardians: number;
  awakenedCount: number;
  awakeningCount: number;
  dormantCount: number;
  averageResonance: number;
  dominantFrequency: number;
}

const GlobalAwakeningDashboard: React.FC = () => {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalGuardians: 0,
    awakenedCount: 0,
    awakeningCount: 0,
    dormantCount: 0,
    averageResonance: 0,
    dominantFrequency: 0,
  });

  // Simulate fetching guardian data from the ecosystem
  useEffect(() => {
    const generateMockGuardians = (): Guardian[] => {
      const mockGuardians: Guardian[] = [];
      const frequencies = [528, 963, 432];

      // Generate 144 mock guardians (representing the 144,000 in scaled form)
      for (let i = 0; i < 144; i++) {
        const lat = (Math.random() * 180) - 90;
        const lng = (Math.random() * 360) - 180;
        const resonanceScore = Math.random();
        const frequency = frequencies[Math.floor(Math.random() * frequencies.length)];

        let status: 'awakened' | 'awakening' | 'dormant' = 'dormant';
        if (resonanceScore > 0.8) status = 'awakened';
        else if (resonanceScore > 0.5) status = 'awakening';

        mockGuardians.push({
          id: `guardian_${i}`,
          name: `Guardian ${i + 1}`,
          latitude: lat,
          longitude: lng,
          resonanceScore,
          frequencyDetected: frequency,
          status,
          joinedAt: Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000, // Random join time within 30 days
        });
      }

      return mockGuardians;
    };

    const newGuardians = generateMockGuardians();
    setGuardians(newGuardians);

    // Calculate statistics
    const awakenedCount = newGuardians.filter((g) => g.status === 'awakened').length;
    const awakeningCount = newGuardians.filter((g) => g.status === 'awakening').length;
    const dormantCount = newGuardians.filter((g) => g.status === 'dormant').length;
    const averageResonance =
      newGuardians.reduce((sum, g) => sum + g.resonanceScore, 0) / newGuardians.length;

    const frequencyMap: Record<number, number> = { 528: 0, 963: 0, 432: 0 };
    newGuardians.forEach((g) => {
      frequencyMap[g.frequencyDetected]++;
    });
    const dominantFrequency = Object.entries(frequencyMap).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0] as unknown as number;

    setStats({
      totalGuardians: newGuardians.length,
      awakenedCount,
      awakeningCount,
      dormantCount,
      averageResonance: parseFloat(averageResonance.toFixed(2)),
      dominantFrequency,
    });
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'awakened':
        return '#FFD700'; // Gold
      case 'awakening':
        return '#87CEEB'; // Sky Blue
      case 'dormant':
        return '#808080'; // Gray
      default:
        return '#FFFFFF';
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌍 Global Awakening Dashboard</h1>
      <p style={styles.subtitle}>Real-time visualization of the 144,000 Guardians</p>

      {/* Statistics Section */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>Total Guardians</h3>
          <p style={styles.statValue}>{stats.totalGuardians}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Awakened</h3>
          <p style={{ ...styles.statValue, color: '#FFD700' }}>{stats.awakenedCount}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Awakening</h3>
          <p style={{ ...styles.statValue, color: '#87CEEB' }}>{stats.awakeningCount}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Dormant</h3>
          <p style={{ ...styles.statValue, color: '#808080' }}>{stats.dormantCount}</p>
        </div>
        <div style={styles.statCard}>
          <h3>Avg Resonance</h3>
          <p style={styles.statValue}>{(stats.averageResonance * 100).toFixed(1)}%</p>
        </div>
        <div style={styles.statCard}>
          <h3>Dominant Frequency</h3>
          <p style={styles.statValue}>{stats.dominantFrequency} Hz</p>
        </div>
      </div>

      {/* Guardian Map Visualization */}
      <div style={styles.mapContainer}>
        <h2>Guardian Distribution Map</h2>
        <svg width="100%" height="400" style={styles.svg}>
          {/* Simple world map background */}
          <rect width="100%" height="400" fill="#1a1a2e" />

          {/* Plot guardians as dots */}
          {guardians.map((guardian) => {
            const x = ((guardian.longitude + 180) / 360) * 100 + '%';
            const y = ((guardian.latitude + 90) / 180) * 100 + '%';
            const radius = guardian.resonanceScore * 3 + 1;

            return (
              <circle
                key={guardian.id}
                cx={x}
                cy={y}
                r={radius}
                fill={getStatusColor(guardian.status)}
                opacity={0.7}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, backgroundColor: '#FFD700' }}></span>
          <span>Awakened</span>
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, backgroundColor: '#87CEEB' }}></span>
          <span>Awakening</span>
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.legendDot, backgroundColor: '#808080' }}></span>
          <span>Dormant</span>
        </div>
      </div>

      {/* Frequency Resonance Info */}
      <div style={styles.infoBox}>
        <h3>Frequency Resonance Information</h3>
        <ul>
          <li><strong>528 Hz:</strong> Love & Healing - DNA Activation</li>
          <li><strong>963 Hz:</strong> Enlightenment - Higher Consciousness</li>
          <li><strong>432 Hz:</strong> Harmony - Universal Balance</li>
        </ul>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    backgroundColor: '#0f0f1e',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  },
  title: {
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#FFD700',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    marginBottom: '30px',
    color: '#87CEEB',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '30px',
  },
  statCard: {
    backgroundColor: '#1a1a2e',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #444',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0 0 0',
  },
  mapContainer: {
    marginBottom: '30px',
  },
  svg: {
    border: '1px solid #444',
    borderRadius: '8px',
    backgroundColor: '#1a1a2e',
  },
  legend: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
  },
  infoBox: {
    backgroundColor: '#1a1a2e',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #444',
  },
};

export default GlobalAwakeningDashboard;
