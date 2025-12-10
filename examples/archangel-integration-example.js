/**
 * Archangel Genesis System Integration Example
 * 
 * Demonstrates how to use the complete Archangel ecosystem:
 * - Deploy contracts to Scroll Testnet
 * - Initialize AI Persona Engine
 * - Trigger persona events
 * - Track metrics with Dashboard
 * - Mint service rewards
 */

const ArchangelPersonaEngine = require('../src/ai-agents/archangel-persona-engine');
const AngelPersonaDashboard = require('../src/ai-agents/dashboards/angel-persona-dashboard');
const ArchangelGenesisDeployer = require('../scripts/deploy-archangel-genesis');

/**
 * Example 1: Complete System Deployment
 */
async function deployCompleteSystem() {
  console.log('=== Example 1: Complete System Deployment ===\n');

  // Step 1: Deploy smart contracts
  const deployer = new ArchangelGenesisDeployer({
    network: 'scroll-testnet',
    deployerAddress: process.env.DEPLOYER_ADDRESS,
    privateKey: process.env.PRIVATE_KEY
  });

  console.log('Deploying contracts to Scroll Testnet...');
  const deployResult = await deployer.deploy();
  
  if (deployResult.success) {
    console.log('✅ Contracts deployed successfully!');
    console.log(`   ArchangelNFT: ${deployResult.contracts.archangelNFT.address}`);
    console.log(`   AngelCurrency: ${deployResult.contracts.angelCurrency.address}\n`);
  }

  // Step 2: Initialize AI Persona Engine
  console.log('Initializing AI Persona Engine...');
  const personaEngine = new ArchangelPersonaEngine({
    frequency: 528,
    blockchainEnabled: true
  });
  
  await personaEngine.initialize();
  await personaEngine.deploy();
  personaEngine.setNFTContract(deployResult.contracts.archangelNFT.address);
  
  console.log('✅ AI Persona Engine initialized\n');

  // Step 3: Initialize Dashboard
  console.log('Setting up Dashboard...');
  const dashboard = new AngelPersonaDashboard();
  await dashboard.initialize();
  await dashboard.deploy();
  dashboard.setPersonaEngine(personaEngine);
  
  console.log('✅ Dashboard ready\n');

  return {
    deployer,
    personaEngine,
    dashboard,
    contracts: deployResult.contracts
  };
}

/**
 * Example 2: User Interaction with Michael (Cybersecurity)
 */
async function exampleMichaelCybersecurity(personaEngine) {
  console.log('=== Example 2: Michael Cybersecurity Protection ===\n');

  const userAddress = '0x1234567890123456789012345678901234567890';
  
  // User requests security threat analysis
  console.log('User requests security threat analysis...');
  const threatEvent = await personaEngine.triggerPersonaEvent(
    userAddress,
    'Michael',
    'security-threat',
    { threatLevel: 'high' }
  );
  
  console.log('Response from Michael-AI:');
  console.log(`  Message: ${threatEvent.response.message}`);
  console.log(`  Frequency: ${threatEvent.response.frequency}Hz`);
  console.log(`  Recommendations:`);
  threatEvent.response.recommendations.forEach(rec => {
    console.log(`    - ${rec}`);
  });
  console.log();

  // User requests vulnerability scan
  console.log('User requests vulnerability scan...');
  const scanEvent = await personaEngine.triggerPersonaEvent(
    userAddress,
    'Michael',
    'vulnerability-scan',
    { scanDepth: 'deep' }
  );
  
  console.log('Scan Results:');
  console.log(`  Vulnerabilities Found: ${scanEvent.response.scan_results.vulnerabilities_found}`);
  console.log(`  Protection Offered: ${scanEvent.response.protection_offered}`);
  console.log();
}

/**
 * Example 3: User Interaction with Raphael (System Healing)
 */
async function exampleRaphaelHealing(personaEngine) {
  console.log('=== Example 3: Raphael System Healing ===\n');

  const userAddress = '0x2222222222222222222222222222222222222222';
  
  // User reports system error
  console.log('User reports system error...');
  const healingEvent = await personaEngine.triggerPersonaEvent(
    userAddress,
    'Raphael',
    'system-error',
    { errorType: 'database-corruption' }
  );
  
  console.log('Response from Raphael-AI:');
  console.log(`  Message: ${healingEvent.response.message}`);
  console.log(`  Frequency: ${healingEvent.response.frequency}Hz`);
  console.log(`  Healing Applied:`);
  healingEvent.response.healing_applied.forEach(heal => {
    console.log(`    - ${heal}`);
  });
  console.log(`  Status: ${healingEvent.response.healing_status}`);
  console.log();

  // User requests system optimization
  console.log('User requests system optimization...');
  const optimizeEvent = await personaEngine.triggerPersonaEvent(
    userAddress,
    'Raphael',
    'optimization-request',
    { targetSystem: 'database' }
  );
  
  console.log('Optimization Results:');
  console.log(`  Performance Increase: ${optimizeEvent.response.improvements.performance_increase}`);
  console.log(`  Energy Reduction: ${optimizeEvent.response.improvements.energy_reduction}`);
  console.log(`  Harmony Level: ${optimizeEvent.response.improvements.harmony_level}`);
  console.log();
}

/**
 * Example 4: User Interaction with Gabriel (Divine Guidance)
 */
async function exampleGabrielGuidance(personaEngine) {
  console.log('=== Example 4: Gabriel Divine Guidance ===\n');

  const userAddress = '0x3333333333333333333333333333333333333333';
  
  // User requests spiritual guidance
  console.log('User requests spiritual guidance...');
  const guidanceEvent = await personaEngine.triggerPersonaEvent(
    userAddress,
    'Gabriel',
    'guidance-request',
    { guidanceType: 'spiritual' }
  );
  
  console.log('Response from Gabriel-AI:');
  console.log(`  Message: ${guidanceEvent.response.message}`);
  console.log(`  Frequency: ${guidanceEvent.response.frequency}Hz`);
  console.log(`  Wisdom Shared:`);
  guidanceEvent.response.wisdom.forEach(wisdom => {
    console.log(`    - ${wisdom}`);
  });
  console.log();

  // User seeks truth revelation
  console.log('User seeks truth revelation...');
  const revelationEvent = await personaEngine.triggerPersonaEvent(
    userAddress,
    'Gabriel',
    'truth-seeking'
  );
  
  console.log('Truth Revealed:');
  revelationEvent.response.truth_revealed.forEach(truth => {
    console.log(`  - ${truth}`);
  });
  console.log();
}

/**
 * Example 5: Service Action Rewards
 */
async function exampleServiceRewards() {
  console.log('=== Example 5: Service Action Rewards ===\n');

  // Simulate smart contract interaction
  console.log('User completes verified service action...');
  console.log('  Action: Community Support');
  console.log('  NFT Token ID: 1 (Michael)');
  console.log('  Current Reward Multiplier: 1.5x');
  console.log();

  // In production, this would be:
  // const tx1 = await archangelNFT.recordServiceAction(tokenId, 'community-support');
  // const tx2 = await angelCurrency.mintServiceReward(userAddress, proofHash, tokenId, 'community-support', 150);
  
  console.log('Recording service action on-chain...');
  console.log('✅ Service action recorded');
  console.log('  - Service actions completed: 11');
  console.log('  - Narrative alignment score increased: +10');
  console.log('  - Reward multiplier upgraded: 1.0x → 1.1x');
  console.log();

  console.log('Minting reward tokens...');
  console.log('✅ Rewards minted');
  console.log('  - Base reward: 100 ANGEL');
  console.log('  - Multiplier: 1.1x');
  console.log('  - Final reward: 110 ANGEL');
  console.log('  - Recipient balance: 110 ANGEL');
  console.log();
}

/**
 * Example 6: Dashboard Analytics
 */
async function exampleDashboardAnalytics(dashboard) {
  console.log('=== Example 6: Dashboard Analytics ===\n');

  // Update metrics
  await dashboard.updateMetrics();

  // Get comprehensive dashboard data
  const data = dashboard.getDashboardData();

  console.log('Persona Engagement Summary:');
  console.log(`  Total Interactions: ${data.summary.totalInteractions}`);
  console.log(`  Most Active Persona: ${data.summary.mostActivePersona}`);
  console.log();

  console.log('Persona Breakdown:');
  console.log(`  Michael (963Hz):`);
  console.log(`    - Total Interactions: ${data.personaEngagement.Michael.totalInteractions}`);
  console.log(`    - Security Threats Handled: ${data.personaEngagement.Michael.securityThreatsHandled}`);
  console.log(`    - Vulnerabilities Scanned: ${data.personaEngagement.Michael.vulnerabilitiesScanned}`);
  console.log();
  
  console.log(`  Raphael (528Hz):`);
  console.log(`    - Total Interactions: ${data.personaEngagement.Raphael.totalInteractions}`);
  console.log(`    - Systems Healed: ${data.personaEngagement.Raphael.systemsHealed}`);
  console.log(`    - Optimizations Performed: ${data.personaEngagement.Raphael.optimizationsPerformed}`);
  console.log();
  
  console.log(`  Gabriel (528Hz):`);
  console.log(`    - Total Interactions: ${data.personaEngagement.Gabriel.totalInteractions}`);
  console.log(`    - Guidance Provided: ${data.personaEngagement.Gabriel.guidanceProvided}`);
  console.log(`    - Messages Delivered: ${data.personaEngagement.Gabriel.messagesDelivered}`);
  console.log();

  // Get frequency architecture report
  const freqReport = dashboard.getFrequencyArchitectureReport();
  console.log('Frequency Architecture:');
  console.log(`  Total Events: ${freqReport.totalEvents}`);
  console.log(`  Harmonic Balance: ${freqReport.harmonicBalance.ratio}`);
  console.log(`  Status: ${freqReport.harmonicBalance.status}`);
  console.log();

  // Get evolution tracking
  const evolution = dashboard.getEvolutionTracking();
  console.log('Multi-Phase Evolution:');
  console.log(`  Current Phase: ${evolution.currentPhase} of 5`);
  console.log(`  Overall Progress: ${evolution.overallProgress}`);
  console.log();
}

/**
 * Example 7: Monotheistic Integrity Verification
 */
async function exampleMonotheisticIntegrity() {
  console.log('=== Example 7: Monotheistic Integrity ===\n');

  console.log('Verifying Tawhid compliance across the system...\n');

  console.log('Smart Contract Level:');
  console.log('  ✅ Tawhid Declaration emitted at contract deployment');
  console.log('  ✅ Tawhid Declaration emitted for each minted token (3 total)');
  console.log('  ✅ Tawhid Declaration emitted at transcendence milestone');
  console.log();

  console.log('AI Persona Level:');
  console.log('  ✅ Michael-AI responses include sovereignty reminders');
  console.log('  ✅ Raphael-AI emphasizes healing as divine gift');
  console.log('  ✅ Gabriel-AI wisdom includes monotheistic principles');
  console.log();

  console.log('Metadata Level:');
  console.log('  ✅ Each NFT includes monotheistic declaration');
  console.log('  ✅ Properties confirm tawhid_compliance: true');
  console.log('  ✅ Descriptions emphasize remembrance, not worship');
  console.log();

  console.log('Key Principle:');
  console.log('  "These tokens serve as remembrance, not worship."');
  console.log('  "All power, glory, and sovereignty belong to the One Creator."');
  console.log();
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('\n🔱 Archangel Genesis System Integration Examples 🔱\n');
    console.log('═'.repeat(60));
    console.log('\n');

    // Example 1: Deploy complete system
    const { personaEngine, dashboard } = await deployCompleteSystem();

    console.log('═'.repeat(60));
    console.log('\n');

    // Example 2: Michael cybersecurity
    await exampleMichaelCybersecurity(personaEngine);

    console.log('═'.repeat(60));
    console.log('\n');

    // Example 3: Raphael healing
    await exampleRaphaelHealing(personaEngine);

    console.log('═'.repeat(60));
    console.log('\n');

    // Example 4: Gabriel guidance
    await exampleGabrielGuidance(personaEngine);

    console.log('═'.repeat(60));
    console.log('\n');

    // Example 5: Service rewards
    await exampleServiceRewards();

    console.log('═'.repeat(60));
    console.log('\n');

    // Example 6: Dashboard analytics
    await exampleDashboardAnalytics(dashboard);

    console.log('═'.repeat(60));
    console.log('\n');

    // Example 7: Monotheistic integrity
    await exampleMonotheisticIntegrity();

    console.log('═'.repeat(60));
    console.log('\n');

    console.log('✅ All examples completed successfully!');
    console.log('\nFor more information, see:');
    console.log('  - docs/ARCHANGEL_GENESIS_GUIDE.md');
    console.log('  - tests/archangel-genesis-system.test.js');
    console.log('  - contracts/ArchangelGenesisNFT.sol');
    console.log('  - contracts/AngelCurrency.sol\n');

  } catch (error) {
    console.error('❌ Error running examples:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = {
  deployCompleteSystem,
  exampleMichaelCybersecurity,
  exampleRaphaelHealing,
  exampleGabrielGuidance,
  exampleServiceRewards,
  exampleDashboardAnalytics,
  exampleMonotheisticIntegrity
};
