/**
 * Quantum Jihad Monitor Tests
 */

const QuantumJihad = require('../src/quantum-jihad/monitor');

describe('QuantumJihad', () => {
  let monitor;

  beforeEach(async () => {
    monitor = new QuantumJihad({ frequency: 528 });
    await monitor.initialize();
    await monitor.deploy();
  });

  test('should create monitor instance', () => {
    expect(monitor).toBeDefined();
    expect(monitor.deployed).toBe(true);
  });

  test('should have monitors for all platforms', () => {
    expect(monitor.monitors.length).toBe(4);
    expect(monitor.monitors[0].platform).toBe('scrollverse_internal');
    expect(monitor.monitors.every(m => m.status === 'active')).toBe(true);
  });

  test('should scan for violations', async () => {
    const result = await monitor.scanForViolations('content-hash-123');

    expect(result).toBeDefined();
    expect(result.contentHash).toBe('content-hash-123');
    expect(result.results.length).toBe(4);
    expect(result.completedAt).toBeDefined();
  });

  test('should scan specific platforms', async () => {
    const result = await monitor.scanForViolations('content-hash-123', ['scrollverse_internal']);

    expect(result.platforms.length).toBe(1);
    expect(result.results.length).toBe(1);
  });

  test('should report violation', () => {
    const violation = monitor.reportViolation({
      contentId: 'content-123',
      contentHash: 'hash-123',
      platform: 'external_marketplaces',
      location: 'https://example.com/stolen',
      confidence: 0.95,
      reportedBy: 'reporter-123'
    });

    expect(violation).toBeDefined();
    expect(violation.status).toBe('pending');
    expect(violation.confidence).toBe(0.95);
  });

  test('should create alert for high confidence violations', () => {
    monitor.reportViolation({
      contentId: 'content-123',
      platform: 'external_marketplaces',
      confidence: 0.95
    });

    const alerts = monitor.getPendingAlerts();
    expect(alerts.length).toBe(1);
    expect(alerts[0].severity).toBe('critical');
  });

  test('should take enforcement action', async () => {
    const violation = monitor.reportViolation({
      contentId: 'content-123',
      platform: 'external_marketplaces',
      confidence: 0.95
    });

    const action = await monitor.takeEnforcementAction(violation.id, 'takedown_request');

    expect(action).toBeDefined();
    expect(action.actionType).toBe('takedown_request');
    expect(action.status).toBe('sent');
  });

  test('should acknowledge and resolve alerts', () => {
    monitor.reportViolation({
      contentId: 'content-123',
      platform: 'external_marketplaces',
      confidence: 0.95
    });

    const alerts = monitor.getPendingAlerts();
    const alertId = alerts[0].id;

    monitor.acknowledgeAlert(alertId);
    expect(alerts[0].acknowledged).toBe(true);

    monitor.resolveAlert(alertId, 'Content removed');
    expect(alerts[0].resolved).toBe(true);
  });

  test('should return statistics', () => {
    const stats = monitor.getStatistics();

    expect(stats).toBeDefined();
    expect(stats.totalScans).toBeDefined();
    expect(stats.totalAlerts).toBeDefined();
    expect(stats.monitorStatuses).toBeDefined();
  });

  test('should return correct status', () => {
    const status = monitor.getStatus();

    expect(status.initialized).toBe(true);
    expect(status.deployed).toBe(true);
    expect(status.statistics).toBeDefined();
  });
});
