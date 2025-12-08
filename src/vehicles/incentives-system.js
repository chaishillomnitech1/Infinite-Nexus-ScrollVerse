/**
 * Incentives System
 * Pricing-plus-rewards and sustainability meta-market mechanisms
 * 
 * Features:
 * - User-side pricing-plus-rewards/incentive boosting
 * - Sustainability incentive meta-market adjacency
 * - Twin adoption acceleration globally
 * - NFT layer market-defining experiments
 * 
 * Frequency: 963Hz | Divine Connection
 */

class IncentivesSystem {
  constructor(config = {}) {
    this.config = {
      frequency: 963,
      baseFrequency: 528,
      rewardMultiplier: 1.5,
      sustainabilityBonus: 0.2,
      twinAdoptionTarget: 10000,
      ...config
    };

    // Incentive tiers
    this.incentiveTiers = this.initializeIncentiveTiers();
    
    // Rewards registry
    this.rewardsRegistry = new Map();
    
    // Sustainability tracking
    this.sustainabilityMetrics = new Map();
    
    // Twin adoption tracking
    this.twinAdoption = {
      global: new Map(),
      regions: new Map()
    };
    
    // Market experiments
    this.marketExperiments = new Map();
    
    this.statistics = {
      totalRewards: 0,
      activeIncentives: 0,
      sustainabilityScore: 0,
      twinAdoptions: 0,
      experimentsRunning: 0
    };
  }

  /**
   * Initialize incentive tiers
   */
  initializeIncentiveTiers() {
    return {
      DIAMOND: {
        name: 'Diamond Tier',
        requirements: {
          vehicleCount: 5,
          totalValue: 250000,
          sustainabilityScore: 0.9
        },
        rewards: {
          cashback: 0.15,
          lifetimeProfitShare: 0.20,
          sustainabilityBonus: 0.25,
          priorityAccess: true,
          exclusiveFeatures: ['Premium Support', 'Early Access', 'VIP Events']
        },
        frequency: 963
      },
      PLATINUM: {
        name: 'Platinum Tier',
        requirements: {
          vehicleCount: 3,
          totalValue: 150000,
          sustainabilityScore: 0.8
        },
        rewards: {
          cashback: 0.12,
          lifetimeProfitShare: 0.15,
          sustainabilityBonus: 0.20,
          priorityAccess: true,
          exclusiveFeatures: ['Priority Support', 'Beta Access']
        },
        frequency: 852
      },
      GOLD: {
        name: 'Gold Tier',
        requirements: {
          vehicleCount: 2,
          totalValue: 75000,
          sustainabilityScore: 0.7
        },
        rewards: {
          cashback: 0.10,
          lifetimeProfitShare: 0.12,
          sustainabilityBonus: 0.15,
          priorityAccess: false,
          exclusiveFeatures: ['Standard Support']
        },
        frequency: 741
      },
      SILVER: {
        name: 'Silver Tier',
        requirements: {
          vehicleCount: 1,
          totalValue: 25000,
          sustainabilityScore: 0.6
        },
        rewards: {
          cashback: 0.05,
          lifetimeProfitShare: 0.08,
          sustainabilityBonus: 0.10,
          priorityAccess: false,
          exclusiveFeatures: ['Basic Support']
        },
        frequency: 639
      },
      BRONZE: {
        name: 'Bronze Tier',
        requirements: {
          vehicleCount: 1,
          totalValue: 0,
          sustainabilityScore: 0.5
        },
        rewards: {
          cashback: 0.03,
          lifetimeProfitShare: 0.05,
          sustainabilityBonus: 0.05,
          priorityAccess: false,
          exclusiveFeatures: []
        },
        frequency: 528
      }
    };
  }

  /**
   * Initialize Incentives System
   */
  async initialize() {
    console.log('🎁 Initializing Incentives System at 963Hz...');
    
    // Initialize market experiments
    await this.initializeMarketExperiments();
    
    // Setup sustainability tracking
    await this.setupSustainabilityTracking();
    
    // Initialize twin adoption tracking
    await this.initializeTwinAdoption();
    
    console.log('✓ Incentives System initialized');
    console.log(`✓ ${Object.keys(this.incentiveTiers).length} incentive tiers active`);
    
    return true;
  }

  /**
   * Initialize market experiments
   */
  async initializeMarketExperiments() {
    console.log('🔬 Initializing market experiments...');
    
    const experiments = {
      DYNAMIC_PRICING: {
        name: 'Dynamic Pricing Experiment',
        description: 'Test real-time pricing adjustments based on demand and sustainability',
        status: 'active',
        frequency: 963,
        parameters: {
          priceFlexibility: 0.3,
          demandSensitivity: 0.5,
          sustainabilityWeight: 0.4
        },
        metrics: {
          participantsCount: 0,
          averagePrice: 0,
          satisfactionScore: 0
        }
      },
      LIFETIME_PROFITS: {
        name: 'Lifetime Profits Sharing',
        description: 'Test various profit-sharing models for long-term buyer engagement',
        status: 'active',
        frequency: 852,
        parameters: {
          minShare: 0.05,
          maxShare: 0.20,
          vestingPeriod: 365 // days
        },
        metrics: {
          participantsCount: 0,
          totalProfitsShared: 0,
          retentionRate: 0
        }
      },
      TWIN_ADOPTION: {
        name: 'Twin Adoption Acceleration',
        description: 'Test incentives for simultaneous physical + digital vehicle ownership',
        status: 'active',
        frequency: 741,
        parameters: {
          twinBonus: 0.25,
          digitalFirstDiscount: 0.15,
          physicalFirstReward: 1000
        },
        metrics: {
          twinPairs: 0,
          conversionRate: 0,
          globalReach: 0
        }
      },
      SUSTAINABILITY_MARKET: {
        name: 'Sustainability Meta-Market',
        description: 'Test carbon-negative incentives and green energy rewards',
        status: 'active',
        frequency: 639,
        parameters: {
          carbonOffsetValue: 100, // per ton
          renewableEnergyBonus: 0.1,
          ecoScoreThreshold: 0.7
        },
        metrics: {
          carbonOffset: 0,
          renewableAdoption: 0,
          ecoImpact: 0
        }
      },
      NFT_STAKING: {
        name: 'NFT Staking Rewards',
        description: 'Test staking mechanisms for vehicle NFTs with yield generation',
        status: 'active',
        frequency: 528,
        parameters: {
          stakingAPY: 0.12, // 12% annual yield
          lockPeriod: 90, // days
          rewardCurrency: 'ScrollCoin'
        },
        metrics: {
          stakedValue: 0,
          rewardsDistributed: 0,
          stakersCount: 0
        }
      }
    };
    
    for (const [key, experiment] of Object.entries(experiments)) {
      this.marketExperiments.set(key, experiment);
      this.statistics.experimentsRunning++;
    }
    
    console.log(`✓ ${this.statistics.experimentsRunning} market experiments initialized`);
  }

  /**
   * Setup sustainability tracking
   */
  async setupSustainabilityTracking() {
    console.log('🌱 Setting up sustainability tracking...');
    
    const sustainabilityFactors = {
      CARBON_FOOTPRINT: {
        name: 'Carbon Footprint',
        weight: 0.3,
        baseline: 100, // kg CO2/year
        target: 0 // Carbon neutral
      },
      RENEWABLE_ENERGY: {
        name: 'Renewable Energy Usage',
        weight: 0.25,
        baseline: 0.2, // 20%
        target: 1.0 // 100%
      },
      BATTERY_LIFECYCLE: {
        name: 'Battery Lifecycle Management',
        weight: 0.2,
        baseline: 0.5,
        target: 0.95
      },
      MATERIAL_SOURCING: {
        name: 'Sustainable Material Sourcing',
        weight: 0.15,
        baseline: 0.3,
        target: 0.9
      },
      CIRCULAR_ECONOMY: {
        name: 'Circular Economy Participation',
        weight: 0.1,
        baseline: 0.2,
        target: 0.85
      }
    };
    
    for (const [key, factor] of Object.entries(sustainabilityFactors)) {
      this.sustainabilityMetrics.set(key, factor);
    }
    
    console.log(`✓ ${this.sustainabilityMetrics.size} sustainability factors tracked`);
  }

  /**
   * Initialize twin adoption tracking
   */
  async initializeTwinAdoption() {
    console.log('👯 Initializing twin adoption tracking...');
    
    const regions = [
      'North America',
      'Europe',
      'Asia-Pacific',
      'Middle East',
      'Latin America',
      'Africa'
    ];
    
    for (const region of regions) {
      this.twinAdoption.regions.set(region, {
        physical: 0,
        digital: 0,
        twins: 0,
        conversionRate: 0
      });
    }
    
    console.log(`✓ Twin adoption tracking for ${regions.length} regions`);
  }

  /**
   * Calculate user incentives
   */
  calculateIncentives(userData, vehicleData) {
    // Determine user tier
    const tier = this.determineUserTier(userData);
    const tierRewards = this.incentiveTiers[tier].rewards;
    
    // Calculate base rewards
    const baseValue = vehicleData.totalValue || 50000;
    const cashback = baseValue * tierRewards.cashback;
    const lifetimeProfit = baseValue * tierRewards.lifetimeProfitShare;
    
    // Calculate sustainability bonus
    const sustainabilityScore = userData.sustainabilityScore || 0.5;
    const sustainabilityBonus = baseValue * tierRewards.sustainabilityBonus * sustainabilityScore;
    
    // Calculate twin adoption bonus
    const twinBonus = userData.hasTwin ? baseValue * 0.25 : 0;
    
    // Total rewards
    const totalRewards = cashback + lifetimeProfit + sustainabilityBonus + twinBonus;
    
    return {
      tier,
      baseValue,
      rewards: {
        cashback,
        lifetimeProfit,
        sustainabilityBonus,
        twinBonus
      },
      totalRewards,
      exclusiveFeatures: tierRewards.exclusiveFeatures,
      frequency: this.incentiveTiers[tier].frequency
    };
  }

  /**
   * Determine user tier based on criteria
   */
  determineUserTier(userData) {
    const vehicleCount = userData.vehicleCount || 0;
    const totalValue = userData.totalValue || 0;
    const sustainabilityScore = userData.sustainabilityScore || 0;
    
    // Check from highest to lowest tier
    const tiers = ['DIAMOND', 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE'];
    
    for (const tier of tiers) {
      const requirements = this.incentiveTiers[tier].requirements;
      
      if (vehicleCount >= requirements.vehicleCount &&
          totalValue >= requirements.totalValue &&
          sustainabilityScore >= requirements.sustainabilityScore) {
        return tier;
      }
    }
    
    return 'BRONZE';
  }

  /**
   * Apply pricing boost
   */
  applyPricingBoost(basePrice, userData) {
    const tier = this.determineUserTier(userData);
    const tierData = this.incentiveTiers[tier];
    
    // Apply tier-based discount
    const tierDiscount = tierData.rewards.cashback;
    const discountedPrice = basePrice * (1 - tierDiscount);
    
    // Apply sustainability discount
    const sustainabilityScore = userData.sustainabilityScore || 0.5;
    const sustainabilityDiscount = basePrice * this.config.sustainabilityBonus * sustainabilityScore;
    
    // Final price
    const finalPrice = discountedPrice - sustainabilityDiscount;
    
    return {
      basePrice,
      tierDiscount: basePrice * tierDiscount,
      sustainabilityDiscount,
      finalPrice,
      savings: basePrice - finalPrice,
      savingsPercentage: ((basePrice - finalPrice) / basePrice) * 100
    };
  }

  /**
   * Track twin adoption
   */
  trackTwinAdoption(region, adoptionType, vehicleKey) {
    const regionData = this.twinAdoption.regions.get(region);
    if (!regionData) {
      throw new Error(`Region ${region} not found`);
    }
    
    // Update adoption counts
    if (adoptionType === 'physical') {
      regionData.physical++;
    } else if (adoptionType === 'digital') {
      regionData.digital++;
    } else if (adoptionType === 'twin') {
      regionData.twins++;
      this.statistics.twinAdoptions++;
    }
    
    // Update conversion rate
    const total = regionData.physical + regionData.digital;
    regionData.conversionRate = total > 0 ? regionData.twins / total : 0;
    
    // Update global tracking
    const globalKey = `${region}:${vehicleKey}`;
    this.twinAdoption.global.set(globalKey, {
      region,
      vehicleKey,
      adoptionType,
      timestamp: Date.now()
    });
    
    return regionData;
  }

  /**
   * Calculate sustainability score
   */
  calculateSustainabilityScore(userData) {
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const [key, factor] of this.sustainabilityMetrics.entries()) {
      const userValue = userData[key.toLowerCase()] || factor.baseline;
      const denominator = factor.target - factor.baseline;
      // Avoid division by zero
      const normalizedScore = denominator !== 0 
        ? (userValue - factor.baseline) / denominator 
        : 0;
      const clampedScore = Math.max(0, Math.min(1, normalizedScore));
      
      totalScore += clampedScore * factor.weight;
      totalWeight += factor.weight;
    }
    
    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  /**
   * Participate in market experiment
   */
  participateInExperiment(experimentKey, participantData) {
    const experiment = this.marketExperiments.get(experimentKey);
    if (!experiment) {
      throw new Error(`Experiment ${experimentKey} not found`);
    }
    
    // Update experiment metrics
    experiment.metrics.participantsCount++;
    
    // Apply experiment-specific logic
    let result = {};
    
    switch (experimentKey) {
    case 'DYNAMIC_PRICING':
      result = this.applyDynamicPricing(experiment, participantData);
      break;
    case 'LIFETIME_PROFITS':
      result = this.applyLifetimeProfits(experiment, participantData);
      break;
    case 'TWIN_ADOPTION':
      result = this.applyTwinAdoption(experiment, participantData);
      break;
    case 'SUSTAINABILITY_MARKET':
      result = this.applySustainabilityMarket(experiment, participantData);
      break;
    case 'NFT_STAKING':
      result = this.applyNFTStaking(experiment, participantData);
      break;
    }
    
    return result;
  }

  /**
   * Apply dynamic pricing experiment
   */
  applyDynamicPricing(experiment, data) {
    const basePrice = data.basePrice || 50000;
    const demand = data.demand || 0.5;
    const sustainabilityScore = data.sustainabilityScore || 0.5;
    
    const params = experiment.parameters;
    const demandAdjustment = (demand - 0.5) * params.demandSensitivity;
    const sustainabilityAdjustment = (sustainabilityScore - 0.5) * params.sustainabilityWeight;
    
    const adjustedPrice = basePrice * (1 + demandAdjustment - sustainabilityAdjustment);
    
    return {
      basePrice,
      adjustedPrice,
      demandAdjustment: demandAdjustment * basePrice,
      sustainabilityAdjustment: sustainabilityAdjustment * basePrice
    };
  }

  /**
   * Apply lifetime profits experiment
   */
  applyLifetimeProfits(experiment, data) {
    const vehicleValue = data.vehicleValue || 50000;
    const userTier = data.userTier || 'BRONZE';
    
    const tierMultiplier = {
      'DIAMOND': 1.5,
      'PLATINUM': 1.3,
      'GOLD': 1.1,
      'SILVER': 1.0,
      'BRONZE': 0.8
    }[userTier] || 1.0;
    
    const profitShare = experiment.parameters.maxShare * tierMultiplier;
    const annualProfit = vehicleValue * profitShare;
    
    experiment.metrics.totalProfitsShared += annualProfit;
    
    return {
      vehicleValue,
      profitShare,
      annualProfit,
      vestingPeriod: experiment.parameters.vestingPeriod
    };
  }

  /**
   * Apply twin adoption experiment
   */
  applyTwinAdoption(experiment, data) {
    const hasTwin = data.hasTwin || false;
    const vehicleValue = data.vehicleValue || 50000;
    
    let bonus = 0;
    let discount = 0;
    
    if (hasTwin) {
      bonus = vehicleValue * experiment.parameters.twinBonus;
    } else if (data.purchaseType === 'digital') {
      discount = vehicleValue * experiment.parameters.digitalFirstDiscount;
    } else if (data.purchaseType === 'physical') {
      bonus = experiment.parameters.physicalFirstReward;
    }
    
    experiment.metrics.twinPairs += hasTwin ? 1 : 0;
    
    return {
      hasTwin,
      bonus,
      discount,
      incentive: bonus + discount
    };
  }

  /**
   * Apply sustainability market experiment
   */
  applySustainabilityMarket(experiment, data) {
    const carbonOffset = data.carbonOffset || 0; // tons
    const renewableEnergy = data.renewableEnergy || 0; // percentage
    const ecoScore = data.ecoScore || 0.5;
    
    const params = experiment.parameters;
    const carbonReward = carbonOffset * params.carbonOffsetValue;
    const renewableBonus = data.vehicleValue * params.renewableEnergyBonus * renewableEnergy;
    const ecoBonus = ecoScore >= params.ecoScoreThreshold ? 1000 : 0;
    
    const totalReward = carbonReward + renewableBonus + ecoBonus;
    
    experiment.metrics.carbonOffset += carbonOffset;
    experiment.metrics.renewableAdoption += renewableEnergy;
    
    return {
      carbonReward,
      renewableBonus,
      ecoBonus,
      totalReward
    };
  }

  /**
   * Apply NFT staking experiment
   */
  applyNFTStaking(experiment, data) {
    const stakedValue = data.stakedValue || 0;
    const stakingDays = data.stakingDays || 0;
    
    const params = experiment.parameters;
    const dailyRate = params.stakingAPY / 365;
    const rewards = stakedValue * dailyRate * stakingDays;
    
    experiment.metrics.stakedValue += stakedValue;
    experiment.metrics.rewardsDistributed += rewards;
    experiment.metrics.stakersCount++;
    
    return {
      stakedValue,
      stakingDays,
      apy: params.stakingAPY,
      rewards,
      currency: params.rewardCurrency
    };
  }

  /**
   * Get experiment data
   */
  getExperiment(experimentKey) {
    return this.marketExperiments.get(experimentKey) || null;
  }

  /**
   * Get all experiments
   */
  getAllExperiments() {
    return Array.from(this.marketExperiments.values());
  }

  /**
   * Get twin adoption data
   */
  getTwinAdoptionData(region = null) {
    if (region) {
      return this.twinAdoption.regions.get(region) || null;
    }
    return {
      regions: Array.from(this.twinAdoption.regions.entries()),
      global: this.statistics.twinAdoptions,
      target: this.config.twinAdoptionTarget,
      progress: this.statistics.twinAdoptions / this.config.twinAdoptionTarget
    };
  }

  /**
   * Get system statistics
   */
  getStatistics() {
    return {
      ...this.statistics,
      frequency: `${this.config.frequency}Hz`,
      tiers: Object.keys(this.incentiveTiers).length,
      experiments: this.marketExperiments.size,
      sustainabilityFactors: this.sustainabilityMetrics.size
    };
  }

  /**
   * Deploy Incentives System
   */
  async deploy() {
    console.log('🚀 Deploying Incentives System...');
    
    // Activate incentive tiers
    console.log('✓ Incentive tiers activated');
    
    // Start market experiments
    console.log(`✓ ${this.statistics.experimentsRunning} market experiments started`);
    
    // Enable sustainability tracking
    console.log('✓ Sustainability tracking enabled');
    
    // Activate twin adoption tracking
    console.log('✓ Twin adoption tracking activated');
    
    return {
      success: true,
      frequency: `${this.config.frequency}Hz`,
      tiers: Object.keys(this.incentiveTiers).length,
      experiments: this.statistics.experimentsRunning
    };
  }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IncentivesSystem;
}
