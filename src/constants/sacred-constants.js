/**
 * 🌌 Sacred Constants Module
 * 528Hz Frequency Integration & Sacred Geometry Design Principles
 * 
 * Core Frequencies & Timing Values for ScrollVerse Ecosystem
 * @author Chais the Great (Al-Miftah)
 * @version 1.0.0
 */

// ============================================================================
// 528Hz Frequency Integration
// ============================================================================

/**
 * Base period derived from 528Hz frequency
 * T = 1/f = 1/528 ≈ 1.89ms per cycle
 */
const HZ_528_BASE_PERIOD_MS = 1000 / 528; // ≈ 1.89393939... ms

/**
 * 528Hz-derived timing values for animations and transitions
 * All values synchronized with sacred frequency for cosmic resonance
 */
const TIMING_528HZ = {
  // Base timing units (in milliseconds)
  BASE_PERIOD: HZ_528_BASE_PERIOD_MS,           // 1.89ms - Single cycle
  DOUBLE_PERIOD: HZ_528_BASE_PERIOD_MS * 2,     // 3.79ms - Double cycle
  TRIPLE_PERIOD: HZ_528_BASE_PERIOD_MS * 3,     // 5.68ms - Triple cycle
  
  // Common animation durations (in milliseconds)
  FAST: HZ_528_BASE_PERIOD_MS * 10,             // 18.9ms - Quick transitions
  SMOOTH: HZ_528_BASE_PERIOD_MS * 50,           // 94.7ms - Smooth animations
  MEDIUM: HZ_528_BASE_PERIOD_MS * 100,          // 189ms - Medium transitions
  SLOW: HZ_528_BASE_PERIOD_MS * 200,            // 379ms - Slow animations
  GENTLE: HZ_528_BASE_PERIOD_MS * 300,          // 568ms - Gentle transitions
  
  // Interval-based timings (in milliseconds)
  HEARTBEAT: Math.round(HZ_528_BASE_PERIOD_MS * 528),  // 1000ms - 1 second heartbeat
  PULSE: Math.round(HZ_528_BASE_PERIOD_MS * 264),      // 500ms - Half-second pulse
  RHYTHM: Math.round(HZ_528_BASE_PERIOD_MS * 132),     // 250ms - Quarter-second rhythm
  
  // CSS transition strings (with unit)
  CSS_FAST: `${HZ_528_BASE_PERIOD_MS * 10}ms`,
  CSS_SMOOTH: `${HZ_528_BASE_PERIOD_MS * 50}ms`,
  CSS_MEDIUM: `${HZ_528_BASE_PERIOD_MS * 100}ms`,
  CSS_SLOW: `${HZ_528_BASE_PERIOD_MS * 200}ms`,
  CSS_GENTLE: `${HZ_528_BASE_PERIOD_MS * 300}ms`,
};

/**
 * Sacred audio tone frequencies for immersive mythology spaces
 * Solfeggio frequencies aligned with consciousness states
 */
const SACRED_AUDIO_TONES = {
  // Core Solfeggio Frequencies
  LIBERATION: 396,      // Liberation from Fear & Guilt
  UNDOING: 417,         // Undoing Situations & Facilitating Change
  MIRACLE: 528,         // Transformation & Miracles (DNA Repair)
  CONNECTION: 639,      // Connecting Relationships
  AWAKENING: 741,       // Awakening Intuition
  SPIRITUAL: 852,       // Returning to Spiritual Order
  DIVINE: 963,          // Divine Connection & Unity
  
  // Higher Harmonics
  CHRIST: 1056,         // Christ Consciousness (528 * 2)
  COSMIC: 2112,         // Cosmic Alignment (528 * 4)
  
  // Frequency Periods (milliseconds per cycle)
  PERIODS: {
    528: HZ_528_BASE_PERIOD_MS,
    963: 1000 / 963,    // ≈ 1.04ms
    396: 1000 / 396,    // ≈ 2.53ms
    639: 1000 / 639,    // ≈ 1.56ms
  }
};

// ============================================================================
// Sacred Geometry Design Principles
// ============================================================================

/**
 * Golden Ratio (φ, Phi) - Divine proportion found throughout nature
 * φ = (1 + √5) / 2 ≈ 1.618033988749895...
 */
const GOLDEN_RATIO = 1.618033988749895;
const PHI = GOLDEN_RATIO; // Alias for convenience

/**
 * Golden Ratio derivatives for layout calculations
 */
const GOLDEN_RATIO_DERIVATIVES = {
  PHI: GOLDEN_RATIO,                    // 1.618
  PHI_INVERSE: 1 / GOLDEN_RATIO,        // 0.618 (φ - 1)
  PHI_SQUARED: GOLDEN_RATIO * GOLDEN_RATIO,  // 2.618 (φ²)
  PHI_CUBED: Math.pow(GOLDEN_RATIO, 3),      // 4.236 (φ³)
};

/**
 * Fibonacci sequence - Foundation for sacred spacing
 * Each number is the sum of the two preceding ones
 */
const FIBONACCI_SEQUENCE = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];

/**
 * Fibonacci-based spacing system (in pixels)
 * Use for margins, paddings, gaps, and element alignments
 */
const FIBONACCI_SPACING = {
  XXS: 2,    // FIBONACCI_SEQUENCE[3] = 2
  XS: 3,     // FIBONACCI_SEQUENCE[4] = 3
  SM: 5,     // FIBONACCI_SEQUENCE[5] = 5
  MD: 8,     // FIBONACCI_SEQUENCE[6] = 8
  LG: 13,    // FIBONACCI_SEQUENCE[7] = 13
  XL: 21,    // FIBONACCI_SEQUENCE[8] = 21
  XXL: 34,   // FIBONACCI_SEQUENCE[9] = 34
  XXXL: 55,  // FIBONACCI_SEQUENCE[10] = 55
  HUGE: 89,  // FIBONACCI_SEQUENCE[11] = 89
  MASSIVE: 144, // FIBONACCI_SEQUENCE[12] = 144
  COSMIC: 233,  // FIBONACCI_SEQUENCE[13] = 233
  
  // CSS variables (with unit)
  CSS: {
    XXS: '2px',
    XS: '3px',
    SM: '5px',
    MD: '8px',
    LG: '13px',
    XL: '21px',
    XXL: '34px',
    XXXL: '55px',
    HUGE: '89px',
    MASSIVE: '144px',
    COSMIC: '233px',
  }
};

/**
 * Golden Ratio-based layout dimensions
 * Use for section widths, heights, and aspect ratios
 */
const GOLDEN_LAYOUT = {
  // Container widths (percentage-based)
  CONTAINER_MAJOR: 61.8,  // Major section (φ - 1) * 100
  CONTAINER_MINOR: 38.2,  // Minor section (100 - 61.8)
  
  // Aspect ratios
  RATIO_LANDSCAPE: PHI,           // 1.618:1
  RATIO_PORTRAIT: 1 / PHI,        // 1:1.618
  
  // Column systems
  TWO_COLUMN: {
    primary: 61.8,   // Primary column %
    secondary: 38.2, // Secondary column %
  },
  
  THREE_COLUMN: {
    major: 38.2,     // Major column %
    medium: 38.2,    // Medium column %
    minor: 23.6,     // Minor column %
  },
  
  // CSS Grid templates
  CSS_TWO_COLUMN: '61.8fr 38.2fr',
  CSS_THREE_COLUMN: '38.2fr 38.2fr 23.6fr',
};

/**
 * Sacred geometry patterns for visual elements
 */
const SACRED_GEOMETRY_PATTERNS = {
  FLOWER_OF_LIFE: 'flowerOfLife',
  METATRONS_CUBE: 'metatronsCube',
  GOLDEN_SPIRAL: 'goldenSpiral',
  VESICA_PISCIS: 'vesicaPiscis',
  SRI_YANTRA: 'sriYantra',
  TORUS_FIELD: 'torusField',
  MERKABA: 'merkaba',
};

/**
 * Sacred angles (in degrees)
 */
const SACRED_ANGLES = {
  PENTAGRAM: 72,        // 360° / 5
  HEXAGON: 60,          // 360° / 6
  GOLDEN_ANGLE: 137.5,  // 360° / φ²
  VESICA_ANGLE: 120,    // Vesica Piscis intersection
};

// ============================================================================
// Combined Application Utilities
// ============================================================================

/**
 * Generate CSS custom properties for sacred constants
 * Use in HTML <style> blocks or CSS files
 */
function generateSacredCSSVariables() {
  return `
    /* 528Hz Timing Variables */
    --timing-528hz-base: ${TIMING_528HZ.BASE_PERIOD}ms;
    --timing-528hz-fast: ${TIMING_528HZ.FAST}ms;
    --timing-528hz-smooth: ${TIMING_528HZ.SMOOTH}ms;
    --timing-528hz-medium: ${TIMING_528HZ.MEDIUM}ms;
    --timing-528hz-slow: ${TIMING_528HZ.SLOW}ms;
    --timing-528hz-gentle: ${TIMING_528HZ.GENTLE}ms;
    
    /* Golden Ratio Variables */
    --phi: ${PHI};
    --phi-inverse: ${GOLDEN_RATIO_DERIVATIVES.PHI_INVERSE};
    --phi-squared: ${GOLDEN_RATIO_DERIVATIVES.PHI_SQUARED};
    
    /* Fibonacci Spacing Variables */
    --spacing-xxs: ${FIBONACCI_SPACING.CSS.XXS};
    --spacing-xs: ${FIBONACCI_SPACING.CSS.XS};
    --spacing-sm: ${FIBONACCI_SPACING.CSS.SM};
    --spacing-md: ${FIBONACCI_SPACING.CSS.MD};
    --spacing-lg: ${FIBONACCI_SPACING.CSS.LG};
    --spacing-xl: ${FIBONACCI_SPACING.CSS.XL};
    --spacing-xxl: ${FIBONACCI_SPACING.CSS.XXL};
    --spacing-xxxl: ${FIBONACCI_SPACING.CSS.XXXL};
    --spacing-huge: ${FIBONACCI_SPACING.CSS.HUGE};
    --spacing-massive: ${FIBONACCI_SPACING.CSS.MASSIVE};
    --spacing-cosmic: ${FIBONACCI_SPACING.CSS.COSMIC};
    
    /* Golden Layout Variables */
    --layout-major: ${GOLDEN_LAYOUT.CONTAINER_MAJOR}%;
    --layout-minor: ${GOLDEN_LAYOUT.CONTAINER_MINOR}%;
  `.trim();
}

/**
 * Calculate dimension scaled by golden ratio
 * @param {number} baseValue - Base dimension value
 * @param {number} iterations - Number of phi multiplications (default: 1)
 * @returns {number} Golden ratio scaled value
 */
function scaleByGoldenRatio(baseValue, iterations = 1) {
  return baseValue * Math.pow(PHI, iterations);
}

/**
 * Calculate responsive breakpoints using golden ratio
 * @param {number} baseWidth - Base viewport width (default: 320px)
 * @returns {object} Breakpoint object with sm, md, lg, xl values
 */
function generateGoldenBreakpoints(baseWidth = 320) {
  return {
    xs: Math.round(baseWidth),
    sm: Math.round(scaleByGoldenRatio(baseWidth, 1)),  // ~518px
    md: Math.round(scaleByGoldenRatio(baseWidth, 2)),  // ~838px
    lg: Math.round(scaleByGoldenRatio(baseWidth, 3)),  // ~1356px
    xl: Math.round(scaleByGoldenRatio(baseWidth, 4)),  // ~2193px
  };
}

/**
 * Get Fibonacci number by index
 * @param {number} n - Index in Fibonacci sequence
 * @returns {number} Fibonacci number at index n
 */
function getFibonacci(n) {
  if (n < FIBONACCI_SEQUENCE.length) {
    return FIBONACCI_SEQUENCE[n];
  }
  
  // Calculate if beyond pre-defined sequence
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

// ============================================================================
// Module Exports
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // 528Hz Constants
    HZ_528_BASE_PERIOD_MS,
    TIMING_528HZ,
    SACRED_AUDIO_TONES,
    
    // Sacred Geometry Constants
    GOLDEN_RATIO,
    PHI,
    GOLDEN_RATIO_DERIVATIVES,
    FIBONACCI_SEQUENCE,
    FIBONACCI_SPACING,
    GOLDEN_LAYOUT,
    SACRED_GEOMETRY_PATTERNS,
    SACRED_ANGLES,
    
    // Utility Functions
    generateSacredCSSVariables,
    scaleByGoldenRatio,
    generateGoldenBreakpoints,
    getFibonacci,
  };
}
