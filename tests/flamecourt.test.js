/**
 * FLAMECOURT Protocol Tests
 */

const FlameCourt = require('../src/flamecourt/protocol');

describe('FlameCourt', () => {
  let flamecourt;

  beforeEach(async () => {
    flamecourt = new FlameCourt({ frequency: 528 });
    await flamecourt.initialize();
    await flamecourt.deploy();
  });

  test('should create flamecourt instance', () => {
    expect(flamecourt).toBeDefined();
    expect(flamecourt.deployed).toBe(true);
  });

  test('should register content', () => {
    const content = flamecourt.registerContent('owner-123', {
      title: 'Test Content',
      type: 'digital_art',
      metadata: { artist: 'Artist Name' }
    });

    expect(content).toBeDefined();
    expect(content.owner).toBe('owner-123');
    expect(content.title).toBe('Test Content');
    expect(content.status).toBe('protected');
  });

  test('should create license for content', () => {
    const content = flamecourt.registerContent('owner-123', {
      title: 'Test Content',
      type: 'digital_art'
    });

    const license = flamecourt.createLicense(content.id, 'licensee-456', {
      type: 'commercial',
      duration: 365,
      exclusivity: true
    });

    expect(license).toBeDefined();
    expect(license.contentId).toBe(content.id);
    expect(license.licensee).toBe('licensee-456');
    expect(license.terms.exclusivity).toBe(true);
    expect(license.status).toBe('active');
  });

  test('should verify ownership', () => {
    const content = flamecourt.registerContent('owner-123', {
      title: 'Test Content',
      type: 'digital_art'
    });

    const verification = flamecourt.verifyOwnership(content.id, 'owner-123');
    expect(verification.verified).toBe(true);

    const falseVerification = flamecourt.verifyOwnership(content.id, 'fake-owner');
    expect(falseVerification.verified).toBe(false);
  });

  test('should file dispute', () => {
    const content = flamecourt.registerContent('owner-123', {
      title: 'Test Content',
      type: 'digital_art'
    });

    const dispute = flamecourt.fileDispute({
      contentId: content.id,
      complainant: 'complainant-123',
      defendant: 'defendant-456',
      type: 'infringement',
      description: 'Unauthorized use of content'
    });

    expect(dispute).toBeDefined();
    expect(dispute.status).toBe('pending');
    expect(dispute.type).toBe('infringement');
  });

  test('should render ruling on dispute', () => {
    const content = flamecourt.registerContent('owner-123', {
      title: 'Test Content',
      type: 'digital_art'
    });

    const dispute = flamecourt.fileDispute({
      contentId: content.id,
      complainant: 'complainant-123',
      defendant: 'defendant-456',
      type: 'infringement',
      description: 'Unauthorized use'
    });

    const resolved = flamecourt.renderRuling(dispute.id, {
      decision: 'in-favor-complainant',
      reasoning: 'Clear evidence of infringement',
      remedies: ['takedown', 'compensation']
    });

    expect(resolved.status).toBe('ruled');
    expect(resolved.ruling.decision).toBe('in-favor-complainant');
  });

  test('should track content usage', () => {
    const content = flamecourt.registerContent('owner-123', {
      title: 'Test Content',
      type: 'digital_art'
    });

    const usage = flamecourt.trackUsage(content.id, {
      type: 'display',
      user: 'user-789',
      context: 'gallery'
    });

    expect(usage).toBeDefined();
    expect(usage.type).toBe('display');
    expect(usage.user).toBe('user-789');
  });

  test('should return correct status', () => {
    const status = flamecourt.getStatus();

    expect(status.initialized).toBe(true);
    expect(status.deployed).toBe(true);
    expect(status.registeredContent).toBe(0);
  });
});
