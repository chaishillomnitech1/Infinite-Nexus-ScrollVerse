/**
 * Launch Sequence Orchestrator Tests
 */

const LaunchSequence = require('../src/launch-sequence/orchestrator');

describe('LaunchSequence', () => {
  let orchestrator;

  beforeEach(async () => {
    orchestrator = new LaunchSequence({ frequency: 528 });
    await orchestrator.initialize();
    await orchestrator.deploy();
  });

  test('should create orchestrator instance', () => {
    expect(orchestrator).toBeDefined();
    expect(orchestrator.deployed).toBe(true);
  });

  test('should have all launch phases', () => {
    expect(orchestrator.phases.length).toBe(4);
    expect(orchestrator.phases[0].id).toBe('phase-1-teasers');
    expect(orchestrator.phases[1].id).toBe('phase-2-whitelist');
    expect(orchestrator.phases[2].id).toBe('phase-3-pilot-mint');
    expect(orchestrator.phases[3].id).toBe('phase-4-scrollchain');
  });

  test('should schedule launch', () => {
    const startDate = new Date('2025-01-01');
    const schedule = orchestrator.scheduleLaunch(startDate);

    expect(schedule).toBeDefined();
    expect(schedule.phases.length).toBe(4);
    expect(schedule.phases[0].startDate).toBeDefined();
  });

  test('should start phase', async () => {
    const phase = await orchestrator.startPhase('phase-1-teasers');

    expect(phase).toBeDefined();
    expect(phase.status).toBe('active');
    expect(phase.actualStartDate).toBeDefined();
  });

  test('should complete phase', async () => {
    await orchestrator.startPhase('phase-1-teasers');
    const phase = await orchestrator.completePhase('phase-1-teasers');

    expect(phase.status).toBe('completed');
    expect(phase.actualEndDate).toBeDefined();
  });

  test('should enforce phase dependencies', async () => {
    // Try to start phase-2-whitelist without completing phase-1-teasers
    await expect(orchestrator.startPhase('phase-2-whitelist'))
      .rejects.toThrow('Dependency phase-1-teasers not completed');
  });

  test('should execute pilot mint drop', async () => {
    // Complete prerequisites
    await orchestrator.startPhase('phase-1-teasers');
    await orchestrator.completePhase('phase-1-teasers');
    await orchestrator.startPhase('phase-2-whitelist');
    await orchestrator.completePhase('phase-2-whitelist');

    const result = await orchestrator.executePilotMintDrop(
      { title: 'TECHANGEL Pilot' },
      { collection: 'genesis', supply: 10000, price: 0.1 }
    );

    expect(result).toBeDefined();
    expect(result.pilot).toBeDefined();
    expect(result.mint).toBeDefined();
  });

  test('should register asset on ScrollChain', async () => {
    const registration = await orchestrator.registerOnScrollChain({
      assetId: 'asset-123',
      type: 'NFT',
      owner: 'owner-123',
      metadata: { collection: 'genesis' }
    });

    expect(registration).toBeDefined();
    expect(registration.scrollChainId).toBeDefined();
    expect(registration.eventAccess).toBe(true);
  });

  test('should return launch status', () => {
    const status = orchestrator.getLaunchStatus();

    expect(status).toBeDefined();
    expect(status.completedPhases).toBe(0);
    expect(status.totalPhases).toBe(4);
    expect(status.progress).toBe(0);
  });

  test('should return correct status', () => {
    const status = orchestrator.getStatus();

    expect(status.initialized).toBe(true);
    expect(status.deployed).toBe(true);
    expect(status.phases).toBeDefined();
  });
});
