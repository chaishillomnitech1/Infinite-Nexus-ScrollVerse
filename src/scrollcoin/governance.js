/**
 * ScrollCoin Governance
 * 
 * Implements on-chain DAO mechanisms for ScrollVerse governance,
 * enabling decentralized decision-making and protocol management.
 */

class ScrollCoinGovernance {
  constructor(config) {
    this.config = config;
    this.initialized = false;
    this.deployed = false;

    this.governance = {
      proposals: new Map(),
      votes: new Map(),
      delegates: new Map(),
      treasury: 0
    };

    this.governanceConfig = {
      proposalThreshold: 10000, // Minimum tokens to create proposal
      quorumPercentage: 10, // 10% of total supply must vote
      votingPeriod: 7, // days
      executionDelay: 2, // days after voting ends
      vetoThreshold: 67 // 67% needed for veto
    };

    this.tokenMetrics = {
      totalSupply: 100000000,
      circulatingSupply: 0,
      stakedForGovernance: 0
    };
  }

  async initialize() {
    this.tokenMetrics.circulatingSupply = this.tokenMetrics.totalSupply * 0.4;
    this.initialized = true;
    return true;
  }

  async deploy() {
    if (!this.initialized) {
      throw new Error('ScrollCoin Governance must be initialized before deployment');
    }

    this.governance.treasury = this.tokenMetrics.totalSupply * 0.15;
    this.deployed = true;

    return {
      deployed: true,
      treasury: this.governance.treasury,
      timestamp: Date.now()
    };
  }

  /**
   * Create a new governance proposal
   */
  async createProposal(proposer, proposalData) {
    if (!this.deployed) {
      throw new Error('Governance must be deployed before creating proposals');
    }

    const proposalId = `PROP-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    
    const proposal = {
      id: proposalId,
      proposer,
      title: proposalData.title,
      description: proposalData.description,
      type: proposalData.type || 'general',
      actions: proposalData.actions || [],
      createdAt: Date.now(),
      votingStart: Date.now(),
      votingEnd: Date.now() + (this.governanceConfig.votingPeriod * 24 * 60 * 60 * 1000),
      executionTime: null,
      status: 'active',
      votes: {
        for: 0,
        against: 0,
        abstain: 0
      },
      voters: new Set()
    };

    this.governance.proposals.set(proposalId, proposal);
    return proposal;
  }

  /**
   * Cast a vote on a proposal
   */
  async castVote(proposalId, voter, voteType, votingPower) {
    const proposal = this.governance.proposals.get(proposalId);
    if (!proposal) {
      throw new Error('Proposal not found');
    }

    if (proposal.status !== 'active') {
      throw new Error('Proposal is not active');
    }

    if (Date.now() > proposal.votingEnd) {
      throw new Error('Voting period has ended');
    }

    if (proposal.voters.has(voter)) {
      throw new Error('Already voted on this proposal');
    }

    // Record the vote
    if (voteType === 'for') {
      proposal.votes.for += votingPower;
    } else if (voteType === 'against') {
      proposal.votes.against += votingPower;
    } else if (voteType === 'abstain') {
      proposal.votes.abstain += votingPower;
    }

    proposal.voters.add(voter);

    const vote = {
      proposalId,
      voter,
      voteType,
      votingPower,
      timestamp: Date.now()
    };

    this.governance.votes.set(`${proposalId}-${voter}`, vote);
    return vote;
  }

  /**
   * Execute a passed proposal
   */
  async executeProposal(proposalId) {
    const proposal = this.governance.proposals.get(proposalId);
    if (!proposal) {
      throw new Error('Proposal not found');
    }

    // Check if voting period has ended
    if (Date.now() < proposal.votingEnd) {
      throw new Error('Voting period has not ended');
    }

    // Check quorum
    const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
    const quorumNeeded = this.tokenMetrics.circulatingSupply * (this.governanceConfig.quorumPercentage / 100);
    
    if (totalVotes < quorumNeeded) {
      proposal.status = 'failed';
      return { status: 'failed', reason: 'Quorum not reached' };
    }

    // Check if passed
    if (proposal.votes.for > proposal.votes.against) {
      proposal.status = 'passed';
      proposal.executionTime = Date.now();
      
      // Execute proposal actions
      for (const action of proposal.actions) {
        await this.executeAction(action);
      }

      return { status: 'executed', proposal };
    } else {
      proposal.status = 'rejected';
      return { status: 'rejected', reason: 'Majority voted against' };
    }
  }

  async executeAction(action) {
    // Execute governance action (treasury transfer, parameter change, etc.)
    return { executed: true, action, timestamp: Date.now() };
  }

  /**
   * Delegate voting power
   */
  delegateVotingPower(from, to, amount) {
    const delegation = {
      from,
      to,
      amount,
      timestamp: Date.now()
    };

    this.governance.delegates.set(from, delegation);
    return delegation;
  }

  /**
   * Get proposal by ID
   */
  getProposal(proposalId) {
    return this.governance.proposals.get(proposalId);
  }

  /**
   * Get all active proposals
   */
  getActiveProposals() {
    const active = [];
    for (const proposal of this.governance.proposals.values()) {
      if (proposal.status === 'active') {
        active.push(proposal);
      }
    }
    return active;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      deployed: this.deployed,
      totalProposals: this.governance.proposals.size,
      activeProposals: this.getActiveProposals().length,
      treasury: this.governance.treasury,
      config: this.governanceConfig
    };
  }
}

module.exports = ScrollCoinGovernance;
