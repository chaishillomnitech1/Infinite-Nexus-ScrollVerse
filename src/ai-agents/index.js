/**
 * AI Agents Module Index
 * 
 * Exports all AI agent evaluator components for CHAIS X MANUS ecosystem integration.
 */

const RogueAIAgentEvaluator = require('./rogue-ai-agent-evaluator');
const SmartContractEvaluator = require('./evaluators/smart-contract-evaluator');
const DSPPlatformEvaluator = require('./evaluators/dsp-platform-evaluator');
const AIIncentiveLayerEvaluator = require('./evaluators/ai-incentive-layer-evaluator');
const RevenueDistributionEvaluator = require('./evaluators/revenue-distribution-evaluator');
const PerformanceMetricsDashboard = require('./dashboards/performance-metrics-dashboard');
const CICDExecutionPriorities = require('./cicd-execution-priorities');

module.exports = {
  RogueAIAgentEvaluator,
  SmartContractEvaluator,
  DSPPlatformEvaluator,
  AIIncentiveLayerEvaluator,
  RevenueDistributionEvaluator,
  PerformanceMetricsDashboard,
  CICDExecutionPriorities
};
