/**
 * Tests for Sacred Constants Module
 * Validates 528Hz frequency integration and sacred geometry principles
 */

const {
  HZ_528_BASE_PERIOD_MS,
  TIMING_528HZ,
  SACRED_AUDIO_TONES,
  GOLDEN_RATIO,
  PHI,
  GOLDEN_RATIO_DERIVATIVES,
  FIBONACCI_SEQUENCE,
  FIBONACCI_SPACING,
  GOLDEN_LAYOUT,
  SACRED_GEOMETRY_PATTERNS,
  SACRED_ANGLES,
  generateSacredCSSVariables,
  scaleByGoldenRatio,
  generateGoldenBreakpoints,
  getFibonacci,
} = require('../src/constants/sacred-constants.js');

describe('528Hz Frequency Integration', () => {
  describe('Base Period Calculation', () => {
    test('should calculate correct 528Hz base period', () => {
      expect(HZ_528_BASE_PERIOD_MS).toBeCloseTo(1.89, 2);
      expect(HZ_528_BASE_PERIOD_MS).toBe(1000 / 528);
    });

    test('should have base period of approximately 1.89ms', () => {
      const expectedPeriod = 1.8939393939393939;
      expect(HZ_528_BASE_PERIOD_MS).toBeCloseTo(expectedPeriod, 5);
    });
  });

  describe('TIMING_528HZ Constants', () => {
    test('should have correct base timing units', () => {
      expect(TIMING_528HZ.BASE_PERIOD).toBe(HZ_528_BASE_PERIOD_MS);
      expect(TIMING_528HZ.DOUBLE_PERIOD).toBeCloseTo(HZ_528_BASE_PERIOD_MS * 2, 5);
      expect(TIMING_528HZ.TRIPLE_PERIOD).toBeCloseTo(HZ_528_BASE_PERIOD_MS * 3, 5);
    });

    test('should have correct animation durations', () => {
      expect(TIMING_528HZ.FAST).toBeCloseTo(18.9, 1);
      expect(TIMING_528HZ.SMOOTH).toBeCloseTo(94.7, 1);
      expect(TIMING_528HZ.MEDIUM).toBeCloseTo(189, 0);
      expect(TIMING_528HZ.SLOW).toBeCloseTo(379, 0);
      expect(TIMING_528HZ.GENTLE).toBeCloseTo(568, 0);
    });

    test('should have correct interval timings', () => {
      expect(TIMING_528HZ.HEARTBEAT).toBe(1000);
      expect(TIMING_528HZ.PULSE).toBe(500);
      expect(TIMING_528HZ.RHYTHM).toBe(250);
    });

    test('should have CSS timing strings', () => {
      expect(TIMING_528HZ.CSS_FAST).toContain('ms');
      expect(TIMING_528HZ.CSS_MEDIUM).toContain('ms');
      expect(TIMING_528HZ.CSS_SLOW).toContain('ms');
      expect(parseFloat(TIMING_528HZ.CSS_FAST)).toBeCloseTo(18.9, 1);
    });
  });

  describe('SACRED_AUDIO_TONES', () => {
    test('should have all Solfeggio frequencies', () => {
      expect(SACRED_AUDIO_TONES.LIBERATION).toBe(396);
      expect(SACRED_AUDIO_TONES.UNDOING).toBe(417);
      expect(SACRED_AUDIO_TONES.MIRACLE).toBe(528);
      expect(SACRED_AUDIO_TONES.CONNECTION).toBe(639);
      expect(SACRED_AUDIO_TONES.AWAKENING).toBe(741);
      expect(SACRED_AUDIO_TONES.SPIRITUAL).toBe(852);
      expect(SACRED_AUDIO_TONES.DIVINE).toBe(963);
    });

    test('should have higher harmonic frequencies', () => {
      expect(SACRED_AUDIO_TONES.CHRIST).toBe(1056);
      expect(SACRED_AUDIO_TONES.CHRIST).toBe(528 * 2);
      expect(SACRED_AUDIO_TONES.COSMIC).toBe(2112);
      expect(SACRED_AUDIO_TONES.COSMIC).toBe(528 * 4);
    });

    test('should have correct frequency periods', () => {
      expect(SACRED_AUDIO_TONES.PERIODS[528]).toBeCloseTo(1.89, 2);
      expect(SACRED_AUDIO_TONES.PERIODS[963]).toBeCloseTo(1.04, 2);
      expect(SACRED_AUDIO_TONES.PERIODS[396]).toBeCloseTo(2.53, 2);
      expect(SACRED_AUDIO_TONES.PERIODS[639]).toBeCloseTo(1.56, 2);
    });
  });
});

describe('Sacred Geometry Design Principles', () => {
  describe('Golden Ratio Constants', () => {
    test('should have accurate golden ratio value', () => {
      expect(GOLDEN_RATIO).toBeCloseTo(1.618, 3);
      expect(PHI).toBe(GOLDEN_RATIO);
      expect(PHI).toBeCloseTo((1 + Math.sqrt(5)) / 2, 10);
    });

    test('should calculate correct derivatives', () => {
      expect(GOLDEN_RATIO_DERIVATIVES.PHI).toBe(GOLDEN_RATIO);
      expect(GOLDEN_RATIO_DERIVATIVES.PHI_INVERSE).toBeCloseTo(0.618, 3);
      expect(GOLDEN_RATIO_DERIVATIVES.PHI_SQUARED).toBeCloseTo(2.618, 3);
      expect(GOLDEN_RATIO_DERIVATIVES.PHI_CUBED).toBeCloseTo(4.236, 3);
    });

    test('should validate phi inverse equals phi minus 1', () => {
      expect(GOLDEN_RATIO_DERIVATIVES.PHI_INVERSE).toBeCloseTo(PHI - 1, 10);
    });

    test('should validate phi squared equals phi plus 1', () => {
      expect(GOLDEN_RATIO_DERIVATIVES.PHI_SQUARED).toBeCloseTo(PHI + 1, 10);
    });
  });

  describe('Fibonacci Sequence', () => {
    test('should have correct Fibonacci numbers', () => {
      expect(FIBONACCI_SEQUENCE[0]).toBe(0);
      expect(FIBONACCI_SEQUENCE[1]).toBe(1);
      expect(FIBONACCI_SEQUENCE[2]).toBe(1);
      expect(FIBONACCI_SEQUENCE[3]).toBe(2);
      expect(FIBONACCI_SEQUENCE[4]).toBe(3);
      expect(FIBONACCI_SEQUENCE[5]).toBe(5);
      expect(FIBONACCI_SEQUENCE[6]).toBe(8);
      expect(FIBONACCI_SEQUENCE[7]).toBe(13);
      expect(FIBONACCI_SEQUENCE[8]).toBe(21);
    });

    test('should validate Fibonacci sequence property', () => {
      for (let i = 2; i < FIBONACCI_SEQUENCE.length; i++) {
        expect(FIBONACCI_SEQUENCE[i]).toBe(
          FIBONACCI_SEQUENCE[i - 1] + FIBONACCI_SEQUENCE[i - 2]
        );
      }
    });

    test('should have sequence up to index 16', () => {
      expect(FIBONACCI_SEQUENCE.length).toBe(17);
      expect(FIBONACCI_SEQUENCE[16]).toBe(987);
    });
  });

  describe('FIBONACCI_SPACING', () => {
    test('should have correct Fibonacci-based spacing values', () => {
      expect(FIBONACCI_SPACING.XXS).toBe(2);
      expect(FIBONACCI_SPACING.XS).toBe(3);
      expect(FIBONACCI_SPACING.SM).toBe(5);
      expect(FIBONACCI_SPACING.MD).toBe(8);
      expect(FIBONACCI_SPACING.LG).toBe(13);
      expect(FIBONACCI_SPACING.XL).toBe(21);
      expect(FIBONACCI_SPACING.XXL).toBe(34);
      expect(FIBONACCI_SPACING.XXXL).toBe(55);
      expect(FIBONACCI_SPACING.HUGE).toBe(89);
      expect(FIBONACCI_SPACING.MASSIVE).toBe(144);
      expect(FIBONACCI_SPACING.COSMIC).toBe(233);
    });

    test('should have CSS values with pixel unit', () => {
      expect(FIBONACCI_SPACING.CSS.XXS).toBe('2px');
      expect(FIBONACCI_SPACING.CSS.MD).toBe('8px');
      expect(FIBONACCI_SPACING.CSS.XL).toBe('21px');
      expect(FIBONACCI_SPACING.CSS.COSMIC).toBe('233px');
    });

    test('should match Fibonacci sequence values', () => {
      expect(FIBONACCI_SPACING.XXS).toBe(FIBONACCI_SEQUENCE[3]);
      expect(FIBONACCI_SPACING.SM).toBe(FIBONACCI_SEQUENCE[5]);
      expect(FIBONACCI_SPACING.LG).toBe(FIBONACCI_SEQUENCE[7]);
      expect(FIBONACCI_SPACING.HUGE).toBe(FIBONACCI_SEQUENCE[11]);
    });
  });

  describe('GOLDEN_LAYOUT', () => {
    test('should have correct container proportions', () => {
      expect(GOLDEN_LAYOUT.CONTAINER_MAJOR).toBeCloseTo(61.8, 1);
      expect(GOLDEN_LAYOUT.CONTAINER_MINOR).toBeCloseTo(38.2, 1);
      expect(GOLDEN_LAYOUT.CONTAINER_MAJOR + GOLDEN_LAYOUT.CONTAINER_MINOR).toBeCloseTo(100, 1);
    });

    test('should have correct aspect ratios', () => {
      expect(GOLDEN_LAYOUT.RATIO_LANDSCAPE).toBe(PHI);
      expect(GOLDEN_LAYOUT.RATIO_PORTRAIT).toBeCloseTo(1 / PHI, 10);
    });

    test('should have two-column layout with golden ratio', () => {
      expect(GOLDEN_LAYOUT.TWO_COLUMN.primary).toBeCloseTo(61.8, 1);
      expect(GOLDEN_LAYOUT.TWO_COLUMN.secondary).toBeCloseTo(38.2, 1);
    });

    test('should have CSS grid templates', () => {
      expect(GOLDEN_LAYOUT.CSS_TWO_COLUMN).toBe('61.8fr 38.2fr');
      expect(GOLDEN_LAYOUT.CSS_THREE_COLUMN).toBe('38.2fr 38.2fr 23.6fr');
    });
  });

  describe('SACRED_GEOMETRY_PATTERNS', () => {
    test('should have all sacred geometry patterns', () => {
      expect(SACRED_GEOMETRY_PATTERNS.FLOWER_OF_LIFE).toBe('flowerOfLife');
      expect(SACRED_GEOMETRY_PATTERNS.METATRONS_CUBE).toBe('metatronsCube');
      expect(SACRED_GEOMETRY_PATTERNS.GOLDEN_SPIRAL).toBe('goldenSpiral');
      expect(SACRED_GEOMETRY_PATTERNS.VESICA_PISCIS).toBe('vesicaPiscis');
      expect(SACRED_GEOMETRY_PATTERNS.SRI_YANTRA).toBe('sriYantra');
      expect(SACRED_GEOMETRY_PATTERNS.TORUS_FIELD).toBe('torusField');
      expect(SACRED_GEOMETRY_PATTERNS.MERKABA).toBe('merkaba');
    });
  });

  describe('SACRED_ANGLES', () => {
    test('should have correct sacred angles', () => {
      expect(SACRED_ANGLES.PENTAGRAM).toBe(72);
      expect(SACRED_ANGLES.HEXAGON).toBe(60);
      expect(SACRED_ANGLES.GOLDEN_ANGLE).toBeCloseTo(137.5, 1);
      expect(SACRED_ANGLES.VESICA_ANGLE).toBe(120);
    });

    test('should validate pentagram angle calculation', () => {
      expect(SACRED_ANGLES.PENTAGRAM).toBe(360 / 5);
    });

    test('should validate hexagon angle calculation', () => {
      expect(SACRED_ANGLES.HEXAGON).toBe(360 / 6);
    });
  });
});

describe('Utility Functions', () => {
  describe('generateSacredCSSVariables', () => {
    test('should generate valid CSS custom properties', () => {
      const css = generateSacredCSSVariables();
      expect(css).toContain('--timing-528hz-base');
      expect(css).toContain('--phi:');
      expect(css).toContain('--spacing-md');
      expect(css).toContain('--layout-major');
    });

    test('should include 528Hz timing variables', () => {
      const css = generateSacredCSSVariables();
      expect(css).toContain('--timing-528hz-fast');
      expect(css).toContain('--timing-528hz-medium');
      expect(css).toContain('--timing-528hz-slow');
    });

    test('should include golden ratio variables', () => {
      const css = generateSacredCSSVariables();
      expect(css).toContain('--phi:');
      expect(css).toContain('--phi-inverse:');
      expect(css).toContain('--phi-squared:');
    });

    test('should include Fibonacci spacing variables', () => {
      const css = generateSacredCSSVariables();
      expect(css).toContain('--spacing-xs');
      expect(css).toContain('--spacing-md');
      expect(css).toContain('--spacing-xl');
      expect(css).toContain('--spacing-cosmic');
    });
  });

  describe('scaleByGoldenRatio', () => {
    test('should scale value by phi once', () => {
      const result = scaleByGoldenRatio(100, 1);
      expect(result).toBeCloseTo(161.8, 1);
    });

    test('should scale value by phi twice', () => {
      const result = scaleByGoldenRatio(100, 2);
      expect(result).toBeCloseTo(261.8, 1);
    });

    test('should scale value by phi three times', () => {
      const result = scaleByGoldenRatio(100, 3);
      expect(result).toBeCloseTo(423.6, 1);
    });

    test('should default to single iteration', () => {
      const result1 = scaleByGoldenRatio(100);
      const result2 = scaleByGoldenRatio(100, 1);
      expect(result1).toBe(result2);
    });
  });

  describe('generateGoldenBreakpoints', () => {
    test('should generate breakpoints from base width', () => {
      const breakpoints = generateGoldenBreakpoints(320);
      expect(breakpoints.xs).toBe(320);
      expect(breakpoints.sm).toBeCloseTo(518, -1);
      expect(breakpoints.md).toBeCloseTo(838, -1);
      expect(breakpoints.lg).toBeCloseTo(1355, -1);
      expect(breakpoints.xl).toBeCloseTo(2193, -1);
    });

    test('should use default base width of 320px', () => {
      const breakpoints = generateGoldenBreakpoints();
      expect(breakpoints.xs).toBe(320);
    });

    test('should scale breakpoints by golden ratio', () => {
      const breakpoints = generateGoldenBreakpoints(100);
      expect(breakpoints.sm / breakpoints.xs).toBeCloseTo(PHI, 2);
      expect(breakpoints.md / breakpoints.sm).toBeCloseTo(PHI, 2);
    });

    test('should return integer values', () => {
      const breakpoints = generateGoldenBreakpoints(320);
      expect(Number.isInteger(breakpoints.xs)).toBe(true);
      expect(Number.isInteger(breakpoints.sm)).toBe(true);
      expect(Number.isInteger(breakpoints.md)).toBe(true);
      expect(Number.isInteger(breakpoints.lg)).toBe(true);
      expect(Number.isInteger(breakpoints.xl)).toBe(true);
    });
  });

  describe('getFibonacci', () => {
    test('should return correct Fibonacci numbers within sequence', () => {
      expect(getFibonacci(0)).toBe(0);
      expect(getFibonacci(1)).toBe(1);
      expect(getFibonacci(5)).toBe(5);
      expect(getFibonacci(8)).toBe(21);
      expect(getFibonacci(10)).toBe(55);
    });

    test('should calculate Fibonacci numbers beyond pre-defined sequence', () => {
      expect(getFibonacci(20)).toBe(6765);
      expect(getFibonacci(25)).toBe(75025);
    });

    test('should handle edge cases', () => {
      expect(getFibonacci(0)).toBe(0);
      expect(getFibonacci(1)).toBe(1);
      expect(getFibonacci(2)).toBe(1);
    });

    test('should maintain Fibonacci property for calculated values', () => {
      const n = 20;
      expect(getFibonacci(n)).toBe(getFibonacci(n - 1) + getFibonacci(n - 2));
    });
  });
});

describe('Integration Tests', () => {
  test('should align 528Hz timing with sacred audio tones', () => {
    const timing528 = TIMING_528HZ.BASE_PERIOD;
    const period528 = SACRED_AUDIO_TONES.PERIODS[528];
    expect(timing528).toBe(period528);
  });

  test('should use Fibonacci values for spacing', () => {
    expect(FIBONACCI_SPACING.MD).toBe(FIBONACCI_SEQUENCE[6]);
    expect(FIBONACCI_SPACING.XL).toBe(FIBONACCI_SEQUENCE[8]);
    expect(FIBONACCI_SPACING.HUGE).toBe(FIBONACCI_SEQUENCE[11]);
  });

  test('should maintain golden ratio in layout proportions', () => {
    const majorMinorRatio = GOLDEN_LAYOUT.CONTAINER_MAJOR / GOLDEN_LAYOUT.CONTAINER_MINOR;
    expect(majorMinorRatio).toBeCloseTo(PHI, 2);
  });

  test('should validate CSS generation includes all systems', () => {
    const css = generateSacredCSSVariables();
    expect(css).toContain('528hz');
    expect(css).toContain('phi');
    expect(css).toContain('spacing');
    expect(css).toContain('layout');
  });
});
