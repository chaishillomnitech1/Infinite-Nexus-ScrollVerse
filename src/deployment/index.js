/**
 * ScrollVerse Deployment Module - Main Export
 * 
 * Unified deployment system for ScrollVerse NFTs including:
 * - Live deployment testing with multimodal AI
 * - Mainnet activation with zkEVM integration
 * - N-GI trajectory coordination
 * 
 * @author Chais the Great (Al-Miftah)
 */

const LiveDeploymentTesting = require('./live-deployment-testing');
const MainnetActivation = require('./mainnet-activation');

module.exports = {
  LiveDeploymentTesting,
  MainnetActivation
};
