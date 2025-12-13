/**
 * Launch Sequence Orchestrator
 *
 * Manages the TECHANGEL launch sequence:
 * Teasers → Guardian whitelist → Simultaneous pilot & mint/drop
 * Full ScrollChain registration for assets and event access.
 */

class LaunchSequence {
  constructor(config) {
    this.config = config;
    this.initialized = false;
    this.deployed = false;

    this.phases = [
      {
        id: 'phase-1-teasers',
        name: 'Teasers Release',
        status: 'pending',
        dependencies: [],
        duration: 7, // days
        startDate: null,
        endDate: null
      },
      {
        id: 'phase-2-whitelist',
        name: 'Guardian Whitelist',
        status: 'pending',
        dependencies: ['phase-1-teasers'],
        duration: 3, // days
        startDate: null,
        endDate: null
      },
      {
        id: 'phase-3-pilot-mint',
        name: 'Pilot & Mint Drop',
        status: 'pending',
        dependencies: ['phase-2-whitelist'],
        duration: 1, // days (simultaneous)
        startDate: null,
        endDate: null
      },
      {
        id: 'phase-4-scrollchain',
        name: 'ScrollChain Registration',
        status: 'pending',
        dependencies: ['phase-3-pilot-mint'],
        duration: 1, // days
        startDate: null,
        endDate: null
      }
    ];

    this.launchEvents = [];
    this.registeredAssets = [];
  }

  async initialize() {
    this.initialized = true;
    return true;
  }

  async deploy() {
    if (!this.initialized) {
      throw new Error('Launch Sequence must be initialized before deployment');
    }

    this.deployed = true;
    return {
      deployed: true,
      phases: this.phases.length,
      timestamp: Date.now()
    };
  }

  /**
   * Schedule the launch sequence
   */
  scheduleLaunch(startDate) {
    let currentDate = new Date(startDate);

    for (const phase of this.phases) {
      phase.startDate = currentDate.getTime();
      phase.endDate =
        currentDate.getTime() + phase.duration * 24 * 60 * 60 * 1000;
      currentDate = new Date(phase.endDate);
    }

    return {
      scheduledFor: startDate,
      phases: this.phases.map(p => ({
        id: p.id,
        name: p.name,
        startDate: new Date(p.startDate).toISOString(),
        endDate: new Date(p.endDate).toISOString()
      }))
    };
  }

  /**
   * Start a phase
   */
  async startPhase(phaseId) {
    const phase = this.phases.find(p => p.id === phaseId);
    if (!phase) {
      throw new Error('Phase not found');
    }

    // Check dependencies
    for (const depId of phase.dependencies) {
      const dep = this.phases.find(p => p.id === depId);
      if (dep && dep.status !== 'completed') {
        throw new Error(`Dependency ${depId} not completed`);
      }
    }

    phase.status = 'active';
    phase.actualStartDate = Date.now();

    const event = {
      type: 'phase_started',
      phaseId,
      timestamp: Date.now()
    };
    this.launchEvents.push(event);

    return phase;
  }

  /**
   * Complete a phase
   */
  async completePhase(phaseId) {
    const phase = this.phases.find(p => p.id === phaseId);
    if (!phase) {
      throw new Error('Phase not found');
    }

    phase.status = 'completed';
    phase.actualEndDate = Date.now();

    const event = {
      type: 'phase_completed',
      phaseId,
      timestamp: Date.now()
    };
    this.launchEvents.push(event);

    return phase;
  }

  /**
   * Execute the pilot and mint drop simultaneously
   */
  async executePilotMintDrop(pilotData, mintData) {
    await this.startPhase('phase-3-pilot-mint');

    // Simultaneous execution
    const [pilotResult, mintResult] = await Promise.all([
      this.executePilot(pilotData),
      this.executeMintDrop(mintData)
    ]);

    await this.completePhase('phase-3-pilot-mint');

    return {
      pilot: pilotResult,
      mint: mintResult,
      timestamp: Date.now()
    };
  }

  async executePilot(pilotData) {
    return {
      pilotId: `PILOT-${Date.now()}`,
      title: pilotData.title,
      launchedAt: Date.now(),
      status: 'live'
    };
  }

  async executeMintDrop(mintData) {
    return {
      dropId: `DROP-${Date.now()}`,
      collection: mintData.collection,
      supply: mintData.supply,
      price: mintData.price,
      startedAt: Date.now(),
      status: 'active'
    };
  }

  /**
   * Register asset on ScrollChain
   */
  async registerOnScrollChain(assetData) {
    const registration = {
      scrollChainId: `SC-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`,
      assetId: assetData.assetId,
      assetType: assetData.type,
      owner: assetData.owner,
      registeredAt: Date.now(),
      eventAccess: true,
      metadata: assetData.metadata || {}
    };

    this.registeredAssets.push(registration);
    return registration;
  }

  /**
   * Get current launch status
   */
  getLaunchStatus() {
    const activePhase = this.phases.find(p => p.status === 'active');
    const completedPhases = this.phases.filter(
      p => p.status === 'completed'
    ).length;

    return {
      activePhase: activePhase ? activePhase.name : null,
      completedPhases,
      totalPhases: this.phases.length,
      progress: (completedPhases / this.phases.length) * 100,
      registeredAssets: this.registeredAssets.length
    };
  }

  getStatus() {
    return {
      initialized: this.initialized,
      deployed: this.deployed,
      launchStatus: this.getLaunchStatus(),
      phases: this.phases
    };
  }
}

module.exports = LaunchSequence;
