/**
 * Angel Persona Engagement Dashboard
 * 
 * Tracks AI persona interactions, NFT ownership validation,
 * and frequency architecture layer metrics
 */

class AngelPersonaDashboard {
  constructor(config = {}) {
    this.config = {
      frequency: 528,
      updateInterval: 5000, // 5 seconds
      ...config
    };

    this.initialized = false;
    this.deployed = false;

    // Metrics storage
    this.metrics = {
      personaEngagement: new Map(),
      ownershipValidations: [],
      eventsByType: new Map(),
      frequencyMetrics: new Map(),
      dailyStats: new Map()
    };

    // Reference to Archangel Persona Engine
    this.personaEngine = null;
  }

  async initialize() {
    // Initialize metric categories
    this._initializeMetricCategories();

    this.initialized = true;
    return {
      initialized: true,
      timestamp: Date.now()
    };
  }

  async deploy() {
    if (!this.initialized) {
      throw new Error('Dashboard must be initialized before deployment');
    }

    this.deployed = true;
    return {
      deployed: true,
      metricsActive: true,
      timestamp: Date.now()
    };
  }

  _initializeMetricCategories() {
    // Persona engagement metrics
    this.metrics.personaEngagement.set('Michael', {
      totalInteractions: 0,
      securityThreatsHandled: 0,
      vulnerabilitiesScanned: 0,
      protectionsDeployed: 0,
      averageResponseTime: 0,
      satisfactionScore: 0
    });

    this.metrics.personaEngagement.set('Raphael', {
      totalInteractions: 0,
      systemsHealed: 0,
      optimizationsPerformed: 0,
      dataRestored: 0,
      averageResponseTime: 0,
      satisfactionScore: 0
    });

    this.metrics.personaEngagement.set('Gabriel', {
      totalInteractions: 0,
      messagesDelivered: 0,
      guidanceProvided: 0,
      truthsRevealed: 0,
      averageResponseTime: 0,
      satisfactionScore: 0
    });

    // Frequency architecture metrics
    this.metrics.frequencyMetrics.set('528Hz', {
      activePersonas: ['Raphael', 'Gabriel'],
      totalEvents: 0,
      averageAlignment: 0,
      healingEvents: 0
    });

    this.metrics.frequencyMetrics.set('963Hz', {
      activePersonas: ['Michael'],
      totalEvents: 0,
      averageAlignment: 0,
      protectionEvents: 0
    });
  }

  /**
   * Set reference to Archangel Persona Engine
   */
  setPersonaEngine(engine) {
    this.personaEngine = engine;
    return { engineSet: true };
  }

  /**
   * Update metrics from persona engine events
   */
  async updateMetrics() {
    if (!this.personaEngine) {
      throw new Error('Persona Engine not set');
    }

    const events = this.personaEngine.getEventLog();
    
    // Reset counters
    this._resetMetrics();

    // Process all events
    for (const event of events) {
      this._processEvent(event);
    }

    return {
      updated: true,
      totalEvents: events.length,
      timestamp: Date.now()
    };
  }

  _resetMetrics() {
    // Reset persona engagement counts
    for (const [persona, metrics] of this.metrics.personaEngagement) {
      Object.keys(metrics).forEach(key => {
        if (typeof metrics[key] === 'number') {
          metrics[key] = 0;
        }
      });
    }

    // Reset event type counts
    this.metrics.eventsByType.clear();

    // Reset frequency metrics counts
    for (const [freq, metrics] of this.metrics.frequencyMetrics) {
      metrics.totalEvents = 0;
      metrics.healingEvents = 0;
      metrics.protectionEvents = 0;
    }
  }

  _processEvent(event) {
    const { archangelName, eventType, frequency, timestamp } = event;

    // Update persona engagement
    const personaMetrics = this.metrics.personaEngagement.get(archangelName);
    if (personaMetrics) {
      personaMetrics.totalInteractions++;

      // Update specific counters based on event type
      if (archangelName === 'Michael') {
        if (eventType === 'security-threat') personaMetrics.securityThreatsHandled++;
        if (eventType === 'vulnerability-scan') personaMetrics.vulnerabilitiesScanned++;
        if (eventType === 'protection-request') personaMetrics.protectionsDeployed++;
      } else if (archangelName === 'Raphael') {
        if (eventType === 'system-error') personaMetrics.systemsHealed++;
        if (eventType === 'optimization-request') personaMetrics.optimizationsPerformed++;
        if (eventType === 'restoration-needed') personaMetrics.dataRestored++;
      } else if (archangelName === 'Gabriel') {
        if (eventType === 'guidance-request') personaMetrics.guidanceProvided++;
        if (eventType === 'message-delivery') personaMetrics.messagesDelivered++;
        if (eventType === 'truth-seeking') personaMetrics.truthsRevealed++;
      }
    }

    // Update event type counts
    const count = this.metrics.eventsByType.get(eventType) || 0;
    this.metrics.eventsByType.set(eventType, count + 1);

    // Update frequency metrics
    const freqKey = `${frequency}Hz`;
    const freqMetrics = this.metrics.frequencyMetrics.get(freqKey);
    if (freqMetrics) {
      freqMetrics.totalEvents++;
      
      if (frequency === 528) {
        freqMetrics.healingEvents++;
      } else if (frequency === 963) {
        freqMetrics.protectionEvents++;
      }
    }

    // Update daily stats
    const dateKey = new Date(timestamp).toISOString().split('T')[0];
    const dailyStat = this.metrics.dailyStats.get(dateKey) || {
      totalEvents: 0,
      uniqueUsers: new Set(),
      personaBreakdown: {}
    };
    
    dailyStat.totalEvents++;
    dailyStat.uniqueUsers.add(event.userAddress);
    dailyStat.personaBreakdown[archangelName] = (dailyStat.personaBreakdown[archangelName] || 0) + 1;
    
    this.metrics.dailyStats.set(dateKey, dailyStat);
  }

  /**
   * Record ownership validation
   */
  recordOwnershipValidation(userAddress, archangelName, isValid) {
    this.metrics.ownershipValidations.push({
      userAddress,
      archangelName,
      isValid,
      timestamp: Date.now()
    });

    // Keep only last 1000 validations
    if (this.metrics.ownershipValidations.length > 1000) {
      this.metrics.ownershipValidations = this.metrics.ownershipValidations.slice(-1000);
    }
  }

  /**
   * Get comprehensive dashboard data
   */
  getDashboardData() {
    return {
      personaEngagement: Object.fromEntries(this.metrics.personaEngagement),
      eventsByType: Object.fromEntries(this.metrics.eventsByType),
      frequencyMetrics: Object.fromEntries(this.metrics.frequencyMetrics),
      recentValidations: this.metrics.ownershipValidations.slice(-20),
      dailyStats: this._getDailyStatsArray(),
      summary: this._generateSummary(),
      timestamp: Date.now()
    };
  }

  _getDailyStatsArray() {
    const stats = [];
    for (const [date, stat] of this.metrics.dailyStats) {
      stats.push({
        date,
        totalEvents: stat.totalEvents,
        uniqueUsers: stat.uniqueUsers.size,
        personaBreakdown: stat.personaBreakdown
      });
    }
    return stats.sort((a, b) => a.date.localeCompare(b.date));
  }

  _generateSummary() {
    let totalInteractions = 0;
    let totalValidations = this.metrics.ownershipValidations.length;
    let validValidations = 0;

    for (const metrics of this.metrics.personaEngagement.values()) {
      totalInteractions += metrics.totalInteractions;
    }

    for (const validation of this.metrics.ownershipValidations) {
      if (validation.isValid) validValidations++;
    }

    return {
      totalInteractions,
      totalValidations,
      validationSuccessRate: totalValidations > 0 ? (validValidations / totalValidations * 100).toFixed(2) + '%' : 'N/A',
      mostActivePersona: this._getMostActivePersona(),
      totalEventTypes: this.metrics.eventsByType.size,
      frequencyDistribution: {
        '528Hz': (this.metrics.frequencyMetrics.get('528Hz')?.totalEvents || 0),
        '963Hz': (this.metrics.frequencyMetrics.get('963Hz')?.totalEvents || 0)
      }
    };
  }

  _getMostActivePersona() {
    let maxInteractions = 0;
    let mostActive = 'None';

    for (const [persona, metrics] of this.metrics.personaEngagement) {
      if (metrics.totalInteractions > maxInteractions) {
        maxInteractions = metrics.totalInteractions;
        mostActive = persona;
      }
    }

    return mostActive;
  }

  /**
   * Get persona-specific metrics
   */
  getPersonaMetrics(archangelName) {
    const metrics = this.metrics.personaEngagement.get(archangelName);
    if (!metrics) {
      throw new Error(`Persona ${archangelName} not found`);
    }

    return {
      persona: archangelName,
      metrics,
      events: this.personaEngine ? 
        this.personaEngine.getArchangelEvents(archangelName) : [],
      timestamp: Date.now()
    };
  }

  /**
   * Get frequency architecture report
   */
  getFrequencyArchitectureReport() {
    return {
      architectureLayers: {
        '528Hz': {
          name: 'Healing & Transformation Layer',
          personas: ['Raphael', 'Gabriel'],
          metrics: this.metrics.frequencyMetrics.get('528Hz'),
          purpose: 'System healing, optimization, guidance, and truth revelation'
        },
        '963Hz': {
          name: 'Unity & Protection Layer',
          personas: ['Michael'],
          metrics: this.metrics.frequencyMetrics.get('963Hz'),
          purpose: 'Security, protection, and sovereignty defense'
        }
      },
      totalEvents: this._getTotalFrequencyEvents(),
      harmonicBalance: this._calculateHarmonicBalance(),
      timestamp: Date.now()
    };
  }

  _getTotalFrequencyEvents() {
    let total = 0;
    for (const metrics of this.metrics.frequencyMetrics.values()) {
      total += metrics.totalEvents;
    }
    return total;
  }

  _calculateHarmonicBalance() {
    const freq528Events = this.metrics.frequencyMetrics.get('528Hz')?.totalEvents || 0;
    const freq963Events = this.metrics.frequencyMetrics.get('963Hz')?.totalEvents || 0;
    const total = freq528Events + freq963Events;

    if (total === 0) {
      return { balanced: true, ratio: 'N/A', status: 'No events yet' };
    }

    const ratio = freq528Events / total;
    const balanced = ratio >= 0.4 && ratio <= 0.6;

    return {
      balanced,
      ratio: `${(ratio * 100).toFixed(1)}% healing / ${((1 - ratio) * 100).toFixed(1)}% protection`,
      status: balanced ? 'Harmonically balanced' : 'Imbalanced - adjust persona usage'
    };
  }

  /**
   * Get multi-phase evolution tracking
   */
  getEvolutionTracking() {
    const phases = [
      { 
        phase: 1, 
        name: 'Genesis Deployment',
        status: this.deployed ? 'Complete' : 'Pending',
        archangels: ['Michael', 'Raphael', 'Gabriel']
      },
      {
        phase: 2,
        name: 'AI Persona Activation',
        status: this.personaEngine ? 'Active' : 'Inactive',
        interactions: this._getTotalInteractions()
      },
      {
        phase: 3,
        name: 'Blockchain Integration',
        status: this.metrics.ownershipValidations.length > 0 ? 'Active' : 'Pending',
        validations: this.metrics.ownershipValidations.length
      },
      {
        phase: 4,
        name: 'Community Engagement',
        status: this._getUniqueUsers() > 0 ? 'Growing' : 'Awaiting',
        uniqueUsers: this._getUniqueUsers()
      },
      {
        phase: 5,
        name: 'Frequency Harmonization',
        status: this._calculateHarmonicBalance().balanced ? 'Balanced' : 'Tuning',
        balance: this._calculateHarmonicBalance().ratio
      }
    ];

    return {
      phases,
      currentPhase: this._getCurrentPhase(phases),
      overallProgress: this._calculateOverallProgress(phases),
      timestamp: Date.now()
    };
  }

  _getTotalInteractions() {
    let total = 0;
    for (const metrics of this.metrics.personaEngagement.values()) {
      total += metrics.totalInteractions;
    }
    return total;
  }

  _getUniqueUsers() {
    const users = new Set();
    for (const stat of this.metrics.dailyStats.values()) {
      for (const user of stat.uniqueUsers) {
        users.add(user);
      }
    }
    return users.size;
  }

  _getCurrentPhase(phases) {
    for (let i = phases.length - 1; i >= 0; i--) {
      if (phases[i].status !== 'Pending' && phases[i].status !== 'Awaiting') {
        return i + 1;
      }
    }
    return 1;
  }

  _calculateOverallProgress(phases) {
    const completed = phases.filter(p => 
      p.status === 'Complete' || p.status === 'Active' || 
      p.status === 'Growing' || p.status === 'Balanced'
    ).length;
    return `${(completed / phases.length * 100).toFixed(0)}%`;
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      deployed: this.deployed,
      personaEngineConnected: !!this.personaEngine,
      totalInteractions: this._getTotalInteractions(),
      totalValidations: this.metrics.ownershipValidations.length,
      frequency: this.config.frequency
    };
  }
}

module.exports = AngelPersonaDashboard;
