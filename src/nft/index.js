/**
 * NFT Module Index
 * Exports all NFT-related functionality including Pleiades Cosmic Bridge
 * and Mathematical Legacy Collection
 */

const {
  PleiadesCosmicBridge,
  PLEIADES_STARS,
  PLEIADES_GEOMETRY,
  COSMIC_BRIDGE_CONFIG
} = require('./pleiades-cosmic-bridge.js');

const {
  MathematicalLegacyCollection,
  MATHEMATICAL_GENIUSES,
  LEGACY_COIN_SETS
} = require('./mathematical-legacy-collection.js');

module.exports = {
  PleiadesCosmicBridge,
  PLEIADES_STARS,
  PLEIADES_GEOMETRY,
  COSMIC_BRIDGE_CONFIG,
  MathematicalLegacyCollection,
  MATHEMATICAL_GENIUSES,
  LEGACY_COIN_SETS
};
