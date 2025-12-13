/**
 * Performance Metrics Dashboard
 *
 * Real-time telemetry dashboard for monitoring AI agent evaluations,
 * DSP platform performance, DAO governance simulations, and listener rewards.
 *
 * @module PerformanceMetricsDashboard
 */

class PerformanceMetricsDashboard {
  constructor(config = {}) {
    this.config = {
      frequency: config.frequency || 963, // Operate at 963Hz for divine connection
      refreshRate: config.refreshRate || 1000, // ms
      retentionPeriod: config.retentionPeriod || 3600000, // 1 hour
      ...config
    };

    this.initialized = false;
    this.metrics = new Map();
    this.telemetryStream = [];
    this.alerts = [];
    this.refreshInterval = null;
  }

  async initialize() {
    console.log(
      `📊 Initializing Performance Metrics Dashboard at ${this.config.frequency}Hz...`
    );

    // Initialize metric categories
    this.initializeMetricCategories();

    // Start real-time telemetry collection
    this.startTelemetryCollection();

    this.initialized = true;
    console.log('✓ Performance Metrics Dashboard initialized');
    return true;
  }

  /**
   * Initialize metric categories
   */
  initializeMetricCategories() {
    this.metrics.set('dsp_platform', {
      listenerLoad: [],
      streamingQuality: [],
      latency: [],
      throughput: [],
      errorRate: []
    });

    this.metrics.set('dao_governance', {
      proposalActivity: [],
      votingParticipation: [],
      executionSuccess: [],
      consensusTime: []
    });

    this.metrics.set('a2a_contracts', {
      contractExecutions: [],
      gasEfficiency: [],
      successRate: [],
      responseTime: []
    });

    this.metrics.set('listener_rewards', {
      rewardDistributions: [],
      ethereumPayloads: [],
      verificationSuccess: [],
      claimLatency: []
    });

    this.metrics.set('agent_evaluations', {
      totalEvaluations: [],
      passRate: [],
      averageScore: [],
      frequencyAlignment: []
    });
  }

  /**
   * Start real-time telemetry collection
   */
  startTelemetryCollection() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.refreshInterval = setInterval(() => {
      this.collectTelemetry();
      this.cleanupOldData();
    }, this.config.refreshRate);
  }

  /**
   * Stop telemetry collection
   */
  stopTelemetryCollection() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  /**
   * Collect real-time telemetry
   */
  collectTelemetry() {
    const timestamp = Date.now();

    const telemetrySnapshot = {
      timestamp,
      frequency: this.config.frequency,
      metrics: this.getCurrentMetrics(),
      health: this.calculateSystemHealth()
    };

    this.telemetryStream.push(telemetrySnapshot);

    // Check for alerts
    this.checkAlertConditions(telemetrySnapshot);
  }

  /**
   * Record DSP platform metrics
   */
  recordDSPMetrics(metrics) {
    const category = this.metrics.get('dsp_platform');
    const timestamp = Date.now();

    if (metrics.listenerLoad !== undefined) {
      category.listenerLoad.push({ timestamp, value: metrics.listenerLoad });
    }
    if (metrics.streamingQuality !== undefined) {
      category.streamingQuality.push({
        timestamp,
        value: metrics.streamingQuality
      });
    }
    if (metrics.latency !== undefined) {
      category.latency.push({ timestamp, value: metrics.latency });
    }
    if (metrics.throughput !== undefined) {
      category.throughput.push({ timestamp, value: metrics.throughput });
    }
    if (metrics.errorRate !== undefined) {
      category.errorRate.push({ timestamp, value: metrics.errorRate });
    }
  }

  /**
   * Record DAO governance metrics
   */
  recordDAOMetrics(metrics) {
    const category = this.metrics.get('dao_governance');
    const timestamp = Date.now();

    if (metrics.proposalActivity !== undefined) {
      category.proposalActivity.push({
        timestamp,
        value: metrics.proposalActivity
      });
    }
    if (metrics.votingParticipation !== undefined) {
      category.votingParticipation.push({
        timestamp,
        value: metrics.votingParticipation
      });
    }
    if (metrics.executionSuccess !== undefined) {
      category.executionSuccess.push({
        timestamp,
        value: metrics.executionSuccess
      });
    }
    if (metrics.consensusTime !== undefined) {
      category.consensusTime.push({ timestamp, value: metrics.consensusTime });
    }
  }

  /**
   * Record A2A contract metrics
   */
  recordA2AMetrics(metrics) {
    const category = this.metrics.get('a2a_contracts');
    const timestamp = Date.now();

    if (metrics.contractExecutions !== undefined) {
      category.contractExecutions.push({
        timestamp,
        value: metrics.contractExecutions
      });
    }
    if (metrics.gasEfficiency !== undefined) {
      category.gasEfficiency.push({ timestamp, value: metrics.gasEfficiency });
    }
    if (metrics.successRate !== undefined) {
      category.successRate.push({ timestamp, value: metrics.successRate });
    }
    if (metrics.responseTime !== undefined) {
      category.responseTime.push({ timestamp, value: metrics.responseTime });
    }
  }

  /**
   * Record listener rewards metrics
   */
  recordListenerRewardsMetrics(metrics) {
    const category = this.metrics.get('listener_rewards');
    const timestamp = Date.now();

    if (metrics.rewardDistributions !== undefined) {
      category.rewardDistributions.push({
        timestamp,
        value: metrics.rewardDistributions
      });
    }
    if (metrics.ethereumPayloads !== undefined) {
      category.ethereumPayloads.push({
        timestamp,
        value: metrics.ethereumPayloads
      });
    }
    if (metrics.verificationSuccess !== undefined) {
      category.verificationSuccess.push({
        timestamp,
        value: metrics.verificationSuccess
      });
    }
    if (metrics.claimLatency !== undefined) {
      category.claimLatency.push({ timestamp, value: metrics.claimLatency });
    }
  }

  /**
   * Record agent evaluation metrics
   */
  recordAgentEvaluationMetrics(metrics) {
    const category = this.metrics.get('agent_evaluations');
    const timestamp = Date.now();

    if (metrics.totalEvaluations !== undefined) {
      category.totalEvaluations.push({
        timestamp,
        value: metrics.totalEvaluations
      });
    }
    if (metrics.passRate !== undefined) {
      category.passRate.push({ timestamp, value: metrics.passRate });
    }
    if (metrics.averageScore !== undefined) {
      category.averageScore.push({ timestamp, value: metrics.averageScore });
    }
    if (metrics.frequencyAlignment !== undefined) {
      category.frequencyAlignment.push({
        timestamp,
        value: metrics.frequencyAlignment
      });
    }
  }

  /**
   * Get current metrics snapshot
   */
  getCurrentMetrics() {
    const snapshot = {};

    for (const [category, metrics] of this.metrics) {
      snapshot[category] = {};

      for (const [metric, values] of Object.entries(metrics)) {
        if (values.length > 0) {
          const latest = values[values.length - 1];
          const avg = this.calculateAverage(values.slice(-10)); // Last 10 values

          snapshot[category][metric] = {
            current: latest.value,
            average: avg,
            trend: this.calculateTrend(values.slice(-5))
          };
        }
      }
    }

    return snapshot;
  }

  /**
   * Get telemetry stream
   */
  getTelemetryStream(limit = 100) {
    return this.telemetryStream.slice(-limit);
  }

  /**
   * Get specific metric history
   */
  getMetricHistory(category, metric, duration = 60000) {
    const categoryData = this.metrics.get(category);
    if (!categoryData || !categoryData[metric]) {
      return [];
    }

    const cutoff = Date.now() - duration;
    return categoryData[metric].filter(m => m.timestamp >= cutoff);
  }

  /**
   * Calculate system health score
   */
  calculateSystemHealth() {
    const healthScores = [];

    // DSP Platform health
    const dspMetrics = this.metrics.get('dsp_platform');
    if (dspMetrics.errorRate.length > 0) {
      const avgErrorRate = this.calculateAverage(
        dspMetrics.errorRate.slice(-10)
      );
      healthScores.push(1 - avgErrorRate);
    }

    // DAO Governance health
    const daoMetrics = this.metrics.get('dao_governance');
    if (daoMetrics.executionSuccess.length > 0) {
      const avgSuccess = this.calculateAverage(
        daoMetrics.executionSuccess.slice(-10)
      );
      healthScores.push(avgSuccess);
    }

    // A2A Contracts health
    const a2aMetrics = this.metrics.get('a2a_contracts');
    if (a2aMetrics.successRate.length > 0) {
      const avgSuccess = this.calculateAverage(
        a2aMetrics.successRate.slice(-10)
      );
      healthScores.push(avgSuccess);
    }

    // Listener Rewards health
    const rewardsMetrics = this.metrics.get('listener_rewards');
    if (rewardsMetrics.verificationSuccess.length > 0) {
      const avgSuccess = this.calculateAverage(
        rewardsMetrics.verificationSuccess.slice(-10)
      );
      healthScores.push(avgSuccess);
    }

    // Agent Evaluations health
    const agentMetrics = this.metrics.get('agent_evaluations');
    if (agentMetrics.passRate.length > 0) {
      const avgPassRate = this.calculateAverage(
        agentMetrics.passRate.slice(-10)
      );
      healthScores.push(avgPassRate);
    }

    if (healthScores.length === 0) return 1.0;

    const overallHealth =
      healthScores.reduce((sum, score) => sum + score, 0) / healthScores.length;
    return {
      overall: overallHealth,
      status: this.getHealthStatus(overallHealth),
      components: healthScores.length
    };
  }

  /**
   * Get health status label
   */
  getHealthStatus(score) {
    if (score >= 0.95) return 'excellent';
    if (score >= 0.85) return 'good';
    if (score >= 0.7) return 'fair';
    if (score >= 0.5) return 'poor';
    return 'critical';
  }

  /**
   * Calculate average of values
   */
  calculateAverage(values) {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, item) => acc + item.value, 0);
    return sum / values.length;
  }

  /**
   * Calculate trend (positive, negative, or stable)
   */
  calculateTrend(values) {
    if (values.length < 2) return 'stable';

    const first = values[0].value;
    const last = values[values.length - 1].value;
    const change = ((last - first) / first) * 100;

    if (change > 5) return 'increasing';
    if (change < -5) return 'decreasing';
    return 'stable';
  }

  /**
   * Check for alert conditions
   */
  checkAlertConditions(telemetrySnapshot) {
    const health = telemetrySnapshot.health;

    // Critical health alert
    if (health.overall < 0.5) {
      this.addAlert('critical', 'System health critically low', {
        health: health.overall,
        status: health.status
      });
    }

    // DSP platform alerts
    const dspMetrics = this.metrics.get('dsp_platform');
    if (dspMetrics.errorRate.length > 0) {
      const latestErrorRate =
        dspMetrics.errorRate[dspMetrics.errorRate.length - 1].value;
      if (latestErrorRate > 0.1) {
        this.addAlert('warning', 'High DSP error rate detected', {
          errorRate: latestErrorRate
        });
      }
    }

    // A2A contract alerts
    const a2aMetrics = this.metrics.get('a2a_contracts');
    if (a2aMetrics.successRate.length > 0) {
      const latestSuccessRate =
        a2aMetrics.successRate[a2aMetrics.successRate.length - 1].value;
      if (latestSuccessRate < 0.9) {
        this.addAlert('warning', 'Low A2A contract success rate', {
          successRate: latestSuccessRate
        });
      }
    }
  }

  /**
   * Add alert
   */
  addAlert(level, message, data = {}) {
    const alert = {
      id: `ALERT-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: Date.now(),
      level,
      message,
      data,
      acknowledged: false
    };

    this.alerts.push(alert);
    console.log(`⚠️  [${level.toUpperCase()}] ${message}`);

    return alert;
  }

  /**
   * Acknowledge alert
   */
  acknowledgeAlert(alertId) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      alert.acknowledgedAt = Date.now();
    }
    return alert;
  }

  /**
   * Get active alerts
   */
  getActiveAlerts() {
    return this.alerts.filter(a => !a.acknowledged);
  }

  /**
   * Clean up old data
   */
  cleanupOldData() {
    const cutoff = Date.now() - this.config.retentionPeriod;

    // Clean up metrics
    for (const [_, categoryMetrics] of this.metrics) {
      for (const [metricName, values] of Object.entries(categoryMetrics)) {
        categoryMetrics[metricName] = values.filter(v => v.timestamp >= cutoff);
      }
    }

    // Clean up telemetry stream
    this.telemetryStream = this.telemetryStream.filter(
      t => t.timestamp >= cutoff
    );

    // Clean up old acknowledged alerts
    this.alerts = this.alerts.filter(
      a => !a.acknowledged || a.acknowledgedAt >= cutoff
    );
  }

  /**
   * Generate dashboard summary
   */
  getDashboardSummary() {
    return {
      timestamp: Date.now(),
      frequency: this.config.frequency,
      health: this.calculateSystemHealth(),
      metrics: this.getCurrentMetrics(),
      activeAlerts: this.getActiveAlerts().length,
      telemetryPoints: this.telemetryStream.length,
      uptime: this.initialized
        ? Date.now() - this.telemetryStream[0]?.timestamp
        : 0
    };
  }

  /**
   * Get dashboard status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      frequency: this.config.frequency,
      refreshRate: this.config.refreshRate,
      categories: Array.from(this.metrics.keys()),
      telemetryPoints: this.telemetryStream.length,
      activeAlerts: this.getActiveAlerts().length,
      health: this.calculateSystemHealth()
    };
  }

  /**
   * Shutdown dashboard
   */
  shutdown() {
    this.stopTelemetryCollection();
    console.log('📊 Performance Metrics Dashboard shutdown');
  }
}

module.exports = PerformanceMetricsDashboard;
