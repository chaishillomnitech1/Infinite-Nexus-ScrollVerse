/**
 * Pathway Registry - Central Management for Pathways #40-#70+
 * Tracks and coordinates all pathways in the Infinite Nexus
 */

class PathwayRegistry {
  constructor() {
    this.pathways = new Map();
    this.sacredGeometries = [
      'FlowerOfLife',
      'MetatronsCube',
      'SriYantra',
      'VesicaPiscis',
      'PlatonicSolids',
      'TorusField',
      'MerkabaField',
      'GoldenSpiral'
    ];
    this.divinePrinciples = [
      'Unity',
      'Duality',
      'Trinity',
      'Harmony',
      'Balance',
      'Transcendence',
      'Infinity',
      'Sovereignty'
    ];
  }

  /**
   * Register a new pathway
   */
  register(pathway) {
    if (this.pathways.has(pathway.pathwayNumber)) {
      throw new Error(`Pathway #${pathway.pathwayNumber} already registered`);
    }
    this.pathways.set(pathway.pathwayNumber, pathway);
    console.log(`📋 Registered ${pathway.name} in the Infinite Nexus`);
    return true;
  }

  /**
   * Get pathway by number
   */
  getPathway(pathwayNumber) {
    return this.pathways.get(pathwayNumber);
  }

  /**
   * Get all pathways in a range
   */
  getPathwayRange(start, end) {
    const range = [];
    for (let i = start; i <= end; i++) {
      const pathway = this.pathways.get(i);
      if (pathway) {
        range.push(pathway);
      }
    }
    return range;
  }

  /**
   * Get all active pathways
   */
  getActivePathways() {
    return Array.from(this.pathways.values()).filter(
      p => p.status === 'active' || p.status === 'deployed'
    );
  }

  /**
   * Synchronize all pathways
   */
  async synchronizeAll() {
    const activePathways = this.getActivePathways();
    if (activePathways.length === 0) {
      return {
        success: true,
        totalPathways: 0,
        synchronizations: []
      };
    }
    
    const results = [];
    
    // Pre-compute pathway relationships to avoid O(n²) filtering
    const pathwayMap = new Map();
    for (const pathway of activePathways) {
      const others = activePathways.filter(p => p.pathwayNumber !== pathway.pathwayNumber);
      pathwayMap.set(pathway.pathwayNumber, others);
    }
    
    for (const pathway of activePathways) {
      const others = pathwayMap.get(pathway.pathwayNumber);
      const result = await pathway.synchronize(others);
      results.push({
        pathway: pathway.pathwayNumber,
        ...result
      });
    }
    
    return {
      success: true,
      totalPathways: activePathways.length,
      synchronizations: results
    };
  }

  /**
   * Get registry statistics
   */
  getStatistics() {
    const pathways = Array.from(this.pathways.values());
    if (pathways.length === 0) {
      return {
        totalPathways: 0,
        initialized: 0,
        active: 0,
        deployed: 0,
        totalActivations: 0,
        averageResonance: 0,
        totalEnergyFlow: 0
      };
    }
    return {
      totalPathways: pathways.length,
      initialized: pathways.filter(p => p.status === 'initialized').length,
      active: pathways.filter(p => p.status === 'active').length,
      deployed: pathways.filter(p => p.status === 'deployed').length,
      totalActivations: pathways.reduce((sum, p) => sum + p.metrics.activations, 0),
      averageResonance: pathways.reduce((sum, p) => sum + p.metrics.resonanceLevel, 0) / pathways.length,
      totalEnergyFlow: pathways.reduce((sum, p) => sum + p.metrics.energyFlow, 0)
    };
  }

  /**
   * Get next available sacred geometry
   */
  getNextSacredGeometry(index) {
    return this.sacredGeometries[index % this.sacredGeometries.length];
  }

  /**
   * Get next available divine principle
   */
  getNextDivinePrinciple(index) {
    return this.divinePrinciples[index % this.divinePrinciples.length];
  }
}

module.exports = PathwayRegistry;
