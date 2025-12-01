/**
 * Global Broadcast Protocols Tests
 */

const BroadcastProtocols = require('../src/broadcast-protocols/global');

describe('BroadcastProtocols', () => {
  let protocols;

  beforeEach(async () => {
    protocols = new BroadcastProtocols({ frequency: 528 });
    await protocols.initialize();
    await protocols.deploy();
  });

  test('should create broadcast protocols instance', () => {
    expect(protocols).toBeDefined();
    expect(protocols.deployed).toBe(true);
  });

  test('should have calendar milestones', () => {
    expect(protocols.calendarMilestones.length).toBe(4);
    expect(protocols.calendarMilestones[0].id).toBe('genesis-launch');
  });

  test('should register influencer partner', () => {
    const partner = protocols.registerInfluencerPartner({
      name: 'Test Influencer',
      type: 'cultural',
      platform: 'instagram',
      reach: 1000000,
      engagement: 0.05
    });

    expect(partner).toBeDefined();
    expect(partner.name).toBe('Test Influencer');
    expect(partner.status).toBe('active');
  });

  test('should create Vydia drop', () => {
    const drop = protocols.createVydiaDrop({
      title: 'Genesis Drop',
      content: { type: 'music', duration: 180 },
      artists: ['Artist 1'],
      releaseDate: Date.now() + 86400000
    });

    expect(drop).toBeDefined();
    expect(drop.title).toBe('Genesis Drop');
    expect(drop.status).toBe('scheduled');
  });

  test('should sync Vydia drop to milestone', () => {
    const drop = protocols.createVydiaDrop({
      title: 'Genesis Drop',
      content: { type: 'music' }
    });

    const synced = protocols.syncToMilestone(drop.id, 'genesis-launch');

    expect(synced).toBeDefined();
    expect(synced.synchronized).toBe(true);
    expect(synced.drop.milestoneId).toBe('genesis-launch');
  });

  test('should execute broadcast', async () => {
    const broadcast = await protocols.executeBroadcast({
      type: 'announcement',
      title: 'Test Broadcast',
      content: 'This is a test broadcast'
    });

    expect(broadcast).toBeDefined();
    expect(Object.keys(broadcast.results).length).toBeGreaterThan(0);
  });

  test('should launch influencer campaign', async () => {
    const partner = protocols.registerInfluencerPartner({
      name: 'Test Influencer',
      type: 'cultural',
      platform: 'instagram',
      reach: 1000000
    });

    const campaign = await protocols.launchInfluencerCampaign(partner.id, {
      title: 'Test Campaign',
      objective: 'awareness',
      content: 'Campaign content'
    });

    expect(campaign).toBeDefined();
    expect(campaign.status).toBe('active');
  });

  test('should get analytics', async () => {
    await protocols.executeBroadcast({
      type: 'test',
      title: 'Test',
      content: 'Test'
    });

    const analytics = protocols.getAnalytics();

    expect(analytics).toBeDefined();
    expect(analytics.totalBroadcasts).toBe(1);
    expect(analytics.totalReach).toBeGreaterThan(0);
  });

  test('should get upcoming milestones', () => {
    const upcoming = protocols.getUpcomingMilestones(60);

    expect(upcoming).toBeDefined();
    expect(upcoming.length).toBeGreaterThan(0);
  });

  test('should return correct status', () => {
    const status = protocols.getStatus();

    expect(status.initialized).toBe(true);
    expect(status.deployed).toBe(true);
    expect(status.analytics).toBeDefined();
  });
});
