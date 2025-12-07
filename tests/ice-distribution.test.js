/**
 * ICE Distribution Pipeline Tests
 */

const ICEDistribution = require('../src/ice-distribution/pipeline');

describe('ICEDistribution', () => {
  let ice;

  beforeEach(async () => {
    ice = new ICEDistribution({ frequency: 528 });
    await ice.initialize();
    await ice.deploy();
  });

  test('should create ICE distribution instance', () => {
    expect(ice).toBeDefined();
    expect(ice.deployed).toBe(true);
  });

  test('should have content pipelines initialized', () => {
    expect(ice.contentPipelines.length).toBe(3);
    expect(ice.contentPipelines[0].id).toBe('scrollsoul-teases');
    expect(ice.contentPipelines[1].id).toBe('episodics');
    expect(ice.contentPipelines[2].id).toBe('event-marketing');
  });

  test('should create content', () => {
    const content = ice.createContent({
      title: 'Test Content',
      type: 'tease',
      body: 'Content body here'
    });

    expect(content).toBeDefined();
    expect(content.title).toBe('Test Content');
    expect(content.status).toBe('draft');
  });

  test('should schedule content', () => {
    const content = ice.createContent({
      title: 'Test Content',
      type: 'tease',
      body: 'Content body'
    });

    const scheduled = ice.scheduleContent(content, {
      pipelineId: 'scrollsoul-teases',
      scheduledFor: Date.now() + 86400000 // Tomorrow
    });

    expect(scheduled).toBeDefined();
    expect(scheduled.status).toBe('scheduled');
  });

  test('should distribute content immediately', async () => {
    const content = ice.createContent({
      title: 'Test Content',
      type: 'tease',
      body: 'Content body'
    });

    const distribution = await ice.distributeContent(content);

    expect(distribution).toBeDefined();
    expect(Object.keys(distribution.results).length).toBeGreaterThan(0);
    expect(content.status).toBe('distributed');
  });

  test('should create ScrollSoul tease', async () => {
    const result = await ice.createScrollSoulTease({
      title: 'The Awakening',
      body: 'A new frequency resonates...',
      media: ['teaser.mp4']
    });

    expect(result).toBeDefined();
    expect(result.results).toBeDefined();
  });

  test('should schedule episodic release', async () => {
    const result = await ice.scheduleEpisodic({
      title: 'Episode 1: Genesis',
      body: 'The first episode',
      episodeNumber: 1,
      releaseDate: Date.now() + 604800000 // 1 week
    });

    expect(result).toBeDefined();
    expect(result.status).toBe('scheduled');
  });

  test('should get distribution metrics', () => {
    const metrics = ice.getMetrics();

    expect(metrics).toBeDefined();
    expect(metrics.totalDistributed).toBeDefined();
    expect(metrics.activePipelines).toBe(3);
  });

  test('should return correct status', () => {
    const status = ice.getStatus();

    expect(status.initialized).toBe(true);
    expect(status.deployed).toBe(true);
    expect(status.pipelines).toBeDefined();
  });
});
