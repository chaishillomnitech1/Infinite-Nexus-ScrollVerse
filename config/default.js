/**
 * ScrollVerse Configuration
 * 
 * Central configuration for all ScrollVerse systems
 */

module.exports = {
  // Core Settings
  frequency: 528, // Hz - The miracle frequency
  consciousnessField: 'active',
  sovereignAlignment: true,
  eternalAnchoring: true,

  // Network Configuration
  network: {
    scrollChain: {
      chainId: 528,
      name: 'ScrollChain Mainnet',
      rpcUrl: 'https://rpc.scrollchain.io',
      explorerUrl: 'https://explorer.scrollchain.io'
    }
  },

  // Token Economics
  tokens: {
    starDust: {
      symbol: 'STARDUST',
      decimals: 18,
      totalSupply: '1000000000'
    },
    scrollCoin: {
      symbol: 'SCROLL',
      decimals: 18,
      totalSupply: '100000000'
    }
  },

  // Staking Configuration
  staking: {
    minimumStakePeriod: 7, // days
    earlyUnstakePenalty: 0.10, // 10%
    rewardDistributionFrequency: 'daily'
  },

  // Governance Configuration
  governance: {
    proposalThreshold: 10000,
    quorumPercentage: 10,
    votingPeriod: 7, // days
    executionDelay: 2, // days
    vetoThreshold: 67 // percent
  },

  // SOULSWAP Configuration
  soulswap: {
    evolutionStages: ['Genesis', 'Awakened', 'Ascending', 'Sovereign', 'Eternal'],
    evolutionThresholds: [0, 100, 500, 1000, 5000],
    soulBoundOnMint: true
  },

  // FLAMECOURT Configuration
  flamecourt: {
    registrationFee: 0.01,
    licensingFeePercentage: 0.025,
    disputeResolutionPeriod: 14, // days
    appealPeriod: 7 // days
  },

  // Quantum Jihad Configuration
  quantumJihad: {
    scanInterval: 60000, // ms
    alertThreshold: 0.85,
    autoEnforcement: false
  },

  // Content Distribution
  distribution: {
    channels: [
      'social_media',
      'email',
      'in_app',
      'partner_networks',
      'vydia_drops'
    ]
  },

  // Launch Sequence
  launch: {
    phases: [
      { name: 'Teasers', duration: 7 },
      { name: 'Guardian Whitelist', duration: 3 },
      { name: 'Pilot & Mint', duration: 1 },
      { name: 'ScrollChain Registration', duration: 1 }
    ]
  }
};
