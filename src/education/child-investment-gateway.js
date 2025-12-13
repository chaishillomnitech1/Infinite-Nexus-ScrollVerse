/**
 * 💰 Child Investment Gateway
 * APY-style economic simulations for youth financial sovereignty
 * Tied to educational sovereignty exercises
 * Operating at 528Hz Divine Frequency
 *
 * @author Chais the Great (Al-Miftah)
 * @version 1.0.0
 */

const { SACRED_AUDIO_TONES } = require('../constants/sacred-constants');

/**
 * Child Investment Gateway for economic sovereignty education
 * Provides APY calculations, investment simulations, and wealth-building exercises
 */
class ChildInvestmentGateway {
  constructor(config = {}) {
    this.config = {
      frequency: 528,
      baseAPY: 0.05, // 5% annual percentage yield
      sovereigntyBonus: 0.02, // 2% bonus for sovereignty achievements
      minInvestmentAge: 0, // Open to all ages
      maxInvestmentAge: 18, // Focus on youth
      ...config
    };

    this.initialized = false;
    this.investmentAccounts = new Map();
    this.economicSimulations = new Map();
    this.sovereigntyExercises = new Map();
  }

  /**
   * Initialize the Child Investment Gateway
   */
  async initialize() {
    // Register economic simulation types
    this._registerEconomicSimulations();

    // Register sovereignty exercises
    this._registerSovereigntyExercises();

    this.initialized = true;

    return {
      status: 'initialized',
      frequency: this.config.frequency,
      baseAPY: this.config.baseAPY,
      sovereigntyBonus: this.config.sovereigntyBonus,
      simulationTypes: this.economicSimulations.size,
      exerciseTypes: this.sovereigntyExercises.size,
      timestamp: Date.now()
    };
  }

  /**
   * Register economic simulation types
   * @private
   */
  _registerEconomicSimulations() {
    // Simple Savings Growth
    this.economicSimulations.set('simple_savings', {
      name: 'Simple Savings Growth',
      description: 'Learn compound interest with simple APY calculations',
      difficulty: 'beginner',
      frequency: SACRED_AUDIO_TONES.MIRACLE,
      calculationType: 'compound_interest'
    });

    // Maritime Trade Economics
    this.economicSimulations.set('maritime_trade', {
      name: 'Maritime Trade Economics',
      description: "Simulate Paul Cuffee's shipping business economics",
      difficulty: 'intermediate',
      frequency: SACRED_AUDIO_TONES.CONNECTION,
      calculationType: 'trade_profit_margin'
    });

    // Community Investment Pool
    this.economicSimulations.set('community_pool', {
      name: 'Community Investment Pool',
      description: 'Collective investment and community wealth building',
      difficulty: 'advanced',
      frequency: SACRED_AUDIO_TONES.CONNECTION,
      calculationType: 'pooled_apy'
    });

    // Celestial Investment Strategy
    this.economicSimulations.set('celestial_strategy', {
      name: 'Celestial Investment Strategy',
      description: 'Long-term investment using astronomical cycles',
      difficulty: 'advanced',
      frequency: SACRED_AUDIO_TONES.DIVINE,
      calculationType: 'cyclical_growth'
    });
  }

  /**
   * Register sovereignty exercises tied to economics
   * @private
   */
  _registerSovereigntyExercises() {
    // Budget Planning Exercise
    this.sovereigntyExercises.set('budget_planning', {
      name: 'Budget Planning Mastery',
      description: 'Create and manage a personal budget',
      sovereigntyPoints: 100,
      economicValue: 'financial_discipline',
      frequency: SACRED_AUDIO_TONES.MIRACLE
    });

    // Investment Decision Making
    this.sovereigntyExercises.set('investment_decisions', {
      name: 'Investment Decision Making',
      description: 'Analyze and choose investment opportunities',
      sovereigntyPoints: 150,
      economicValue: 'strategic_thinking',
      frequency: SACRED_AUDIO_TONES.CONNECTION
    });

    // Wealth Building Strategy
    this.sovereigntyExercises.set('wealth_building', {
      name: 'Wealth Building Strategy',
      description: 'Develop long-term wealth accumulation plan',
      sovereigntyPoints: 200,
      economicValue: 'generational_wealth',
      frequency: SACRED_AUDIO_TONES.DIVINE
    });

    // Community Economic Development
    this.sovereigntyExercises.set('community_development', {
      name: 'Community Economic Development',
      description: 'Plan economic development for community prosperity',
      sovereigntyPoints: 250,
      economicValue: 'collective_prosperity',
      frequency: SACRED_AUDIO_TONES.CONNECTION
    });
  }

  /**
   * Create a child investment account
   * @param {string} childId - Child identifier
   * @param {Object} accountData - Account information
   */
  createAccount(childId, accountData) {
    if (!this.initialized) {
      throw new Error('Investment Gateway must be initialized first');
    }

    const account = {
      id: `account_${Date.now()}`,
      childId,
      name: accountData.name,
      age: accountData.age,
      createdAt: Date.now(),
      balance: accountData.initialBalance || 0,
      apy: this.config.baseAPY,
      sovereigntyMultiplier: 1.0,
      sovereigntyPoints: 0,
      completedExercises: [],
      investmentHistory: [],
      frequency: this.config.frequency
    };

    this.investmentAccounts.set(account.id, account);

    return {
      accountId: account.id,
      childId,
      initialBalance: account.balance,
      apy: account.apy,
      message: `Investment account created for ${accountData.name}`
    };
  }

  /**
   * Calculate compound interest growth
   * @param {number} principal - Initial investment amount
   * @param {number} apy - Annual percentage yield (decimal)
   * @param {number} years - Investment duration in years
   * @param {number} contributions - Annual contributions
   */
  calculateCompoundGrowth(principal, apy, years, contributions = 0) {
    const results = [];
    let balance = principal;

    for (let year = 0; year <= years; year++) {
      if (year > 0) {
        // Add interest
        balance = balance * (1 + apy);
        // Add contributions
        balance += contributions;
      }

      results.push({
        year,
        balance: Math.round(balance * 100) / 100,
        totalContributions: principal + contributions * year,
        interestEarned:
          Math.round((balance - principal - contributions * year) * 100) / 100
      });
    }

    return {
      projections: results,
      finalBalance: results[years].balance,
      totalInterest: results[years].interestEarned,
      apy,
      frequency: this.config.frequency
    };
  }

  /**
   * Run an economic simulation
   * @param {string} accountId - Investment account ID
   * @param {string} simulationType - Type of simulation
   * @param {Object} simulationParams - Simulation parameters
   */
  async runSimulation(accountId, simulationType, simulationParams) {
    if (!this.initialized) {
      throw new Error('Investment Gateway must be initialized first');
    }

    const account = this.investmentAccounts.get(accountId);
    if (!account) {
      throw new Error(`Investment account "${accountId}" not found`);
    }

    const simulation = this.economicSimulations.get(simulationType);
    if (!simulation) {
      throw new Error(`Economic simulation "${simulationType}" not found`);
    }

    const simulationId = `sim_${Date.now()}`;
    const results = await this._executeSimulation(
      simulation,
      simulationParams,
      account
    );

    // Store simulation in account history
    account.investmentHistory.push({
      simulationId,
      type: simulationType,
      timestamp: Date.now(),
      results
    });

    return {
      simulationId,
      accountId,
      simulationType,
      results,
      frequency: simulation.frequency
    };
  }

  /**
   * Execute a specific economic simulation
   * @private
   */
  async _executeSimulation(simulation, params, account) {
    const baseResults = {
      simulationType: simulation.name,
      difficulty: simulation.difficulty,
      frequency: simulation.frequency
    };

    switch (simulation.calculationType) {
      case 'compound_interest': {
        const growth = this.calculateCompoundGrowth(
          params.principal || 1000,
          account.apy * account.sovereigntyMultiplier,
          params.years || 10,
          params.annualContribution || 100
        );
        return { ...baseResults, ...growth };
      }

      case 'trade_profit_margin': {
        const investment = params.tradeInvestment || 5000;
        const profitMargin = params.profitMargin || 0.15; // 15%
        const trips = params.annualTrips || 12;
        const years = params.years || 5;

        const annualProfit = investment * profitMargin * trips;
        const totalProfit = annualProfit * years;

        return {
          ...baseResults,
          investment,
          profitMargin,
          annualTrips: trips,
          annualProfit,
          totalProfit,
          roi: (totalProfit / investment) * 100
        };
      }

      case 'pooled_apy': {
        const individualInvestment = params.contribution || 500;
        const poolMembers = params.members || 20;
        const poolAPY = account.apy + this.config.sovereigntyBonus;
        const years = params.years || 10;

        const totalPool = individualInvestment * poolMembers;
        const growth = this.calculateCompoundGrowth(
          totalPool,
          poolAPY,
          years,
          0
        );
        const individualShare = growth.finalBalance / poolMembers;

        return {
          ...baseResults,
          individualInvestment,
          poolMembers,
          totalPoolSize: totalPool,
          poolAPY,
          individualFinalValue: individualShare,
          individualGain: individualShare - individualInvestment
        };
      }

      case 'cyclical_growth': {
        // Investment based on astronomical cycles (lunar, solar)
        const investment = params.investment || 1000;
        const cycleYears = params.cycleYears || 8; // Moon cycle
        const cycles = params.numberOfCycles || 3;
        const cycleBonus = 0.02; // 2% bonus per cycle completion

        let balance = investment;
        const cycleResults = [];

        for (let i = 0; i < cycles; i++) {
          const cycleAPY = account.apy + cycleBonus * (i + 1);
          balance = balance * Math.pow(1 + cycleAPY, cycleYears);
          cycleResults.push({
            cycle: i + 1,
            years: (i + 1) * cycleYears,
            apy: cycleAPY,
            balance: Math.round(balance * 100) / 100
          });
        }

        return {
          ...baseResults,
          initialInvestment: investment,
          cycles,
          cycleYears,
          cycleResults,
          finalBalance: cycleResults[cycles - 1].balance,
          totalGain: cycleResults[cycles - 1].balance - investment
        };
      }

      default:
        return baseResults;
    }
  }

  /**
   * Complete a sovereignty exercise
   * @param {string} accountId - Investment account ID
   * @param {string} exerciseId - Sovereignty exercise ID
   * @param {Object} exerciseResults - Results from the exercise
   */
  completeSovereigntyExercise(accountId, exerciseId, exerciseResults = {}) {
    const account = this.investmentAccounts.get(accountId);
    if (!account) {
      throw new Error(`Investment account "${accountId}" not found`);
    }

    const exercise = this.sovereigntyExercises.get(exerciseId);
    if (!exercise) {
      throw new Error(`Sovereignty exercise "${exerciseId}" not found`);
    }

    // Award sovereignty points
    const pointsEarned = exercise.sovereigntyPoints;
    account.sovereigntyPoints += pointsEarned;
    account.completedExercises.push({
      exerciseId,
      timestamp: Date.now(),
      pointsEarned,
      results: exerciseResults
    });

    // Calculate sovereignty multiplier based on total points
    // Each 100 points increases multiplier by 0.05 (5%)
    const multiplierIncrease =
      Math.floor(account.sovereigntyPoints / 100) * 0.05;
    account.sovereigntyMultiplier = 1.0 + multiplierIncrease;

    // Update APY with sovereignty bonus
    account.apy = this.config.baseAPY * account.sovereigntyMultiplier;

    return {
      accountId,
      exerciseId,
      exerciseName: exercise.name,
      pointsEarned,
      totalSovereigntyPoints: account.sovereigntyPoints,
      sovereigntyMultiplier: account.sovereigntyMultiplier,
      newAPY: account.apy,
      message: `Completed "${exercise.name}" - APY increased to ${(account.apy * 100).toFixed(2)}%`
    };
  }

  /**
   * Get account details
   * @param {string} accountId - Investment account ID
   */
  getAccount(accountId) {
    return this.investmentAccounts.get(accountId);
  }

  /**
   * Get account projection
   * @param {string} accountId - Investment account ID
   * @param {number} years - Years to project
   */
  getAccountProjection(accountId, years = 10) {
    const account = this.investmentAccounts.get(accountId);
    if (!account) {
      throw new Error(`Investment account "${accountId}" not found`);
    }

    return this.calculateCompoundGrowth(
      account.balance,
      account.apy,
      years,
      0 // Can add regular contributions
    );
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      frequency: this.config.frequency,
      baseAPY: this.config.baseAPY,
      sovereigntyBonus: this.config.sovereigntyBonus,
      activeAccounts: this.investmentAccounts.size,
      simulationTypes: this.economicSimulations.size,
      exerciseTypes: this.sovereigntyExercises.size,
      simulations: Array.from(this.economicSimulations.keys()),
      exercises: Array.from(this.sovereigntyExercises.keys())
    };
  }
}

module.exports = ChildInvestmentGateway;
