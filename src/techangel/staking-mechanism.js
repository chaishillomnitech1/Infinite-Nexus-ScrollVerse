/**
 * Staking Mechanism
 * 
 * Manages NFT and token staking within the ScrollVerse ecosystem,
 * providing rewards and governance participation.
 */

class StakingMechanism {
  constructor(config) {
    this.config = config;
    this.initialized = false;
    this.active = false;

    this.stakingPools = [];
    this.stakes = new Map();

    this.stakingConfig = {
      minimumStakePeriod: 7, // days
      earlyUnstakePenalty: 0.10, // 10%
      rewardDistributionFrequency: 'daily'
    };
  }

  async initialize() {
    this.stakingPools = [
      {
        id: 'guardian-pool',
        name: 'Guardian Staking Pool',
        apy: 15,
        minimumStake: 100,
        lockPeriod: 30, // days
        totalStaked: 0
      },
      {
        id: 'sovereign-pool',
        name: 'Sovereign Staking Pool',
        apy: 25,
        minimumStake: 1000,
        lockPeriod: 90, // days
        totalStaked: 0
      },
      {
        id: 'nft-staking',
        name: 'NFT Staking Pool',
        apy: 20,
        minimumStake: 1,
        lockPeriod: 14, // days
        totalStaked: 0,
        assetType: 'NFT'
      }
    ];

    this.initialized = true;
    return true;
  }

  async activate() {
    if (!this.initialized) {
      throw new Error('Staking must be initialized before activation');
    }

    this.active = true;
    return {
      active: true,
      pools: this.stakingPools.length,
      timestamp: Date.now()
    };
  }

  async stake(poolId, amount, staker) {
    if (!this.active) {
      throw new Error('Staking is not active');
    }

    const pool = this.stakingPools.find(p => p.id === poolId);
    if (!pool) {
      throw new Error('Pool not found');
    }

    if (amount < pool.minimumStake) {
      throw new Error(`Minimum stake is ${pool.minimumStake}`);
    }

    const stakeId = `stake-${Date.now()}-${staker}`;
    const stake = {
      id: stakeId,
      poolId,
      staker,
      amount,
      stakedAt: Date.now(),
      unlockDate: Date.now() + (pool.lockPeriod * 24 * 60 * 60 * 1000)
    };

    this.stakes.set(stakeId, stake);
    pool.totalStaked += amount;

    return stake;
  }

  async unstake(stakeId) {
    const stake = this.stakes.get(stakeId);
    if (!stake) {
      throw new Error('Stake not found');
    }

    const pool = this.stakingPools.find(p => p.id === stake.poolId);
    const now = Date.now();
    let penalty = 0;

    if (now < stake.unlockDate) {
      penalty = stake.amount * this.stakingConfig.earlyUnstakePenalty;
    }

    const rewards = this.calculateRewards(stake);
    const returnAmount = stake.amount - penalty + rewards;

    pool.totalStaked -= stake.amount;
    this.stakes.delete(stakeId);

    return {
      stakeId,
      returnAmount,
      rewards,
      penalty,
      timestamp: now
    };
  }

  calculateRewards(stake) {
    const pool = this.stakingPools.find(p => p.id === stake.poolId);
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const daysStaked = (Date.now() - stake.stakedAt) / MS_PER_DAY;
    const dailyRate = pool.apy / 100 / 365;
    return stake.amount * dailyRate * daysStaked;
  }

  getStakesByStaker(staker) {
    const stakerStakes = [];
    for (const stake of this.stakes.values()) {
      if (stake.staker === staker) {
        stakerStakes.push(stake);
      }
    }
    return stakerStakes;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      active: this.active,
      pools: this.stakingPools,
      totalStakes: this.stakes.size
    };
  }
}

module.exports = StakingMechanism;
