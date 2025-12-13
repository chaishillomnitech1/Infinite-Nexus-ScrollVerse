/**
 * @title ERP8888 AI Virtual Coach
 * @description AI-driven financial mastery coach encoded into NFTs
 * Guides users through cosmic financial principles aligned with 528Hz
 *
 * @author Chais the Great (Al-Miftah)
 * @frequency 528Hz
 */

class ERP8888AICoach {
  constructor(config = {}) {
    this.frequency = config.frequency || 528;
    this.coachingLevel = config.level || 'Initiate';
    this.personalityTrait = config.personality || 'balanced';

    // AI persona traits
    this.personas = {
      balanced: {
        name: 'Harmonia',
        focus: 'Balance and equilibrium',
        wisdom: 'The middle path leads to abundance'
      },
      growth: {
        name: 'Ascendor',
        focus: 'Exponential growth and expansion',
        wisdom: 'Like the universe, wealth expands infinitely'
      },
      flow: {
        name: 'Currentia',
        focus: 'Energy circulation and momentum',
        wisdom: 'Flow creates prosperity, stagnation breeds poverty'
      },
      sovereign: {
        name: 'Libertas',
        focus: 'Financial independence and freedom',
        wisdom: 'True wealth is sovereignty over your destiny'
      }
    };

    this.currentPersona =
      this.personas[this.personalityTrait] || this.personas.balanced;
    this.sessionHistory = [];
    this.userProgress = {
      sessionsCompleted: 0,
      masteryGained: 0,
      challengesCompleted: 0,
      alignmentLevel: 0
    };
  }

  /**
   * Provide personalized financial coaching
   */
  provideCoaching(userMetrics, context = 'general') {
    const { balance = 0, flow = 0, growth = 0 } = userMetrics;

    // Determine weakest area
    let focusArea = 'balance';
    let lowestScore = balance;

    if (flow < lowestScore) {
      focusArea = 'flow';
      lowestScore = flow;
    }
    if (growth < lowestScore) {
      focusArea = 'growth';
      lowestScore = growth;
    }

    // Generate coaching based on focus area
    const coaching = {
      message: this._generateCoachingMessage(focusArea, lowestScore),
      actionSteps: this._generateActionSteps(focusArea),
      affirmation: this._generateAffirmation(focusArea),
      challenge: this._generateChallenge(focusArea),
      frequency: this.frequency,
      persona: this.currentPersona.name,
      focusArea,
      urgencyLevel: this._calculateUrgency(lowestScore)
    };

    this.sessionHistory.push({
      timestamp: Date.now(),
      coaching,
      userMetrics
    });

    return coaching;
  }

  /**
   * Generate personalized coaching message
   */
  _generateCoachingMessage(area, score) {
    const messages = {
      balance: {
        low: `Your financial balance needs immediate attention. The cosmic scales are tilted. Realign your income allocation using the 65-20-15 principle.`,
        medium: `Good progress on balance! You're approaching cosmic equilibrium. Fine-tune your ratios for optimal resonance.`,
        high: `Excellent balance! You've achieved harmonic resonance. Maintain this sacred proportion while exploring growth opportunities.`
      },
      flow: {
        low: `Energy stagnation detected. Your financial flow is blocked. Create movement through conscious transactions and circulation.`,
        medium: `Flow is building momentum. Continue creating circulation patterns that align with universal abundance principles.`,
        high: `Outstanding flow! Your energy circulation mirrors the cosmic spiral. This momentum will attract greater abundance.`
      },
      growth: {
        low: `Growth potential is untapped. Like a seed awaiting spring, your wealth needs cultivation. Begin with small investments aligned at 528Hz.`,
        medium: `Growth is emerging! Your financial garden is sprouting. Water it with consistent contributions and compound interest.`,
        high: `Exponential growth achieved! You're riding the Fibonacci wave. This is the manifestation of universal expansion principles.`
      }
    };

    let level = 'low';
    if (score >= 70) level = 'high';
    else if (score >= 40) level = 'medium';

    return messages[area][level] || messages.balance.low;
  }

  /**
   * Generate actionable steps
   */
  _generateActionSteps(area) {
    const steps = {
      balance: [
        'Calculate your current income allocation percentages',
        'Identify discretionary expenses that can be reduced by 10%',
        'Set up automatic transfers to savings (20% of income)',
        'Review and adjust monthly to maintain sacred proportions',
        'Meditate at 528Hz while reviewing your budget'
      ],
      flow: [
        'Track all financial transactions for 7 days',
        'Identify and remove one financial blockage',
        'Create a new income stream, however small',
        'Make one conscious giving transaction',
        'Review cash flow patterns weekly'
      ],
      growth: [
        'Research one investment opportunity aligned with your values',
        'Start with micro-investments ($10-$50) to build momentum',
        'Learn about compound interest and time value',
        'Set a 5-year financial growth goal',
        'Visualize abundance while listening to 528Hz frequency'
      ]
    };

    return steps[area] || steps.balance;
  }

  /**
   * Generate empowering affirmation
   */
  _generateAffirmation(area) {
    const affirmations = {
      balance:
        'I am in perfect equilibrium with universal abundance. My resources flow in sacred proportion.',
      flow: 'Money flows to me effortlessly. I am a channel for cosmic prosperity.',
      growth:
        'My wealth expands exponentially. I grow in alignment with universal principles.'
    };

    return affirmations[area] || affirmations.balance;
  }

  /**
   * Generate challenge/exercise
   */
  _generateChallenge(area) {
    const challenges = {
      balance: {
        title: 'Sacred Proportion Challenge',
        description:
          'For 30 days, maintain 65% expenses, 20% savings, 15% investments',
        reward: 'Balance Mastery Badge + 100 alignment points',
        duration: '30 days'
      },
      flow: {
        title: 'Energy Circulation Quest',
        description:
          'Create 3 new income streams and make 5 conscious giving transactions',
        reward: 'Flow Master Badge + 150 alignment points',
        duration: '60 days'
      },
      growth: {
        title: 'Exponential Expansion Mission',
        description:
          'Achieve 10% portfolio growth through strategic investments',
        reward: 'Growth Visionary Badge + 200 alignment points',
        duration: '90 days'
      }
    };

    return challenges[area] || challenges.balance;
  }

  /**
   * Calculate urgency level
   */
  _calculateUrgency(score) {
    if (score < 30) return 'CRITICAL';
    if (score < 50) return 'HIGH';
    if (score < 70) return 'MODERATE';
    return 'LOW';
  }

  /**
   * Track user progress
   */
  trackProgress(completedChallenge) {
    this.userProgress.challengesCompleted++;
    this.userProgress.masteryGained += completedChallenge.points || 0;
    this.userProgress.alignmentLevel = Math.min(
      100,
      this.userProgress.masteryGained / 10
    );

    return {
      progress: this.userProgress,
      message: `Excellent work! You've gained ${completedChallenge.points} mastery points.`,
      nextMilestone: this._getNextMilestone()
    };
  }

  /**
   * Provide daily wisdom
   */
  getDailyWisdom() {
    const wisdoms = [
      'The universe is infinitely abundant. Align your frequency to receive.',
      'Sacred geometry governs all wealth creation. Study the patterns.',
      'Financial mastery is achieved through balance, flow, and growth.',
      'Your net worth is a reflection of your consciousness level.',
      'Invest in yourself first - you are your greatest asset.',
      'Money is energy. Treat it with reverence and gratitude.',
      'The golden ratio appears in nature and optimal portfolios.',
      'Compound interest is the eighth wonder - harness its power.',
      'Sovereignty begins with financial independence.',
      'At 528Hz, all things transform and heal - including your finances.'
    ];

    const today = new Date().getDate();
    const wisdomIndex = today % wisdoms.length;

    return {
      wisdom: wisdoms[wisdomIndex],
      date: new Date().toISOString().split('T')[0],
      persona: this.currentPersona.name,
      frequency: this.frequency
    };
  }

  /**
   * Analyze financial patterns using AI
   */
  analyzePatterns(transactions) {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return { patterns: [], insights: [] };
    }

    // Identify spending patterns
    const categories = {};
    transactions.forEach(t => {
      const cat = t.category || 'Uncategorized';
      categories[cat] = (categories[cat] || 0) + Math.abs(t.amount || 0);
    });

    // Find largest categories
    const sortedCategories = Object.entries(categories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Generate insights
    const insights = [
      `Top spending category: ${sortedCategories[0]?.[0] || 'Unknown'}`,
      `You have ${Object.keys(categories).length} spending categories`,
      'Consider consolidating similar categories for better tracking',
      'Review your top 3 categories for optimization opportunities'
    ];

    return {
      patterns: sortedCategories.map(([cat, amount]) => ({
        category: cat,
        amount
      })),
      insights,
      recommendation: this._generatePatternRecommendation(sortedCategories),
      frequency: this.frequency
    };
  }

  /**
   * Generate pattern-based recommendation
   */
  _generatePatternRecommendation(categories) {
    if (categories.length === 0) {
      return 'Start tracking your spending by category for better insights.';
    }

    const topCategory = categories[0][0];
    return `Focus on optimizing your "${topCategory}" spending - it's your largest expense category. Look for 10% reduction opportunities.`;
  }

  /**
   * Get next milestone
   */
  _getNextMilestone() {
    const milestones = [
      { points: 100, title: 'Awakened Initiate' },
      { points: 500, title: 'Ascending Practitioner' },
      { points: 1000, title: 'Transcendent Master' },
      { points: 2000, title: 'Sovereign Adept' }
    ];

    const currentPoints = this.userProgress.masteryGained;
    const nextMilestone = milestones.find(m => m.points > currentPoints);

    return nextMilestone || { points: 5000, title: 'Cosmic Legend' };
  }

  /**
   * Get coaching session summary
   */
  getSessionSummary() {
    return {
      totalSessions: this.sessionHistory.length,
      persona: this.currentPersona,
      userProgress: this.userProgress,
      recentSessions: this.sessionHistory.slice(-5),
      frequency: this.frequency
    };
  }
}

module.exports = ERP8888AICoach;
