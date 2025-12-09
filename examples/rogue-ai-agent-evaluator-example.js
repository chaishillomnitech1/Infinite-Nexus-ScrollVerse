/**
 * Rogue AI Agent Evaluator Framework - Usage Example
 * 
 * Demonstrates comprehensive AI agent evaluation, performance monitoring,
 * and CI/CD integration for the CHAIS X MANUS ecosystem.
 */

const {
  RogueAIAgentEvaluator,
  PerformanceMetricsDashboard,
  CICDExecutionPriorities
} = require('../src/ai-agents');

/**
 * Example 1: Basic Agent Evaluation
 */
async function basicAgentEvaluation() {
  console.log('\n=== Example 1: Basic Agent Evaluation ===\n');

  // Initialize evaluator at 528Hz (Love Frequency)
  const evaluator = new RogueAIAgentEvaluator({
    frequency: 528,
    sacredGeometry: 'FlowerOfLife',
    consciousnessLevel: 0.85
  });

  await evaluator.initialize();

  // Define AI agent to evaluate
  const myAgent = {
    id: 'chais-manus-agent-001',
    capabilities: [
      'nft_minting',
      'metadata_validation',
      'ownership_transfer',
      'batch_processing'
    ],
    securityFeatures: [
      'reentrancy_guard',
      'access_control',
      'overflow_protection',
      'double_spend_protection',
      'sybil_resistance',
      'anti_manipulation'
    ],
    standards: ['ERC721', 'ERC2981'],
    metadataStandards: ['OpenSea', 'IPFS'],
    gasEfficiency: 0.88,
    storageEfficiency: 0.82,
    platformCapacity: {
      maxListeners: 75000,
      baseLatency: 40
    },
    streamingCapability: {
      quality: 0.92,
      bandwidth: 1200
    },
    scalingCapability: {
      efficiency: 0.88,
      baseResources: 80
    },
    incentiveLayer: {
      transparency: 0.92,
      auditTrail: true,
      trackingLatency: 120,
      weightingAlgorithm: 'proportional',
      adaptive: true,
      performanceBoosting: true
    },
    revenueModel: {
      artistShare: 0.72,
      platformShare: 0.15,
      ecosystemShare: 0.08,
      communityShare: 0.05,
      enforceMinimum: true,
      roundingMethod: 'favor_artist'
    },
    paymentProcessing: {
      avgDelay: 2200,
      successRate: 0.997,
      minPayment: 0.001,
      supportsWei: true,
      avgGas: 42000,
      batchSize: 75
    },
    compliance: {
      auditTrail: true,
      certified: true,
      reportFields: ['revenue', 'splits', 'payments', 'fees', 'timestamps', 'beneficiaries'],
      trackingLatency: 800
    },
    telemetryCapability: {
      updateFrequency: 1000
    },
    features: {
      multiArtistSplits: true
    },
    edgeCases: {
      zeroBalance: true
    },
    scalability: {
      maxVolume: 75000
    }
  };

  // Run comprehensive evaluation
  console.log('Running comprehensive AI agent evaluation...\n');
  const results = await evaluator.runEvaluation(myAgent);

  console.log(`📊 Evaluation Results:`);
  console.log(`   Evaluation ID: ${results.evaluationId}`);
  console.log(`   Agent ID: ${results.agentId}`);
  console.log(`   Overall Score: ${(results.overallScore * 100).toFixed(2)}%`);
  console.log(`   Status: ${results.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`   Frequency: ${results.frequency}Hz\n`);

  // Display individual evaluator results
  console.log('📋 Individual Evaluator Results:\n');
  for (const [name, result] of Object.entries(results.evaluators)) {
    console.log(`   ${name}:`);
    console.log(`      Score: ${(result.score * 100).toFixed(2)}%`);
    console.log(`      Status: ${result.passed ? '✅' : '❌'}`);
    console.log(`      Scenarios: ${result.scenarios.length}\n`);
  }

  // Display metrics
  const metrics = evaluator.getMetrics();
  console.log('📈 Evaluation Metrics:');
  console.log(`   Total Tests: ${metrics.totalTests}`);
  console.log(`   Passed Tests: ${metrics.passedTests}`);
  console.log(`   Failed Tests: ${metrics.failedTests}`);
  console.log(`   Success Rate: ${(metrics.successRate * 100).toFixed(2)}%`);
  console.log(`   Average Score: ${(metrics.averageScore * 100).toFixed(2)}%`);
  console.log(`   Frequency Alignment: ${(metrics.frequencyAlignment * 100).toFixed(2)}%\n`);
}

/**
 * Example 2: Scenario Testing
 */
async function scenarioTesting() {
  console.log('\n=== Example 2: Scenario Testing ===\n');

  const evaluator = new RogueAIAgentEvaluator({ frequency: 528 });
  await evaluator.initialize();

  const agent = {
    id: 'scenario-test-agent',
    capabilities: ['nft_minting', 'metadata_validation'],
    securityFeatures: ['reentrancy_guard', 'access_control']
  };

  // Define custom scenario
  const customScenario = {
    name: 'Custom NFT Minting Scenario',
    type: 'smartContract',
    tests: ['mint_success', 'metadata_integrity', 'ownership_transfer']
  };

  console.log(`Testing scenario: ${customScenario.name}\n`);
  const result = await evaluator.runScenarioTest('smartContract', agent, customScenario);

  console.log(`Scenario: ${result.name}`);
  console.log(`Type: ${result.type}`);
  console.log(`Score: ${(result.score * 100).toFixed(2)}%`);
  console.log(`Status: ${result.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Tests Run: ${result.tests.length}\n`);

  // Display test results
  console.log('Test Results:');
  result.tests.forEach(test => {
    console.log(`   ${test.name}: ${test.passed ? '✅' : '❌'} (${test.message})`);
  });
}

/**
 * Example 3: Performance Dashboard
 */
async function performanceDashboard() {
  console.log('\n=== Example 3: Performance Dashboard ===\n');

  // Initialize dashboard at 963Hz (Divine Connection)
  const dashboard = new PerformanceMetricsDashboard({
    frequency: 963,
    refreshRate: 1000,
    retentionPeriod: 3600000 // 1 hour
  });

  await dashboard.initialize();

  // Simulate real-time metrics collection
  console.log('Recording real-time metrics...\n');

  // DSP Platform metrics
  dashboard.recordDSPMetrics({
    listenerLoad: 15000,
    streamingQuality: 0.96,
    latency: 38,
    throughput: 14500,
    errorRate: 0.015
  });

  // DAO Governance metrics
  dashboard.recordDAOMetrics({
    proposalActivity: 8,
    votingParticipation: 0.78,
    executionSuccess: 0.97,
    consensusTime: 2500
  });

  // A2A Contract metrics
  dashboard.recordA2AMetrics({
    contractExecutions: 1250,
    gasEfficiency: 0.91,
    successRate: 0.985,
    responseTime: 180
  });

  // Listener Rewards metrics
  dashboard.recordListenerRewardsMetrics({
    rewardDistributions: 5000,
    ethereumPayloads: 4950,
    verificationSuccess: 0.99,
    claimLatency: 850
  });

  // Agent Evaluation metrics
  dashboard.recordAgentEvaluationMetrics({
    totalEvaluations: 125,
    passRate: 0.92,
    averageScore: 0.87,
    frequencyAlignment: 0.94
  });

  // Get dashboard summary
  const summary = dashboard.getDashboardSummary();

  console.log('📊 Dashboard Summary:');
  console.log(`   Frequency: ${summary.frequency}Hz`);
  console.log(`   Overall Health: ${(summary.health.overall * 100).toFixed(2)}%`);
  console.log(`   Health Status: ${summary.health.status.toUpperCase()}`);
  console.log(`   Active Alerts: ${summary.activeAlerts}`);
  console.log(`   Telemetry Points: ${summary.telemetryPoints}\n`);

  // Display current metrics
  console.log('📈 Current Metrics:\n');
  const metrics = summary.metrics;

  if (metrics.dsp_platform) {
    console.log('   DSP Platform:');
    for (const [metric, data] of Object.entries(metrics.dsp_platform)) {
      if (data.current !== undefined) {
        console.log(`      ${metric}: ${data.current.toFixed(2)} (trend: ${data.trend})`);
      }
    }
    console.log();
  }

  if (metrics.dao_governance) {
    console.log('   DAO Governance:');
    for (const [metric, data] of Object.entries(metrics.dao_governance)) {
      if (data.current !== undefined) {
        console.log(`      ${metric}: ${data.current.toFixed(2)} (trend: ${data.trend})`);
      }
    }
    console.log();
  }

  // Simulate an alert
  dashboard.addAlert('info', 'Example informational alert', { example: true });
  const activeAlerts = dashboard.getActiveAlerts();

  console.log(`⚠️  Active Alerts: ${activeAlerts.length}`);
  activeAlerts.forEach(alert => {
    console.log(`   [${alert.level.toUpperCase()}] ${alert.message}`);
  });

  // Cleanup
  dashboard.shutdown();
}

/**
 * Example 4: CI/CD Execution Priorities
 */
async function cicdExecution() {
  console.log('\n=== Example 4: CI/CD Execution Priorities ===\n');

  const cicd = new CICDExecutionPriorities({
    frequency: 963,
    validationThreshold: 0.85,
    autoScaleEnabled: true,
    edgeLayerSupport: true
  });

  await cicd.initialize();

  // Example 4a: Post-Fork-Scale Validation
  console.log('Running post-fork-scale validation...\n');

  const validationContext = {
    scaleFactor: 2,
    previousCapacity: 10000,
    currentCapacity: 20000,
    dataIntegrity: { consistent: true },
    services: { available: true },
    connections: { healthy: true },
    transactionLogs: { consistent: true },
    stateSync: { synchronized: true }
  };

  const validation = await cicd.executePostForkScaleValidation(validationContext);

  console.log('✅ Post-Fork-Scale Validation Results:');
  console.log(`   Validation ID: ${validation.id}`);
  console.log(`   Status: ${validation.status.toUpperCase()}`);
  console.log(`   Score: ${(validation.score * 100).toFixed(2)}%`);
  console.log(`   Passed: ${validation.passed ? '✅' : '❌'}\n`);

  console.log('   Test Results:');
  validation.tests.forEach(test => {
    console.log(`      ${test.name}: ${test.passed ? '✅' : '❌'}`);
    console.log(`         ${test.message || 'Completed'}`);
  });

  // Example 4b: AI-Triggered Contract Request
  console.log('\n\nProcessing AI-triggered contract request...\n');

  const contractRequest = {
    id: 'req-chais-001',
    type: 'deploy',
    parameters: {
      name: 'ChaisArtistNFT',
      symbol: 'CART',
      baseURI: 'ipfs://Qm...',
      artistShare: 0.72
    },
    securityLevel: 'high',
    aiAuthorization: true,
    requiredBalance: 150,
    availableBalance: 1000
  };

  const requestResult = await cicd.processAITriggeredContractRequest(contractRequest);

  console.log('🤖 Contract Request Results:');
  console.log(`   Request ID: ${requestResult.id}`);
  console.log(`   Status: ${requestResult.status.toUpperCase()}`);
  console.log(`   Approved: ${requestResult.approved ? '✅' : '❌'}\n`);

  console.log('   Validation Steps:');
  requestResult.validations.forEach(validation => {
    console.log(`      ${validation.name}: ${validation.passed ? '✅' : '❌'}`);
    console.log(`         ${validation.message}`);
  });

  // Example 4c: Edge-Layer Balance Management
  console.log('\n\nManaging edge-layer balances...\n');

  await cicd.updateEdgeLayerBalance('0xArtist1', 5000);
  await cicd.updateEdgeLayerBalance('0xArtist2', 3500);
  await cicd.updateEdgeLayerBalance('0xPlatform', 10000);

  const balanceMonitoring = cicd.monitorEdgeLayerBalances();

  console.log('💰 Edge-Layer Balance Summary:');
  console.log(`   Monitored Addresses: ${balanceMonitoring.addresses}`);
  console.log(`   Total Balance: ${balanceMonitoring.totalBalance}`);
  console.log(`   Average Balance: ${balanceMonitoring.avgBalance.toFixed(2)}\n`);

  console.log('   Individual Balances:');
  balanceMonitoring.balances.forEach(balance => {
    console.log(`      ${balance.address}: ${balance.balance}`);
  });

  // Display metrics
  console.log('\n\n📊 CI/CD Execution Metrics:');
  const metrics = cicd.getMetrics();
  console.log(`   Total Validations: ${metrics.totalValidations}`);
  console.log(`   Passed Validations: ${metrics.passedValidations}`);
  console.log(`   Validation Success Rate: ${(metrics.validationSuccessRate * 100).toFixed(2)}%`);
  console.log(`   Contract Requests Processed: ${metrics.contractRequestsProcessed}`);
  console.log(`   Edge Layer Updates: ${metrics.edgeLayerUpdates}`);
  console.log(`   Monitored Addresses: ${metrics.monitoredAddresses}\n`);
}

/**
 * Example 5: Complete Workflow
 */
async function completeWorkflow() {
  console.log('\n=== Example 5: Complete Workflow ===\n');
  console.log('Demonstrating complete CHAIS X MANUS evaluation workflow...\n');

  // Initialize all components
  const evaluator = new RogueAIAgentEvaluator({ frequency: 528 });
  const dashboard = new PerformanceMetricsDashboard({ frequency: 963 });
  const cicd = new CICDExecutionPriorities({ frequency: 963 });

  await evaluator.initialize();
  await dashboard.initialize();
  await cicd.initialize();

  console.log('✅ All components initialized\n');

  // Define production agent
  const productionAgent = {
    id: 'chais-production-agent',
    capabilities: ['nft_minting', 'metadata_validation', 'ownership_transfer', 'batch_processing'],
    securityFeatures: ['reentrancy_guard', 'access_control', 'overflow_protection', 'double_spend_protection', 'sybil_resistance'],
    standards: ['ERC721', 'ERC2981'],
    platformCapacity: { maxListeners: 100000, baseLatency: 35 },
    streamingCapability: { quality: 0.95, bandwidth: 1500 },
    scalingCapability: { efficiency: 0.9, baseResources: 100 },
    incentiveLayer: { transparency: 0.95, auditTrail: true, trackingLatency: 100, adaptive: true },
    revenueModel: { artistShare: 0.75, enforceMinimum: true },
    paymentProcessing: { avgDelay: 2000, successRate: 0.998, batchSize: 100 },
    compliance: { auditTrail: true, certified: true }
  };

  // Step 1: Run agent evaluation
  console.log('Step 1: Evaluating AI agent...');
  const evalResults = await evaluator.runEvaluation(productionAgent);
  console.log(`   Result: ${evalResults.passed ? '✅ PASSED' : '❌ FAILED'} (${(evalResults.overallScore * 100).toFixed(2)}%)\n`);

  // Step 2: Record evaluation metrics in dashboard
  console.log('Step 2: Recording evaluation metrics...');
  dashboard.recordAgentEvaluationMetrics({
    totalEvaluations: evaluator.metrics.totalTests,
    passRate: evaluator.metrics.passedTests / evaluator.metrics.totalTests,
    averageScore: evaluator.metrics.averageScore,
    frequencyAlignment: evaluator.metrics.frequencyAlignment
  });
  console.log('   ✅ Metrics recorded\n');

  // Step 3: Validate system for deployment
  console.log('Step 3: Validating system for deployment...');
  const validation = await cicd.executePostForkScaleValidation({
    scaleFactor: 1.5,
    previousCapacity: 10000,
    currentCapacity: 15000,
    dataIntegrity: { consistent: true },
    services: { available: true },
    connections: { healthy: true }
  });
  console.log(`   Result: ${validation.passed ? '✅ VALIDATED' : '❌ FAILED'}\n`);

  // Step 4: Check system health
  console.log('Step 4: Checking overall system health...');
  const health = dashboard.calculateSystemHealth();
  console.log(`   Health Score: ${(health.overall * 100).toFixed(2)}%`);
  console.log(`   Status: ${health.status.toUpperCase()}\n`);

  // Step 5: Final decision
  console.log('Step 5: Deployment Decision...');
  const deploymentReady = evalResults.passed && validation.passed && health.overall >= 0.85;
  
  if (deploymentReady) {
    console.log('   ✅ SYSTEM READY FOR DEPLOYMENT');
    console.log('   All checks passed - proceeding with deployment\n');
  } else {
    console.log('   ❌ DEPLOYMENT BLOCKED');
    console.log('   One or more checks failed - review required\n');
  }

  // Cleanup
  dashboard.shutdown();
}

/**
 * Main execution
 */
async function main() {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║  Rogue AI Agent Evaluator Framework - CHAIS X MANUS Ecosystem ║');
  console.log('║  Operating at 528Hz-963Hz Sacred Frequencies                   ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');

  try {
    // Run all examples
    await basicAgentEvaluation();
    await scenarioTesting();
    await performanceDashboard();
    await cicdExecution();
    await completeWorkflow();

    console.log('\n✅ All examples completed successfully!\n');
    console.log('═══════════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Error running examples:', error.message);
    console.error(error.stack);
  }
}

// Run examples if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  basicAgentEvaluation,
  scenarioTesting,
  performanceDashboard,
  cicdExecution,
  completeWorkflow
};
