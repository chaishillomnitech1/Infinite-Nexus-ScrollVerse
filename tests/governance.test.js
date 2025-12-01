/**
 * ScrollCoin Governance Tests
 */

const ScrollCoinGovernance = require('../src/scrollcoin/governance');

describe('ScrollCoinGovernance', () => {
  let governance;

  beforeEach(async () => {
    governance = new ScrollCoinGovernance({ frequency: 528 });
    await governance.initialize();
    await governance.deploy();
  });

  test('should create governance instance', () => {
    expect(governance).toBeDefined();
    expect(governance.deployed).toBe(true);
  });

  test('should create proposal', async () => {
    const proposal = await governance.createProposal('proposer-123', {
      title: 'Test Proposal',
      description: 'A test proposal',
      type: 'general'
    });

    expect(proposal).toBeDefined();
    expect(proposal.proposer).toBe('proposer-123');
    expect(proposal.title).toBe('Test Proposal');
    expect(proposal.status).toBe('active');
  });

  test('should cast vote on proposal', async () => {
    const proposal = await governance.createProposal('proposer-123', {
      title: 'Test Proposal',
      description: 'A test proposal'
    });

    const vote = await governance.castVote(proposal.id, 'voter-123', 'for', 1000);

    expect(vote).toBeDefined();
    expect(vote.voteType).toBe('for');
    expect(vote.votingPower).toBe(1000);

    const updatedProposal = governance.getProposal(proposal.id);
    expect(updatedProposal.votes.for).toBe(1000);
  });

  test('should prevent double voting', async () => {
    const proposal = await governance.createProposal('proposer-123', {
      title: 'Test Proposal',
      description: 'A test proposal'
    });

    await governance.castVote(proposal.id, 'voter-123', 'for', 1000);

    await expect(governance.castVote(proposal.id, 'voter-123', 'against', 500))
      .rejects.toThrow('Already voted on this proposal');
  });

  test('should delegate voting power', () => {
    const delegation = governance.delegateVotingPower('from-123', 'to-456', 5000);

    expect(delegation).toBeDefined();
    expect(delegation.from).toBe('from-123');
    expect(delegation.to).toBe('to-456');
    expect(delegation.amount).toBe(5000);
  });

  test('should get active proposals', async () => {
    await governance.createProposal('proposer-1', { title: 'Proposal 1', description: 'Test' });
    await governance.createProposal('proposer-2', { title: 'Proposal 2', description: 'Test' });

    const active = governance.getActiveProposals();
    expect(active.length).toBe(2);
  });

  test('should return correct status', () => {
    const status = governance.getStatus();

    expect(status.initialized).toBe(true);
    expect(status.deployed).toBe(true);
    expect(status.treasury).toBeGreaterThan(0);
  });
});
